import { Hono } from "hono";
import router from "./routes/web";
import { serveStatic } from "hono/bun";

const app = new Hono();

app.use("/css/*", async (c, next) => {
  const res = await serveStatic({ root: "./src/public" })(c, next);
  if (res && res.headers && c.req.path.endsWith(".css")) {
    res.headers.set("Content-Type", "text/css");
  }
  return res;
});

// routes
app.route("/", router);

// middleware untuk set currentPath agar bisa digunakan di layout.ejs untuk active menu
app.use("*", async (c, next) => {
  c.set("currentPath", c.req.path);
  await next();
});

export default {
  port: 3000,
  fetch: app.fetch,
};