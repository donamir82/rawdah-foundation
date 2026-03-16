const crypto = require('crypto');

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Allow': 'POST',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: 'Method Not Allowed',
    };
  }

  try {
    const headers = event.headers;
    const body = event.body;

    // PayPal webhook signature verification (optional but recommended)
    // You'll need to configure this with your PayPal webhook ID
    // const webhookId = process.env.PAYPAL_WEBHOOK_ID;
    // const signature = headers['paypal-transmission-signature'];
    
    // Parse the PayPal webhook payload
    const paypalEvent = JSON.parse(body);
    
    // Only process completed payments
    if (paypalEvent.event_type === 'PAYMENT.CAPTURE.COMPLETED' || 
        paypalEvent.event_type === 'PAYMENTS.PAYMENT.CREATED') {
      
      // Extract payment amount
      let amount = 0;
      
      if (paypalEvent.resource && paypalEvent.resource.amount) {
        amount = parseFloat(paypalEvent.resource.amount.value);
      } else if (paypalEvent.resource && paypalEvent.resource.transactions) {
        amount = parseFloat(paypalEvent.resource.transactions[0].amount.total);
      }

      if (amount > 0) {
        // Update donations via GitHub API
        await updateDonations(amount);
        
        console.log(`New donation received: $${amount}`);
        
        return {
          statusCode: 200,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            success: true,
            message: 'Donation processed successfully',
            amount: amount
          }),
        };
      }
    }

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        success: true,
        message: 'Webhook received but no action taken'
      }),
    };

  } catch (error) {
    console.error('Error processing PayPal webhook:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        success: false,
        error: 'Internal server error'
      }),
    };
  }
};

async function updateDonations(newAmount) {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const REPO_OWNER = 'donamir82';
  const REPO_NAME = 'rawdah-foundation';
  
  if (!GITHUB_TOKEN) {
    console.error('GITHUB_TOKEN environment variable not set');
    return;
  }

  try {
    // Get current donations.json file
    const getFileResponse = await fetch(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/donations.json`,
      {
        headers: {
          'Authorization': `token ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'Rawdah-Donation-Bot'
        }
      }
    );

    if (!getFileResponse.ok) {
      throw new Error(`GitHub API error: ${getFileResponse.status}`);
    }

    const fileData = await getFileResponse.json();
    const currentData = JSON.parse(Buffer.from(fileData.content, 'base64').toString());

    // Update the donation data
    const updatedData = {
      ...currentData,
      current_amount: currentData.current_amount + newAmount,
      last_updated: new Date().toISOString(),
      total_donors: currentData.total_donors + 1,
      recent_donations: [
        {
          amount: newAmount,
          date: new Date().toISOString(),
          anonymous: true
        },
        ...currentData.recent_donations.slice(0, 9) // Keep last 10 donations
      ]
    };

    // Update the file on GitHub
    const updateResponse = await fetch(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/donations.json`,
      {
        method: 'PUT',
        headers: {
          'Authorization': `token ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'Rawdah-Donation-Bot',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: `Update donations: +$${newAmount} (Total: $${updatedData.current_amount})`,
          content: Buffer.from(JSON.stringify(updatedData, null, 2)).toString('base64'),
          sha: fileData.sha
        })
      }
    );

    if (!updateResponse.ok) {
      throw new Error(`GitHub update failed: ${updateResponse.status}`);
    }

    console.log(`Successfully updated donations: +$${newAmount}`);
    
  } catch (error) {
    console.error('Error updating donations file:', error);
  }
}