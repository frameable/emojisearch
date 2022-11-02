const emoji = Object.entries(require('emojilib'))

// insert some additional keywords that should probably go upstream in emojilib
const augmentations = {
  newspaper: ['news'],
  pile_of_poo: ['poop', 'crap'],
  child: ['kid', 'kids'],
  peach: ['butt'],
  sandwich: ['lunchtime'],
  wastebasket: ['trash', 'garbage'],
  microphone: ['mic'],
  television: ['tv'],
  rocket: ['active'],
  cigarette: ['smoking'],
  telephone: ['call'],
}

// manually downweight some unpopular emoji
const penalties = {
  call_me_hand: 1000
}

for ([k, v] of Object.entries(augmentations)) {
  emoji.find(e => e[1][0] == k)[1].splice(1, 0, ...v)
}

const normalize = (str) => {
  return str.trim()
    .replace(/\s+/g, '_');
}

const stopwords = ['a', 'an', 'are', 'at', 'for', 'from', 'in', 'is', 'it', 'of', 'on', 'or', 'the', 'to', 'with', 'taking'];

const negatives = ['non', 'no', 'muted'];

let stems = {};

const stem = (str) => {
  if (stems[str]) return stems[str];
  const exceptions = ['watching'];
  if (exceptions.includes(str)) return str;
  return stems[str] = str
    .replace(/(.)\1ing$/, '$1_')
    .replace(/ing$/, '_')
    .replace(/in'$/, '_')
    .replace(/ed$/, '_')
    .replace(/e$/, '_')
    .replace(/_$/, '')
}

const score = (query, meta, debug) => {

  qterms = query.split('_');

  let s = 0;

  const boost = (src, val, xtra) => {
    s += val;
    debug && console.log("B", meta[0], val, src, xtra);
  }

  // a direct phrase match is as good as it gets
  if (query == meta[0])
    boost('phrase_direct', 1000)

  const nterms = meta[0].split(/_/);

  // weight up 'haircut' for 'hair cut' and the like
  if (qterms.length == 1 && nterms.length == 2) {
    if (query == nterms.join('')) {
      boost('compound_match', 1)
    }
  }

  // avoid matching 'no smoking' with 'smoking'
  const skip = negatives.includes(nterms[0])
    && !qterms.find(qt => negatives.includes(qt))

  // partial description matches
  for (t of nterms) {
    if (skip) continue
    if (stopwords.includes(t)) continue
    for (const qt of qterms) {
      if (stopwords.includes(qt)) continue
      if (qt == t)
        boost('term_name', 250/nterms.length, t)
      if (stem(qt) == stem(t))
        boost('stem_term_name', 5/nterms.length, stem(t))
    }
  }

  // keyword matches
  for (const [i, term] of meta.entries()) {

    const d = (i + 1) * 2;

    if (query == term)
      boost('term_direct', 50/d, term)

    if (stem(query) == stem(term))
      boost('stem_term_direct', 10/d, stem(term))

    for (const qt of qterms) {
      if (stopwords.includes(qt)) continue
      if (qt == term)
        boost('qt', 4/d, term)
      if (stem(qt) == stem(term))
        boost('qts', 1/d, stem(term))
    }
  }

  // apply any penalties
  s -= penalties[meta[0]] || 0;

  // tie break with the position within the source list
  if (s) s -= emoji.findIndex(e => e[1][0] == meta[0]) / 10000;

  return s;
}

function query(q, n=100) {
  q = normalize(q)
  const results = emoji
    .sort((a, b) => score(q, b[1]) - score(q, a[1]))
    .slice(0, n)
    .map(r => ({
      char: r[0],
      keywords: r[1].slice(1),
      name: r[1][0],
      score: score(q, r[1], process.env.DEBUG)
    }))
    .filter(x => x.score)

  return results;
}

module.exports = query;

