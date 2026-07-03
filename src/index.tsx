import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router';
import { Annotorious } from '@annotorious/react';
import { Start } from './start';
import { ImageAnnotation } from './image-annotation';
import { TextAnnotation } from './text-annotation';

import './index.css';

const TEI_URL_1 = 'chapter_BCar_incl_sandhi.xml';
// const TEI_URL = '/Rumi_Masnavi_1.xml';
// const TEI_URL_2 = '/True_udu82q.xml';
const TEI_URL_2 = 'example-document-en.xml';
// const TEI_URL = '/Videvdad.xml';


// const IIIF_URL = 'https://manifests.collections.yale.edu/yuag/obj/9874';
// const IIIF_URL = 'https://heidicon.ub.uni-heidelberg.de/manifest/iiif/1719570/manifest.json';

const IIIF_URLS = [
  'https://heidicon.ub.uni-heidelberg.de/manifest/iiif/1719570/manifest.json',
  'https://pages.ceres.rub.de/m_and_m/images/derivatives/iiif/Hartmann_02/manifest.json',
  'https://pages.ceres.rub.de/m_and_m/images/derivatives/iiif/Gerrit_01/manifest.json',
  'https://pages.ceres.rub.de/m_and_m/images/derivatives/iiif/Nikita_01/manifest.json',
  'https://pages.ceres.rub.de/m_and_m/images/derivatives/iiif/Samane_01/manifest.json',
  'https://pages.ceres.rub.de/m_and_m/images/derivatives/iiif/Hartmann_01/manifest.json'
];

ReactDOM.createRoot(document.getElementById('app')!).render(
  <HashRouter>
    <Routes>
      <Route path="/" element={<Start /> } />

      <Route path="text-1" element={
        <Annotorious>
          <TextAnnotation 
            // isRTL
            theme="ORANGE"
            url={TEI_URL_1} />
        </Annotorious>
      } />

      <Route path="text-2" element={
        <Annotorious>
          <TextAnnotation 
            // isRTL
            theme="CYAN"
            url={TEI_URL_2} />
        </Annotorious>
      } />

      <Route path="text-3" element={
        <Annotorious>
          <TextAnnotation 
            // isRTL
            theme="CYAN"
            url={TEI_URL_2} 
            useMarkerRenderer />
        </Annotorious>
      } />

      {IIIF_URLS.map((url, idx) => (
        <Route path={`image-${idx + 1}`} element={
          <Annotorious>
            <ImageAnnotation 
              url={url} />
          </Annotorious>
        }/>
      ))}
    </Routes>
  </HashRouter>
);