## Install

1. Clone the repository:

```bash
git clone https://github.com/Stypticm/test-task.git

```

2. Install dependencies:

```bash
cd test-task
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. The browser will automatically open at http://localhost:3000

5. Reusing the component
To use the component in another project, add the following to your webpack.config.js:

```js
plugins: [
    new ModuleFederationPlugin({
      remotes: {
        MyApp: 'MyApp@http://localhost:3001/remoteEntry.js', // Replace with your remote entry point
      },
    }),
  ],
```

How it works:
1. The first project (MyApp) exports MyComponent using ModuleFederationPlugin.
2. Your project dynamically loads it via remoteEntry.js.
3. The component works without additional dependencies, as it shares common libraries react and react-dom.