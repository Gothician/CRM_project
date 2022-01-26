module.exports = {
    root: true,
    env: {
        browser: true,
        node: true
    },
    parserOptions: {
        parser: 'babel-eslint'
    },
    extends: [
        'plugin:vue/strongly-recommended'
    ],
    plugins: [
        'vue'
    ],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'arrow-parens': 0,
        'comma-dangle': [2, 'never'],
        'generator-star-spacing': 0,
        'indent': 'off',
        'quotes': ['error', 'single', { 'allowTemplateLiterals': true }],
        'object-curly-spacing': ['error', 'always'],
        'vue/html-indent': ['error', 4, {
            'attribute': 1,
            'closeBracket': 0,
            'alignAttributesVertically': true,
            'ignores': []
        }],
        'vue/script-indent': ['error', 4, {
            'baseIndent': 1,
            'switchCase': 1
        }],
        'vue/html-self-closing': ['error', {
            'html': {
                'void': 'any',
                'normal': 'any',
                'component': 'any'
            }
        }],
        'vue/component-name-in-template-casing': ['error', 'PascalCase', { "registeredComponentsOnly": true }],
        'vue/html-closing-bracket-newline': ['error', {
            'singleline': 'never',
            'multiline': 'never'
        }],
        'vue/html-closing-bracket-spacing': ['error', {
            'startTag': 'never',
            'endTag': 'never',
            'selfClosingTag': 'never'
        }],
        'vue/singleline-html-element-content-newline': ['error', {
            'ignoreWhenNoAttributes': true,
            'ignoreWhenEmpty': true,
            'ignores': [
                'spinner',
                'pre',
                'textarea',
                'label',
                'span',
                'h1',
                'h2',
                'h3',
                'h4',
                'h5',
                'p',
                'button',
                'div',
                'a',
                'i',
                'section'
            ]
        }],
        'vue/multiline-html-element-content-newline': ['error', {
            'ignoreWhenEmpty': true,
            'ignores': ['pre', 'textarea']
        }],
        'vue/name-property-casing': ['error', 'PascalCase'],
        'vue/component-definition-name-casing': ['error', 'PascalCase'],
        'vue/max-attributes-per-line': ['error', {
            'singleline': 4,
            'multiline': {
                'max': 4,
                'allowFirstLine': true
            }
        }],
        'vue/html-quotes': ['error', 'single', { 'avoidEscape': false }]
    }
};
