interface ContactSubmittedTemplateData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const contactSubmittedTemplate = ({
  name,
  email,
  subject,
  message,
}: ContactSubmittedTemplateData) => {
  const currentYear = new Date().getFullYear();

  return `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />
  <meta
    name="x-apple-disable-message-reformatting"
  />

  <title>We Received Your Message</title>

  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #0B1016;
      font-family: Arial, Helvetica, sans-serif;
      color: #ffffff;
    }

    table {
      border-spacing: 0;
      border-collapse: collapse;
    }

    .wrapper {
      width: 100%;
      background-color: #0B1016;
      padding: 40px 15px;
    }

    .container {
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      background-color: #111820;
      border: 1px solid #202A35;
      border-radius: 16px;
      overflow: hidden;
    }

    .header {
      padding: 32px 30px 20px;
      text-align: center;
      background-color: #0B1016;
    }

    .brand {
      font-size: 26px;
      font-weight: 700;
      color: #ffffff;
      letter-spacing: 0.5px;
    }

    .brand-accent {
      color: #4FD1C5;
    }

    .tagline {
      margin-top: 8px;
      font-size: 13px;
      color: #8C9AA8;
      letter-spacing: 0.4px;
    }

    .content {
      padding: 38px 40px 42px;
    }

    .success-icon {
      width: 62px;
      height: 62px;
      margin: 0 auto 22px;
      background-color: #142824;
      border: 1px solid #2B5A52;
      border-radius: 50%;
      line-height: 62px;
      text-align: center;
      font-size: 28px;
      font-weight: bold;
      color: #4FD1C5;
    }

    .title {
      margin: 0 0 18px;
      text-align: center;
      font-size: 26px;
      line-height: 1.3;
      color: #ffffff;
    }

    .description {
      margin: 0 auto;
      max-width: 465px;
      text-align: center;
      font-size: 15px;
      line-height: 1.75;
      color: #AAB6C3;
    }

    .highlight-box {
      margin: 32px auto;
      padding: 24px 22px;
      max-width: 390px;
      background-color: #0B1016;
      border: 1px solid #2A3947;
      border-radius: 12px;
    }

    .highlight-title {
      margin: 0 0 10px;
      font-size: 18px;
      font-weight: 700;
      color: #4FD1C5;
    }

    .highlight-text {
      margin: 0;
      font-size: 13px;
      line-height: 1.65;
      color: #8C9AA8;
    }

    .details {
      margin-top: 28px;
      padding: 20px;
      background-color: #151D25;
      border: 1px solid #202A35;
      border-radius: 10px;
    }

    .detail-label {
      margin: 0 0 5px;
      font-size: 11px;
      font-weight: 700;
      color: #667482;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .detail-value {
      margin: 0 0 18px;
      font-size: 14px;
      line-height: 1.6;
      color: #D8E0E7;
      word-break: break-word;
    }

    .detail-value:last-child {
      margin-bottom: 0;
    }

    .message-box {
      margin-top: 20px;
      padding: 18px;
      background-color: #0B1016;
      border-left: 3px solid #4FD1C5;
      border-radius: 6px;
    }

    .message-text {
      margin: 0;
      font-size: 13px;
      line-height: 1.7;
      color: #AAB6C3;
      white-space: pre-wrap;
      word-break: break-word;
    }

    .closing {
      margin: 28px auto 0;
      max-width: 440px;
      text-align: center;
      font-size: 14px;
      line-height: 1.7;
      color: #AAB6C3;
    }

    .closing strong {
      color: #4FD1C5;
    }

    .footer {
      padding: 25px 30px;
      text-align: center;
      background-color: #0B1016;
      border-top: 1px solid #202A35;
    }

    .footer-brand {
      margin-bottom: 8px;
      font-size: 14px;
      font-weight: 700;
      color: #B8C3CE;
    }

    .footer-text {
      margin: 0;
      font-size: 12px;
      line-height: 1.6;
      color: #667482;
    }

    @media only screen and (max-width: 600px) {
      .wrapper {
        padding: 20px 10px;
      }

      .content {
        padding: 30px 20px;
      }

      .title {
        font-size: 22px;
      }

      .description {
        font-size: 14px;
      }
    }
  </style>
</head>

<body>

<table class="wrapper" width="100%">
  <tr>
    <td align="center">

      <table class="container" width="100%">

        <tr>
          <td class="header">

            <div class="brand">
              Connected<span class="brand-accent">Hub</span>
            </div>

            <div class="tagline">
              CONNECT • BUILD • CONTROL
            </div>

          </td>
        </tr>

        <tr>
          <td class="content">

            <div class="success-icon">
              ✓
            </div>

            <h1 class="title">
              We Received Your Message
            </h1>

            <p class="description">

              ${
                name
                  ? `Hello ${name},`
                  : "Hello,"
              }

              <br /><br />

              Thank you for reaching out to
              <strong style="color: #ffffff;">
                KapsInfos
              </strong>.

              <br /><br />

              Your message has been successfully received.
              A member of our team will review your inquiry
              and get back to you as soon as possible.

            </p>

            <div class="highlight-box">

              <p class="highlight-title">
                Thanks for Connecting 🚀
              </p>

              <p class="highlight-text">
                We appreciate you taking the time to contact us.
                Whether you're exploring our services,
                discussing a partnership, or need support,
                we're here to help.
              </p>

            </div>

            <div class="details">

              <p class="detail-label">
                Subject
              </p>

              <p class="detail-value">
                ${subject}
              </p>

              <p class="detail-label">
                Email
              </p>

              <p class="detail-value">
                ${email}
              </p>

            </div>

            <div class="message-box">

              <p class="detail-label">
                Your Message
              </p>

              <p class="message-text">
                ${message}
              </p>

            </div>

            <p class="closing">

              <strong>
                Stay connected. Keep building smarter.
              </strong>

              <br /><br />

              We're looking forward to speaking with you.

            </p>

          </td>
        </tr>

        <tr>
          <td class="footer">

            <div class="footer-brand">
              KapsInfos
            </div>

            <p class="footer-text">
              Smart devices. Connected systems. Smarter possibilities.
            </p>

            <p
              class="footer-text"
              style="margin-top: 10px;"
            >
              © ${currentYear} Connected Hub.
              All rights reserved.
            </p>

          </td>
        </tr>

      </table>

    </td>
  </tr>
</table>

</body>
</html>`;
};

export default contactSubmittedTemplate;