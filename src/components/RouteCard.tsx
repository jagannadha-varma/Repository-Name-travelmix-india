import {
  Plane,
  TrainFront,
  Bus,
  Users,
  Ship,
  PlaneTakeoff,
  Clock,
  IndianRupee,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { RouteOption, TransportMode } from "@/lib/mock-routes";

export const modeIcons: Record<TransportMode, LucideIcon> = {
  flight: Plane,
  train: TrainFront,
  bus: Bus,
  carpool: Users,
  emptyleg: PlaneTakeoff,
  ferry: Ship,
};

const modeLabels: Record<TransportMode, string> = {
  flight: "Flight",
  train: "Train",
  bus: "Bus",
  carpool: "Carpool",
  emptyleg: "Empty Leg",
  ferry: "Ferry Flight",
};

const kindBadge: Record<
  RouteOption["kind"],
  { label: string; className: string }
> = {
  cheapest: {
    label: "Cheapest",
    className:
      "bg-[oklch(0.95_0.08_160)] text-[oklch(0.35_0.15_160)] border-[oklch(0.65_0.15_160)]",
  },
  fastest: {
    label: "Fastest",
    className:
      "bg-[oklch(0.96_0.1_60)] text-[oklch(0.4_0.17_60)] border-[oklch(0.75_0.17_60)]",
  },
  recommended: {
    label: "Recommended",
    className: "bg-primary text-primary-foreground border-primary",
  },
  alternate: {
    label: "Alternate",
    className: "bg-secondary text-secondary-foreground border-border",
  },
};

export function ModeChip({ mode }: { mode: TransportMode }) {
  const Icon = modeIcons[mode];

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-accent/60 px-2.5 py-1 text-xs font-medium text-foreground">
      <Icon className="h-3.5 w-3.5 text-primary" />
      {modeLabels[mode]}
    </span>
  );
}

export function RouteCard({
  route,
  highlight = false,
}: {
  route: RouteOption;
  highlight?: boolean;
}) {
  const badge = kindBadge[route.kind];

  return (
    <article
      className={cn(
        "group flex h-full flex-col rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)] transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[var(--shadow-soft)]",
        highlight && "ring-2 ring-primary/40"
      )}
    >
      <header className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <Badge variant="outline" className={cn("border", badge.className)}>
            {badge.label}
          </Badge>

          <h3 className="mt-2 text-lg font-bold text-foreground">
            {route.title}
          </h3>
        </div>

        <div className="flex flex-wrap justify-end gap-1.5">
          {route.modes.map((m) => (
            <ModeChip key={m} mode={m} />
          ))}
        </div>
      </header>

      <p className="mt-3 text-sm text-muted-foreground">
        {route.summary}
      </p>

      <div className="mt-4 grid grid-cols-2 gap-3 rounded-xl bg-secondary/40 p-3">
        <div>
          <div className="flex items-center gap-1 text-xs uppercase tracking-wide text-muted-foreground">
            <IndianRupee className="h-3 w-3" />
            Total Cost
          </div>

          <div className="mt-1 flex items-baseline text-foreground">
            <IndianRupee className="h-4 w-4" />
            <span className="text-xl font-bold">
              {route.price.toLocaleString("en-IN")}
            </span>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-1 text-xs uppercase tracking-wide text-muted-foreground">
            <Clock className="h-3 w-3" />
            Travel Time
          </div>

          <div className="mt-1 text-xl font-bold text-foreground">
            {route.duration}
          </div>
        </div>
      </div>

      <div className="mt-4 flex-1">
        <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Route Summary
        </div>

        <ol className="space-y-2">
          {route.segments.map((seg, i) => {
            const Icon = modeIcons[seg.mode];

            return (
              <li
                key={i}
                className="flex items-start gap-3 rounded-lg border border-border/60 bg-background p-2.5"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-accent text-primary">
                  <Icon className="h-4 w-4" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-1 text-sm font-medium text-foreground">
                    <span className="truncate">{seg.from}</span>

                    <ArrowRight className="h-3 w-3 text-muted-foreground" />

                    <span className="truncate">{seg.to}</span>
                  </div>

                  <div className="mt-0.5 text-xs text-muted-foreground">
                    {seg.operator} · {seg.duration}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="mt-4 border-t border-border pt-4">
        <Button size="sm" className="w-full">
          Book this Route
        </Button>
      </div>
    </article>
  );
}