# 2ndhand-market

Live demo: https://vercel.com/ilyas-projects-9436606d/2ndhand-market-jugc/8k1h7d9e1pYqZVQj9rsdXxVdmnG9

Marketplace application for second-hand goods with a product catalog, filtering, user authentication, wishlist, shopping cart, and personal account features.

## Overview

- browse products by category and department
- filter and select sections through the sidebar and departments menu
- view product cards with details and pricing
- sign in and sign up for a user account
- manage a user profile and log out
- save favorite items to the wishlist
- manage a cart with user-specific data
- persist data between sessions using localStorage
- access pages for shops, merchant details, about us, my items, and profile
- responsive layout for mobile devices

## Tech Stack

- React
- Redux Toolkit
- React Redux
- React Router DOM
- Webpack
- Babel
- CSS Modules

## Dependencies

### Core dependencies

- @reduxjs/toolkit
- react-redux
- react-router-dom

### Dev dependencies

- @babel/core
- @babel/preset-env
- @babel/preset-react
- @svgr/webpack
- babel-loader
- css-loader
- html-webpack-plugin
- style-loader
- webpack
- webpack-cli
- webpack-dev-server

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Hellpines/2ndhand-market.git
cd 2ndhand-market
```

2. Install dependencies:

```bash
npm install
```

## Running the project

### Development mode

```bash
npm start
```

The app will run via webpack-dev-server, usually at:

```text
http://localhost:8080
```

### Production build

```bash
npm run build
```

The production build will be generated in the output folder configured by webpack (typically `dist`).

## Project structure

```text
src/
  components/
  constants/
  helpers/
  hooks/
  pages/
  services/
  store/
  App.jsx
  index.jsx
public/
  index.html
package.json
webpack.config.js
```

## Note

User data, cart state, and favorites are stored in localStorage, so part of the app state persists between page reloads.
