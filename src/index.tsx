import ReactDOM from 'react-dom/client';
import { Annotorious } from '@annotorious/react';
import { App } from './App';

import './style.css';
import './layout.css';

ReactDOM.createRoot(document.getElementById('app')!).render(
  <Annotorious>
    <App tei="/chapter_BCar_incl_sandhi.xml" />
  </Annotorious>
);