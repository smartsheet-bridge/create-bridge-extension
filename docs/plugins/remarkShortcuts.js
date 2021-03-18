const u = require('unist-builder');
const findAndReplace = require('mdast-util-find-and-replace');

const remarkShortcuts = () => {
  const transformer = tree => {
    findAndReplace(tree, /Bridge by Smartsheet/i, () => {
      return u('link', { url: `https://www.smartsheet.com/platform/bridge` }, [
        u('text', 'Bridge by Smartsheet'),
      ]);
    });
  };

  return transformer;
};

module.exports = remarkShortcuts;
