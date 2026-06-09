import { readFileSync, writeFileSync } from "fs";

const configPath = ".vercel/output/config.json";
const config = JSON.parse(readFileSync(configPath, "utf8"));

config.routes = config.routes.map((route) => {
  if (route.dest === "/__server") {
    return { ...route, dest: "/server" };
  }
  return route;
});

writeFileSync(configPath, JSON.stringify(config, null, 2));
console.log("Fixed vercel config: /__server -> /server");