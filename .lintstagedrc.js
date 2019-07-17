module.exports = {
  '*.{js,jsx}': ['eslint --fix', 'git add'],
  '*.{js,json,scss,yaml,yml}': ['prettier --write', 'git add'],
}
