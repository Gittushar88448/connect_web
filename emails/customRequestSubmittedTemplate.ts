interface CustomRequestSubmittedTemplateData {
    name: string;
    email: string;
    projectTitle: string;
    industry: string;
    expectedScale: string;
    budgetRange: string;
    timeline: string;
    integrationRequirements: string[];
}

function escapeHtml(value: string): string {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

export default function customRequestSubmittedTemplate({
    name,
    email,
    projectTitle,
    industry,
    expectedScale,
    budgetRange,
    timeline,
    integrationRequirements,
}: CustomRequestSubmittedTemplateData): string {
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeProjectTitle = escapeHtml(projectTitle);
    const safeIndustry = escapeHtml(industry);
    const safeExpectedScale = escapeHtml(expectedScale);
    const safeBudgetRange = escapeHtml(budgetRange);
    const safeTimeline = escapeHtml(timeline);

    const integrationHtml =
        integrationRequirements.length > 0
            ? integrationRequirements
                .map(
                    (item) => `
              <tr>
                <td
                  style="
                    padding: 5px 0;
                    color: #AAB6C3;
                    font-size: 14px;
                    line-height: 20px;
                  "
                >
                  <span
                    style="
                      display: inline-block;
                      width: 6px;
                      height: 6px;
                      margin-right: 8px;
                      border-radius: 50%;
                      background-color: #4FD1C5;
                      vertical-align: middle;
                    "
                  ></span>
                  ${escapeHtml(item)}
                </td>
              </tr>
            `
                )
                .join("")
            : `
          <tr>
            <td
              style="
                padding: 5px 0;
                color: #667482;
                font-size: 14px;
              "
            >
              No integrations specified
            </td>
          </tr>
        `;

    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />
  <meta name="color-scheme" content="dark" />
  <meta name="supported-color-schemes" content="dark" />

  <title>Custom Solution Request Received</title>
</head>

<body
  style="
    margin: 0;
    padding: 0;
    background-color: #0B1016;
    font-family:
      -apple-system,
      BlinkMacSystemFont,
      'Segoe UI',
      Roboto,
      Helvetica,
      Arial,
      sans-serif;
  "
>
  <table
    width="100%"
    cellpadding="0"
    cellspacing="0"
    border="0"
    style="background-color: #0B1016;"
  >
    <tr>
      <td align="center" style="padding: 40px 16px;">
        <table
          width="100%"
          cellpadding="0"
          cellspacing="0"
          border="0"
          style="
            max-width: 620px;
            background-color: #111820;
            border: 1px solid #202A35;
            border-radius: 12px;
            overflow: hidden;
          "
        >
          <!-- Header -->
          <tr>
            <td
              style="
                padding: 32px 32px 24px;
                border-bottom: 1px solid #202A35;
              "
            >
              <div
                style="
                  font-size: 13px;
                  font-weight: 700;
                  letter-spacing: 0.14em;
                  text-transform: uppercase;
                  color: #4FD1C5;
                "
              >
                Kapsinfos
              </div>

              <h1
                style="
                  margin: 14px 0 8px;
                  color: #ffffff;
                  font-size: 26px;
                  line-height: 34px;
                  font-weight: 700;
                "
              >
                Request received
              </h1>

              <p
                style="
                  margin: 0;
                  color: #8C9AA8;
                  font-size: 14px;
                  line-height: 22px;
                "
              >
                Thank you for sharing your custom solution requirements
                with our team.
              </p>
            </td>
          </tr>

          <!-- Success message -->
          <tr>
            <td style="padding: 28px 32px 8px;">
              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
                style="
                  background-color: rgba(79, 209, 197, 0.07);
                  border: 1px solid rgba(79, 209, 197, 0.2);
                  border-radius: 10px;
                "
              >
                <tr>
                  <td style="padding: 16px;">
                    <div
                      style="
                        color: #4FD1C5;
                        font-size: 14px;
                        font-weight: 700;
                      "
                    >
                      ✓ Successfully submitted
                    </div>

                    <p
                      style="
                        margin: 7px 0 0;
                        color: #AAB6C3;
                        font-size: 13px;
                        line-height: 20px;
                      "
                    >
                      Hi ${safeName}, your custom solution request
                      has been successfully received.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Request details -->
          <tr>
            <td style="padding: 24px 32px 8px;">
              <h2
                style="
                  margin: 0 0 16px;
                  color: #ffffff;
                  font-size: 16px;
                  line-height: 24px;
                  font-weight: 600;
                "
              >
                Request details
              </h2>

              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
              >
                <tr>
                  <td
                    style="
                      padding: 8px 0;
                      color: #667482;
                      font-size: 12px;
                      width: 42%;
                    "
                  >
                    Project
                  </td>

                  <td
                    style="
                      padding: 8px 0;
                      color: #ffffff;
                      font-size: 14px;
                    "
                  >
                    ${safeProjectTitle}
                  </td>
                </tr>

                <tr>
                  <td
                    style="
                      padding: 8px 0;
                      color: #667482;
                      font-size: 12px;
                    "
                  >
                    Email
                  </td>

                  <td
                    style="
                      padding: 8px 0;
                      color: #AAB6C3;
                      font-size: 14px;
                    "
                  >
                    ${safeEmail}
                  </td>
                </tr>

                <tr>
                  <td
                    style="
                      padding: 8px 0;
                      color: #667482;
                      font-size: 12px;
                    "
                  >
                    Industry
                  </td>

                  <td
                    style="
                      padding: 8px 0;
                      color: #AAB6C3;
                      font-size: 14px;
                    "
                  >
                    ${safeIndustry || "Not specified"}
                  </td>
                </tr>

                <tr>
                  <td
                    style="
                      padding: 8px 0;
                      color: #667482;
                      font-size: 12px;
                    "
                  >
                    Expected scale
                  </td>

                  <td
                    style="
                      padding: 8px 0;
                      color: #AAB6C3;
                      font-size: 14px;
                    "
                  >
                    ${safeExpectedScale || "Not specified"}
                  </td>
                </tr>

                <tr>
                  <td
                    style="
                      padding: 8px 0;
                      color: #667482;
                      font-size: 12px;
                    "
                  >
                    Budget
                  </td>

                  <td
                    style="
                      padding: 8px 0;
                      color: #AAB6C3;
                      font-size: 14px;
                    "
                  >
                    ${safeBudgetRange || "Not specified"}
                  </td>
                </tr>

                <tr>
                  <td
                    style="
                      padding: 8px 0;
                      color: #667482;
                      font-size: 12px;
                    "
                  >
                    Timeline
                  </td>

                  <td
                    style="
                      padding: 8px 0;
                      color: #AAB6C3;
                      font-size: 14px;
                    "
                  >
                    ${safeTimeline || "Not specified"}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Integrations -->
          <tr>
            <td style="padding: 20px 32px 28px;">
              <h2
                style="
                  margin: 0 0 10px;
                  color: #ffffff;
                  font-size: 16px;
                  line-height: 24px;
                  font-weight: 600;
                "
              >
                Integration requirements
              </h2>

              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
              >
                ${integrationHtml}
              </table>
            </td>
          </tr>

          <!-- Footer message -->
          <tr>
            <td
              style="
                padding: 24px 32px;
                border-top: 1px solid #202A35;
              "
            >
              <p
                style="
                  margin: 0 0 8px;
                  color: #AAB6C3;
                  font-size: 13px;
                  line-height: 21px;
                "
              >
                Our team will review your requirements and get back
                to you with the next steps.
              </p>

              <p
                style="
                  margin: 0;
                  color: #667482;
                  font-size: 12px;
                  line-height: 20px;
                "
              >
                Please keep this email for your records.
              </p>
            </td>
          </tr>

          <!-- Brand footer -->
          <tr>
            <td
              align="center"
              style="
                padding: 20px 32px 28px;
                border-top: 1px solid #202A35;
              "
            >
              <p
                style="
                  margin: 0;
                  color: #667482;
                  font-size: 11px;
                  line-height: 18px;
                "
              >
                © ${new Date().getFullYear()} Kapsinfos.
                All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}