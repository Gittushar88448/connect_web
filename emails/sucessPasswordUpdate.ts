const passwordUpdatedTemplate = (firstName?: string) => {
  const currentYear = new Date().getFullYear();

  return `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="x-apple-disable-message-reformatting" />

  <title>Your ConnectedHub Password Was Updated</title>

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
      text-align: center;
    }

    .success-icon {
      width: 62px;
      height: 62px;
      margin: 0 auto 22px;
      background-color: #142824;
      border: 1px solid #2B5A52;
      border-radius: 50%;
      line-height: 62px;
      font-size: 28px;
      font-weight: bold;
      color: #4FD1C5;
    }

    .title {
      margin: 0 0 18px;
      font-size: 26px;
      line-height: 1.3;
      color: #ffffff;
    }

    .description {
      margin: 0 auto;
      max-width: 465px;
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

    .security {
      margin-top: 30px;
      padding: 17px;
      background-color: #151D25;
      border-left: 3px solid #4FD1C5;
      border-radius: 6px;
      text-align: left;
    }

    .security-title {
      margin: 0 0 7px;
      font-size: 13px;
      font-weight: 700;
      color: #ffffff;
    }

    .security-text {
      margin: 0;
      font-size: 12px;
      line-height: 1.65;
      color: #8C9AA8;
    }

    .closing {
      margin: 28px auto 0;
      max-width: 440px;
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

      .highlight-box {
        margin: 25px auto;
      }
    }
  </style>
</head>

<body>

  <table class="wrapper" width="100%">
    <tr>
      <td align="center">

        <table class="container" width="100%">

          <!-- Header -->
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

          <!-- Main Content -->
          <tr>
            <td class="content">

              <!-- Success Icon -->
              <div class="success-icon">
                ✓
              </div>

              <!-- Title -->
              <h1 class="title">
                Password Updated Successfully
              </h1>

              <!-- Main Message -->
              <p class="description">

                ${
                  firstName
                    ? `Hello ${firstName},`
                    : "Hello,"
                }

                <br /><br />

                <strong
                  style="color: #ffffff;"
                >
                  A fresh password. A secure connection.
                  A smarter experience.
                </strong>

                <br /><br />

                Your ConnectedHub password has been successfully
                updated. Everything is set for you to continue
                exploring innovative IoT products, connected
                devices, and smarter possibilities.

              </p>

              <!-- Experience Highlight -->
              <div class="highlight-box">

                <p class="highlight-title">
                  You're All Set! 🚀
                </p>

                <p class="highlight-text">
                  Your account is secured with your new password.
                  Get back to discovering technology that makes
                  the world more connected, intelligent, and
                  effortless.
                </p>

              </div>

              <!-- Security Information -->
              <div class="security">

                <p class="security-title">
                  🔒 Didn't Change Your Password?
                </p>

                <p class="security-text">
                  If you did not make this change, please secure
                  your account immediately. We recommend changing
                  your password again and contacting ConnectedHub
                  support if you notice any suspicious activity.
                </p>

              </div>

              <!-- Closing -->
              <p class="closing">
                <strong>
                  Stay connected. Stay secure. Keep building smarter.
                </strong>
                <br /><br />
                We're excited to have you with us on the journey
                toward a more connected future.
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td class="footer">

              <div class="footer-brand">
                ConnectedHub
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

export default passwordUpdatedTemplate;
