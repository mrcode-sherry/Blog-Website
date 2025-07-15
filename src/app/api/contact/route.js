import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import mongoose from "mongoose";
import Contact from "@/backend/models/contact";

// 🔗 Connect to MongoDB (adjust if using your own dbConnect file)
const MONGODB_URI = process.env.MONGODB_URI;
async function dbConnect() {
  if (mongoose.connections[0].readyState === 1) return;
  await mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

export async function POST(req) {
  try {
    const { name, email, subject, message, phone } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, error: "All required fields must be filled." },
        { status: 400 }
      );
    }

    await dbConnect();

    // ✅ Save to database
    await Contact.create({ name, email, subject, message, phone });

    // ✅ Setup Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // ✅ Email content
    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: process.env.EMAIL_RECEIVER,
      subject: `Contact Form: ${subject}`,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "N/A"}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: "Message sent and saved successfully." });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
