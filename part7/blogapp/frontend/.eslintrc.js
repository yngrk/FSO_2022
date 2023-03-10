module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
    'jest': true,
    'cypress/globals': true
  },
  'extends': [
    'plugin:react/recommended',
    'google',
    'prettier'
  ],
  'overrides': [
  ],
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module',
  },
  'plugins': [
    'react',
    'cypress',
  ],
  'rules': {
    'require-jsdoc': 0,
    'react/prop-types': 0
  },
};

