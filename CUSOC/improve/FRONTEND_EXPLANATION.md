# CUSOC Frontend Documentation

The **CUSOC (Chandigarh University Student Outstanding Celebration)** frontend is a modern, responsive web application built with **React 19** and **Vite**. It serves as the primary interface for students to register for award categories and for administrators to manage the event.

## 1. Core Architecture
- **Framework:** React 19 (Functional Components & Hooks).
- **Build Tool:** Vite (for fast development and optimized builds).
- **Routing:** `react-router-dom` v7 handles public routes and protected admin areas.
- **Styling:** Modular **Vanilla CSS**. It utilizes a custom "reveal" animation system using the `IntersectionObserver` API to enhance the user experience as they scroll.
- **API Layer:** **Axios** is used for backend communication, with a timeout of 15 seconds and centralized configuration in `src/services/api.js`.

## 2. Page Structure
The application is organized into three main routes:
- **Event Page (`/`):** The public-facing landing page showing event details, speakers, and the registration entry point.
- **Admin Login (`/admin/login`):** A secure portal for administrators.
- **Admin Dashboard (`/admin`):** A protected route that requires an `admin_token` in `localStorage`.

## 3. The Registration System (`RegistrationForm.jsx`)
The registration process is the most complex part of the frontend. It features:

### Step 1: Verification
- Students must enter their university email.
- An OTP (One-Time Password) is sent and verified before the form unlocks.

### Step 2: Basic Information
- Collection of name, UID, cluster, and department using pre-defined constants to ensure data consistency.

### Step 3: Dynamic Category Selection
Students can select one or more award categories:
- Research/Grant Projects
- Global Professional Certification
- Innovation & Entrepreneurship
- Competitions & Hackathons
- Innovation & Patents
- Leadership
- Other Govt Exams & Professional Society Awards

### Step 4: Conditional Sub-forms
Depending on the categories selected, the form dynamically renders specialized fields:
- **File Uploads:** Integrated logic to upload proofs (PDFs/Images) to the backend, which then stores them in **Google Drive**.
- **Faculty Mentorship:** Optional sections to record faculty advisors (Name and E-Code).
- **Validation:** Complex per-category validation logic to ensure all required proofs and details are provided before submission.

## 4. Admin Features
The Admin Dashboard allows organizers to:
- Monitor live registration counts.
- View detailed student submissions.
- Manage event parameters like total seat capacity and speaker lists.

## 5. Directory Overview
- `src/components/`: UI building blocks (Navbar, Modal, RegistrationForm, etc.).
- `src/pages/`: Main view components.
- `src/services/`: API abstraction layers (`api.js` and `adminApi.js`).
- `src/styles/`: Global styles and CSS variables for theming.
- `src/assets/`: Static assets like logos and speaker imagery.

## 6. Key Technologies
- **Lucide React:** Icon library.
- **React Toastify:** For toast notifications (success/error).
- **Supabase Client:** For direct database/auth interactions where necessary.
- **Axios:** For standard REST API calls.
