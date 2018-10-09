import dva from 'dva';
import medel from 'models/demoModel';
import DemoRoute from 'routes/demoRoute';

const app = dva();

app.model(medel);
app.router(() => <DemoRoute />);
app.start('#root');
