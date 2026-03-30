# Abhyutthanam Frontend Documentation: Detailed Context for Redesign

This document provides a comprehensive technical and visual breakdown of the **Abhyutthanam: Achievers Awards** frontend. Use this as context for Claude or any AI agent to ensure the redesign preserves functional integrity while elevating the UI/UX.

---

## 1. Project Overview
- **Name:** Abhyutthanam: Achievers Awards (Chandigarh University)
- **Framework:** React 19 (Vite)
- **Styling:** Custom CSS (Utility-first approach)
- **State Management:** React Hooks (useState, useEffect, useCallback)
- **Routing:** React Router Dom v7
- **API Integration:** Axios for backend communication; Supabase for real-time data.

---

## 2. Component Hierarchy & Visual Positioning

### **A. Layout Shell (`App.jsx`)**
- **Structure:** Wraps the entire application in a `BrowserRouter`.
- **Routes:** 
  - `/`: The primary `EventPage`.
  - `/admin/login`: Secure gateway for event organizers.
  - `/admin`: Dashboard for managing registrations and speakers.

### **B. Navigation (`components/Navbar.jsx`)**
- **Position:** Fixed at `top: 0`, `z-index: 50`.
- **Elements (Left to Right):**
  - **Logos:** `CU Logo.png` -> `LOGO OAA Black.png` -> `CU-Intranet Logo`.
  - **Links:** "About", "Speakers" (conditional), and a "Register Now" button (SM size).
- **Styling:** Frosted glass effect with a `gdg-strip` (multicolored bar) at the absolute top.

### **C. Main Event Page (`pages/EventPage.jsx`)**
The page follows a vertical "Reveal-on-Scroll" pattern using `IntersectionObserver`.

1.  **Hero Section (`EventDetails.jsx`):**
    - **Position:** Full width, top of the fold.
    - **Content:** Large Event Title (Abhyutthanam), countdown/date, and a `SeatCounter` component showing real-time availability.
2.  **Speaker Section (`Speakers.jsx`):**
    - **Position:** Below Hero.
    - **Layout:** CSS Grid (`--cols`). 
      - 1 Speaker: Centered.
      - 2-4 Speakers: Balanced row.
      - 5+ Speakers: 3-column wrap.
    - **Cards:** Circular avatar (image or initials), Name, Role, Bio, and LinkedIn icon.
3.  **Partners Section (`Partners.jsx`):**
    - **Position:** Above Footer.
    - **Layout:** Infinite horizontal ticker.
    - **Assets:** `GDG.png`, `C Square Logo`.
4.  **Footer:**
    - **Position:** Bottom of page.
    - **Content:** Copyright info and OAA branding.

### **D. Registration Workflow (`RegisterModal.jsx`)**
This is the most critical functional component.
- **Entry:** Triggered by "Register Now" buttons.
- **State 1 (Form):** Collects Name, Email, UID, Department, and Category.
- **State 2 (OTP):** Triggered after form submission. Uses `OTPVerification.jsx`.
- **State 3 (Success):** Shows a confirmation ticket and success animation.

---

## 3. Asset Mapping (Workspace Paths)

| Category | File Path |
| :--- | :--- |
| **Logos** | `src/assets/logos/CU Logo.png`, `src/assets/logos/LOGO OAA Black.png` |
| **Posters** | `src/assets/Poster/CUSOC.png`, `src/assets/Poster/Event.jpeg` |
| **Speakers** | `src/assets/guest/Aru.jpg`, `Jasjeet.jpg`, `PRat.jpg`, `Rudraks.jpg` |
| **Partners** | `src/assets/partners/GDG.png`, `C_Square_Black_1-removebg-preview.png` |

---

## 4. Design Logic for Redesign (Framer Motion)
- **Entrance:** The Hero headline should use a staggered letter-fade (Reveal).
- **Scroll:** Sections should slide up with a slight blur-to-clear transition (`useScroll`, `useTransform`).
- **Cards:** Speaker cards should have a "Tilt" or "Hover Glow" effect.
- **Modal:** The Registration Modal should "Pop" or "Slide from Right" with a spring transition.

---

## 5. Critical Logic to Preserve
- **Seat Counter:** Must keep the connection to `supabaseClient.js` for real-time updates.
- **Form Submission:** Must keep `services/api.js` endpoints (`/register`, `/verify-otp`).
- **Admin Guard:** `RequireAdmin` component must remain to protect the `/admin` route.
