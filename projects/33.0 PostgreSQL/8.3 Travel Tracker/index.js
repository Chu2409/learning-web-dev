import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "root",
  port: 5432,
});
db.connect();

async function checkVisited() {
  const result = await db.query("SELECT country_code FROM visited_countries");

  let countries = [];
  result.rows.forEach((c) => {
    countries.push(c.country_code);
  });
  return countries;
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  const countriesVisited = await checkVisited();
  res.render("index.ejs", {
    total: countriesVisited.length,
    countries: countriesVisited,
  });
});

app.post("/add", async (req, res) => {
  const countryName = req.body.country;

  try {
    const countryCode = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [countryName.toLowerCase()]
    );

    const data = countryCode.rows[0];
    const newCountryCode = data.country_code;

    try {
      await db.query(
        "INSERT INTO visited_countries(country_code) VALUES($1);",
        [newCountryCode]
      );
      res.redirect("/");
    } catch (error) {
      const countriesVisited = await checkVisited();
      res.render("index.ejs", {
        total: countriesVisited.length,
        countries: countriesVisited,
        error: "Country has already been added, try again",
      });
    }
  } catch (error) {
    const countriesVisited = await checkVisited();
    res.render("index.ejs", {
      total: countriesVisited.length,
      countries: countriesVisited,
      error: "Country does not existy, try again",
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
