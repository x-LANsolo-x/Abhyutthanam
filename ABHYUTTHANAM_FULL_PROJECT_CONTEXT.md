# Abhyutthanam Full Project Context: Frontend & Backend Specification

This document provides a comprehensive technical map of the **Abhyutthanam: Achievers Awards** project. It covers the React frontend and the Node.js/MongoDB backend (`CUSOC-backend-new`).

---

## 1. System Architecture Overview
- **Frontend:** React 19 (Vite) + Tailwind CSS/Plain CSS + Framer Motion.
- **Backend:** Node.js (Express) + MongoDB (Mongoose) + Google Drive API (Storage).
- **Real-time:** Supabase (used primarily for live seat/registration counting on the frontend).
- **Deployment:** Vercel (Frontend & Backend Serverless).

---

## 2. Frontend Specification (`CUSOC/frontend`)

### **A. Component Structure**
- **`App.jsx`**: Main router using `react-router-dom`. Routes: `/` (Main), `/admin` (Protected), `/admin/login`.
- **`EventPage.jsx`**: The primary landing page. Fetches event data via `api.js` and handles scroll-reveal animations.
- **`RegisterModal.jsx`**: A 3-step state machine:
  1. `otp`: Verify student email (@cuchd.in).
  2. `form`: Detailed category-based application.
  3. `success`: Confirmation page.
- **`RegistrationForm.jsx`**: A complex dynamic form.
  - Supports **7 Categories**: Research, Innovation, Entrepreneurship, Competitions, Patents, Certifications, and Other.
  - Each category has unique fields (e.g., TRL stage for Entrepreneurship, Patent Number for Patents).
  - Handles **File Uploads**: Files are sent to the backend, which uploads them to Google Drive.

### **B. Service Layer**
- **`api.js`**: Centralized Axios instance.
  - `fetchEvent()`: GET `/event`.
  - `sendOTP(email)`: POST `/send-otp`.
  - `verifyOTP(email, otp)`: POST `/verify-otp`.
  - `registerUser(payload)`: POST `/register`.
- **`supabaseClient.js`**: Direct connection to Supabase for the `SeatCounter` component.

---

## 3. Backend Specification (`CUSOC/CUSOC-backend-new`)

### **A. Core Server (`server.js`)**
- Uses `express.json()` and `cors`.
- Connects to MongoDB via `config/db.js`.
- Routes are modularized into `/event`, `/register`, `/admin`, and `/upload`.

### **B. Database Models (Mongoose)**
- **`Registration.js`**: Stores student data.
  - Fields: `name`, `email` (unique), `uid`, `cluster`, `department`, `categories` (Array of objects containing category-specific data and Drive links).
- **`OTP.js`**: Stores temporary verification codes with an `expiresAt` TTL index.
- **`Event.js`**: Stores event settings like `totalSeats`, `bookedSeats`, `title`, and `venue`.

### **C. Controllers & Logic**
- **`registrationController.js`**:
  - Validates email domain (@cuchd.in).
  - Checks for duplicate registrations.
  - Verifies OTP against the DB.
  - Increments `bookedSeats` in the `Event` model.
  - Triggers `sendConfirmationEmail` via NodeMailer (`mailer.js`).
- **`uploadController.js`**:
  - Uses `gdrive.js` config to stream files to a specific Google Drive folder.
  - Returns the public `webViewLink` for storage in MongoDB.

---

## 4. Key Data Flow: Registration Journey

1.  **Frontend:** User enters email -> `sendOTP` called -> Backend sends email via NodeMailer.
2.  **Frontend:** User enters OTP -> `verifyOTP` called -> Backend checks MongoDB `OTPs` collection.
3.  **Frontend:** User fills 1 or more category forms -> Files are uploaded one-by-one to `/upload/proof` -> Backend returns Drive URLs.
4.  **Frontend:** Final `registerUser` payload sent (includes all data + Drive URLs).
5.  **Backend:** Final validation -> Save to `Registrations` collection -> Increment Event seats -> Send "Application Received" email.

---

## 5. Environment & Security
- **Email Security:** Restricts registrations to specific domains (default: `cuchd.in`).
- **Admin Security:** `/admin` routes require an `admin_token` (JWT) or `x-admin-key`.
- **Storage:** Sensitive student proofs are stored in a private Google Drive folder accessible only via the backend's Service Account.

---

## 6. Redesign Guidance for Claude
When redesigning the UI:
- **Preserve Props:** Ensure `RegistrationForm` still receives `email` and `otp`.
- **Maintain Categories:** The 7 award categories are hardcoded in the frontend and expected by the backend. Do not remove them.
- **File Handling:** The logic for `uploadFile` helper in `RegistrationForm.jsx` must remain intact as it interfaces with the Google Drive upload stream.
- **Branding:** Use the assets in `src/assets/logos/` and `src/assets/Poster/` to maintain the **Abhyutthanam** identity.
