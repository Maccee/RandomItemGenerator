const createItem = require("./chest.js");
const fs = require("fs");

let epicItems = []; // keep track of epic items

let timeoutId;
let count = 0;

function createNextItem() {
  let itemPromise = createItem();
  itemPromise.then((resolvedItem) => {
    count++;
    console.log(resolvedItem);
    console.log(count);
    if (resolvedItem.rarity === "Epic") {
      epicItems.push(resolvedItem); // push epic item into array
      if (epicItems.length < 2) {
        timeoutId = setTimeout(createNextItem, 5000); // wait 5 seconds before creating next item
      } else {
        clearTimeout(timeoutId); // stop creating items
        fs.writeFile("epicItems.json", JSON.stringify(epicItems, null, 2), (err) => {
          if (err) {
            console.error(err);
          } else {
            console.log("Epic items saved to epicItems.json");
          }
        });
      }
    } else {
      createNextItem(); // create next item without waiting
    }
  }).catch((error) => {
    console.error(error);
  });
}

createNextItem();







