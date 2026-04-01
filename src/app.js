import { Hono } from "hono";
import router from "./routes/web";
import { serveStatic } from "hono/bun";

const app = new Hono();

// ✅ PINDAH KE ATAS — harus sebelum route
app.use("*", async (c, next) => {
  c.set("currentPath", c.req.path);
  await next();
});

// Static file CSS
app.use("/css/*", serveStatic({ root: "./src/public" }));

// Routes
app.route("/", router);

export default {
  port: 3000,
  fetch: app.fetch,
};