import { Resend } from 'resend';

import log from '@/utils/logger';

if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY is required');
}

if (!process.env.BASE_URL) {
  throw new Error('BASE_URL is required');
}

const resend = new Resend(process.env.RESEND_API_KEY);
const baseUrl = process.env.BASE_URL;

/**
 * Send a verification email to the user.
 * @param {string} email
 * @param {string} token
 *
 * @throws {Error} - If an error occurs while sending the email.
 */
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
    log.error(__filename, `Send verification email failed, reason ${JSON.stringify(error)}`, {
      metric: 'send_email',
      module: 'verification',
      status: 'failed',
      details: JSON.stringify(error),
    });
    throw new Error(error.message);
  }

  log.info(__filename, `Sending verification email to ${email}`, {
    metric: 'send_email',
    module: 'verification',
    status: 'success',
    details: JSON.stringify(data),
  });

  return;
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

export async function sendTwoFactorEmail(email: string, token: string) {
  const { error } = await resend.emails.send({
    from: 'no-reply <no-reply@guludoc.com>',
    to: email,
    subject: '2FA Code',
    html: `
      <p>Your 2FA Code: ${token}</p>
    `,
  });

  if (error) {
    return console.error({ error });
  }
}
