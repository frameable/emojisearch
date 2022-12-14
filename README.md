# emojisearch ๐

Search for emojis with single words or phrases

```javascript
const emojisearch = require('emojisearch')
const results = emojisearch('reading', 3)

// [
//   {
//     char: '๐',
//     keywords: [ 'read', 'library', 'knowledge', 'textbook', 'learn' ],
//     name: 'closed_book',
//     score: 2.75
//   },
//   {
//     char: '๐',
//     keywords: [ 'read', 'library', 'knowledge', 'study' ],
//     name: 'green_book',
//     score: 2.7499
//   },
//   {
//     char: '๐',
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
watching tv | ๐บ |  ๐บ
smoking cigarettes | ๐ฌ | ๐ฌ
taking a bath | ๐ | ๐
swimsuit  | - | ๐ฉฑ
driving kids to school | ๐ซ | ๐ซ
reading | ๐คฑ | ๐
on vacation | ๐ | ๐
sick  | ๐ค | ๐ค
awesome | โ๏ธ  | ๐
workin' | - | ๐๏ธ
taking a break | ๐ | ๐
focus time | โ | โ
conversion tracking | ๐ฃ | ๐ค๏ธ
lunchtime | - | ๐ฅช
taking photos | ๐ฃ | -
performance testing | - | ๐งช
getting ready|  ๐ | ๐
artist  | ๐๏ธ | ๐งโ๐จ
writing | ๐๏ธ | โ๏ธ
plumber | ๐ฉโ๐ง | ๐จโ๐ง
space exploration | ๐ฉโ๐ | ๐จโ๐
on my way | - | ๐
doctor  | ๐ฅผ  |  ๐จโโ๏ธ
on a call | ๐ค | โ๏ธ
napping | - | ๐ช
listening to music | ๐ท | ๐ถ

### License

MIT
