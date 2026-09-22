interface ContactNotificationTemplateData {
  name: string;
  email: string;
  subject: string;
  message: string;
  contactId: string;
}

const contactNotificationTemplate = ({
  name,
  email,
  subject,
  message,
  contactId,
}: ContactNotificationTemplateData) => {
  const currentYear = new Date().getFullYear();

  return `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />

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
      padding: 30px;
      text-align: center;
      background-color: #0B1016;
    }

    .brand {
      font-size: 26px;
      font-weight: 700;
      color: #ffffff;
    }

    .brand-accent {
      color: #4FD1C5;
    }

    .content {
      padding: 35px 40px 40px;
    }

    .title {
      margin: 0 0 12px;
      font-size: 24px;
      color: #ffffff;
    }

    .description {
      margin: 0 0 28px;
      color: #8C9AA8;
      font-size: 14px;
      line-height: 1.7;
    }

    .details {
      background-color: #0B1016;
      border: 1px solid #2A3947;
      border-radius: 10px;
      padding: 20px;
    }

    .label {
      margin: 0 0 5px;
      font-size: 11px;
      font-weight: 700;
      color: #4FD1C5;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .value {
      margin: 0 0 18px;
      color: #D8E0E7;
      font-size: 14px;
      line-height: 1.6;
      word-break: break-word;
    }

    .value:last-child {
      margin-bottom: 0;
    }

    .message {
      margin-top: 20px;
      padding: 20px;
      background-color: #151D25;
      border-left: 3px solid #4FD1C5;
      border-radius: 6px;
    }

    .message-text {
      margin: 0;
      color: #AAB6C3;
      font-size: 14px;
      line-height: 1.75;
      white-space: pre-wrap;
      word-break: break-word;
    }

    .footer {
      padding: 25px 30px;
      text-align: center;
      background-color: #0B1016;
      border-top: 1px solid #202A35;
    }

    .footer-text {
      margin: 0;
      color: #667482;
      font-size: 12px;
      line-height: 1.6;
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

          </td>
        </tr>

        <tr>
          <td class="content">

            <h1 class="title">
              New Contact Us Submission
            </h1>

            <p class="description">
              A new visitor has submitted a message through
              the KapsInfos Contact Us form.
            </p>

            <div class="details">

              <p class="label">
                Contact ID
              </p>

              <p class="value">
                ${contactId}
              </p>

              <p class="label">
                Name
              </p>

              <p class="value">
                ${name}
              </p>

              <p class="label">
                Email
              </p>

              <p class="value">
                ${email}
              </p>

              <p class="label">
                Subject
              </p>

              <p class="value">
                ${subject}
              </p>

            </div>

            <div class="message">

              <p class="label">
                Message
              </p>

              <p class="message-text">
                ${message}
              </p>

            </div>

          </td>
        </tr>

        <tr>
          <td class="footer">

            <p class="footer-text">
              KapsInfos Admin Notification
            </p>

            <p
              class="footer-text"
              style="margin-top: 8px;"
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

export default contactNotificationTemplate;