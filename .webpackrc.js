const path = require('path')

// export default {
//   "proxy": {
//     "/api": {
//       "target": "http://148.70.121.59:9001",
//       "changeOrigin": true,
//       "pathRewrite": {
//         "^/api": ""
//       }
//     }
//   },
//   "alias": {
//     "@": path.join(__dirname, "./src")
//   }

// }
export default {
  "extraBabelPlugins": [
    ["import", { libraryName: "antd", libraryDirectory: "es", style: "css" }],
    ["@babel/plugin-proposal-decorators", { "legacy": true }]
  ],
  "proxy": {
    "/api": {
      "target": "http://148.70.121.59:9001",
      "changeOrigin": true,
      "pathRewrite": { "^/api": "" }
    }
  },
  "env": {
    "development": {
      "extraBabelPlugins": ["dva-hmr"]
    }
  },
  "alias": {
    "@": path.join(__dirname, "./src")
  },
  "hash": false,
};