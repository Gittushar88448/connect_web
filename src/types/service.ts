export interface CustomSolutionRequestInput {
  projectTitle: string;
  industry: string;
  problemDescription: string;
  technicalRequirements: string;
  integrationRequirements: string[];
  expectedScale: string;
  budgetRange: string;
  timeline: string;
  additionalRequirements?: string;
  contactEmail: string;
  contactName: string;
}

export interface SolutionCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface ServiceDomain {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  href?: string;
  tag: string;
  color: "teal" | "amber" | "slate";
  capabilities: string[];
}

export interface SoftwareModule {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  tag: string;
  color: "teal" | "amber" | "slate";
  features: string[];
}
