import ReactDOM from 'react-dom/client';
import { Annotorious } from '@annotorious/react';
import { App } from './app';

import './styles/index.css';

const URL = '/chapter_BCar_incl_sandhi.xml';
// const URL = '/Rumi_Masnavi_1.xml';
// const URL = '/True_udu82q.xml';
// const URL = '/Videvdad.xml';

ReactDOM.createRoot(document.getElementById('app')!).render(
  <Annotorious>
    <App 
      // isRTL 
      url={URL} />
  </Annotorious>
);