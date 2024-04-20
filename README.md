<p align="center">
  <img src="https://github.com/isaacdecoded/arpeggio/blob/main/misc/0-Arpeggio-on-TS.png" loading="lazy"/>
</p>

# ARPEGGIO ON TYPESCRIPT

This is the [Arpeggio](https://github.com/isaacdecoded/arpeggio) coding template based on [TypeScript](https://www.typescriptlang.org/docs/).

### Requirements

- [NodeJS](https://nodejs.org/en)
- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable)

### Scripts

You can run it by executing the commonly known NodeJS scripts commands:

```bash
yarn install
yarn build
yarn start
```

For development purposes, you may want to use the following script commands in separate terminal screens:

```bash
yarn build:watch
yarn start:watch
```

Execute tests by using the [Jest](https://jestjs.io/es-ES/docs/getting-started) included library:

```bash
yarn test
```

### Dependencies

Arpeggio on TypeScript keeps the codebase clean by including only the _module-alias_ dependency. This dependency can be removed if the user does not require simplified import paths with aliases. If you decide to keep the aliases, please remember that their usage depends on the following configurations:

1. In `tsconfig.json`, include your paths in the `compilerOptions.paths` object.
2. In `package.json`, include the same paths in the `_moduleAliases` object.
3. In `jest.config.json`, include the same paths in the `moduleNameMapper` object.

Additionally, Arpeggio on TypeScript includes a comprehensive suite of development and testing dependencies for coding styling, commit checking, and unit testing:

- [Jest](https://jestjs.io/es-ES/) for unit tests
- [Commitlint](https://commitlint.js.org/) for pre-commit hook checks
- [ESLint](https://eslint.org/), [lint-staged](https://github.com/lint-staged/lint-staged), [Prettier](https://prettier.io/), and [Husky](https://typicode.github.io/husky/) for code linting features
- [nodemon](https://nodemon.io/) for hot reloading during code development
- [tslib](https://www.npmjs.com/package/tslib) for including the TypeScript helper functions

## The Plan Concept example

You can take a look to the example by visiting the [plan-concept-example](https://github.com/isaacdecoded/arpeggio-ts/tree/plan-concept-example) branch
