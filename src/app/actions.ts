
'use server';

import { generateResumeSummary } from '@/ai/flows/resume-summary-generator';
import type { GenerateResumeSummaryInput } from '@/ai/schemas';
import nodemailer from 'nodemailer';
import { z } from 'zod';

interface ActionResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export async function generateResumeSummaryAction(
  input: GenerateResumeSummaryInput
): Promise<ActionResult<{ summary: string }>> {
  try {
    const result = await generateResumeSummary(input);
    return { success: true, data: result };
  } catch (error) {
    console.error('Error generating resume summary:', error);
    // Return a generic error message to the client for security
    return { success: false, error: 'An unexpected error occurred. Please try again.' };
  }
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

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      replyTo: input.email,
      subject: `New message from ${input.name} via Portfolio`,
      text: input.message,
      html: `<p>You have a new message from <strong>${input.name}</strong> (${input.email}):</p><p>${input.message}</p>`,
    };

    await transporter.sendMail(mailOptions);
    return { success: true, data: { message: 'Email sent successfully' } };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: 'Failed to send message. Please try again later.' };
  }
}
