import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Modifier | split-view', function (hooks) {
  setupRenderingTest(hooks);

  test('modifier adds gutter and sets styles correctly', async function (assert) {
    await render(hbs`
      <div {{split-view}} class='container'>
        <div class='child'></div>
        <div class='child'></div>
        <div class='child'></div>
      </div>
    `);

    assert.dom('.gutter').exists({ count: 2 });
    assert.dom('.child').exists({ count: 3 });
    assert.dom('.child').hasStyle({
      'flex-basis': 'calc(33.3333% - 3.5px)',
      'max-width': 'calc(33.3333% - 3.5px)',
    });

    assert.dom('.container').hasStyle({
      display: 'flex',
      'flex-direction': 'row',
    });
  });
});
