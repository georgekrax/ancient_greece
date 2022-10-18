// use-strict
const fs = require("fs");
const { parse } = require("csv-parse");
const { JSDOM } = require("jsdom");

const FILE_PATH = "../dropshipping_list.csv";
const FILE_2_PATH = "../dropshipping_list_2.csv";

fs.createReadStream(FILE_PATH)
  .pipe(parse({ delimiter: ",", fromLine: 2 }))
  .on("data", async row => {
    const [link, _, platform] = row;
    const isAliExpress = platform === "AliExpress";
    const { window } = await JSDOM.fromURL(link, isAliExpress && { runScripts: "dangerously" });

    let store;
    if (platform === "Etsy") {
      store = window.document
        .querySelector("div.wt-display-flex-xs.wt-align-items-center.wt-mb-xs-1")
        .children[0].textContent.trim();
    } else if (isAliExpress) {
      store = window.runParams.data.storeModule.storeName;
    }

    const newRow = [store, ...row];
    const csv = newRow.join(",") + "\r\n";
    fs.appendFileSync(FILE_2_PATH, csv);
  })
  .on("error", function (error) {
    console.log(error.message);
  });
