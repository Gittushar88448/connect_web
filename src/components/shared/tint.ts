// Shared icon/tag tint styles used across module and service cards, kept to
// two brand accents plus a neutral so variety never drifts off-brand.
export const tintStyles = {
  teal: {
    icon: "bg-primary/10 text-primary",
    tag: "bg-primary/10 text-primary",
    hoverRing: "hover:ring-primary/20",
  },
  amber: {
    icon: "bg-brand-amber/15 text-brand-amber",
    tag: "bg-brand-amber/15 text-brand-amber",
    hoverRing: "hover:ring-brand-amber/25",
  },
  slate: {
    icon: "bg-secondary text-foreground/70",
    tag: "bg-secondary text-muted-foreground",
    hoverRing: "hover:ring-border",
  },
} as const;

export type Tint = keyof typeof tintStyles;
