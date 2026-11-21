# Ahmed Sabry Hamed Elesnawy — Developer Portfolio

A personal developer portfolio website designed for **Ahmed Sabry Hamed Elesnawy**, Full-Stack Web Developer & MEAN Stack Specialist (Third-Year Computer Science Student, GPA: 3.00 / 4.00).

Built strictly with **Pure HTML5, CSS3, and Vanilla JavaScript (ES6+)** with **zero external frameworks or runtime dependencies**.

---

## 🎨 Visual Identity & Color System

The website includes two coordinated themes adhering to design specifications:

### ☀️ Light Mode (Default)
- **Primary Accent:** `#F4BAA3`
- **Background:** `#F4F0E2`
- **Primary Blue:** `#619DC6`
- **Secondary Blue:** `#A6C8E2`
- **Text & Contrast:** High-contrast dark charcoal & navy (`#0B222E`)

### 🌙 Dark Mode
- **Background:** `#061E29`
- **Primary:** `#1D546D`
- **Secondary / Accent:** `#5F9598`
- **Peach Highlights:** `#F4BAA3`
- **Text & Contrast:** Soft ivory & readable light cyan (`#F4F0E2`, `#D0E1EA`)

Theme preference is preserved in `localStorage` and automatically syncs across the interactive HTML5 canvas particle system and CSS design tokens.

---

## 📂 Project Structure

```text
ahmed-elesnawy-portfolio/
│
├── index.html                   # Semantic HTML5 single-page application structure
├── README.md                    # Project documentation & placeholder guide
│
├── css/
│   └── style.css                # CSS variables, glassmorphism, responsive clamp typography
│
├── js/
│   └── script.js                # Vanilla ES6+: particles, 3D tilt, typing, slider, theme, form
│
└── assets/
    ├── images/
    │   ├── profile-placeholder.svg    # Vector avatar & frame artwork
    │   ├── project-replya.svg         # Replya AI Platform preview
    │   ├── project-portfolio.svg      # Portfolio project preview
    │   └── project-fullstack.svg      # MEAN Stack enterprise preview
    ├── icons/
    └── cv/
        └── Ahmed_Sabry_CV_Placeholder.pdf # PDF resume placeholder
```

---

## 🚀 Sections Included (In Exact Specified Order)

1. **Home / Hero:**
   - Availability status badge: *"Available for Opportunities"* with pulsing glow.
   - Name reveal: **Ahmed Sabry Hamed Elesnawy**.
   - Dynamic typing effect cycling through:
     - `Full-Stack Developer`
     - `MEAN Stack Developer`
     - `Problem Solver`
     - `Web Developer`
   - Introduction: *"Building scalable digital experiences through clean code, creative thinking, and modern web technologies."*
   - Magnetic CTA buttons: **Hire Me** (scrolls to Contact) & **View Projects** (scrolls to Projects).
   - 3D interactive profile card with floating badges.
   - Animated scroll-down mouse wheel indicator.

2. **About Me:**
   - Two-column responsive layout.
   - Left: Portrait image frame with 3rd-year CS badge and academic stats.
   - Right: Professional biography and **6 highlights**:
     1. Professional Role – Full-Stack Web Developer
     2. Specialization – MEAN Stack Development
     3. Frontend – Responsive and interactive interfaces
     4. Backend – Scalable server-side applications
     5. Problem Solving – Clean code and efficient solutions
     6. Mindset – Continuous learning and AI-powered development
   - **Download CV** action button.

3. **Education & Academic Journey:**
   - Bachelor's Degree in Computer Science (Third-Year Student).
   - Cumulative GPA: **3.00 / 4.00**.
   - Animated SVG circular GPA progress meter (75% radial fill) & numerical counter.
   - Editable placeholder for University / Faculty name.
   - Milestones and core coursework (Algorithms, OOP, Databases, Web Systems).

4. **Professional Experience:**
   - Featured active training: **NTI – National Telecommunication Institute (MEAN Stack Development Trainee)**.
   - Breakdown of technologies and responsibilities (MongoDB, Express.js, Angular, Node.js).
   - Formatted, clearly labeled editable placeholder for future internships or employment history.

5. **Technical Skills:**
   - Categorized cards without fake percentages:
     - **Frontend:** HTML5, CSS3, JavaScript, TypeScript, Angular, Responsive Web Design, DOM Manipulation.
     - **Backend:** Node.js, Express.js, RESTful APIs, Auth & Authorization, Server-side Development.
     - **Database:** MongoDB, SQL, Database Design, CRUD Operations.
     - **Programming & CS:** C++, Python, OOP Principles, Data Structures & Algorithms, Problem Solving.
     - **Tools & Workflow:** Git, GitHub, VS Code, Postman, npm.
     - **Additional Interests:** Generative AI, AI Development Tools, Software Architecture.

6. **Featured Projects:**
   - Responsive grid featuring 3 projects with screenshot previews, badges, and tech tags:
     - **Replya:** AI-powered communication platform (Next.js, JavaScript, Supabase).
     - **Portfolio Website:** Responsive personal portfolio (HTML5, CSS3, JavaScript).
     - **Full-Stack Web Application:** MEAN stack enterprise architecture.
   - Interactive 3D tilt on hover and mouse tracking.
   - **View All Projects** modal displaying upcoming works.

7. **Testimonials ("What People Say"):**
   - Carousel slider with prev/next buttons, pagination dots, and touch swipe gestures.
   - Auto-sliding with pause on hover.
   - Clearly labeled editable recommendation placeholders (Instructors, CS Peers, Mentors).

8. **Services ("What I Can Do For You"):**
   - 6 service cards with unique SVG icons, glowing borders, and hover micro-interactions:
     1. Frontend Development
     2. Backend Development
     3. Full-Stack Development
     4. Website Optimization
     5. Database Development
     6. AI Integration

9. **Get In Touch / Contact:**
   - Location: Egypt.
   - Editable placeholders for email, phone, LinkedIn, GitHub, and Twitter.
   - Client-side validated contact form with real-time feedback, field error markers, and loading spinner.
   - Prominent **Download CV** button.
   - Footer with dynamic auto-updating copyright year and *"Designed & Developed by Ahmed Sabry"*.

---

## ✏️ How to Customize Your Placeholders

1. **Profile Photo:**
   - Place your real headshot inside `assets/images/` (e.g. `assets/images/ahmed-sabry.jpg`).
   - In `index.html`, find the `<img id="profile-img">` and `.about-img` tags and update the `src`:
     ```html
     <img src="assets/images/ahmed-sabry.jpg" alt="Ahmed Sabry Hamed Elesnawy" ... />
     ```

2. **Resume (CV):**
   - Save your actual PDF resume as `assets/cv/Ahmed_Sabry_Hamed_Elesnawy_CV.pdf`.
   - Update the `href` in the two Download CV buttons in `index.html`.

3. **University / Department Name:**
   - Search for `[Faculty of Computers` in `index.html` under Section 3 (Education) and replace it with your actual university name (e.g., *Faculty of Computers and Artificial Intelligence, Cairo University*).

4. **Contact Information & Social Links:**
   - In Section 9 (`#contact`) and the footer, replace:
     - `ahmed.sabry.elesnawy@example.com` with your real email.
     - `+20 1XX XXX XXXX` with your phone number.
     - `https://linkedin.com/in/` with your direct LinkedIn profile handle.
     - `https://github.com/` with your direct GitHub profile username.

5. **Connecting the Contact Form to Live Email Delivery:**
   - To send actual emails without configuring a database backend, you can connect the form to [Formspree](https://formspree.io/) or [EmailJS](https://www.emailjs.com/).
   - Example with Formspree:
     ```html
     <form action="https://formspree.io/f/your_form_id" method="POST">
     ```

---

## 💻 How to Preview & Run Locally

Because this project uses pure HTML5, CSS3, and JavaScript, no build step or node package installation is required:

1. Simply double-click `index.html` to open it directly in any modern browser (Chrome, Edge, Firefox, Safari).
2. Or use VS Code's **Live Server** extension, or run a simple local Python server:
   ```bash
   # From the project directory:
   python -m http.server 8000
   ```
   Then open `http://localhost:8000` in your browser.

---

## 🌐 Free Hosting & Deployment Options

- **GitHub Pages:**
  1. Initialize a git repository and push to GitHub.
  2. In your GitHub repository, navigate to **Settings** > **Pages**.
  3. Under *Branch*, select `main` and `/root`. Click **Save**.
- **Netlify / Vercel:**
  - Drag and drop this folder directly into the Netlify/Vercel dashboard for instant SSL-secured deployment.
