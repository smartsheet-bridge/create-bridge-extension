const npm2yarn = require('@docusaurus/remark-plugin-npm2yarn');

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
          href: 'https://github.com/smartsheet-bridge/create-bridge-extension',
          label: 'GitHub',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
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
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/',
          remarkPlugins: [[npm2yarn, { sync: true }]],
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
