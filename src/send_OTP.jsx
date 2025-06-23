import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sgMail from '@sendgrid/mail';



//TODO: Da completare la logistica della mail da inviare (non va API)

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function generateOTP(length = 6) {
    const digits = '0123456789';
    let otp = '';
    for (let i = 0; i < length; i++) {
        otp += digits[Math.floor(Math.random() * 10)];
    }
    return otp;
}

app.post('/send-otp', async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required' });

    const otp = generateOTP();

    const msg = {
        to: email,
        from: process.env.FROM_EMAIL,
        subject: 'Your OTP Code',
        text: `Your OTP code is: ${otp}`,
        html: `<p>Your OTP code is: <strong>${otp}</strong></p>`,
    };

    try {
        await sgMail.send(msg);

        // Salva OTP in memoria o DB se vuoi verificarlo dopo
        console.log(`OTP ${otp} sent to ${email}`);

        res.json({ success: true, message: 'OTP sent' });
    } catch (error) {
        console.error('SendGrid error:', error);
        res.status(500).json({ error: 'Failed to send OTP' });
    }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));