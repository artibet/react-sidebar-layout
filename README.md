## Overview

**react-sidebar-layout** is a react component that helps you quickly scaffold your new dashboard application. Menu options along with their actions are described in arrays of objects. The overall appearance are fully customizable through theme templates and props.

The layout supports:
-	A fully customizable and responsive sidebar.
-	A topbar with simple options and dropdown menus.
-	A sidebar logo
-	A topbar logo

There are two predefined themes (a dark theme and a light one) for illustrative purposes. Feel free to create and use your own one with this theme template as a guide. Moreover, you can easily modify individual theme options through the **customize** prop.

## Installation

**react-sidebar-layout** apart from react and react-dom, it uses @mui/material library components. The following list of packages are peer dependencies  and should be allready installed before installing the component:

- react >= 17.0.0
- react-dom >= 17.0.0
- @mui/material >= 5.11.0
- @emotion/react >= 11.10.0
- @emotion/styled >= 11.10.0
- @mui/icons-material >= 5.11.0
- @fontsource/roboto >=  4.5.0

The latest versions can be installed as follows:

**npm**

```shell
npm install react
npm install react-dom
npm install @mui/material
npm install @emotion/react
npm install @emotion/styled
npm install @mui/icons-material
npm install @fontsource/roboto
```

**yarn**

```shell
yarn add react
yarn add react-dom
yarn add @mui/material
yarn add @emotion/react
yarn add @emotion/styled
yarn add @mui/icons-material
yarn add @fontsource/roboto
```

@mui/material library is designed to use the **Roboto** font by default. You should import it in your app's entry point:

```javascript
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
```

Finally, install react-sidebary-layout component itself:

**npm**

```shell
npm install @artibet/react-sidebar-layout
```

**yarn**

```shell
yarn add @artibet/react-sidebar-layout
```

## Usage

### Bare layout

Create a brand new new react application. You can use classic npx or vite:

**npx**

```shell
npx create-react-app demo-app
```

**vite**

```
npm create vite demo-app
```

Follow the installation instructions as described above. 

Remove any .css import from entry point (index.js or main.jsx) and add roboto font family. Your entry point file should look like this:

```js
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

Into App.js(jsx) import react-sidebar-layout and return it without any props. Again, remove any .css file import:

```js
import React from 'react'
import { SidebarLayout } from '@artibet/react-sidebar-layout'

function App() {

  return (
    <SidebarLayout />
  )
}

export default App
```

Now run the application. The default theme is the **dark** one and you should see something like this:







