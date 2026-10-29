import { Resend } from "resend";
import { env } from "@/env";

let resendInstance: Resend | null = null;

export function getResendClient(): Resend | null {
  if (!env.RESEND_API_KEY) {
    if (process.env.NODE_ENV === "production") {
      console.warn("[Resend] RESEND_API_KEY is not configured in production environment.");
    }
    return null;
  }

  if (!resendInstance) {
    resendInstance = new Resend(env.RESEND_API_KEY);
  }

  return resendInstance;
}

export interface SendCertificateEmailParams {
  candidateEmail: string;
  candidateName: string;
  totalScore: number;
  cefrLevel: string;
  certificateNumber: string;
  verificationUrl: string;
}

export async function sendCertificateEmail(params: SendCertificateEmailParams) {
  const resend = getResendClient();
  if (!resend) {
    return { success: false, error: "Resend API key is not configured" };
  }

  try {
    const data = await resend.emails.send({
      from: "Lyxis Diagnostic Engine <credentials@lyxis.mafrilearth.com>",
      to: [params.candidateEmail],
      subject: `Official TOEFL ITP® Diagnostic Score Report [${params.certificateNumber}]`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px 24px; background: #07090E; color: #F8FAFC; border-radius: 16px; border: 1px solid #1E293B;">
          <h1 style="font-size: 24px; font-weight: 800; color: #1D4ED8; margin-bottom: 8px;">Lyxis</h1>
          <p style="font-size: 13px; text-transform: uppercase; letter-spacing: 1.5px; color: #94A3B8; margin-top: 0;">Standardized Diagnostic Assessment Record</p>
          <hr style="border: 0; border-top: 1px solid #1E293B; margin: 24px 0;" />
          <p style="font-size: 16px; line-height: 1.6; color: #E2E8F0;">Dear <strong>${params.candidateName}</strong>,</p>
          <p style="font-size: 15px; line-height: 1.6; color: #94A3B8;">Your official standardized TOEFL ITP® diagnostic evaluation is completed and psychometrically calibrated.</p>
          
          <div style="background: #0B0F19; border: 1px solid #1D4ED8; border-radius: 12px; padding: 20px; margin: 24px 0; text-align: center;">
            <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #94A3B8;">Scaled Score</div>
            <div style="font-size: 40px; font-weight: 900; color: #1D4ED8; margin: 6px 0;">${params.totalScore}</div>
            <div style="display: inline-block; padding: 4px 12px; background: rgba(5, 150, 105, 0.15); border: 1px solid #059669; border-radius: 9999px; font-size: 12px; font-weight: 700; color: #10B981;">CEFR Level: ${params.cefrLevel}</div>
          </div>

          <p style="font-size: 13px; color: #64748B; margin-bottom: 24px;">Credential Number: <code style="font-family: monospace; color: #94A3B8;">${params.certificateNumber}</code></p>
          
          <div style="text-align: center; margin: 32px 0;">
            <a href="${params.verificationUrl}" style="display: inline-block; background: #1D4ED8; color: #FFFFFF; font-weight: 700; font-size: 14px; padding: 12px 28px; border-radius: 9999px; text-decoration: none;">View Verified Credential</a>
          </div>
          
          <hr style="border: 0; border-top: 1px solid #1E293B; margin: 24px 0;" />
          <p style="font-size: 11px; color: #64748B; text-align: center; margin: 0;">© 2026 Lyxis Diagnostic Engine. All rights reserved.</p>
        </div>
      `,
    });

    return { success: true, data };
  } catch (error) {
    console.error("[Resend] Failed to send certificate email:", error);
    return { success: false, error };
  }
}
