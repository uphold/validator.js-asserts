/** @type {import('release-it').Config} */
module.exports = {
  git: {
    changelog: 'echo "## Changelog\n\n$(npx @uphold/github-changelog-generator -f unreleased | tail -n +4 -f)"',
    commitMessage: 'Release ${version}',
    requireBranch: 'master',
    requireCleanWorkingDir: false,
    requireCommits: true,
    tag: false,
    tagName: 'v${version}'
  },
  github: {
    release: false,
    releaseName: 'v${version}'
  },
  hooks: {
    'after:bump': [
      'echo "$(npx @uphold/github-changelog-generator -f v${version})\n$(tail -n +2 CHANGELOG.md)" > CHANGELOG.md',
      'git add CHANGELOG.md --all'
    ],
    'before:init': 'test -n "$GITHUB_TOKEN" || (echo "GITHUB_TOKEN is not set" >&2; exit 1)'
  },
  npm: {
    publish: false,
    skipChecks: true
  }
};
