# openbpt-modeler-dev

This repository provides a simple dev and demo setup for diagram-js based modelers, specifically those built for use in the OpenBPT platform created using the [OpenBPT modeler template](https://github.com/bptlab/openbpt-modeler-template).

## Setup

### Prerequisites

- Node must be installed to run the demo locally.
- You have a modeler repository cloned locally.

### Dev Setup

- Navigate to the modeler repository and run `npm link`
- Clone this repository on your machine and navigate to the installation folder.
- Run `npm install`
- Run `npm link <name of your modeler repo>`
- Run `npm run dev` (for automatic re-bundling)
