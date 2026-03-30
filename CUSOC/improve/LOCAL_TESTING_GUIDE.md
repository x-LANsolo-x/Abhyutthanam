# Local Testing Guide (Mock Environment)

Since the production backend requires several sensitive credentials (MongoDB, Google Drive, Mailer), this project includes a **Mock Backend** for developers to perform visual testing and feature development without needing real API keys.

## 1. Running the Mock Server
The mock server is a lightweight Express application located at `backend/mockServer.js`. It runs on port **5000** and provides hardcoded responses for all primary frontend features.

### Start the Mock Backend:
```bash
cd backend
node mockServer.js
```

### Start the Frontend:
```bash
cd frontend
npm run dev
```

## 2. Testing the Registration Flow
The mock server allows you to test the entire registration process without sending real emails:

1.  **Email Verification:** Enter any email address.
2.  **OTP:** Enter any 6-digit code (e.g., `123456`). The mock server will accept any code.
3.  **File Uploads:** Uploading files will return a placeholder URL instead of saving to Google Drive.
4.  **Submission:** Submitting the form will log the data to your terminal and show a success message.

## 3. Mock Data Details
The mock server provides the following:
- **Event Title:** "ABHYUTTHANAM 2024 (Mock)"
- **Seats:** 500 total, 124 booked.
- **Admin Access:** Any login attempt will return a `mock-admin-token-123`, allowing you to access the protected `/admin` route.

## 4. Key Differences from Production
| Feature | Mock Server | Production |
| :--- | :--- | :--- |
| **Database** | None (In-memory/Hardcoded) | MongoDB Atlas |
| **OTP** | Automatic Approval | Real Email (Nodemailer) |
| **Uploads** | Placeholder URL | Google Drive API |
| **Auth** | Dummy Token | JWT + Admin Secret |

## 5. Troubleshooting
If you see a "Route not found" or "Connection Refused" error in the frontend console:
- Ensure the mock server is running on `http://localhost:5000`.
- Check that the frontend `.env` (if it exists) or `src/services/api.js` is pointing to the correct backend URL.
