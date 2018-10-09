module.exports = {
  "extends": ["eslint:recommended", "plugin:react/recommended"],
  env: {
    browser: true,
  },
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true,
      "experimentalObjectRestSpread": true,
      "modules": true
    }
  },
  "globals": {
    T: true,
    PropTypes: true,
    axios: true,
    CONFIG: true,
    ReactDOM: true,
    React: true,
    antd: true,
    $: false
    // window: true,
    // document: true,
  },
  "rules": {
    // "no-unused-vars": 0,
    // "no-undef": 0,
    "no-debugger": ['off'],
    "react/no-find-dom-node":'off',
    "react/prop-types": 'off',
    "react/display-name": 'off',
    // "react/jsx-no-undef": 0,
  }
}
