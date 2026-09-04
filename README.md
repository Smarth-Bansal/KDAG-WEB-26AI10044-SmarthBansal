# KDAG-WEB-26AI10044-SmarthBansal

## About

Hi, I'm **Smarth Bansal**, an undergraduate student at **IIT Kharagpur**. This repository is my official submission for **KDAG Associates' Selection — Round 2 (Web Team)**.

The task brief required building a responsive, standalone landing page and registration portal for KDAG's flagship **Beginner's Python & Data Analytics Bootcamp**, styled after KDAG's visual identity with custom client-side validation and data persistence.

---

## What's Included

This project is built using **zero external dependencies** — pure HTML5, CSS3, and modern JavaScript.

| File            | Description                                                                                                  |
| --------------- | ------------------------------------------------------------------------------------------------------------ |
| `index.html`    | Bootcamp landing page featuring event overview, curriculum grid, timeline, and custom SVG network graphics   |
| `register.html` | Registration form collecting Name, Roll Number, Email, and Department                                        |
| `admin.html`    | Password-protected admin dashboard to view stored registrations                                              |
| `style.css`     | Global stylesheet managing dark-mode layout, typography, animations, and mobile responsiveness               |
| `script.js`     | Client-side validation logic, mobile navigation handler, local storage persistence, and admin access control |

---

## Key Features & Validation

### 1. Registration Form Validation

On submission, `script.js` validates all fields before accepting the form:

* **Non-empty check:** Ensures no field is left blank.
* **Strict Roll Number format:** Confirms the Roll Number is **exactly 9 characters** long and belongs to a 1st- or 2nd-year undergraduate, starting with `25` or `26` (e.g., `26XX10001`).
* **Official KGP Email format:** Strictly validates that the email ends in either `@kgpian.iitkgp.ac.in` or `@iitkgp.ac.in`.
* **Department Selection:** Includes a full list of IIT Kharagpur departments admitting undergraduate students through JEE Advanced.
* **Dynamic Feedback:** Invalid fields are highlighted with inline error messages, and the first invalid field is automatically focused. Errors clear instantly as the user types.

### 2. Client-Side Data Storage

* Validated submissions are formatted into a JSON object with a submission timestamp and saved to the browser's `localStorage` under the key `kdagBootcampRegistrations`.
* Upon successful validation, the form is hidden and a smooth success message is displayed without requiring a full page reload.

### 3. Password-Protected Admin Dashboard

* A discrete **Admin Dashboard** link is available in the footer of the homepage.
* Clicking the link triggers a prompt for the security key: `KDAGadmin`.
* On correct key entry, the user is redirected to `admin.html`, which reads and renders all saved submissions in a structured, responsive table.

### 4. Responsive Design & Visual Identity

* Matches KDAG's dark visual palette (`#0a0a0a`), red accent (`#e2372c`), and display typography.
* Mobile navigation collapses into a responsive menu for small viewports (`<720px`) without layout overflow or text clipping.

---

## How to Run Locally

No build tools, bundlers, or server frameworks are required.

1. Clone or download the repository.
2. Open `index.html` directly in any web browser.
3. Alternatively, serve the project using Python's built-in HTTP server:

```bash
python3 -m http.server 8000
```

Then visit:

**http://localhost:8000**

---

## Live Site

**Live Site:** **https://kdag-web-26-ai-10044-smarth-bansal.vercel.app**
