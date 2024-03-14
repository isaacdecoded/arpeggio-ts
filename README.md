# ARPEGGIO ON TYPESCRIPT

This is the Arpeggio coding template based on [TypeScript](https://www.typescriptlang.org/docs/).

### Requirements

- [NodeJS](https://nodejs.org/en)
- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable)

### Scripts

You can start using it by executing the commonly known NodeJS scripts commands:

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

Additionally, Arpeggio includes a comprehensive suite of development and testing dependencies for coding styling, commit checking, and unit testing:

- Jest for unit tests
- Commitlint for pre-commit hook checks
- ESLint + lint-staged + prettier + Husky for code styling
- nodemon for watching mode development
- tslib for including the TypeScript helper functions during transpilation

## The Plan Concept example

You can take a look to the example by visiting the [plan-concept-example](https://github.com/isaacdecoded/arpeggio-ts/tree/plan-concept-example) branch
