import dbConnect from "@/backend/db";
import Subscriber from "@/backend/models/subscriber";
import nodemailer from "nodemailer";

export async function POST(req) {
  await dbConnect();
  const { email } = await req.json();

  if (!email) {
    return new Response(JSON.stringify({ success: false, message: "Email is required" }), {
      status: 400,
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
  if (!emailRegex.test(email)) {
    return new Response(JSON.stringify({ success: false, message: "Invalid email format" }), {
      status: 400,
    });
  }

  // ✅ Additional strict domain check (optional, editable list)
  const allowedDomains = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com"];
  const domain = email.split("@")[1].toLowerCase();

  if (!allowedDomains.includes(domain)) {
    return new Response(
      JSON.stringify({
        success: false,
        message: `We currently only accept emails from: ${allowedDomains.join(", ")}`,
      }),
      { status: 400 }
    );
  }

  try {
    const existing = await Subscriber.findOne({ email });
    if (existing) {
      return new Response(
        JSON.stringify({ success: false, message: "Already subscribed" }),
        { status: 409 }
      );
    }

    await Subscriber.create({ email });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "🎉 Welcome to Our Newsletter!",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Thanks for subscribing!</h2>
          <p>You’ll now receive the latest updates, tips, and blog insights.</p>
          <p>Stay tuned!</p>
          <br/>
          <p style="font-size: 14px; color: gray;">- The Team</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return new Response(
      JSON.stringify({ success: true, message: "Subscribed and email sent" }),
      { status: 200 }
    );
  } catch (err) {
    console.error("Subscription error:", err);
    return new Response(JSON.stringify({ success: false, message: "Server error" }), {
      status: 500,
    });
  }
}
