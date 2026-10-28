import crypto from "node:crypto";

const HMAC_SECRET = process.env.CERTIFICATE_SECRET_KEY || "lyxis-cbt-cryptographic-salt-2026";

export function generateCertificateSignature(payload: {
  attemptId: string;
  candidateName: string;
  totalScore: number;
  cefrLevel: string;
  issuedAt: string;
}): string {
  const serialized = `${payload.attemptId}|${payload.candidateName}|${payload.totalScore}|${payload.cefrLevel}|${payload.issuedAt}`;
  return crypto.createHmac("sha256", HMAC_SECRET).update(serialized).digest("hex");
}

export function verifyCertificateSignature(
  payload: {
    attemptId: string;
    candidateName: string;
    totalScore: number;
    cefrLevel: string;
    issuedAt: string;
  },
  signature: string,
): boolean {
  const expected = generateCertificateSignature(payload);
  const bufExpected = Buffer.from(expected);
  const bufSignature = Buffer.from(signature);
  if (bufExpected.length !== bufSignature.length) return false;
  return crypto.timingSafeEqual(bufExpected, bufSignature);
}
