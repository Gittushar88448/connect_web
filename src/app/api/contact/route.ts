import { NextResponse } from "next/server";

import {
  contactSchema,
} from "@/lib/validations/contact";

import {
  createContact,
} from "@/services/contact";

import { sendEmail } from "@/helper/sendVerificationMail";
import contactSubmittedTemplate from "../../../../emails/contactSubmittedTemplate";
import contactNotificationTemplate from "../../../../emails/contactNotificationTemplate";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    success: true,
    message: "Contact endpoint is available.",
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          issues: parsed.error.flatten(),
        },
        {
          status: 400,
        }
      );
    }

    const contact = await createContact(parsed.data);

    /*
     * Send confirmation email to customer.
     */
    await sendEmail({
      to: parsed.data.email,
      subject: "We received your message — ConnectedHub",
      html: contactSubmittedTemplate({
        name: parsed.data.name,
        email: parsed.data.email,
        subject: parsed.data.subject,
        message: parsed.data.message,
      }),
    });

    const notificationEmail =
      process.env.EMAIL_USER;

    if (notificationEmail) {
      await sendEmail({
        to: notificationEmail,
        subject: `New Contact Us message: ${parsed.data.subject}`,
        html: contactNotificationTemplate({
          name: parsed.data.name,
          email: parsed.data.email,
          subject: parsed.data.subject,
          message: parsed.data.message,
          contactId: contact.id,
        }),
      });
    }

    return NextResponse.json(
      {
        success: true,
        message:
          "Your message has been submitted successfully.",
        contact,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "[api/contact] submission failed:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Something went wrong while submitting your message.",
      },
      {
        status: 500,
      }
    );
  }
}