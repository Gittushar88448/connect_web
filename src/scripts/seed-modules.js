// npm run seed:modules
import mongoose from "mongoose";
import dbConnect from "../lib/dbConnect"
const ModuleSchema = new mongoose.Schema(
  {
    name: String,
    slug: { type: String, unique: true },
    tagline: String,
    description: String,
    icon: String,
    tag: String,
    color: { type: String, enum: ["teal", "amber", "slate"] },
    features: [String],
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const ModuleModel = mongoose.models.Module || mongoose.model("Module", ModuleSchema);

const seedModules = [
  {
    name: "CRM Module",
    slug: "crm",
    tagline: "Pipeline, contacts, and deal tracking, ready to deploy",
    description:
      "A complete customer relationship management module — leads, pipeline stages, contact history, and reporting — that integrates into your existing stack.",
    icon: "Users",
    tag: "Live in days",
    color: "teal",
    order: 1,
    features: [
      "Lead & deal pipeline with custom stages",
      "Contact and account history in one view",
      "Role-based access for sales teams",
      "REST API for integration with your other systems",
    ],
  },
  {
    name: "HR Module",
    slug: "hr",
    tagline: "Onboarding, attendance, and records in one place",
    description:
      "Employee records, onboarding workflows, attendance, and leave management — built to plug into your internal tools without a lengthy rollout.",
    icon: "Contact",
    tag: "Payroll-ready exports",
    color: "amber",
    order: 2,
    features: [
      "Employee onboarding and document workflows",
      "Attendance and leave tracking",
      "Org chart and role management",
      "Exportable reports for payroll systems",
    ],
  },
  {
    name: "Notification Service Module",
    slug: "notifications",
    tagline: "Email, SMS, and push, from one unified service",
    description:
      "A single notification service handling email, SMS, and push delivery with templating, retries, and delivery tracking — so your team stops maintaining three separate integrations.",
    icon: "BellRing",
    tag: "One SDK, three channels",
    color: "slate",
    order: 3,
    features: [
      "Unified email, SMS, and push delivery",
      "Templating with per-channel fallback rules",
      "Delivery tracking and retry handling",
      "Drop-in SDK for your existing backend",
    ],
  },
  {
    name: "AI Integration Module",
    slug: "ai-integration-module",
    tagline: "Summarization, search, and automation on your data",
    description:
      "Adds AI-assisted summarization, semantic search, and workflow automation on top of your existing data sources, with human review built into the workflow.",
    icon: "BrainCircuit",
    tag: "Human-in-the-loop",
    color: "teal",
    order: 4,
    features: [
      "Document and ticket summarization",
      "Semantic search over internal knowledge",
      "Automated triage and routing suggestions",
      "Human-in-the-loop review by default",
    ],
  },
  {
    name: "Inventory & Supply Chain Module",
    slug: "inventory",
    tagline: "Stock, purchase orders, and vendor tracking in sync",
    description:
      "Real-time stock levels, purchase orders, and vendor management across warehouses or branches — with low-stock alerts before they become a problem.",
    icon: "Package",
    tag: "Multi-warehouse ready",
    color: "amber",
    order: 5,
    features: [
      "Real-time stock levels across locations",
      "Purchase orders and vendor tracking",
      "Low-stock and reorder alerts",
      "Barcode / SKU lookup built in",
    ],
  },
  {
    name: "Billing & Invoicing Module",
    slug: "billing",
    tagline: "Recurring billing and invoices without the spreadsheet",
    description:
      "Generate, send, and track invoices, with support for recurring billing cycles, tax rules, and payment status — reconciled automatically against your accounting system.",
    icon: "Receipt",
    tag: "Recurring billing built in",
    color: "slate",
    order: 6,
    features: [
      "One-off and recurring invoice generation",
      "Configurable tax rules by region",
      "Payment status tracking and reminders",
      "Sync with common accounting tools",
    ],
  },
  {
    name: "Analytics & BI Dashboard Module",
    slug: "analytics",
    tagline: "One dashboard for the metrics leadership actually checks",
    description:
      "Pulls data from your existing systems into role-based dashboards — so leadership sees one number, not five spreadsheets that all disagree.",
    icon: "BarChart3",
    tag: "Role-based dashboards",
    color: "teal",
    order: 7,
    features: [
      "Role-based dashboards for leadership and teams",
      "Connects to your existing databases and APIs",
      "Scheduled report exports",
      "Custom KPI tracking by department",
    ],
  },
  {
    name: "Workflow Automation Module",
    slug: "workflow-automation",
    tagline: "Approvals and handoffs that run themselves",
    description:
      "Model multi-step approval chains and cross-team handoffs as configurable workflows, with audit trails, so nothing sits in someone's inbox for a week.",
    icon: "Workflow",
    tag: "No-code workflow builder",
    color: "amber",
    order: 8,
    features: [
      "Configurable multi-step approval chains",
      "Automatic handoffs between teams",
      "Full audit trail on every step",
      "No-code workflow builder",
    ],
  },
];

async function run() {
  await dbConnect();
  console.log("Connected. Seeding modules...");

  for (const data of seedModules) {
    await ModuleModel.findOneAndUpdate({ slug: data.slug }, data, {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    });
    console.log(`  ✓ ${data.name}`);
  }

  console.log(`Done. ${seedModules.length} modules seeded.`);
  await mongoose.disconnect();
}

run().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
