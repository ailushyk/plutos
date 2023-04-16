module.exports = {
  extends: ['next', 'turbo', 'prettier'],
  rules: {
    '@next/next/no-html-link-for-pages': 'off',
    'turbo/no-undeclared-env-vars': 'off',
    'react/self-closing-comp': [
      'error',
      {
        component: true,
        html: true,
      },
    ],
    'react/jsx-curly-brace-presence': [
      'error',
      { props: 'never', children: 'never' },
    ],
  },
  parserOptions: {
    babelOptions: {
      presets: [require.resolve('next/babel')],
    },
  },
}
