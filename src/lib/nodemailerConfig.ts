import nodemailer from "nodemailer";

const requiredEnv = (name: string): string => {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }

  return value;
};

const transporter = nodemailer.createTransport({
  host: requiredEnv("EMAIL_HOST"),
  auth: {
    user: requiredEnv("EMAIL_USER"),
    pass: requiredEnv("EMAIL_PASS"),
  },
});

export default transporter;