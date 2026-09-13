import type { SolutionCategory } from "@/types/service";

// Top-level service domains — shown on the homepage rail and the /services page.
export const serviceDomains = [
  {
    id: "software-development",
    slug: "software-development",
    name: "Software Development",
    description: "Custom web, mobile, and backend systems built around your workflow.",
    icon: "Code2",
    tag: "Full-stack",
    color: "teal" as const,
    capabilities: [
      "Web applications and internal tools",
      "Mobile apps for iOS and Android",
      "API design and backend engineering",
      "Legacy system modernization",
    ],
  },
  {
    id: "iot-services",
    slug: "iot-services",
    name: "IoT Services",
    description: "Device connectivity, edge integration, and fleet management software.",
    icon: "Radio",
    tag: "Edge to cloud",
    color: "amber" as const,
    capabilities: [
      "Device connectivity and protocol bridging",
      "Fleet management dashboards",
      "Edge-to-cloud data pipelines",
      "Firmware and integration support",
    ],
  },
  {
    id: "help-desk",
    slug: "help-desk",
    name: "Help Desk Services",
    description: "Managed support desks and ticketing workflows for your customers or staff.",
    icon: "Headset",
    tag: "SLA-backed",
    color: "slate" as const,
    capabilities: [
      "Ticketing and escalation workflows",
      "Managed support desk staffing",
      "SLA-backed response times",
      "Knowledge base and self-service setup",
    ],
  },
  {
    id: "prebuilt-modules",
    slug: "prebuilt-modules",
    name: "Prebuilt Automation Modules",
    description: "Drop-in CRM, HR, notification, and AI modules that deploy in days, not months.",
    icon: "Blocks",
    href: "/modules",
    tag: "Live in days",
    color: "teal" as const,
    capabilities: [
      "CRM, HR, and notification modules",
      "AI integration module",
      "REST APIs for your existing stack",
      "Deployed in days, not months",
    ],
  },
  {
    id: "ai-integration",
    slug: "ai-integration",
    name: "AI Integration",
    description: "Add AI-assisted workflows, summarization, and automation to existing systems.",
    icon: "Sparkles",
    tag: "Human-in-the-loop",
    color: "amber" as const,
    capabilities: [
      "Document and ticket summarization",
      "Semantic search over internal data",
      "Workflow automation with human review",
      "Integration with your existing AI provider or ours",
    ],
  },
  {
    id: "blockchain",
    slug: "blockchain",
    name: "Blockchain Development",
    description: "Smart contracts, DeFi platforms, NFT marketplaces, and blockchain integrations.",
    icon: "Link2",
    tag: "Web3 ready",
    color: "slate" as const,
    capabilities: [
      "Smart contract development & audits",
      "DeFi platforms and token systems",
      "NFT marketplaces and minting infrastructure",
      "Blockchain integration with existing backends",
    ],
  },
  {
    id: "custom-development",
    slug: "custom-development",
    name: "Custom Development",
    description: "Bespoke software engineered end-to-end around a requirement of your own.",
    icon: "Wrench",
    href: "/custom-solutions",
    tag: "Named engineer",
    color: "slate" as const,
    capabilities: [
      "Requirements scoping and prototyping",
      "Full-stack build and deployment",
      "Pilot rollout before full scale",
      "Ongoing support as your engineering partner",
    ],
  },
];

// Prebuilt software modules — shown on the homepage showcase and the /modules page.
export const modules = [
  {
    id: "crm",
    slug: "crm",
    name: "CRM Module",
    tagline: "Pipeline, contacts, and deal tracking, ready to deploy",
    description:
      "A complete customer relationship management module — leads, pipeline stages, contact history, and reporting — that integrates into your existing stack.",
    icon: "Users",
    tag: "Live in days",
    color: "teal" as const,
    features: [
      "Lead & deal pipeline with custom stages",
      "Contact and account history in one view",
      "Role-based access for sales teams",
      "REST API for integration with your other systems",
    ],
  },
  {
    id: "hr",
    slug: "hr",
    name: "HR Module",
    tagline: "Onboarding, attendance, and records in one place",
    description:
      "Employee records, onboarding workflows, attendance, and leave management — built to plug into your internal tools without a lengthy rollout.",
    icon: "Contact",
    tag: "Payroll-ready exports",
    color: "amber" as const,
    features: [
      "Employee onboarding and document workflows",
      "Attendance and leave tracking",
      "Org chart and role management",
      "Exportable reports for payroll systems",
    ],
  },
  {
    id: "notifications",
    slug: "notifications",
    name: "Notification Service Module",
    tagline: "Email, SMS, and push, from one unified service",
    description:
      "A single notification service handling email, SMS, and push delivery with templating, retries, and delivery tracking — so your team stops maintaining three separate integrations.",
    icon: "BellRing",
    tag: "One SDK, three channels",
    color: "slate" as const,
    features: [
      "Unified email, SMS, and push delivery",
      "Templating with per-channel fallback rules",
      "Delivery tracking and retry handling",
      "Drop-in SDK for your existing backend",
    ],
  },
  {
    id: "ai-integration-module",
    slug: "ai-integration-module",
    name: "AI Integration Module",
    tagline: "Summarization, search, and automation on your data",
    description:
      "Adds AI-assisted summarization, semantic search, and workflow automation on top of your existing data sources, with human review built into the workflow.",
    icon: "BrainCircuit",
    tag: "Human-in-the-loop",
    color: "teal" as const,
    features: [
      "Document and ticket summarization",
      "Semantic search over internal knowledge",
      "Automated triage and routing suggestions",
      "Human-in-the-loop review by default",
    ],
  },
  {
    id: "inventory",
    slug: "inventory",
    name: "Inventory & Supply Chain Module",
    tagline: "Stock, purchase orders, and vendor tracking in sync",
    description:
      "Real-time stock levels, purchase orders, and vendor management across warehouses or branches — with low-stock alerts before they become a problem.",
    icon: "Package",
    tag: "Multi-warehouse ready",
    color: "amber" as const,
    features: [
      "Real-time stock levels across locations",
      "Purchase orders and vendor tracking",
      "Low-stock and reorder alerts",
      "Barcode / SKU lookup built in",
    ],
  },
  {
    id: "billing",
    slug: "billing",
    name: "Billing & Invoicing Module",
    tagline: "Recurring billing and invoices without the spreadsheet",
    description:
      "Generate, send, and track invoices, with support for recurring billing cycles, tax rules, and payment status — reconciled automatically against your accounting system.",
    icon: "Receipt",
    tag: "Recurring billing built in",
    color: "slate" as const,
    features: [
      "One-off and recurring invoice generation",
      "Configurable tax rules by region",
      "Payment status tracking and reminders",
      "Sync with common accounting tools",
    ],
  },
  {
    id: "analytics",
    slug: "analytics",
    name: "Analytics & BI Dashboard Module",
    tagline: "One dashboard for the metrics leadership actually checks",
    description:
      "Pulls data from your existing systems into role-based dashboards — so leadership sees one number, not five spreadsheets that all disagree.",
    icon: "BarChart3",
    tag: "Role-based dashboards",
    color: "teal" as const,
    features: [
      "Role-based dashboards for leadership and teams",
      "Connects to your existing databases and APIs",
      "Scheduled report exports",
      "Custom KPI tracking by department",
    ],
  },
  {
    id: "workflow-automation",
    slug: "workflow-automation",
    name: "Workflow Automation Module",
    tagline: "Approvals and handoffs that run themselves",
    description:
      "Model multi-step approval chains and cross-team handoffs as configurable workflows, with audit trails, so nothing sits in someone's inbox for a week.",
    icon: "Workflow",
    tag: "No-code workflow builder",
    color: "amber" as const,
    features: [
      "Configurable multi-step approval chains",
      "Automatic handoffs between teams",
      "Full audit trail on every step",
      "No-code workflow builder",
    ],
  },
];

export const solutionCategories: SolutionCategory[] = [
  {
    id: "software",
    title: "Custom software development",
    description:
      "Web apps, backend systems, and internal tools engineered around your exact workflow.",
    icon: "Code2",
  },
  {
    id: "iot",
    title: "IoT services & integration",
    description:
      "Device connectivity, edge software, and fleet management for connected products.",
    icon: "Radio",
  },
  {
    id: "help-desk",
    title: "Help desk & support systems",
    description:
      "Managed ticketing, escalation workflows, and support desks for internal or customer use.",
    icon: "Headset",
  },
  {
    id: "ai",
    title: "AI-powered automation",
    description:
      "AI-assisted workflows layered onto systems you already run, with human oversight built in.",
    icon: "Sparkles",
  },
];

export const processSteps = [
  {
    title: "Consultation",
    description:
      "A senior engineer reviews your requirements and scopes feasibility within 2 business days.",
  },
  {
    title: "Prototype",
    description:
      "We build a working prototype against your spec, typically in 2–4 weeks.",
  },
  {
    title: "Pilot rollout",
    description:
      "A limited rollout validates the system with real users before full deployment.",
  },
  {
    title: "Deployment & support",
    description:
      "We deploy at full scale and stay on as your engineering partner, not a one-time vendor.",
  },
];

export const industryOptions = [
  "Software / SaaS",
  "Real estate & property management",
  "Energy & utilities",
  "Logistics & fleet",
  "Retail & e-commerce",
  "Manufacturing",
  "Healthcare",
  "Financial services",
  "Other",
];

export const integrationOptions = [
  "REST / GraphQL API",
  "Webhooks",
  "Cloud (AWS / Azure / GCP)",
  "On-premise deployment",
  "Mobile app (iOS / Android)",
  "Existing CRM / ERP",
];

export const scaleOptions = [
  "Pilot (under 50 users)",
  "50–500 users",
  "500–5,000 users",
  "5,000+ users",
];

export const budgetOptions = [
  "Under ₹5,00,000",
  "₹5,00,000 – ₹20,00,000",
  "₹20,00,000 – ₹1,00,00,000",
  "₹1,00,00,000+",
  "Not sure yet",
];

export const timelineOptions = [
  "Less than 1 month",
  "1–3 months",
  "3–6 months",
  "6+ months",
];
