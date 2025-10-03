import { Link } from 'react-router';

export const Start = () => {

  return (
    <main className="p-6">
      <h1 className="text-xl font-semibold tracking-wide">
        Recogito Wireframes
      </h1>

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
            to="image"
            className="hover:underline text-sky-700">
            Image annotation interface
          </Link>
        </li>
      </ul>
    </main>
  )

}