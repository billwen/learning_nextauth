import { Resend } from 'resend';

if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY is required');
}

if (!process.env.BASE_URL) {
  throw new Error('BASE_URL is required');
}

const resend = new Resend(process.env.RESEND_API_KEY);
const baseUrl = process.env.BASE_URL;

export async function sendVerificationEmail(email: string, token: string) {
  const confirmationLink = `${baseUrl}/auth/email-verification?token=${token}`;

  const { data, error } = await resend.emails.send({
    from: 'no-reply <onboarding@guludoc.com>',
    to: email,
    subject: 'Verify your email address',
    html: `
      <p>Click the link below to verify your email address:</p>
      <a href="${confirmationLink}">${confirmationLink}</a>
    `,
  });

  if (error) {
    return console.error({ error });
  }

  console.log({ data });
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const resetLink = `${baseUrl}/auth/new-password?token=${token}`;

  const { error } = await resend.emails.send({
    from: 'no-reply <no-reply@guludoc.com>',
    to: email,
    subject: 'Reset your password',
    html: `
      <p>Click the link below to reset your password:</p>
      <a href="${resetLink}">${resetLink}</a>
    `,
  });

  if (error) {
    return console.error({ error });
  }
}
