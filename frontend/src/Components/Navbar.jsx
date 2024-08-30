import React, { useEffect, useState } from 'react';
import NavLinks from './NavLinks';
import Menu from './Menu'; 
import { useLocation } from 'react-router-dom';

function Navbar() {
  const [width, setWidth] = useState(window.innerWidth);
  const [menu, setMenu] = useState(window.innerWidth <= 700);
  const [sidebar, setSidebar] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      setMenu(window.innerWidth <= 700);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    setSidebar(false);
  }, [location]);

  const onClose = () => {
    setSidebar(false);
  };

  return (
    <div className='relative w-full p-5 bg-slate-800 flex justify-between items-center'>
      <h1 className='text-gray-100 text-3xl font-semibold'>
        <span className='text-orange-600'>B</span>log
        <span className='text-orange-600'>S</span>phere
      </h1>
      {sidebar ? (
        <div className={`fixed inset-0 bg-gray-800 flex flex-col transition-transform duration-300 ease-in-out ${sidebar ? 'translate-x-0' : '-translate-x-full'}`}>
          <Menu onClose={onClose} />
        </div>
      ) : (
        <>
          {menu ? (
            <i
              onClick={() => setSidebar(true)}
              className='fa-solid fa-bars text-white text-xl cursor-pointer'
            ></i>
          ) : (
            <NavLinks isNavbar={true} />
          )}
        </>
      )}
    </div>
  );
}

export default Navbar;
