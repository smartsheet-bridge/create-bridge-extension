const npm2yarn = require('@docusaurus/remark-plugin-npm2yarn');
const remarkShortcuts = require('./plugins/remarkShortcuts');
const remarkGitProvider = require('./plugins/remarkGitProvider');

const gitProvider = process.env.GIT_PROVIDER || 'GitHub';
const gitURL = process.env.GIT_URL;

module.exports = {
  title: 'Create Bridge Extension',
  tagline:
    'Developer documentation for creating Bridge by Smartsheet extensions',
  url: 'https://bridge.smartsheet.com',
  baseUrl: process.env.BASE_URL || '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'smartsheet-bridge', // Usually your GitHub org/user name.
  projectName: 'create-bridge-extension', // Usually your repo name.
  themeConfig: {
    announcementBar: {
      id: 'preview',
      content: 'This documentation is preview only.',
      backgroundColor: '#ee6f4c', // Defaults to `#fff`.
      textColor: '#091E42', // Defaults to `#000`.
      isCloseable: false, // Defaults to `true`.
    },
    navbar: {
      title: 'Create Bridge Extension',
      logo: {
        alt: 'Bridge by Smartsheet logo',
        src: 'img/logo.svg',
        srcDark: 'img/logo-dark.svg',
      },
      items: [
        {
          to: '/',
          activeBasePath: 'docs',
          docId: 'doc',
          label: 'Docs',
          position: 'left',
        },
        {
          href: gitURL,
          label: gitProvider,
          position: 'right',
          'aria-label': `${gitProvider} repository`,
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [],
      copyright: `Copyright © ${new Date().getFullYear()} Smartsheet.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          remarkPlugins: [
            [npm2yarn, { sync: true }],
            remarkShortcuts,
            remarkGitProvider({
              gitProvider,
              gitURL,
            }),
          ],
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
