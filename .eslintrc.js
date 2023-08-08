module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: [
        "standard",
        "plugin:react/recommended",
        "plugin:react/jsx-runtime",
        "plugin:prettier/recommended",
        "prettier"
    ],
    settings: {
        react: {
            version: "detect"
        }
    },
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module"
    },
    plugins: ["react", "prettier"],
    rules: {
        indent: ["error", 4], // отступ, количество пробелов
        semi: [2, "always"], // точка с запятой в конце строки
        quotes: ["error", "double", { allowTemplateLiterals: true }], // использование двойных и обратных кавычек
        "space-before-function-paren": [
            "error",
            { anonymous: "always", named: "never" }
        ], // пробел: убираем в именованной и оставляем в анонимной функции
        "react/jsx-uses-react": "off",
        "react/react-in-jsx-scope": "off",
        "prettier/prettier": "error",
        "arrow-body-style": "off",
        "prefer-arrow-callback": "off"
    }
};
