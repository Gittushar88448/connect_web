export interface CaseStudy {
  id: string;
  category: string;
  title: string;
  icon: string;
  challenge: string;
  solution: string;
  results: string[];
}

export const caseStudies: CaseStudy[] = [
  {
    id: "incident-alerts",
    category: "IT / Infrastructure",
    title: "Incident Alert Automation",
    icon: "AlertTriangle",
    challenge:
      "Critical infrastructure alerts were going unnoticed for 30–90 minutes, causing repeated SLA breaches.",
    solution:
      "Our Notification and Workflow Automation modules now monitor alerts, page the on-call engineer across email, SMS, and voice, log acknowledgment, and open a priority ticket automatically.",
    results: [
      "Mean time to acknowledge: 45 min → 3 min",
      "SLA breach rate reduced by 78%",
      "On-call engineer fatigue significantly reduced",
    ],
  },
  {
    id: "hr-helpdesk",
    category: "HR / Enterprise",
    title: "Smart HR Helpdesk",
    icon: "Users",
    challenge:
      "The HR team was spending 60% of its time answering the same repetitive policy and process questions.",
    solution:
      "The HR Module paired with our AI Integration Module now answers policy questions, processes leave requests, and escalates complex issues to HR with full context attached.",
    results: [
      "HR query resolution time: 2 days → 4 minutes",
      "HR team bandwidth freed by 60%",
      "Employee satisfaction score up 34 points",
    ],
  },
  {
    id: "billing-reconciliation",
    category: "Finance / Operations",
    title: "Billing & Reconciliation Automation",
    icon: "Receipt",
    challenge:
      "Monthly invoice reconciliation across three systems took a two-person finance team nearly a full week.",
    solution:
      "The Billing & Invoicing Module now generates, sends, and reconciles invoices automatically against the accounting system, flagging only genuine mismatches for review.",
    results: [
      "Reconciliation time: 5 days → 4 hours",
      "Invoice errors reduced by 92%",
      "Finance team redeployed to higher-value work",
    ],
  },
];
