"use client"
import React, { useState, useEffect } from 'react';
import { Menu, X, Home, Info, Send, Split, CalendarDays, ChevronDown, NotebookPen, SquareArrowRightExit } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { getYears } from './store/yearSlice';
import { getState } from './store/stateSlice';
import { getExam } from './store/examSlice';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(null); // Tracks which mobile accordion is open
  const pathname = usePathname();
  const dispatch = useDispatch();

  // Safely grab the specific slices from your Redux store
  const yearData = useSelector((state) => state.year);
  const stateData = useSelector((state) => state.state);

  // Consolidated Navigation Array with distinct dropdown types
  const navItems = [
    // { name: 'Home', href: '/', icon: Home },
    { name: 'States', icon: Split, dropdownType: 'state' },
    { name: 'Years', icon: CalendarDays, dropdownType: 'year' },
  ];

  // Fetch data on component mount
  useEffect(() => {
    dispatch(getYears());
    dispatch(getState());
     dispatch(getExam());
  }, [dispatch]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setMobileDropdownOpen(null);
  }, [pathname]);

  const isActive = (href) => pathname === href;

  // Helper function to dynamically render the content of the dropdowns
  const renderDropdownContent = (type, isMobile = false) => {
    const data = type === 'year' ? yearData : stateData;
    
    if (!data || data.isLoading) return <p className="text-gray-500 text-sm p-4 text-center">Loading...</p>;
    if (data.isError) return <p className="text-red-500 text-sm p-4 text-center">Failed to load</p>;
    if (!data.info || data.info.length === 0) return <p className="text-gray-500 text-sm p-4 text-center">No items found</p>;

    return (
      <div className={`grid gap-2 p-3 ${type === 'year' ? 'grid-cols-3' : 'grid-cols-2'} ${isMobile ? 'bg-white/5 rounded-xl mt-2 p-2' : ''}`}>
        {data.info.map((item) => {
          const href = type === 'year' 
            ? `year=${item._id}` 
            : `state=${item._id}`;
          const label = type === 'year' ? item.year : item.state;

          return (
            <Link
              key={item._id}
              href={`/paper?${href}`}
              onClick={()=>setIsOpen(false)}
              className={`${isMobile 
                ? 'text-white/80 hover:bg-white/20 hover:text-white' 
                : 'text-gray-700 bg-gray-50 hover:bg-[#1E3A8A] hover:text-white border border-gray-100'
              } px-2 py-2 rounded-lg text-sm font-medium transition-colors text-center capitalize truncate`}
            >
              {label}
            </Link>
          );
        })}
      </div>
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300 bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] py-3 md:py-4 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Logo */}
          <Link href="/" className="flex items-center  shrink-0">
            <img
              src="/Images/logo.webp"
              alt="PaperBoat Web PDF"
              className="h-8 sm:h-10 md:h-12"
            />
            <span className="ml-2 sm:ml-3 font-bold text-lg sm:text-xl md:text-2xl tracking-wide">
              PAPER<span className="text-[#FACC15]">BOAT</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2">

<div  className={  'relative group'}>
                  <Link
                  
                    href={"/"}
                    className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      isActive("/")
                        ? 'bg-white text-[#1E3A8A] shadow-md'
                        : 'text-white/90 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <Home size={18} className="mr-2" />
                  Home
                  </Link>

               
                
                </div>


            {navItems.map((item) => {
              const Icon = item.icon;
              
              return (
                <div key={item.name} className={item.dropdownType ? 'relative group' : ''}>
                  <div
                  
                  
                    className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      isActive(item.href)
                        ? 'bg-white text-[#1E3A8A] shadow-md'
                        : 'text-white/90 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <Icon size={18} className="mr-2" />
                    {item.name}
                    {item.dropdownType && <ChevronDown size={14} className="ml-1 opacity-70 group-hover:rotate-180 transition-transform duration-300" />}
                  </div>

               
                  {item.dropdownType && (
                    <div className="absolute left-0 top-full pt-3 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 z-50">
                      <div className={`bg-white rounded-xl shadow-xl border border-gray-100 ${item.dropdownType === 'state' ? 'w-80' : 'w-64'}`}>
                        {renderDropdownContent(item.dropdownType)}
                      </div>
                    </div>
                  )}
                </div>
              );
            })
            
            }




 <div  className={  'relative group'}>
                  <Link
                  
                    href={"/notes"}
                    className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      isActive("/notes")
                        ? 'bg-white text-[#1E3A8A] shadow-md'
                        : 'text-white/90 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <NotebookPen size={18} className="mr-2" />
                  Notes
                  </Link>

               
                
                </div>




 <div  className={  'relative group'}>
                  <Link
                  
                    href={"/articles"}
                    className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      isActive("/articles")
                        ? 'bg-white text-[#1E3A8A] shadow-md'
                        : 'text-white/90 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <SquareArrowRightExit size={18} className="mr-2" />
                  Articles
                  </Link>

               
                
                </div>


 <div  className={  'relative group'}>
                  <Link
                  
                    href={"/about"}
                    className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      isActive("/about")
                        ? 'bg-white text-[#1E3A8A] shadow-md'
                        : 'text-white/90 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <Info size={18} className="mr-2" />
                  About
                  </Link>

               
                
                </div>




            <Link href={"https://t.me/thepaperboat"} target='_blank' className="ml-4 flex items-center bg-[#FACC15] hover:bg-[#EAB308] text-[#1E3A8A] px-5 py-2.5 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0">
              <Send size={18} className="mr-2" />
              Join us
            </Link>
          </nav>

          {/* Mobile Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden relative z-[60] p-2 -mr-2 rounded-lg text-white hover:bg-white/10 transition-all duration-200"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm lg:hidden z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Menu Sidebar */}
      <div
        className={`fixed inset-y-0 right-0 w-[280px] sm:w-80 bg-gradient-to-b from-[#1E3A8A] to-[#3B82F6] shadow-2xl transform transition-transform duration-300 ease-in-out lg:hidden z-50 flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <nav className="px-6 pt-24 pb-8 flex-1 overflow-y-auto">



          <div className="space-y-2">
 <div  className="flex flex-col">
                  <div className="flex items-center justify-between">
                    <Link
                   
                      href={"/"}
                      className={`flex items-center flex-1 px-4 py-3.5 rounded-xl font-medium transition-all duration-200 ${
                        isActive("/")
                          ? 'bg-white text-[#1E3A8A] shadow-md'
                          : 'text-white/90 hover:bg-white/10'
                      }`}
                    >
                      <Home size={20} className="mr-3" />
                    Home
                    </Link>

                   
                  </div>

                
                 
                </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              const hasDropdown = !!item.dropdownType;
              const isDropdownOpen = mobileDropdownOpen === item.name;

              return (
                <div key={item.name} className="flex flex-col">
                  <div className="flex items-center justify-between">
                    <div
                   
                      onClick={() => !hasDropdown && setIsOpen(false)}
                      className={`flex items-center flex-1 px-4 py-3.5 rounded-xl font-medium transition-all duration-200 ${
                        isActive(item.href)
                          ? 'bg-white text-[#1E3A8A] shadow-md'
                          : 'text-white/90 hover:bg-white/10'
                      }`}
                    >
                      <Icon size={20} className="mr-3" />
                      {item.name}
                    </div>

                    {/* Accordion Toggle Arrow for Mobile */}
                    {hasDropdown && (
                      <button
                        onClick={() => setMobileDropdownOpen(isDropdownOpen ? null : item.name)}
                        className="p-3 ml-2 text-white/80 hover:bg-white/10 rounded-xl transition-colors"
                      >
                        <ChevronDown 
                          size={20} 
                          className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} 
                        />
                      </button>
                    )}
                  </div>

                  {/* Mobile Dropdown Content */}
                  {hasDropdown && isDropdownOpen && (
                     <div className="pl-4 pr-2 pb-2">
                       {renderDropdownContent(item.dropdownType, true)}
                     </div>
                  )}
                </div>
              );
            })}


 <div  className="flex flex-col">
                  <div className="flex items-center justify-between">
                    <Link
                   
                      href={"/notes"}
                      className={`flex items-center flex-1 px-4 py-3.5 rounded-xl font-medium transition-all duration-200 ${
                        isActive("/notes")
                          ? 'bg-white text-[#1E3A8A] shadow-md'
                          : 'text-white/90 hover:bg-white/10'
                      }`}
                    >
                      <NotebookPen size={20} className="mr-3" />
                    Notes
                    </Link>

                   
                  </div>

                
                 
                </div>

 <div  className="flex flex-col">
                  <div className="flex items-center justify-between">
                    <Link
                   
                      href={"/articles"}
                      className={`flex items-center flex-1 px-4 py-3.5 rounded-xl font-medium transition-all duration-200 ${
                        isActive("/articles")
                          ? 'bg-white text-[#1E3A8A] shadow-md'
                          : 'text-white/90 hover:bg-white/10'
                      }`}
                    >
                      <SquareArrowRightExit size={20} className="mr-3" />
                    Articles
                    </Link>

                   
                  </div>

                
                 
                </div>


            
             <div  className="flex flex-col">
                  <div className="flex items-center justify-between">
                    <Link
                   
                      href={"/about"}
                      className={`flex items-center flex-1 px-4 py-3.5 rounded-xl font-medium transition-all duration-200 ${
                        isActive("/about")
                          ? 'bg-white text-[#1E3A8A] shadow-md'
                          : 'text-white/90 hover:bg-white/10'
                      }`}
                    >
                      <Info size={20} className="mr-3" />
                    About
                    </Link>

                   
                  </div>

                
                 
                </div>
          </div>



          <div className="pt-6 mt-6 border-t border-white/20">
            <button
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center justify-center px-4 py-3.5 rounded-xl font-bold bg-[#FACC15] text-[#1E3A8A] hover:bg-[#EAB308] transition-all duration-200 shadow-md"
            >
              <Send size={20} className="mr-2" />
              Join us
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;