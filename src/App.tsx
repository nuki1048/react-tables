import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppNavbar from '@/components/navbar';
import EditorPage from '@/pages/editor';
import HomePage from '@/pages/home';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomePage />,
    },
    {
      path: '/editor/:tableName',
      element: <EditorPage />,
    },
  ]);
  return (
    <>
      <AppNavbar />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
