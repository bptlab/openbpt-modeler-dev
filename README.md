# openbpt-modeler-dev

This repository provides a simple dev and demo setup for diagram-js based modelers, specifically those built for use in the OpenBPT platform created using the [OpenBPT modeler template](https://github.com/bptlab/openbpt-modeler-template).

## Setup for developing a modeler locally

### Prerequisites

- Node must be installed to run the demo locally.
- You have a modeler repository cloned locally.

### Setup

- Navigate to the modeler repository and run `npm link`
- Clone this repository on your machine and navigate to the installation folder.
- Run `npm install`
- Run `npm link <name of your modeler repo>`
- Update the imports in `index.js`
- Update the `exampleDiagram.xml`
- Run `npm run dev` (for automatic re-bundling)

This will start the application on [http://localhost:3000](http://localhost:3000).

## Setup for existing libraries

### Prerequisites

- Node must be installed to run the demo locally.

### Setup

- Clone this repository on your machine and navigate to the installation folder.
- Run `npm install`
- Run `npm install <your modeler library>` (e.g., ptn-js)
- Update the imports in `index.js`
- Update the `exampleDiagram.xml`
- Run `npm run dev` (for automatic re-bundling)
