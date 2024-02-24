import React, { useContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar, Sidebar } from './components';
import { Orders, Customers, Categories, Products } from './pages';
import { useStateContext } from './contexts/ContextProvider';
import { UserContext } from '../../Context/AllContext/UserContext';
import Error from "../../Components/Error";
import { useState } from 'react';

const AdminRoutes = () => {
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
  } = useStateContext();

  let user = useContext(UserContext);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  useEffect(() => {
    if(user.mongoUser){
      setFlag(user.mongoUser.role === "admin");
    }
  }, [user.mongoUser]);

  if(!flag){
    return <Error/>
  }

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <div className="flex relative dark:bg-main-dark-bg">
        {activeMenu ? (
          <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
            <Sidebar />
          </div>
        ) : (
          <div className="w-0 dark:bg-secondary-dark-bg">
            <Sidebar />
          </div>
        )}
        <div
          className={
            activeMenu
              ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full'
              : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2'
          }
        >
          <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
            <Navbar />
          </div>
          <div>
            <Routes>
              {/* dashboard  */}
              {/* <Route path="/" element={<Ecommerce />} /> */}
              {/* <Route path="/ecommerce" element={<Ecommerce />} /> */}
              {/* pages  */}
              <Route path="/" element={<Products />} />
              <Route path="/products" element={<Products />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/categories" element={<Categories />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminRoutes;
