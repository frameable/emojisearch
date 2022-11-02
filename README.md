# emojisearch 🔍

Search for emojis with single words or phrases

```javascript
const emojisearch = require('emojisearch')
const results = emojisearch('reading', 3)

// [
//   {
//     char: '📕',
//     keywords: [ 'read', 'library', 'knowledge', 'textbook', 'learn' ],
//     name: 'closed_book',
//     score: 2.75
//   },
//   {
//     char: '📗',
//     keywords: [ 'read', 'library', 'knowledge', 'study' ],
//     name: 'green_book',
//     score: 2.7499
//   },
//   {
//     char: '📘',
//     keywords: [ 'read', 'library', 'knowledge', 'learn', 'study' ],
//     name: 'blue_book',
//     score: 2.7498
//   }
// ]
```

### Comparison with `@jukben/emoji-search`

This library takes a different approach to sorting results, fuzzy maching, stemming, etc.  A comparison table follows...

phrase | emoji-search | emojisearch
-------|--------------|------------
watching tv | 📺 |  📺
smoking cigarettes | 🚬 | 🚬
taking a bath | 🛀 | 🛀
swimsuit  | - | 🩱
driving kids to school | 🏫 | 🏫
reading | 🤱 | 📕
on vacation | 🎄 | 🌄
sick  | 🤒 | 🤒
awesome | ❇️  | 👍
workin' | - | 🏗️
taking a break | 💔 | 💔
focus time | ⌚ | ⌛
conversion tracking | 👣 | 🛤️
lunchtime | - | 🥪
taking photos | 👣 | -
performance testing | - | 🧪
getting ready|  🖐 | 💆
artist  | 🎙️ | 🧑‍🎨
writing | 🖊️ | ✍️
plumber | 👩‍🔧 | 👨‍🔧
space exploration | 👩‍🚀 | 👨‍🚀
on my way | - | 🌌
doctor  | 🥼  |  👨‍⚕️
on a call | 🤙 | ☎️
napping | - | 😪
listening to music | 🎷 | 🎶

### License

MIT
