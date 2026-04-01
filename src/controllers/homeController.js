import { render } from "../config/viewEngine";
import { PrismaClient } from "@prisma/client"; // Tambahkan ini

const prisma = new PrismaClient(); // Inisialisasi Prisma

export const home = async (c) => {
  // 1. Ambil jumlah total mahasiswa dari database MySQL
  const totalMhs = await prisma.mahasiswa.count();

  // 2. Kirim totalMhs ke dalam file EJS
  const html = await render("home", {
    title: "Dashboard Bun MVC",
    message: "Hello dari Bun + Tailwind 🚀",
    totalMhs: totalMhs, // Pastikan nama variabel sesuai dengan di EJS
  }, c); // Tambahkan 'c' di sini jika viewEngine memerlukannya

  return c.html(html);
};