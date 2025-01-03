import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import getWallpapers from "./modules/wallapaperProvider.js";
import "dotenv/config";
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

const getSearchResults = (query) => {

};


app.get("/", (req, res) => {
      const port = process.env.PORT;
      res.render("index.ejs",{port});
});

app.get("/home", (req, res) => {
      res.render("home.ejs");
});

app.get("/search", (req, res) => {
      const query = req.query.q;
      getWallpapers(query).then(wallpaper => {
            res.render("search", { wallpaper, query });
      })
      .catch(err => {
            console.log("failed to fetch wallpapers cause: " + err.cause);
            res.render("search", { wallpaper: [], query});
      });
});
  
app.listen(process.env.PORT, () => {
      console.log("server running on :",process.env.PORT);
});