
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import './index.css';

import App from './App';

ReactDOM.render(
  <BrowserRouter>
  <DndProvider backend={HTML5Backend}>
    <App />
    </DndProvider>
    </BrowserRouter>,
  
  document.getElementById('root')
);

