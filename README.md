# Sarthak Garg — Developer Portfolio

A modern, responsive **single-page** personal portfolio website for Sarthak Garg, a Backend/Web Developer specializing in PHP, Laravel, WordPress, MySQL, JavaScript and APIs.

## Project Overview

This is a fully static, one-page website built with plain HTML5, CSS3 and vanilla JavaScript — no frameworks, no build step. Every section (Home, About, Skills, Experience, Projects, Contact) lives on `index.html` and the navbar scrolls smoothly to each one. It works by simply opening `index.html` in a browser, and can be hosted anywhere that serves static files.

## Technologies Used

- HTML5 (semantic markup)
- CSS3 (custom properties / variables, Grid, Flexbox, smooth scrolling)
- Vanilla JavaScript (no libraries or frameworks)
- Font Awesome (icons, loaded via CDN)
- Google Fonts: Space Grotesk, Inter, JetBrains Mono

## Folder Structure

```text
sarthak-portfolio/
│
├── index.html        (all sections: Home, About, Skills, Experience, Projects, Contact)
├── 404.html
│
├── css/
│   └── style.css
│
├── js/
│   └── script.js
│
├── assets/
│   ├── images/
│   ├── icons/
│   └── Sarthak_Garg_Resume.pdf   (add your resume here)
│
└── README.md
```

## How It's Organized

The navbar links (`Home`, `About`, `Skills`, `Experience`, `Projects`, `Contact`) are in-page anchors (`#home`, `#about`, `#skills`, `#experience`, `#projects`, `#contact`) that scroll to the matching `<section id="...">` inside `index.html`. As you scroll, the active nav link highlights automatically (scroll-spy in `js/script.js`).

Section order on the page:

1. **Home** — hero intro + stats + terminal strip
2. **About** — bio, core areas of work, career timeline
3. **Skills** — skill categories, services, tech stack strip
4. **Experience** — role at Evon Technologies + highlights
5. **Projects** — filterable project grid
6. **Contact** — contact info + validated form

## How to Run

No build tools or servers required.

1. Download / clone the `sarthak-portfolio` folder.
2. Double-click `index.html`, or open it in your browser (`File > Open`).
3. That's it — the whole site works locally.

For local development with live reload, you can optionally use any static server, e.g.:

```bash
npx serve .
# or
python3 -m http.server 8080
```

## How to Change Personal Information

All content lives directly in `index.html`, inside the section with the matching `id`.

- **Name / title / bio** — the `#home` section (hero) and `#about` section.
- **Email / phone / location** — the contact info cards in the `#contact` section, and the `mailto:` links in the footer.
- **Social links** — search for `YOUR_LINKEDIN_URL` and `YOUR_GITHUB_URL` in `index.html` and replace with real profile URLs.
- **Colors / fonts** — all design tokens live at the top of `css/style.css` inside the `:root { ... }` block.

## How to Add Projects

Open `index.html`, find the `#projects` section, and duplicate one `<article class="card project-card">` block inside `.projects-grid`. Update:

- `data-category` attribute (used by the filter buttons — use any of: `php-laravel`, `wordpress`, `woocommerce`, `api`, `security`, space-separated if more than one applies)
- Project name, category label, description
- Technology pills
- Feature list (optional `<ul class="project-features">`)
- "View Project" / "GitHub" button links

## How to Add Your Resume

1. Place your PDF resume at `assets/Sarthak_Garg_Resume.pdf` (exact filename, or update the links).
2. The "Download Resume" links in the `#home` hero section and the Resume CTA section already point to this path.

## How to Connect the Contact Form

The contact form (`#contact` section) currently performs client-side validation only — it does not send data anywhere, since this is a static site. To make it functional, choose one option:

**Option A — Formspree (or similar form backend)**
1. Create a free account at [formspree.io](https://formspree.io) and create a new form to get an endpoint URL.
2. In `index.html`, change the `<form id="contact-form">` tag to include `action="https://formspree.io/f/YOUR_FORM_ID"` and `method="POST"`.
3. Remove or adjust the `e.preventDefault()` logic in `js/script.js` (`initContactForm`) if you want a native form submission, or keep the JS validation and use `fetch()` to POST to the endpoint before showing the success message.

**Option B — Your own backend**
Point the form to a PHP/Laravel endpoint that sends an email (e.g. via PHPMailer or Laravel's Mail facade) and returns a JSON response the JavaScript can read.

## How to Deploy

### Apache / Nginx (own server or shared hosting)

1. Upload the entire `sarthak-portfolio` folder contents to your web root (e.g. `/var/www/html` or `public_html`).
2. No server-side configuration is required beyond serving static files.
3. Optional: set `404.html` as the custom error page.
   - **Apache**: add `ErrorDocument 404 /404.html` to `.htaccess`.
   - **Nginx**: add `error_page 404 /404.html;` inside your `server` block.

### GitHub Pages

1. Push this folder to a GitHub repository.
2. In the repository, go to **Settings → Pages**.
3. Under "Build and deployment", select **Deploy from a branch**, choose your main branch and the root (`/`) folder.
4. Save — your site will be live at `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`.
5. Update the `<link rel="canonical">` and Open Graph URL in `index.html` to match your live domain.

## Notes

- All placeholder information (email, LinkedIn, GitHub, resume file) is clearly marked and should be replaced with real details before publishing.
- No fake statistics, testimonials or client logos have been used, per project requirements.
- Dark mode is the default theme; the toggle in the navbar saves the visitor's preference in `localStorage`.
- The site respects `prefers-reduced-motion` for accessibility.
- Deep links to old page URLs (e.g. `about.html`) will no longer resolve since everything now lives on `index.html` — if you previously shared those links anywhere, update them to `index.html#about`, etc.
