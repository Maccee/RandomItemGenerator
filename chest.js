// OPENAI, insert your own apikey.
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: "APIKEY",
});
const openai = new OpenAIApi(configuration);

// Require lists of rarities and item types.
const rarity = require('./rarity.json');
const type = require('./type.json');

// Defines uniqueId for the item.
function defineUniqueId() {
  let timestamp = Date.now().toString(36);
  let random = Math.random().toString(36).substring(2, 8);
  return timestamp + random;
}

// This just picks random item from the type.json based on type.json lenght.
function defineType() {
  let randomNumber = Math.floor(Math.random() * type.length);
  return type[randomNumber];
}

// This defines rarity based on weight.
function defineRarity() {
  let randomNumber = Math.floor(Math.random() * 100);
  let totalWeight = rarity.reduce((sum, currentRarity) => sum + currentRarity.weight, 0);
  let cumulativeWeight = 0;

  for (let i = 0; i < rarity.length; i++) {
    cumulativeWeight += rarity[i].weight;
    if (randomNumber < (cumulativeWeight / totalWeight) * 100) {
      return rarity[i];
    }
  }
}

// Defines a random stat based on item rarity.
function defineRandomStat(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Item constructor. ID, Type, Rarity, random stat range based on rarity, name based on rarity.
async function createItem() {
  let uniqueId = defineUniqueId();
  let itemType = defineType().type;
  let rarityObj = defineRarity();
  let rarity = rarityObj.rarity;
  let range = rarityObj.range;
  let stat = defineRandomStat(range[0], range[1]);
  let itemName = rarity + " " + itemType;

  // If rarity is Epic it uses Openai to generate Epic name.
  if (rarity === "Epic") {
    let itemNamePromise = defineName(rarity,itemType);
    itemName = await itemNamePromise;
  } 

  return {
    "uniqueID": uniqueId,
    "name": itemName,
    "rarity": rarity,
    "type": itemType,
    "Stat": stat
  };
}

// Generate Epic name.
async function defineName(rarity, itemType){
const response = await openai.createCompletion({
  model: "text-davinci-003",
  prompt: "Create a ridiculous name for most epic fantasy item including " + itemType + " in the name. Also include random name in front who owns the item.",
  temperature: 0.9,
  max_tokens: 600,
  top_p: 1.0,
  
});

return response.data.choices[0].text.trim();
}

module.exports = createItem;
