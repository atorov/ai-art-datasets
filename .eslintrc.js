module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'plugin:react/recommended',
        'airbnb',
        'plugin:import/typescript',
    ],
    globals: {
        APP_NAME: 'readonly',
        APP_VERSION: 'readonly',
        JSX: true,
        MODE: 'readonly',
        NODE_ENV: 'readonly',
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
    },
    plugins: [
        'react',
        'react-hooks',
        '@typescript-eslint',
    ],
    rules: {
        'brace-style': ['error', 'stroustrup'],
        camelcase: 0,
        'default-case': 0,
        'import/extensions': [
            'error',
            'ignorePackages',
            {
                ts: 'never',
                tsx: 'never',
                js: 'never',
            },
        ],
        indent: ['error',
            4,
            { SwitchCase: 1 },
        ],
        'max-len': 0,
        // 'new-cap': 0,
        // 'newline-per-chained-call': 0,
        'no-await-in-loop': 0,
        'no-bitwise': 0,
        'no-console': 0,
        'no-loop-func': 0,
        // 'no-multi-spaces': 0,
        // 'no-param-reassign': 0,
        'no-underscore-dangle': 0,
        'no-plusplus': 0,
        // 'no-unused-expressions': 0,
        'prefer-destructuring': 0,
        'prefer-template': 0,
        semi: 0,
        'semi-style': ['error', 'last'],

        'react/destructuring-assignment': 0,
        'react/forbid-prop-types': 0,
        'react/function-component-definition': [2, {
            namedComponents: 'arrow-function',
            unnamedComponents: 'arrow-function',
        }],
        'react/no-array-index-key': 0,
        'react/prefer-stateless-function': 0,
        'react/react-in-jsx-scope': 'off',

        'react/jsx-filename-extension': [2, { extensions: ['.jsx', '.tsx'] }],
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],
        'react/jsx-props-no-spreading': 0,
        'react/jsx-uses-react': 'off',

        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'error',

        // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-use-before-define.md#how-to-use
        'no-use-before-define': 0,
        '@typescript-eslint/no-use-before-define': ['error'],

        // https://github.com/typescript-eslint/typescript-eslint/issues/2629#issuecomment-703261844
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': 'error',

        // https://github.com/typescript-eslint/typescript-eslint/issues/2619#issuecomment-701901752
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': 'error',
    },
};
