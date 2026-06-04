import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { format } from "date-fns";
import { ArrowRightLeft, CalendarIcon, MapPin, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { popularCities } from "@/lib/mock-routes";

export function SearchForm({ compact = false }: { compact?: boolean }) {
  const navigate = useNavigate();
  const [from, setFrom] = useState("Pune");
  const [to, setTo] = useState("Bangalore");
  const [date, setDate] = useState<Date | undefined>(new Date());

  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!from.trim() || !to.trim()) return;
    navigate({
      to: "/",
      search: {
        from: from.trim(),
        to: to.trim(),
        date: date ? format(date, "yyyy-MM-dd") : "",
      },
    });
  };

  return (
    <form
      onSubmit={onSubmit}
      className={cn(
        "rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-soft)] md:p-6",
        compact && "p-3 md:p-4",
      )}
    >
      <div className="grid gap-3 md:grid-cols-[1fr_auto_1fr_1fr_auto] md:items-end md:gap-2">
        <div>
          <Label className="text-xs text-muted-foreground">From</Label>
          <div className="relative mt-1">
            <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              list="cities"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              placeholder="Source city"
              className="h-12 pl-9"
              required
            />
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={swap}
          className="hidden h-10 w-10 self-end md:inline-flex"
          aria-label="Swap"
        >
          <ArrowRightLeft className="h-4 w-4" />
        </Button>

        <div>
          <Label className="text-xs text-muted-foreground">To</Label>
          <div className="relative mt-1">
            <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              list="cities"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="Destination city"
              className="h-12 pl-9"
              required
            />
          </div>
        </div>

        <div>
          <Label className="text-xs text-muted-foreground">Travel date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="outline"
                className={cn(
                  "mt-1 h-12 w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
        </div>

        <Button type="submit" size="lg" className="h-12 md:h-12">
          <Search className="mr-2 h-4 w-4" /> Search
        </Button>
      </div>

      <datalist id="cities">
        {popularCities.map((c) => (
          <option key={c} value={c} />
        ))}
      </datalist>
    </form>
  );
}
