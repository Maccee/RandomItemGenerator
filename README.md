# Random Item Generator

chest.js generates random items from lists of type and rarity. If Epic item is generated it calls OpenAi to generate a fantasy name for the item. The other generated items are named just after rarity and item type. This is planned to run in the back-end.

open.js calls chest.js to generate items. After 2 Epic items are generated it writes the Epic items to epicItems.json. After each Epic item generated it waits 5 seconds to prevent error 429 from OpenAi. (too many requests)

Add your own apikey to chest.js. More info https://openai.com/api/
