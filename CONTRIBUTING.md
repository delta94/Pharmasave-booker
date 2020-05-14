# Contributing #

## Code Style ##
When contributing please try to adhere to these rules. Other rules exist, though less commonly seen.

### Indentation ###
-   For `CSS` and `SCSS` files, use 2 spaces of indentation
-   For everything else, use 4 spaces of indentation

### Brace style ###
-   Use the <i>one true brace style</i>
#### Good ###
```javascript
if (true) {
    // stuff
} else {
    // stuff
}
```
#### Bad ####
The Stroustrup
```javascript
if (true) {
    // stuff
}
else {
    // stuff
}
```
the Allman
```javascript
if (true)
{
    // stuff
}
else
{
    // stuff
}
```
Or this weird one
```javascript
if (true)
{
    // stuff
} else
{
    // stuff
}
```

### Lists ###
-   Use trailing comma
### Good ###
```javascript
const myObj = {
    author: "luke-zhang-04",
    repo: "Pharmasave-booker", // notice the comma here
}
```
### Bad ###
```javascript
const myObj = {
    author: "luke-zhang-04",
    repo: "Pharmasave-booker"
}
```
-   Use object shorthand where applicable
### Good ###
```javascript
const author = "luke-zhang-04"
const repo = "Pharmasave-booker"

const myObj = {
    author,
    repo,
}
```
### Bad ###
```javascript
const author = "luke-zhang-04"
const repo = "Pharmasave-booker"

const myObj = {
    author: author,
    repo: repo,
}
```

### Importing ###
-   Sort imports alphabetically
-   Do not use `require()`

### Semicolons ###
-   For all `JS`, `JSX`, `TS`, and `TSX` files, use semicolons only in these cases:
    -   After an import
        -   ```javascript
            import myImport from "./myModule";
            ```
    -   After an export (if applicable)
        -   semicolon needed:
            ```javascript
            const myFunc = () => {
                // stuff
            }
            export const myFunc;
            ```
        -   semicolon not needed:
            ```javascript
            export const myFunc = () => {
                // stuff
            }
    - During multi-line returns and variables with parans
        -   ```jsx
            const myButton = () => {
                return (
                    <button className="btn btn-primary">Oh.</button>
                );
            }
            ```

### Functions ###
-   Use only es6 arrow funtions
#### Bad ####
```javascript
function myFunction() {
    // stuff
}
```
#### Good ####
```javascript
const myFunction = () => {
    // stuff
}
```

### Classes ###
-   No class expressions
### Bad ###
```javascript
const MyClass = class extends React.Component {
    // stuff
}
```
### Good ###
```jsx
class MyClass extends React.Component {
    // stuff
}
```

### let, var, and const ###
-   Use `const` whenever possible
-   Use `let` for variables with reassignment
-   Never `var`

### Naming conventions ###
-   Naming conventions are standard across all languages
-   Our naming conventions are inspired by the Python conventions, with differences

-   Modules: Upper_snake_case
-   Private modules: _Underscore_prefix_upper_snake_case
-   Functions: camelCase
-   Variables: camelCase (including constants)
-   Private variables, constants, functions, etc: _underscorePrefixCamelCase
-   Classes: PascalCase
-   Custom JSX elements: PascalCase

### Typescript Explicitiy ###
-   Explicit is better than implicit - The Zen of Python :)
-   When using typescript, always use explicit type annotations for functions, but never variables that are assigned a value
#### Good ###
```typescript
const myButton = (type: "reg" | "login"): JSX.Element => {
    // stuff
}
const myVar = 5
let myVar2 = "myVar2"
let myVar3: number
```
#### Bad ####
```typescript
const myButton = (type) => {
    // stuff
}
const myVar: number = 5
let myVar2: string = "myVar2"
let myVar3
```
-   When using typescript, always annotate explicit member accessibility, except for constructors
#### Good ####
```tsx
class MyButton extends React.Component {
    constructor(props: {}) {
        super(props)
    }

    private button = (
        <button className="btn btn-primary">Please use explicit member accessibility</button>
    );

    public render = (): JSX.Element => {
        {this.button}
    }
}
```
#### Bad ####
```tsx
class MyButton extends React.Component {
    constructor(props) {
        super(props)
    }

    button = (
        <button className="btn btn-primary">Please use explicit member accessibility</button>
    );

    render = () => {
        {this.button}
    }
}
```
-   Never use `object` as a type, use `{}` instead
#### Good ####
```tsx
class MyButton extends React.Component {
    constructor(props: {}) {
        super(props)
    }
}
```
#### Bad ####
```tsx
class MyButton extends React.Component {
    constructor(props: object) {
        super(props)
    }
}
```
### Comments and Docstirngs ###
-   Use `JSDoc` docstirngs
```javascript
/**
 * Stuff
 */
```
-   Use `@param` and `@return` with types
```javascript
/**
 * Multiplies numbers
 * @param {number} x - number x
 * @param {number} y - number y
 * @returns {number} multipled numbers
 */
```
-   Add space in comments
-   Also use proper grammar and spelling when possible (this isn't English class but please don't spell things like a 3 year old)
#### Bad ####
```javascript
//comment
```
#### Good ####
```javascript
// Comment.
```
### Line length, function length ###
-   Limit lines to a length of 80 (exceptions for long texts and strings)
-   Limit function length to 25 lines
-   Also, avoid duplicate code

### Other ###
-   USE WHITESPACE (please)
    -   after commas, math operations, and at your discresion to make the code more readable
    -   Two newlines between higher-order functions and classes
-   Use double quotes `"` not `'`
-   Use template literals when possible
#### Good ####
```javascript
const myVar = "template literals"
const myString = `Please use ${myVar}!`
```
#### Bad ####
```javascript
const myVar = "template literals"
const myString = "Plrease use " + myvar + "!"
```