import dva from 'dva';
import './index.scss';
import { createModel } from './models'
import { createBrowserHistory } from 'history'
// 1. Initialize
const app = dva({
  history: createBrowserHistory()
});

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models').default);

createModel(app)

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
