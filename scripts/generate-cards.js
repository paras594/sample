const puppeteer = require("puppeteer");
const fs = require("fs");
const csv = require("csv-parser");

function generateCardCupcake(row) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>${row["Cupcake Name"]}</title>
    <style>
      body {
        margin: 0;
        padding: 0;
        background: #fff;
        font-family: 'Segoe UI', sans-serif;
      }
      .card {
        width: 200px;
        height: 280px;
        box-sizing: border-box;
        background: #fff;
        padding: 12px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      .card-header {
        display: flex;
        justify-content: space-between;
        font-size: 0.8em;
        color: #555;
      }
      .tier {
        font-weight: bold;
        color: #8b5e3c;
      }
      .count {
        background: #f0e5d8;
        padding: 2px 6px;
        border-radius: 6px;
      }
      .card-title {
        font-size: 1.1em;
        font-weight: bold;
        text-align: center;
        margin: 8px 0;
        color: #4e2a1e;
      }
      .card-section {
        margin: 6px 0;
      }
      .section-label {
        font-size: 0.75em;
        color: #777;
      }
      .section-content {
        font-size: 0.9em;
        color: #333;
      }
      .card-value {
        font-size: 1.2em;
        font-weight: bold;
        text-align: center;
        color: #c1440e;
        margin-top: auto;
      }
    </style>
  </head>
  <body>
    <div class="card">
      <div class="card-header">
        <span class="tier">Tier: ${row["Tier"]}</span>
        <span class="count">x${row["Count"]}</span>
      </div>
      <div class="card-title">${row["Cupcake Name"]}</div>
      <div class="card-section ingredients">
        <div class="section-label">Ingredients</div>
        <div class="section-content">${row["Ingredient Cost"]}</div>
      </div>
      <div class="card-section discard">
        <div class="section-label">Discard/Return</div>
        <div class="section-content">${row["Discard/return on Bake"]}</div>
      </div>
      <div class="card-value">★ ${row["Value"]}</div>
    </div>
  </body>
  </html>
  `;
}

function generateCardIngredient(row) {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>Cupcake Card</title>
      <style>
        body {
          margin: 0;
          padding: 0;
          background: #f8f4f0;
          font-family: "Segoe UI", sans-serif;
        }

        .card {
          width: 200px;
          height: 280px;
          box-sizing: border-box;
          background: #fff;
          padding: 12px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .card-title {
          font-size: 1.4em;
          font-weight: bold;
          text-align: center;
          color: #000;
        }

        .flour {
          background: #f2e2ba;
        }

        .sugar {
          background: #bde0fe;
        }

        .chocolate {
          background: #fcc9c0;
        }

        .butter {
          background: #cdeac0;
        }
      </style>
    </head>
    <body>
      <div class="card ${row["Ingredient Name"].toLowerCase()}">
        <div class="card-title">${row["Ingredient Name"]}</div>
      </div>
    </body>
  </html>
  `;
}

function generateCardFactory(row) {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>Cupcake Card</title>
      <style>
        body {
          margin: 0;
          padding: 0;
          background: #f8f4f0;
          font-family: "Segoe UI", sans-serif;
        }

        .card {
          width: 200px;
          height: 280px;
          box-sizing: border-box;
          background: #5d688a;
          color: #fff;
          padding: 12px;
          display: flex;
          flex-direction: column;
        }

        .card-header {
          text-align: center;
          font-weight: bold;
        }

        .card-title {
          font-size: 1.1em;
          font-weight: bold;
          text-align: center;
          margin-top: 24px;
          color: #fff2ef;
        }

        .card-description {
          text-align: center;
          font-size: 1em;
          margin: auto;
        }

        .card-cost {
          text-align: center;
          font-size: 0.85em;
          margin: auto;
        }
        .card-cost p {
          margin: 4px;
        }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="card-header">factory</div>
        <div class="card-title">${row["Cupcake Name"]}</div>
        <div class="card-description">
          ${row["Effect"]}
        </div>
        <div class="card-cost">
          <p style="font-weight: bold">Condition</p>
          <p>${row["Ingredient Cost"]}</p>
        </div>
      </div>
    </body>
  </html>
  `;
}

function generateCardAction(row) {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>Cupcake Card</title>
      <style>
        body {
          margin: 0;
          padding: 0;
          background: #f8f4f0;
          font-family: "Segoe UI", sans-serif;
        }

        .card {
          width: 200px;
          height: 280px;
          box-sizing: border-box;
          background: #fff;
          padding: 12px;
          display: flex;
          flex-direction: column;
        }

        .card-header {
          text-align: center;
          font-weight: bold;
        }

        .tier {
          font-weight: bold;
          color: #000;
        }

        .count {
          background: #fff;
          padding: 2px 6px;
          border-radius: 6px;
        }

        .card-title {
          font-size: 1.1em;
          font-weight: bold;
          text-align: center;
          margin-top: 24px;
          color: #000;
        }

        .card-description {
          text-align: center;
          font-size: 1em;
          color: #000;
          margin: auto;
        }

        .card-cost {
          text-align: center;
          font-size: 0.9em;
          color: #000;
          margin: auto;
        }
        .card-cost p {
          margin: 4px;
        }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="card-header">${row["Card Type"]}</div>
        <div class="card-title">${row["Cupcake Name"]}</div>
        <div class="card-description">
          ${row["Effect"]}
        </div>
        <div class="card-cost">
          <p>Cost</p>
          <p>${row["Ingredient Cost"]}</p>
        </div>
      </div>
    </body>
  </html>
  `;
}

(async () => {
  const FOLDER = "cards";
  if (!fs.existsSync(FOLDER)) fs.mkdirSync(FOLDER);

  const browser = await puppeteer.launch({ headless: true });

  let fileIndex = 1;
  const rows = [];

  // Read CSV
  fs.createReadStream("cards.csv")
    .pipe(csv())
    .on("data", (row) => rows.push(row))
    .on("end", async () => {
      for (const row of rows) {
        let html;

        if (row["Card Type"] === "Bake") {
          html = generateCardCupcake(row);
        } else if (row["Card Type"] === "Ingredient") {
          html = generateCardIngredient(row);
        } else if (
          row["Card Type"] === "Support" ||
          row["Card Type"] === "Disrupt"
        ) {
          html = generateCardAction(row);
        } else if (row["Card Type"] === "Factory") {
          html = generateCardFactory(row);
        } else {
          console.log("Unknown card type:", row["Card Type"]);
          continue;
        }
        const cardPage = await browser.newPage();
        await cardPage.setContent(html);
        await cardPage.setViewport({ width: 200, height: 280 });
        await cardPage.screenshot({ path: `${FOLDER}/${fileIndex}.png` });
        await cardPage.close();
        fileIndex++;
      }

      await browser.close();
      console.log("✅ All cupcake cards generated!");
    });
})();
