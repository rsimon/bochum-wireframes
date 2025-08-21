import ReactDOM from 'react-dom/client';
import { Annotorious } from '@annotorious/react';
import { App } from './app';

import './styles/index.css';

ReactDOM.createRoot(document.getElementById('app')!).render(
  <Annotorious>
    <App
      url="/chapter_BCar_incl_sandhi.xml" />
  </Annotorious>
);