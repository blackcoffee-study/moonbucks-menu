module.exports = {
    root: true,
    extends: ["eslint:recommended", "plugin:prettier/recommended"],
    plugins: [],
    env: {
        browser: true,
        es6: true,
        node: true,
    },
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
    },
    rules: {
        "prettier/prettier": ["error", { endOfLine: "auto" }, { usePrettierrc: true }],
    },
};
