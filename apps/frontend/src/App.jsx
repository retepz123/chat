import { BrowserRouter, createBrowserRouter, Route, RouterProvider, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Registration from './modules/pages/Registration';

function App() {



  return (
     <BrowserRouter>
     <Routes>
      <Route element={<Registration />} path='/' />
     </Routes>
     </BrowserRouter>
  );
}

export default App;