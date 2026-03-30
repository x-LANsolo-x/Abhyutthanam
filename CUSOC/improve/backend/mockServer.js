const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// ── Mock Event Data ─────────────────────────────────────────────────────────
const mockEvent = {
    title: 'ABHYUTTHANAM 2024 (Mock)',
    description: 'University Level Co-Curricular Awards & Recognition Ceremony',
    date: new Date('2024-04-15T09:30:00Z'),
    time: '09:30 AM – 04:30 PM IST',
    venue: 'Main Auditorium, Chandigarh University',
    total_seats: 500,
    booked_seats: 124,
    about_text: 'Celebrate excellence and innovation at ABHYUTTHANAM 2024, the prestigious annual recognition ceremony honoring outstanding student achievements across research, entrepreneurship, leadership, and global certifications.',
    event_sections: [
        {
            id: 1,
            title: "What to Expect?",
            column: 1,
            type: "bullets",
            items: [
                "Recognition of National & International Award Winners",
                "Felicitation of Innovation & Patent Holders",
                "Showcasing Success Stories of Student Startups",
                "Global Certification Achievement Badges"
            ]
        }
    ],
    speakers: [
        {
            id: 1,
            name: "Dr. Jane Doe",
            role: "Dean of Academic Affairs",
            bio: "Expert in research and student development.",
            color: "#1a73e8",
            initials: "JD"
        }
    ],
    partners: []
};

// ── Mock Endpoints ──────────────────────────────────────────────────────────

// Get Event
app.get('/event', (req, res) => {
    res.json({ event: mockEvent });
});

// Send OTP (always succeeds in mock)
app.post('/send-otp', (req, res) => {
    console.log(`Mock OTP sent to: ${req.body.email}`);
    res.json({ message: 'OTP sent successfully (Mock)' });
});

// Verify OTP (any 6-digit code works in mock)
app.post('/verify-otp', (req, res) => {
    const { email, otp } = req.body;
    console.log(`Verifying OTP ${otp} for ${email}`);
    res.json({ message: 'OTP verified successfully (Mock)' });
});

// Register
app.post('/register', (req, res) => {
    console.log('Registration received:', req.body);
    res.json({ message: 'Registration successful (Mock)' });
});

// Mock Upload (returns a dummy URL)
app.post('/upload/proof', (req, res) => {
    res.json({ url: 'https://via.placeholder.com/150?text=Mock+Upload' });
});

// Admin Login (dummy token)
app.post('/admin/login', (req, res) => {
    res.json({ token: 'mock-admin-token-123' });
});

app.listen(PORT, () => {
    console.log(`🛠️  Mock Backend running on http://localhost:${PORT}`);
    console.log('Use this for visual testing without a real database!');
});
