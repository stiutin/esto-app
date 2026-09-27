// @ts-check
import eslint from '@eslint/js';
import rxjs from '@smarttools/eslint-plugin-rxjs';
import eslintPluginStylistic from '@stylistic/eslint-plugin';
import angular from 'angular-eslint';
import {defineConfig, globalIgnores} from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier';
import noUnsanitized from 'eslint-plugin-no-unsanitized';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';
import tsEslint from 'typescript-eslint';

/*
 * Larder's own rules sit on top of the house rules: magic numbers, naming, member ordering and RxJS
 * conventions. Formatting is Prettier's job.
 */
const ANGULAR_COMPONENT_PREFIXES = ['app'];

/** House rules, shared by every project in the portfolio. Formatting itself is Prettier's job. */
const HOUSE_RULES = {
  'arrow-body-style': ['error', 'as-needed'],
  curly: ['error', 'all'],
  'no-console': ['error', {allow: ['warn', 'error']}],
  'simple-import-sort/exports': 'error',
  'simple-import-sort/imports': 'error',
  'unused-imports/no-unused-imports': 'error',
};

/** House rules for TypeScript. */
const HOUSE_TS_RULES = {
  '@typescript-eslint/array-type': ['error', {default: 'array'}],
  '@typescript-eslint/explicit-member-accessibility': [
    'error',
    {accessibility: 'explicit', overrides: {constructors: 'no-public'}},
  ],
  '@typescript-eslint/explicit-module-boundary-types': 'error',
  '@typescript-eslint/no-explicit-any': 'error',
  '@typescript-eslint/no-unused-vars': 'off',
  'unused-imports/no-unused-vars': [
    'error',
    {argsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_', varsIgnorePattern: '^_'},
  ],
};

export default defineConfig(
  globalIgnores(['dist/', '.angular/', 'coverage/', 'out-tsc/']),
  {
    files: ['**/*.ts'],
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
    extends: [
      eslint.configs.recommended,
      ...tsEslint.configs.recommendedTypeChecked,
      ...tsEslint.configs.stylistic,
      ...angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    plugins: {
      '@stylistic': eslintPluginStylistic,
      rxjs,
      'unused-imports': unusedImports,
      'simple-import-sort': simpleImportSort,
      'no-unsanitized': noUnsanitized,
    },
    rules: {
      ...HOUSE_RULES,
      ...HOUSE_TS_RULES,
      'max-lines': [
        'error',
        {
          max: 300,
          skipBlankLines: true,
          skipComments: true,
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: ANGULAR_COMPONENT_PREFIXES,
          style: 'kebab-case',
        },
      ],
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: ANGULAR_COMPONENT_PREFIXES,
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-class-suffix': [
        'error',
        {
          suffixes: ['Component', 'Container', 'Page', 'Modal'],
        },
      ],
      '@angular-eslint/use-lifecycle-interface': 'error',
      '@angular-eslint/no-host-metadata-property': 'off',
      '@angular-eslint/prefer-on-push-component-change-detection': 'error',
      '@angular-eslint/prefer-signals': 'error',
      '@angular-eslint/no-duplicates-in-metadata-arrays': ['error'],
      '@typescript-eslint/consistent-type-assertions': [
        'error',
        {
          assertionStyle: 'as',
          objectLiteralTypeAssertions: 'allow-as-parameter',
        },
      ],
      'dot-notation': 'off',
      '@typescript-eslint/dot-notation': 'error',
      '@typescript-eslint/no-duplicate-enum-values': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/member-ordering': [
        'error',
        {
          default: [
            'signature',
            'public-decorated-field',
            'public-field',
            'protected-decorated-field',
            'protected-field',
            'private-decorated-field',
            'private-field',
            'constructor',
            'decorated-method',
            'static-method',
            'instance-method',
            'abstract-method',
            'method',
          ],
        },
      ],
      '@stylistic/member-delimiter-style': ['error'],
      'no-magic-numbers': 'off',
      '@typescript-eslint/no-magic-numbers': [
        'error',
        {
          ignore: [0, 1, -1],
          ignoreArrayIndexes: true,
          enforceConst: true,
          detectObjects: false,
          ignoreEnums: true,
          ignoreNumericLiteralTypes: true,
          ignoreDefaultValues: true,
          ignoreReadonlyClassProperties: true,
        },
      ],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'objectLiteralProperty',
          // SignalStore marks private members with a leading underscore (`_loadPages`).
          leadingUnderscore: 'allow',
          format: ['UPPER_CASE', 'camelCase'],
          filter: {
            // The last two alternatives: NgRx createActionGroup events ('Load products success')
            // and kebab-case URL values ('price-asc'). These are data, not identifiers.
            regex:
              '^(\\[[^\\]]+\\]|\\([^\\)]+\\)|ngsw-bypass|X-Requested-With|download-filename|_method|[A-Z][A-Za-z0-9]*( [A-Za-z0-9]+)+|[a-z][a-z0-9]*(-[a-z0-9]+)+)$',
            match: false,
          },
        },
        {
          selector: 'classProperty',
          format: ['camelCase'],
        },
        {
          selector: 'classProperty',
          modifiers: ['static'],
          format: ['UPPER_CASE'],
        },
        {
          selector: 'classProperty',
          modifiers: ['readonly'],
          format: ['UPPER_CASE', 'PascalCase', 'camelCase'],
        },
        {
          selector: 'classProperty',
          modifiers: ['readonly'],
          format: ['UPPER_CASE', 'PascalCase'],
        },
        {
          selector: 'variable',
          format: ['UPPER_CASE', 'camelCase', 'PascalCase'],
        },
        {
          selector: ['enum', 'interface', 'class', 'enumMember', 'typeAlias'],
          format: ['PascalCase'],
        },
        {
          selector: ['enumMember'],
          format: ['camelCase'],
        },
      ],
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/no-parameter-properties': 'off',
      '@typescript-eslint/no-redundant-type-constituents': 'off',
      '@typescript-eslint/no-shadow': 'error',
      '@typescript-eslint/no-use-before-define': 'error',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/only-throw-error': 'warn',
      '@typescript-eslint/prefer-function-type': 'error',
      'no-case-declarations': 'off',
      '@typescript-eslint/unbound-method': [
        'error',
        {
          ignoreStatic: true,
        },
      ],
      '@typescript-eslint/triple-slash-reference': [
        'error',
        {
          path: 'always',
          types: 'prefer-import',
          lib: 'always',
        },
      ],
      'no-param-reassign': [
        'error',
        {
          props: true,
          ignorePropertyModificationsFor: ['acc'],
        },
      ],
      'rxjs/no-unsafe-takeuntil': [
        'error',
        {
          alias: ['untilDestroyed'],
        },
      ],
      'rxjs/no-implicit-any-catch': 'off',
      'rxjs/no-nested-subscribe': 'error',
      'rxjs/finnish': [
        'error',
        {
          properties: true,
          variables: true,
          functions: false,
          methods: false,
          names: {
            '^(canActivate|canActivateChild|canDeactivate|canLoad|intercept|resolve|validate|store)$': false,
          },
          parameters: false,
          strict: false,
          types: {
            '^EventEmitter$': false,
          },
        },
      ],
      'no-restricted-syntax': [
        'error',
        {
          message: 'Usage of alert() is disalowed',
          selector: "CallExpression > Identifier[name='alert']",
        },
        {
          message: 'Methods decorated with @Output() should be readonly',
          selector: "PropertyDefinition[readonly!=true][decorators.0.expression.callee.name='Output']",
        },
        {
          message: "Properties 'currentValue | firstChange | previousValue | isFirstChange' should be optional",
          selector:
            "MethodDefinition[key.name='ngOnChanges'] MemberExpression[object.object.name='changes'][optional=false][property.name=/.*!/]",
        },
        {
          message: "ngOnChanges should have 'changes' as an argument",
          selector: "MethodDefinition[key.name='ngOnChanges'] > FunctionExpression > Identifier[name!='changes']",
        },
        {
          message: "ngOnChanges should have 'changes: NgChanges' as an argument",
          selector:
            "MethodDefinition[key.name='ngOnChanges'] > FunctionExpression > Identifier >  TSTypeAnnotation > TSTypeReference > Identifier[name!='NgChanges']",
        },
        {
          message: "ngOnChanges should have one argument 'changes: NgChanges'",
          selector: "MethodDefinition[key.name='ngOnChanges'] > FunctionExpression[params.length!=1]",
        },
      ],
      'no-unsanitized/method': 'error',
      'no-unsanitized/property': 'error',
    },
  },
  {
    files: ['**/*.html'],
    extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility],
    rules: {
      '@angular-eslint/template/prefer-control-flow': ['error'],
      '@angular-eslint/template/prefer-self-closing-tags': ['error'],
      '@angular-eslint/template/prefer-ngsrc': ['error'],
      '@angular-eslint/template/attributes-order': [
        'error',
        {
          order: [
            'STRUCTURAL_DIRECTIVE',
            'TEMPLATE_REFERENCE',
            'INPUT_BINDING',
            'TWO_WAY_BINDING',
            'OUTPUT_BINDING',
            'ATTRIBUTE_BINDING',
          ],
        },
      ],
    },
  },
  {
    files: ['**/*.spec.ts'],
    rules: {
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/dot-notation': 'off',
      '@typescript-eslint/unbound-method': 'off',
      '@typescript-eslint/consistent-type-assertions': 'off',
      '@typescript-eslint/no-magic-numbers': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
    },
  },
  {
    files: ['**/*.mocks.ts', '**/mocks/*.ts'],
    rules: {
      '@typescript-eslint/no-magic-numbers': 'off',
    },
  },
  {
    files: ['**/*.spec.ts', 'src/testing/**/*.ts', 'e2e/**/*.ts'],
    rules: {
      'no-param-reassign': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/naming-convention': 'off',
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/require-await': 'off',
      'rxjs/finnish': 'off',
    },
  },
  eslintConfigPrettier
);
