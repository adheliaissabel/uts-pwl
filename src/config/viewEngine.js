import ejs from "ejs";
import { readFile } from "fs/promises";

export const render = async (view, data = {}, c = null) => {
  const viewPath = `./src/views/${view}.ejs`;
  const viewTemplate = await readFile(viewPath, "utf-8");
  
  // Menambahkan default currentPath agar tidak error "not defined" [cite: 561]
  const mergedData = { 
    ...data, 
    currentPath: c ? c.req.path : (data.currentPath || "") 
  };

  const content = ejs.render(viewTemplate, mergedData);
  const layoutPath = `./src/views/layout.ejs`;
  const layoutTemplate = await readFile(layoutPath, "utf-8");

  return ejs.render(layoutTemplate, {
    ...mergedData,
    body: content,
  });
};