import { BrowserRouter, createBrowserRouter, Route, RouterProvider, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Registration from './modules/pages/Registration';
import LoginPage from './modules/pages/Login';

function App() {



  return (
     <BrowserRouter>
     <Routes>
      <Route element={<Registration />} path='/' />
      <Route element={<LoginPage />} path='/login' />
     </Routes>
     </BrowserRouter>
  );
}

export default App;