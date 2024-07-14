"use client"
import Link from 'next/link';
import { useState } from 'react';
import { CgClose, CgMenuRightAlt  } from "react-icons/cg";
import { Bodoni_Moda } from "next/font/google";
import { usePathname } from 'next/navigation';

const bodoni = Bodoni_Moda({ subsets: ["latin"] });

const Navbar = () => {
  const [navbar, setNavbar] = useState(false);

  const pathname = usePathname();

  return (
    
      <div className="">
      <nav className="sticky text-gray-600 shadow">
        <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8 lg:px-12 py-1">
          <div>
            <div className="flex items-center justify-between">
              <Link href="/" className='text-2xl font-bold'>
                <span className={bodoni.className}>Exclusive</span>
              </Link>
              <div className="md:hidden">
                <button
                  className="p-2 text-gray-400 rounded-md outline-none focus:border-gray-400 focus:border"
                  onClick={() => setNavbar(!navbar)}
                >
                  {navbar ? (
                    <CgClose />
                  ) : (
                    <CgMenuRightAlt />
                  )}
                </button>
              </div>
            </div>
          </div>
          <div>
            <div
              className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-2 md: ${
                navbar ? 'block' : 'hidden'
              }`}
            >
                <ul className="h-screen md:h-auto items-center justify-center md:flex font-medium">
                <li className="pb-6 text-xl md:text-sm py-2 md:px-6 text-center md:pb-3 border-b-1 md:border-b-0  md:hover:text-goldish">
                  <Link href="/" onClick={() => setNavbar(!navbar)} className={`${pathname==='/' ? 'text-goldish' : ''}`}>
                    Dashboard
                  </Link>
                </li>
                <li className="pb-6 text-xl md:text-sm py-2 px-6 text-center md:pb-3 border-b-1 md:border-b-0 md:hover:text-goldish">
                  <Link href="/products" onClick={() => setNavbar(!navbar)} className={`${pathname==='/products' ? 'text-goldish' : ''}`}>
                    Products
                  </Link>
                </li>
                <li className="pb-6 text-xl md:text-sm py-2 px-6 text-center md:pb-3 border-b-1 md:border-b-0 md:hover:text-goldish">
                  <Link href="/orders" onClick={() => setNavbar(!navbar)} className={`${pathname==='/orders' ? 'text-goldish' : ''}`}>
                    Orders
                  </Link>
                </li>
                <li className="pb-6 text-xl md:text-sm py-2 px-6 text-center md:pb-3 border-b-1 md:border-b-0 md:hover:text-goldish">
                  <Link href="/orders" onClick={() => setNavbar(!navbar)} className={`${pathname==='/sale' ? 'text-goldish' : ''}`}>
                    Sale
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
      );
}

export default Navbar;