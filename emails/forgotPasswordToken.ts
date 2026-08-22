const forgotPasswordTemplate = (
  resetUrl: string,
  firstName?: string
) => {
  const currentYear = new Date().getFullYear();

  return `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="x-apple-disable-message-reformatting" />

  <title>Reset Your ConnectedHub Password</title>

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
      padding: 35px 40px 40px;
      text-align: center;
    }

    .icon {
      width: 58px;
      height: 58px;
      margin: 0 auto 22px;
      background-color: #16242A;
      border: 1px solid #29444A;
      border-radius: 50%;
      line-height: 58px;
      font-size: 26px;
    }

    .title {
      margin: 0 0 14px;
      font-size: 25px;
      line-height: 1.3;
      color: #ffffff;
    }

    .description {
      margin: 0 auto;
      max-width: 460px;
      font-size: 15px;
      line-height: 1.7;
      color: #AAB6C3;
    }

    .button-wrapper {
      margin: 32px auto;
      text-align: center;
    }

    .reset-button {
      display: inline-block;
      padding: 14px 30px;
      background-color: #4FD1C5;
      color: #0B1016 !important;
      text-decoration: none;
      border-radius: 8px;
      font-size: 15px;
      font-weight: 700;
      letter-spacing: 0.2px;
    }

    .link-box {
      margin: 25px auto 0;
      padding: 16px;
      max-width: 450px;
      background-color: #0B1016;
      border: 1px solid #2A3947;
      border-radius: 8px;
      text-align: left;
    }

    .link-label {
      margin-bottom: 8px;
      font-size: 11px;
      font-weight: 700;
      color: #71808F;
      letter-spacing: 1.5px;
      text-transform: uppercase;
    }

    .reset-link {
      word-break: break-all;
      font-size: 12px;
      line-height: 1.6;
      color: #4FD1C5;
      text-decoration: none;
    }

    .validity {
      margin-top: 12px;
      font-size: 12px;
      color: #71808F;
    }

    .security {
      margin-top: 28px;
      padding: 16px;
      background-color: #151D25;
      border-left: 3px solid #4FD1C5;
      border-radius: 6px;
      text-align: left;
    }

    .security-title {
      margin: 0 0 6px;
      font-size: 13px;
      font-weight: 700;
      color: #ffffff;
    }

    .security-text {
      margin: 0;
      font-size: 12px;
      line-height: 1.6;
      color: #8C9AA8;
    }

    .footer {
      padding: 24px 30px;
      text-align: center;
      background-color: #0B1016;
      border-top: 1px solid #202A35;
    }

    .footer-text {
      margin: 0;
      font-size: 12px;
      line-height: 1.6;
      color: #667482;
    }

    .footer-brand {
      margin-bottom: 8px;
      font-size: 14px;
      font-weight: 700;
      color: #B8C3CE;
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

      .reset-button {
        display: block;
        padding: 14px 20px;
      }

      .link-box {
        max-width: 100%;
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

              <!-- Security Icon -->
              <div class="icon">
                🔐
              </div>


              <!-- Title -->
              <h1 class="title">
                Reset Your Password
              </h1>


              <!-- Description -->
              <p class="description">

                ${
                  firstName
                    ? `Hello ${firstName},`
                    : "Hello,"
                }

                <br /><br />

                We received a request to reset the password
                associated with your ConnectedHub account.

                Your connected world is waiting for you.
                Follow the secure link below to create a new password
                and get back to exploring smart devices,
                intelligent systems, and innovative IoT solutions.

              </p>


              <!-- Reset Button -->
              <div class="button-wrapper">

                <a
                  href="${resetUrl}"
                  class="reset-button"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Reset My Password
                </a>

              </div>


              <!-- Reset URL -->
              <div class="link-box">

                <div class="link-label">
                  Secure Reset Link
                </div>

                <a
                  href="${resetUrl}"
                  class="reset-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ${resetUrl}
                </a>

                <div class="validity">
                  This password reset link is valid for
                  <strong>15 minutes</strong>.
                </div>

              </div>


              <!-- Security Information -->
              <div class="security">

                <p class="security-title">
                  🔒 Keep Your Account Secure
                </p>

                <p class="security-text">

                  This password reset link is private and intended
                  only for you. Never share it with anyone.

                  ConnectedHub support will never ask you for your
                  password or password-reset link.

                </p>

              </div>


              <!-- Ignore Message -->
              <p
                class="description"
                style="margin-top: 25px;"
              >

                If you didn't request a password reset,
                you can safely ignore this email.

                Your account remains secure and no changes
                will be made.

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

export default forgotPasswordTemplate;