# Rawdah Foundation Website — Build Brief

## Overview
Build a modern, professional, single-page NGO website for Rawdah Foundation. Static HTML/CSS/JS for GitHub Pages deployment.

## Tech
- HTML5 + Tailwind CSS via CDN (`<script src="https://cdn.tailwindcss.com"></script>`)
- Alpine.js via CDN for interactions
- Vanilla JS for scroll animations, lightbox, mobile nav
- All images already in `images/` folder
- Single `index.html` file + maybe a `styles.css` for custom styles

## Color Scheme
- Primary green: `#1a6b3a` (Islamic green)
- Accent green: `#2d8a4e` (lighter green)
- Dark: `#1a1a2e` (hero/footer dark background)
- White: `#ffffff`
- Light gray: `#f8f9fa` (alternate section bg)
- Gold accent: `#d4a843` (for donation CTAs, goal bars)

## Logo
- `images/logo-white.png` — white text on transparent background
- Use in header and footer (on dark backgrounds)

## Structure (single page, smooth scroll sections)

### 1. Navigation (sticky)
- Dark bg, logo left, nav links right
- Links: About, Projects, Donate, Contact
- Mobile hamburger menu
- Smooth scroll to sections

### 2. Hero Section
- Full-viewport height
- Background: `images/mosque-hero.jpg` (the 3D render of completed mosque) with dark overlay
- Large headline: "Building Communities. Transforming Lives."
- Subheadline: "Empowering through education, faith, and compassion"
- CTA button: "Support Our Mission" → scrolls to donate
- Second button: "Our Projects" → scrolls to projects

### 3. About Section
- Split layout: text left, decorative element right
- Heading: "Our Mission"
- Full mission statement text:
  "At Rawdah Foundation, we believe in the transformative power of compassion, education, and faith. With a heart dedicated to serving others and a deep commitment to spiritual growth, we strive to create lasting change in the lives of individuals and communities. Our mission is to empower through education, vocational training, and the cultivation of strong moral values. By working together, we can build resilient communities and inspire a future where everyone has the opportunity to thrive, both in this life and the next."
- Founder: "Founded by Sharaf Ahmed"
- Optional: 3 stat cards (e.g., "1 Active Project", "1 Country", "Growing Community")

### 4. Projects Section
- Heading: "Our Projects"
- Subheading: "Making a difference, one community at a time"

#### Mosque Project Card (MAIN — large featured card)
- Image: `images/mosque-front-view.jpg`
- Badge: "Active Project"
- Title: "Build a Mosque"
- Location: "Village Borogusha, Thana Gowainghat, District Sylhet, Bangladesh"
- Short description (first 2 sentences of the full description)
- Progress bar: showing progress toward $35,000 goal (style it at ~40% for visual)
- "Learn More" button → scrolls to mosque detail section
- "Donate Now" button → scrolls to donate

#### Orphanage Card (Coming Soon)
- Image: `images/orphanage-rawdah.jpg`
- Badge: "Coming Soon"
- Title: "New Orphanage"
- Short text: "Providing a loving home and quality education for orphaned children. Details coming soon."
- Grayed/muted styling to indicate not yet active

### 5. Mosque Detail Section
- Full-width section with dark bg accent
- Heading: "Build a Mosque — Construction Progress"
- Full description text:
  "Help us complete a mosque for a growing community in rural Bangladesh. The land has been secured, and construction is already underway — the foundation, pillars, and roof are in place. Now we need your support to finish what we've started. When complete, this mosque will serve hundreds of local villagers, while its prime location along a major road and near a college means it will also welcome travelers and students seeking a place to worship. The remaining work includes the prayer hall, wudu (ablution) area, and living quarters for the Imam and Muazzin. Your contribution won't just build walls — it will build a spiritual home for a community that needs one."
- Photo gallery (clickable thumbnails → lightbox):
  - `images/mosque-hero.jpg` (3D render — "Completed Vision")
  - `images/mosque-front-view.jpg` ("Front View — Current Progress")
  - `images/mosque-front-view-2.jpg` ("Front View")
  - `images/mosque-construction-1.jpg` ("Construction Phase")
  - `images/mosque-construction-2.jpg` ("Foundation & Structure")
  - `images/mosque-roadside-view.jpg` ("Roadside Location")
  - `images/mosque-location-map.jpg` ("Location Map")
- Goal progress: $35,000 with animated progress bar
- Big "Donate to This Project" CTA button

### 6. Donate Section
- Heading: "Support Our Mission"
- Subheading: "Every contribution makes a difference"
- Two cards side by side:
  
  **Card 1: PayPal**
  - PayPal icon
  - "Donate via PayPal"
  - Button: "Donate Now" (links to `#` for now — placeholder)
  - Note: "PayPal integration coming soon"

  **Card 2: Bank Transfer**
  - Bank icon
  - "Bank Transfer"
  - "For bank transfer details, please contact us at rawdahfoundation@gmail.com"

- Below cards: "100% of your donation goes directly to our projects"

### 7. Contact Section
- Heading: "Get In Touch"
- Left: Contact info
  - Email: rawdahfoundation@gmail.com
  - Location: Plano, TX, USA
- Right: Simple contact form (use Formspree: `https://formspree.io/f/rawdahfoundation@gmail.com` or just `mailto:`)
  - Name, Email, Message fields
  - Submit button

### 8. Footer
- Dark bg
- Logo
- Quick links
- Contact info
- "© 2025 Rawdah Foundation. All rights reserved."

## Design Details
- Use `scroll-behavior: smooth` on html
- Intersection Observer for fade-in animations on scroll
- Lightbox for mosque gallery photos (vanilla JS)
- Progress bar animation when scrolled into view
- Mobile responsive with hamburger nav
- Use subtle shadows, rounded corners (modern card UI)
- Typography: Use Google Fonts — `Inter` for body, `Playfair Display` for headings
- Islamic geometric pattern as subtle bg accent (CSS only, optional)

## Files to create
- `index.html` — the full site
- `styles.css` — custom styles beyond Tailwind (optional, can inline)
- `script.js` — interactions (lightbox, animations, mobile nav)
