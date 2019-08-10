module.exports = {
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/github',
    '@semantic-release/release-notes-generator',
    ['@semantic-release/changelog', {
      changelogFile: 'CHANGELOG.md',
    }],
    '@semantic-release/npm',
    ['@semantic-release/git', {
      assets: ['package.json', 'CHANGELOG.md'],
      message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}', // eslint-disable-line
    }],
  ],
}
