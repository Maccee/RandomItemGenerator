# "Random" Item Generator

chest.js generates random items from lists of type and rarity. If Epic item is generated it calls OpenAi to generate a fantasy name for the item. The other generated items are named just after rarity and item type. This is planned to run in the back-end.

open.js calls chest.js to generate items. After 2 Epic items are generated it writes the Epic items to epicItems.json. After each Epic item generated it waits 5 seconds to prevent error 429 from OpenAi. (too many requests)

Add your own apikey to chest.js. More info https://openai.com/api/

"If two calls to the defineUniqueId() function happen within the same millisecond, they will have the same timestamp but different random values. The probability of generating the same random value twice in a row is about 1 in 2.2 billion. So the probability of two calls generating the same ID at the same millisecond is also about 1 in 2.2 billion. It's worth noting that this probability is very low and unlikely to happen in practice. However, in high-concurrency environments or in cases where the unique IDs are used for critical applications, it might be better to use a more robust method of generating unique IDs that can guarantee uniqueness." - ChatGPT 2/2023
