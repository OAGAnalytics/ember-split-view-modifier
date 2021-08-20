'use strict';

const path = require('path');
const funnel = require('broccoli-funnel');
const merge = require('broccoli-merge-trees');

module.exports = {
  name: require('./package').name,

  treeForVendor(tree) {
    let libPath = path.join(path.dirname(require.resolve('split.js')), '..');
    let lib = funnel(this.treeGenerator(libPath), { destDir: 'split' });
    return merge([tree, lib]);
  },

  included() {
    this._super.included.apply(this, arguments);
    this.import('vendor/split/dist/split.js', {
      using: [{ transformation: 'amd', as: 'split.js' }],
    });

    this.import('vendor/ember-split-view-modifier.css');
  },
};
