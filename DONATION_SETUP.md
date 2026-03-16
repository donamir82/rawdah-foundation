# Automatic Donation Progress Setup

This system automatically updates the donation progress on the Rawdah Foundation website when PayPal donations are received.

## How It Works

1. **PayPal Webhook** → Sends notification when donation received
2. **Netlify Function** → Processes the webhook and updates donation data  
3. **GitHub API** → Updates `donations.json` file automatically
4. **Website** → Refreshes and shows new donation progress

## Setup Instructions

### 1. Deploy to Netlify

1. Go to [Netlify](https://netlify.com) and connect your GitHub account
2. Import the `rawdah-foundation` repository  
3. Deploy settings:
   - **Build command:** (leave empty)
   - **Publish directory:** `.` (root)
   - **Functions directory:** `netlify/functions`

### 2. Configure Environment Variables

In Netlify Dashboard → Site Settings → Environment Variables, add:

```
GITHUB_TOKEN = your_github_personal_access_token
PAYPAL_WEBHOOK_ID = your_paypal_webhook_id (optional)
```

**To get GitHub Token:**
1. Go to GitHub → Settings → Developer Settings → Personal Access Tokens
2. Generate new token with `repo` scope
3. Copy token and add to Netlify

### 3. Set Up PayPal Webhook

1. Log into [PayPal Developer Dashboard](https://developer.paypal.com)
2. Go to Applications → Your App → Webhooks
3. Add webhook URL: `https://your-site.netlify.app/.netlify/functions/paypal-webhook`
4. Select events: `PAYMENT.CAPTURE.COMPLETED`, `PAYMENTS.PAYMENT.CREATED`
5. Save webhook

### 4. Test the System

1. Make a test donation via PayPal
2. Check Netlify Function logs for webhook processing
3. Verify `donations.json` file updated on GitHub
4. Confirm website shows new progress

## File Structure

```
├── donations.json              # Live donation data
├── netlify/
│   └── functions/
│       └── paypal-webhook.js   # PayPal webhook handler
├── netlify.toml               # Netlify configuration
├── script.js                 # Updated with donation loading
└── index.html                # Updated with dynamic display
```

## Donation Data Format

```json
{
  "current_amount": 20000,
  "goal_amount": 45000,
  "currency": "USD",
  "last_updated": "2026-03-15T21:14:00.000Z",
  "total_donors": 15,
  "recent_donations": [
    {
      "amount": 100,
      "date": "2026-03-15T21:14:00.000Z",
      "anonymous": true
    }
  ]
}
```

## Manual Updates

To manually update donation amounts:
1. Edit `donations.json` directly on GitHub
2. Website will automatically refresh within 5 minutes
3. Or trigger immediate refresh by clearing browser cache

## Troubleshooting

- **Function not triggering:** Check PayPal webhook configuration and Netlify logs
- **GitHub not updating:** Verify GitHub token has `repo` permissions
- **Website not refreshing:** Check browser console for JavaScript errors

## Security

- Webhook endpoint validates PayPal signatures (when configured)
- GitHub token has minimal required permissions
- No sensitive data stored in public repository