// import { Resend } from 'resend';

// const resend = new Resend(process.env.RESEND_API_KEY);

// export async function POST(req) {
//   const body = await req.json();
//   const { name, email, message } = body;

//   if (!name || !email || !message) {
//     return Response.json({ message: "All fields are required" }, { status: 400 });
//   }

//   try {
//     const data = await resend.emails.send({
//       from: "onboarding@resend.dev", 
//       to: "krayush270@gmail.com",    
//       subject: `New Contact Form Submission from ${name}`,
//       html: `
//         <div style="font-family: sans-serif;">
//           <h2>Contact Form Submission</h2>
//           <p><strong>Name:</strong> ${name}</p>
//           <p><strong>Email:</strong> ${email}</p>
//           <p><strong>Message:</strong><br/>${message}</p>
//         </div>
//       `,
//     });

//     return Response.json({ message: "Message sent successfully!" }, { status: 200 });
//   } catch (error) {
//     console.error("Resend email error:", error);
//     return Response.json({ message: "Failed to send message." }, { status: 500 });
//   }
// }


import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { name, email, message } = req.body;

    const { data, error } = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: ["krayush270@gmail.com"],
      subject: `New message from ${name}`,
      reply_to: email,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background:#f9f9f9; padding:40px;">
    <div style="max-width:600px; margin:auto; background:white; padding:30px; border-radius:16px;">
      <h2 style="margin-bottom:20px;">🚀 New Portfolio Message</h2>
      
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>

      <div style="margin-top:20px; padding:20px; background:#f3f3f3; border-radius:12px;">
        <p style="margin:0;">${message}</p>
      </div>

      <p style="margin-top:30px; font-size:12px; color:#888;">
        Sent from your portfolio contact form.
      </p>
    </div>
  </div>
      `,
    });

    if (error) {
      return res.status(400).json({ error });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: "Something went wrong" });
  }
}
