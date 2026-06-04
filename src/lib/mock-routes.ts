export type TransportMode =
  | "flight"
  | "train"
  | "bus"
  | "carpool"
  | "emptyleg"
  | "ferry";

export interface RouteSegment {
  mode: TransportMode;
  operator: string;
  from: string;
  to: string;
  duration: string;
}

export interface RouteOption {
  id: string;
  kind: "cheapest" | "fastest" | "recommended" | "alternate";
  title: string;
  summary: string;
  price: number;
  duration: string;
  durationMins: number;
  modes: TransportMode[];
  segments: RouteSegment[];
}

export const popularCities = [
  "Mumbai",
  "Delhi",
  "Bengaluru",
  "Chennai",
  "Kolkata",
  "Hyderabad",
  "Pune",
  "Ahmedabad",
  "Jaipur",
  "Goa",
  "Kochi",
  "Lucknow",
  "Chandigarh",
  "Indore",
  "Bhopal",
  "Varanasi",
  "Agra",
  "Udaipur",
];

function fmtDuration(mins: number) {
  const h = Math.floor(mins / 60);
  const m = mins % 60;

  return m === 0 ? `${h}h` : `${h}h ${m}m`;
}

export function generateRoutes(from: string, to: string): RouteOption[] {
  const seed = (from.length + to.length) || 8;

  const f = from || "Source";
  const t = to || "Destination";

  const mid = "Nagpur";
  const mid2 = "Vadodara";

  return [
    {
      id: "cheapest",
      kind: "cheapest",
      title: "Cheapest Route",
      summary: `Budget-friendly mix of bus and carpool from ${f} to ${t}.`,
      price: 1199 + seed * 3,
      duration: fmtDuration(1080),
      durationMins: 1080,
      modes: ["bus", "carpool"],
      segments: [
        {
          mode: "bus",
          operator: "VRL Travels",
          from: f,
          to: mid,
          duration: "12h",
        },
        {
          mode: "carpool",
          operator: "BlaBlaCar",
          from: mid,
          to: t,
          duration: "6h",
        },
      ],
    },

    {
      id: "fastest",
      kind: "fastest",
      title: "Fastest Route",
      summary: `Direct flight from ${f} to ${t}.`,
      price: 6299 + seed * 25,
      duration: fmtDuration(150),
      durationMins: 150,
      modes: ["flight"],
      segments: [
        {
          mode: "flight",
          operator: "Vistara",
          from: f,
          to: t,
          duration: "2h 30m",
        },
      ],
    },

    {
      id: "recommended",
      kind: "recommended",
      title: "Recommended Route",
      summary: `Best balance of price and travel time.`,
      price: 2499 + seed * 8,
      duration: fmtDuration(540),
      durationMins: 540,
      modes: ["train", "carpool"],
      segments: [
        {
          mode: "train",
          operator: "Rajdhani Express",
          from: f,
          to: mid2,
          duration: "8h",
        },
        {
          mode: "carpool",
          operator: "Quick Ride",
          from: mid2,
          to: t,
          duration: "1h",
        },
      ],
    },

    {
      id: "alt-1",
      kind: "alternate",
      title: "Flight + Carpool",
      summary: `Fly and then carpool to destination.`,
      price: 4899 + seed * 15,
      duration: fmtDuration(255),
      durationMins: 255,
      modes: ["flight", "carpool"],
      segments: [
        {
          mode: "flight",
          operator: "IndiGo",
          from: f,
          to: mid2,
          duration: "2h 45m",
        },
        {
          mode: "carpool",
          operator: "Ola Outstation",
          from: mid2,
          to: t,
          duration: "1h 30m",
        },
      ],
    },

    {
      id: "alt-2",
      kind: "alternate",
      title: "Train + Bus",
      summary: `Overnight train and AC bus.`,
      price: 1850 + seed * 5,
      duration: fmtDuration(900),
      durationMins: 900,
      modes: ["train", "bus"],
      segments: [
        {
          mode: "train",
          operator: "Shatabdi Express",
          from: f,
          to: mid,
          duration: "9h",
        },
        {
          mode: "bus",
          operator: "RedBus Volvo",
          from: mid,
          to: t,
          duration: "6h",
        },
      ],
    },

    {
      id: "alt-3",
      kind: "alternate",
      title: "Direct Bus",
      summary: `Long-haul sleeper bus.`,
      price: 1599 + seed * 4,
      duration: fmtDuration(990),
      durationMins: 990,
      modes: ["bus"],
      segments: [
        {
          mode: "bus",
          operator: "Orange Travels",
          from: f,
          to: t,
          duration: "16h 30m",
        },
      ],
    },

    {
      id: "empty-leg",
      kind: "alternate",
      title: "Empty Leg Charter Flight",
      summary: `Discounted private jet repositioning flight available on this route.`,
      price: 18999 + seed * 50,
      duration: fmtDuration(120),
      durationMins: 120,
      modes: ["emptyleg"],
      segments: [
        {
          mode: "emptyleg",
          operator: "JetSet Charter",
          from: f,
          to: t,
          duration: "2h",
        },
      ],
    },

    {
      id: "ferry-flight",
      kind: "alternate",
      title: "Ferry Flight Charter",
      summary: `Aircraft repositioning flight with limited passenger availability.`,
      price: 24999 + seed * 60,
      duration: fmtDuration(135),
      durationMins: 135,
      modes: ["ferry"],
      segments: [
        {
          mode: "ferry",
          operator: "Sky Ferry Aviation",
          from: f,
          to: t,
          duration: "2h 15m",
        },
      ],
    },
  ];
}