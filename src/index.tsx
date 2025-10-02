import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router';
import { Annotorious } from '@annotorious/react';
import { Start } from './start';
import { ImageAnnotation } from './image-annotation';
import { TextAnnotation } from './text-annotation';

import './index.css';

const TEI_URL = 'chapter_BCar_incl_sandhi.xml';
// const TEI_URL = '/Rumi_Masnavi_1.xml';
// const TEI_URL = '/True_udu82q.xml';
// const TEI_URL = '/Videvdad.xml';

// const IIIF_URL = 'https://manifests.collections.yale.edu/yuag/obj/9874';
const IIIF_URL = 'https://heidicon.ub.uni-heidelberg.de/manifest/iiif/1719570/manifest.json';

ReactDOM.createRoot(document.getElementById('app')!).render(
  <HashRouter>
    <Routes>
      <Route path="/" element={<Start /> } />

      <Route path="text" element={
        <Annotorious>
          <TextAnnotation 
            // isRTL
            url={TEI_URL} />
        </Annotorious>
      } />

      <Route path="image" element={
        <Annotorious>
          <ImageAnnotation 
            url={IIIF_URL} />
        </Annotorious>
      } />
    </Routes>
  </HashRouter>
);