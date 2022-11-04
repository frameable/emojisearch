const suite = require('./index');
const assert = require('assert');

const emojisearch = require('../index');

suite('main', async test => {

  await test('first match', async _ => {
    assert.equal(emojisearch('lunchtime')[0].name, 'sandwich');
    assert.equal(emojisearch('smoking cigarettes')[0].name, 'cigarette');
    assert.equal(emojisearch('reading')[0].name, 'closed_book');
    assert.equal(emojisearch('winning')[0].name, 'military_medal');
    assert.equal(emojisearch('call')[0].name, 'telephone');
    assert.equal(emojisearch('swimsuit')[0].name, 'one_piece_swimsuit');
  });

  await test('top n', async _ => {
    assert.equal(emojisearch('face').length, 100);
    assert.equal(emojisearch('face', 5).length, 5);
  });

  await test('substring match', async _ => {
    assert.deepEqual(emojisearch('ab', 3).map(r => r.name), ['ab_button', 'abacus', 'derelict_house']);
  });

});

