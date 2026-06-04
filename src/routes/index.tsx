import { createFileRoute, Link } from "@tanstack/react-router";
import { Layers, Sparkles } from "lucide-react";
import { z } from "zod";
import { SiteHeader } from "@/components/SiteHeader";
import { SearchForm } from "@/components/SearchForm";
import { RouteCard } from "@/components/RouteCard";
import { generateRoutes } from "@/lib/mock-routes";

const searchSchema = z.object({
  from: z.string().default("Pune"),
  to: z.string().default("Bangalore"),
  date: z.string().default(""),
});

export const Route = createFileRoute("/")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      {
        title:
          "TravelMix India — Find the best way to travel anywhere in India",
      },
      {
        name: "description",
        content:
          "Compare flights, trains, buses and carpools between any two Indian cities.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const { from, to, date } = Route.useSearch();
  const routes = generateRoutes(from, to);

  const cheapest = routes.find((r) => r.kind === "cheapest");
  const fastest = routes.find((r) => r.kind === "fastest");
  const recommended = routes.find((r) => r.kind === "recommended");
  const alternates = routes.filter((r) => r.kind === "alternate");

  const formattedDate = date
    ? new Date(date).toLocaleDateString("en-IN", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Any date";

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* HERO SECTION */}
      <section
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg,#0f172a 0%,#1e3a8a 50%,#2563eb 100%)",
        }}
      >
        <div className="container mx-auto px-4 pb-12 pt-16 md:pb-16 md:pt-24">
          <div className="mx-auto max-w-4xl text-center text-white">
            <span className="inline-flex items-center gap-2 rounded-full border border-yellow-300 bg-yellow-400 px-4 py-2 text-sm font-bold text-black">
              <Sparkles className="h-4 w-4" />
              India's Multimodal Travel Planner
            </span>

            <h1 className="mt-6 text-5xl font-black md:text-7xl">
              TravelMix India
            </h1>

            <p className="mt-4 text-xl font-semibold md:text-3xl">
              India's First Multimodal Travel Planner
            </p>

            <p className="mx-auto mt-4 max-w-3xl text-base text-white/90 md:text-lg">
              Compare Flights, Trains, Buses, Cabs, Carpool, Empty-Leg
              Charters and Ferry Flights in one place.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-5xl">
            <SearchForm />
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="mb-6 flex flex-wrap items-center gap-4">
          <h2 className="text-2xl font-bold md:text-3xl">
            {from} <span className="text-muted-foreground">→</span> {to}
          </h2>

          <span className="inline-flex items-center gap-2 rounded-full border border-yellow-300 bg-yellow-400 px-4 py-2 text-sm font-bold text-black">
            <Sparkles className="h-4 w-4" />
            Smart Travel Across India
          </span>

          <span className="text-sm text-muted-foreground">
            {formattedDate}
          </span>
        </div>

        <section>
          <h3 className="mb-4 text-lg font-semibold md:text-xl">
            Top picks for you
          </h3>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {recommended && <RouteCard route={recommended} highlight />}
            {cheapest && <RouteCard route={cheapest} />}
            {fastest && <RouteCard route={fastest} />}
          </div>
        </section>

        {alternates.length > 0 && (
          <section className="mt-12">
            <div className="mb-4 flex items-center gap-2">
              <Layers className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold md:text-xl">
                Alternate routes
              </h3>
              <span className="text-sm text-muted-foreground">
                ({alternates.length} options)
              </span>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {alternates.map((r) => (
                <RouteCard key={r.id} route={r} />
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className="border-t border-border">
        <div className="container mx-auto flex flex-col items-center justify-between gap-2 px-4 py-6 text-sm text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} TravelMix India</p>
          <p>
            Sample data shown for demo purposes.{" "}
            <Link to="/" className="underline">
              Reset
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}