import { Link } from 'react-router';

const IMAGE_EXAMPLES = [
  ['Image annotation Example', 'https://heidicon.ub.uni-heidelberg.de/manifest/iiif/1719570/manifest.json'],
  ['Hartmann_02', 'https://pages.ceres.rub.de/m_and_m/images/derivatives/iiif/Hartmann_02/manifest.json'],
  ['Gerrit_01', 'https://pages.ceres.rub.de/m_and_m/images/derivatives/iiif/Gerrit_01/manifest.json'],
  ['Nikita_01', 'https://pages.ceres.rub.de/m_and_m/images/derivatives/iiif/Nikita_01/manifest.json'],
  ['Samane_01', 'https://pages.ceres.rub.de/m_and_m/images/derivatives/iiif/Samane_01/manifest.json'],
  ['Hartmann_01', 'https://pages.ceres.rub.de/m_and_m/images/derivatives/iiif/Hartmann_01/manifest.json']
];
export const Start = () => {

  return (
    <main className="p-6">
      <h1 className="text-xl font-semibold tracking-wide">
        Recogito Wireframes
      </h1>

      <h2 className="font-semibold mt-6">Text</h2>

      <ul className="mt-4 space-y-1">
        <li>
          <Link 
            to="text-1"
            className="hover:underline text-sky-700">
            Text annotation interface (Buddhacarita)
          </Link>
        </li>

        <li>
          <Link 
            to="text-2"
            className="hover:underline text-sky-700">
            Text annotation interface (Sample Reddit Thread)
          </Link>
        </li>

        <li>
          <Link 
            to="text-3"
            className="hover:underline text-sky-700">
            Text annotation with experimental marker renderer (Sample Reddit Thread)
          </Link>
        </li>

        <h2 className="font-semibold mt-6">Image</h2>

        {IMAGE_EXAMPLES.map((t, idx) => (
          <li>
            <Link 
              to={`image-${idx+1}`}
              className="hover:underline text-sky-700">
              {t[0]}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )

}