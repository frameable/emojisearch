const sw = require('stopword')
const express = require('express')
const app = express()
const _emsearch = require('@jukben/emoji-search').default
const emojilib = require('emojilib')
const sesearch = require('../index')

let emoji;

run();

async function run() {
  emoji = Object.entries(require('emojilib'))
    .filter(([k, v]) => k.length < 5)
    .map(([k, v]) => [k, v.map(v => v.replace(/_/g, ' '))])

  app.listen(process.env.PORT || 3012);
}

app.get('/test', async (req, res) => {

  const phrases = [
    'watching tv',
    'smoking cigarettes',
    'taking a bath',
    'swimsuit',
    'driving kids to school',
    'reading',
    'on vacation',
    'sick',
    'awesome',
    'making it happen',
    "workin'",
    "taking a break",
    "focus time",
    "conversion tracking",
    "lunchtime",
    "reporting",
    "taking photos",
    "performance testing",
    "getting ready",
    "artist",
    "writing",
    "plumber",
    "space exploration",
    "commuting",
    "on my way",
    "doctor",
    "on a call",
    "napping",
    "listening to music",
  ];

  const results = [];

  for (const p of phrases) {
    const emchar = emsearch(p);
    const sechar = sesearch(p)?.[0]?.char;
    results.push({ phrase: p, emchar, sechar })
  }

  res.send(`
    <style>
      table {
        border-spacing: 0;
        border-collapse: collapse;
      }
      td, th {
        padding: 12px;
        border: 1px solid #ddd;
        text-align: center;
      }
    </style>

    <table>
      <tr>
        <th>phrase</th>
        <th>emoji-search</th>
        <th>emojisearch</th>
      </tr>
      ${results.map(r => `
        <tr>
          <td>${r.phrase || '-'}</td>
          <td>${r.emchar || '-'}</td>
          <td>${r.sechar || '-'}</td>
        </tr>
      `).join``}
    </table>
  `)

})

app.get('/', async (req, res) => {

  const q = req.query.q || 'happy'

  const emchar = emsearch(q)
  const sechar = sesearch(q)?.[0]?.char

  res.send(`
    <style>
      small {
        opacity: 0.5;
      }
    </style>
    <form>
      <input name="q" value="${q}" autofocus>
      <input type="submit">
    </form>

    <table>
      <tr><td><small>emoji-search</small></td><td><h1>${emchar || '-'}</h1></td></tr>
      <tr><td><small>emojisearch</small></td><td><h1>${sechar || '-'}</h1></td></tr>
    </table>
  `)
})

const emsearch = phrase => {
  const split = sw.removeStopwords(phrase.trim().split(' '));
  const results = split.map(_emsearch).map(x => x[0])
  const filtered = results.filter(r => !!r)
  if (!filtered.length) return '';
  const match = filtered[filtered.length - 1].name;

  for (const [k,v] of Object.entries(emojilib)) {
    if (v[0].replace(/ /g, '_') == match.replace(/ /g, '_')) {
      return k;
    }
  }
  return filtered[filtered.length - 1].char;
}

