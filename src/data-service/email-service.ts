import { Resend } from 'resend';

if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY is required');
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(email: string, token: string) {
  const confirmationLink = `http://localhost:3000/auth/email-verification?token=${token}`;

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
