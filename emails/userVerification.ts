import React from "react";

const otpTemplate = (otp: string, firstName?: string) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="x-apple-disable-message-reformatting" />
  <title>Verify Your Connected Hub Account</title>

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

    .otp-wrapper {
      margin: 30px auto;
      padding: 24px 20px;
      max-width: 360px;
      background-color: #0B1016;
      border: 1px solid #2A3947;
      border-radius: 12px;
    }

    .otp-label {
      margin-bottom: 10px;
      font-size: 11px;
      font-weight: 700;
      color: #71808F;
      letter-spacing: 2px;
      text-transform: uppercase;
    }

    .otp {
      font-size: 34px;
      font-weight: 700;
      letter-spacing: 10px;
      color: #4FD1C5;
      padding-left: 10px;
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

      .otp {
        font-size: 28px;
        letter-spacing: 7px;
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

              <div class="icon">
                🔐
              </div>

              <h1 class="title">
                Verify Your Connected Hub Account
              </h1>

              <p class="description">
                ${
                  firstName
                    ? `Hello ${firstName},`
                    : "Hello,"
                }
                <br /><br />

                We received a request to verify your Connected Hub account.
                At Connected Hub, we bring smart devices, intelligent systems,
                and innovative IoT solutions together in one place.
                Verify your account below and take the first step toward
                discovering a smarter, more connected world.

                Use the secure verification code below to continue.
              </p>

              <!-- OTP -->
              <div class="otp-wrapper">

                <div class="otp-label">
                  Verification Code
                </div>

                <div class="otp">
                  ${otp}
                </div>

                <div class="validity">
                  This code expires in <strong>5 minutes</strong>.
                </div>

              </div>

              <!-- Security Information -->
              <div class="security">

                <p class="security-title">
                  🔒 Security Notice
                </p>

                <p class="security-text">
                  Never share this verification code with anyone.
                  Connected Hub support will never ask you for your OTP,
                  password, or other security credentials.
                </p>

              </div>

              <p class="description" style="margin-top: 25px;">
                If you did not request this verification code,
                you can safely ignore this email.
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

              <p class="footer-text" style="margin-top: 10px;">
                © ${new Date().getFullYear()} Connected Hub. All rights reserved.
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

export default otpTemplate;