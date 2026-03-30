# ABHYUTTHANAM - Event Registration System

This repository contains the full workspace for the **ABHYUTTHANAM** Event Registration System. The project is designed as a full-stack application with multiple iterations, where the **v2** folders represent the most current and stable versions of the system.

### 📂 Repository Structure

The core of the current system resides in the following directories:

*   **`CUSOC/frontend v2/`**: The modern React-based frontend built with **Vite**, **TypeScript**, and **Tailwind CSS (v4)**. It utilizes Framer Motion for animations and Radix UI for accessible components.
*   **`CUSOC/CUSOC-backend-v2/`**: The Node.js/Express backend that handles API requests, MongoDB integration, and third-party services.
*   **`CUSOC/`**: Contains legacy versions (`backend`, `frontend`), experimental improvements (`improve`), and database schemas (`supabase`).
*   **Root Assets**: Global documentation (`ABHYUTTHANAM_FULL_PROJECT_CONTEXT.md`) and project images.

---

## 🛠 Tech Stack

### Frontend (v2)
- **Framework:** React 19 (TypeScript)
- **Build Tool:** Vite
- **Styling:** Tailwind CSS v4, Lucide React (Icons)
- **Animations:** Framer Motion, Lenis (Smooth Scroll)
- **Routing:** React Router v7
- **Backend Communication:** Axios

### Backend (v2)
- **Runtime:** Node.js (Express)
- **Database:** MongoDB (via Mongoose)
- **Storage:** Google Drive API (for payment proof uploads)
- **Email:** Nodemailer (for OTP delivery)
- **Deployment:** Optimized for Vercel Serverless

---

## 🚦 Getting Started

### 1. Backend Setup (`CUSOC/CUSOC-backend-v2`)

1.  Navigate to the backend directory:
    ```bash
    cd "CUSOC/CUSOC-backend-v2"
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file based on the required configurations:
    ```env
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    GMAIL_USER=your_email@gmail.com
    GMAIL_PASS=your_app_password
    GDRIVE_CLIENT_ID=...
    GDRIVE_CLIENT_SECRET=...
    GDRIVE_REDIRECT_URI=...
    GDRIVE_REFRESH_TOKEN=...
    GDRIVE_FOLDER_ID=...
    ADMIN_KEY=your_secure_admin_key
    ```
4.  Start the development server:
    ```bash
    npm run dev
    ```

### 2. Frontend Setup (`CUSOC/frontend v2`)

1.  Navigate to the frontend directory:
    ```bash
    cd "CUSOC/frontend v2"
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file for environment variables:
    ```env
    VITE_API_URL=http://localhost:5000
    ```
4.  Launch the development environment:
    ```bash
    npm run dev
    ```

---

## 🔑 Key Features

-   **OTP-Based Registration:** Secure user verification via email before registration.
-   **Payment Proof Integration:** Seamlessly uploads user-submitted screenshots to a dedicated Google Drive folder.
-   **Admin Dashboard:** Restricted access to view registration counts, download attendee data, and manage event status.
-   **Modern UI/UX:** Responsive design with smooth transitions and real-time seat counting.

## 📄 License

This project is private and intended for the ABHYUTTHANAM event management team.
