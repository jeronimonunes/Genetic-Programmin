# GeneticProgramming

This project aims to be a Genetic Programming implementation to solve symbolic regression.

## Development

This is a web application. To build it you first need to install [node.js](https://nodejs.org/) and install npm packages by running `npm install`.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Tests

The project contains unit tests, to run them use `npm run test`

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Introduction

Symbolic regression is a type of regression analysis that searches the space of mathematical expressions to find the model that best fits a given dataset [Wikipedia](https://en.wikipedia.org/wiki/Symbolic_regression#:~:text=Symbolic%20Regression%20(SR)%20is%20a,starting%20point%20to%20the%20algorithm.). The project will use a tree as internal representation of the mathematical expression. The tree will be evaluated as an equation of the form `f(X, y) = z`: X ∈ ℝ<sup>n</sup>, y ∈ ℝ and z should be zero. To compute the error of the generated equation we will sum (0 - z)² to every entry on the dataset.

## Expressability

The basic 4 mathematical operations (addition, subtraction, multiplication and division) are to chosen to keep the function set as small as possible yet being expressive. The terminals are eighter constants or the function parameters and the tree will be allowed to grow up to a given parameter.

## Tree generator

The 'fullTreeGenerator(n)' method will generate trees by choosing only functions, until the tree reaches the depth of n, and then it will choose terminals

## Operators

The four mathematical operations were modeled as a FunctionExpr and a compute-engine were build to compute the result.

### Mutation

At a given rate, a tree node will be chosen to swap its operator (if function) or its value (if constant)

### Crossover

A treenode will be chosen to be swapped by 
