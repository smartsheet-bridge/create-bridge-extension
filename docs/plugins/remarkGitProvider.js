const u = require('unist-builder');
const findAndReplace = require('mdast-util-find-and-replace');

const remarkGitProvider = ({ gitProvider, gitURL } = {}) => () => {
  const transformer = tree => {
    findAndReplace(tree, 'GitProvider', () => {
      const text = u('text', gitProvider);

      if (!gitURL) {
        return text;
      }

      return u(
        'link',
        {
          url: gitURL,
        },
        [text]
      );
    });
  };

  return transformer;
};

module.exports = remarkGitProvider;
