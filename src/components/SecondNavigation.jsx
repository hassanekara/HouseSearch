import { useState } from 'react';
import { Link } from 'react-router-dom';

const SecondNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
     <Link to={"/"}>
     <img
            src="/Images/MyLogo.png"
            alt="House Search"
            className="h-12 w-12 mr-3"
          />
     </Link>
        <div className="block lg:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            {isOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            )}
          </button>
        </div>
        <div className={`lg:flex ${isOpen ? 'block' : 'hidden'} w-full lg:w-auto`}>
          <ul className="lg:flex lg:items-center">
            <Link to={"/sign-in"}>
            <li className="text-white lg:mx-2 my-2 lg:my-0">
              <a href="#contact" className="block px-3 py-2 rounded-md hover:bg-gray-700">Admin.....</a>
            </li>
            </Link>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default SecondNavigation;
