import ReactDOM from 'react-dom/client';
import { App } from './App';

import './style.css';
import './layout.css';

ReactDOM.createRoot(document.getElementById('app')!).render(
  <App tei="/chapter_BCar_incl_sandhi.xml" />
);