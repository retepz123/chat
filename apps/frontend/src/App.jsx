import { BrowserRouter, createBrowserRouter, Route, RouterProvider, Routes } from 'react-router-dom';
import { LoaderIcon, Toaster } from 'react-hot-toast';
import Registration from './modules/pages/Registration';
import LoginPage from './modules/pages/Login';
// import ChatPage from './modules/pages/ChatPage';
import { useAuthStore } from './modules/components/lib/auth';
import { useEffect } from 'react';
import {Loader} from 'lucide-react';
import ProfilePage from './modules/pages/ProfilePage';
import SettingsPage from './modules/pages/SettingPage';
import ChatHome from './modules/pages/ChatPage';

function App() {
const { authUser, checkAuth, isCheckingAuth } = useAuthStore()

useEffect(() => {
  checkAuth()
}, [checkAuth]);

console.log({authUser});

if (isCheckingAuth && !authUser) return (

  <div className='flex items-center justify-center h-screen'><Loader className='size-10 animate-spin' /> </div>
)


  return (
     <BrowserRouter>
        <Toaster />

     <Routes>
      <Route element={<Registration />} path='/' />
      <Route element={<LoginPage />} path='/login' />
      <Route element={<ProfilePage />} path='/profile' />
      {/* <Route element={<SettingsPage /> } path='/settingpage' /> */}
      <Route element={<ChatHome />} path='/chat' />

     </Routes>
     </BrowserRouter>
  );
}

export default App;