const context = require.context('./model', false, /\.js$/);
const getModel = context.keys().map(key => context(key));

export function createModel(app) {
  return getModel.map(key => {
    console.log(key.default,'store/key')
    return app.model(key.default)
  })
};