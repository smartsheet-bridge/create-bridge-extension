const u = require('unist-builder');
const findAndReplace = require('mdast-util-find-and-replace');

const remarkShortcuts = () => {
  const transformer = tree => {
    findAndReplace(tree, /Bridge by Smartsheet/gi, () => {
      return u('link', { url: `https://www.smartsheet.com/platform/bridge` }, [
        u('text', 'Bridge by Smartsheet'),
      ]);
    });
    findAndReplace(tree, /entry (point|file)/gi, () => {
      return u('link', { url: `/concepts/entry` }, [u('text', 'Entry Point')]);
    });
    findAndReplace(tree, /(spec|specification) file/gi, () => {
      return u('link', { url: `/bridge/spec` }, [u('text', 'Spec File')]);
    });
    findAndReplace(tree, /\/\/\s?(TODO[:\s])*(.*)$/gim, () => {
      return u('div');
    });
  };
  return transformer;
};

module.exports = remarkShortcuts;
