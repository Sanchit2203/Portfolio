
'use server';

import nodemailer from 'nodemailer';
import { z } from 'zod';

interface ActionResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}

const contactFormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  message: z.string(),
});

export async function sendContactEmail(
  input: z.infer<typeof contactFormSchema>
): Promise<ActionResult<{ message: string }>> {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: Number(process.env.EMAIL_SERVER_PORT),
      secure: Number(process.env.EMAIL_SERVER_PORT) === 465,
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASS,
      },
    });

    // Email to Admin
    const adminMailOptions = {
      from: `"${input.name}" <${input.email}>`,
      to: process.env.EMAIL_TO,
      subject: `New Message from Portfolio: ${input.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #1a1a1a;">New Contact Form Submission</h2>
          <p>You have received a new message from your portfolio contact form.</p>
          <hr style="border: none; border-top: 1px solid #eee;">
          <p><strong>Name:</strong> ${input.name}</p>
          <p><strong>Email:</strong> <a href="mailto:${input.email}">${input.email}</a></p>
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px;">
            <p><strong>Message:</strong></p>
            <p>${input.message}</p>
          </div>
          <hr style="border: none; border-top: 1px solid #eee;">
          <p style="font-size: 0.8em; color: #888;">This email was sent from your portfolio website's contact form.</p>
        </div>
      `,
    };

    // Confirmation Email to Sender
    const confirmationMailOptions = {
        from: `"Sanchit Sinha" <${process.env.EMAIL_TO}>`,
        to: input.email,
        subject: 'Thank You for Your Message!',
        html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <h2 style="color: #1a1a1a;">Thank you for getting in touch!</h2>
                <p>Hello ${input.name},</p>
                <p>This is an automated confirmation to let you know that I have received your message. I appreciate you reaching out!</p>
                <p>I will review your message and get back to you as soon as possible.</p>
                <p>Best regards,</p>
                <p><strong>Sanchit Sinha</strong></p>
                <hr style="border: none; border-top: 1px solid #eee;">
                <p style="font-size: 0.8em; color: #888;">
                    You are receiving this email because you submitted the contact form on my portfolio website.
                </p>
            </div>
        `
    };

    await Promise.all([
        transporter.sendMail(adminMailOptions),
        transporter.sendMail(confirmationMailOptions)
    ]);
    
    return { success: true, data: { message: 'Email sent successfully' } };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: 'Failed to send message. Please try again later.' };
  }
}
