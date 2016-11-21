import {render} from 'react-dom';

import 'bootstrap/dist/css/bootstrap.css';
import 'react-select/dist/react-select.css';
import './css/style.css';

// Routes
import routes from './router';

render(routes, document.getElementById('root'));
