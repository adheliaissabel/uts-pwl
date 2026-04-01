import { render } from "../config/viewEngine";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const home = async (c) => {
  const totalMhs = await prisma.mahasiswa.count();
  const mahasiswa = await prisma.mahasiswa.findMany();

  const html = await render("home", {
    title: "Dashboard Bun MVC",
    message: "Hello dari Bun + Tailwind 🚀",
    totalMhs: totalMhs,
    mahasiswa: mahasiswa,
  }, c);

  return c.html(html);
};