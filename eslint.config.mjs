import next from 'eslint-config-next';

/** @type {import('eslint').FlatConfig[]} */
const config = [
  ...next(),
  {
    rules: {
      'no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_', ignoreRestSiblings: true },
      ],
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
];

export default config;
