
"use client";

import { 
  ChartArea, 
  Menu, 
  X, 
  Home, 
  Users, 
  Settings, 
  FileText, 
  ShoppingCart,
  BarChart,
  Mail,
  Calendar,
  HelpCircle,
  LogOut,
  ChevronDown,
  Bell,
  Search,
  NotepadTextDashed,
  BookOpenCheck,
  UserRoundCog,
  NotebookPen,
  Notebook
} from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AdminUrl } from './admin-utils';

const Slider = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [expandedMenus, setExpandedMenus] = useState([]);
  const pathname = usePathname();
const route = useRouter()
  const toggleSubMenu = (menuName) => {
    setExpandedMenus(prev =>
      prev.includes(menuName)
        ? prev.filter(item => item !== menuName)
        : [...prev, menuName]
    );
  };

  const mainLinks = [
    {
      name: "Dashboard",
      link: "dashboard",
      icon: Home
    },
    {
      name: "Analytics",
      link: "analytics",
      icon: BarChart
    },
    {
      name: "Category",
      link: "category",
      icon: ChartArea,
      
    },
    
     {
      name: "Exams",
      link: "exams",
      icon: BookOpenCheck,
     
    },
    {
      name: "Question Paper",
      link: "paper",
      icon: NotepadTextDashed,
     
    },
   
    {
      name:"Editors",
      link:"editor",
      icon : UserRoundCog,
    },
      {
      name:"Notes User",
      link:"notes-users",
      icon : NotebookPen,
    },
     {
      name:"Notes",
      link:"notes",
      icon : Notebook,
    }


  ];

  const bottomLinks = [
    {
      name: "Settings",
      link: "settings",
      icon: Settings,
      subItems: [
        { name: "General", link: "settings/general" },
        { name: "Security", link: "settings/security" },
        { name: "Notifications", link: "settings/notifications" },
        { name: "Billing", link: "settings/billing" }
      ]
    },
    {
      name: "Help",
      link: "help",
      icon: HelpCircle
    }
  ];


const handelLogout = async()=>{
  try {
    const response = await axios.get(`${AdminUrl}/auth/admin/logout`);
    const data = await response.data
if(data.success){
  toast.success(data.message)
route.push("/login/admin")
}

  } catch (error) {
    toast.error(error.response.data.message)
  }
}


  return (
    <div className={`h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white py-4 flex flex-col transition-all duration-300 shadow-xl ${isOpen ? 'w-72' : 'w-20'}`}>
      
      {/* Top Header with Logo and Toggle */}
      <div className={`flex items-center mb-8 px-4 ${isOpen ? 'justify-between' : 'justify-center'}`}>
        {isOpen && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <span className="font-bold text-lg">A</span>
            </div>
            <h1 className="text-xl font-bold tracking-wider bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              AdminHub
            </h1>
          </div>
        )}
        
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg hover:bg-gray-700 transition-all duration-200 hover:scale-105"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Search Bar - Only visible when open */}
      {isOpen && (
        <div className="px-4 mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full text-black bg-gray-700/50 border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
        </div>
      )}

      {/* Navigation Links */}
      <div className='flex-1 overflow-y-auto overflow-x-hidden px-2'>
        <div className='space-y-1'>
          {mainLinks.map((item, index) => {
            const Icon = item.icon;
            const hasSubItems = item.subItems && item.subItems.length > 0;
            const isExpanded = expandedMenus.includes(item.name);
            const isActive = pathname==`/admin/${item.link}`;
            
            return (
              <div key={index}>
                <div
                  onClick={() => hasSubItems && toggleSubMenu(item.name)}
                  className={`flex items-center p-2 rounded-lg cursor-pointer transition-all duration-200 ${
                    isActive && !hasSubItems
                      ? 'bg-blue-600 text-white'
                      : 'hover:bg-gray-700/50 text-gray-300 hover:text-white'
                  } ${isOpen ? 'justify-between' : 'justify-center'}`}
                >
                  <Link 
                    href={`/admin/${item.link}`}
                    className={`flex items-center flex-1 ${isOpen ? 'gap-3' : 'justify-center'}`}
                    onClick={(e) => hasSubItems && e.preventDefault()}
                  >
                    <Icon size={20} className="shrink-0" />
                    {isOpen && (
                      <span className="text-sm font-medium whitespace-nowrap">{item.name}</span>
                    )}
                  </Link>
                  
                  {isOpen && item.badge && (
                    <span className="bg-red-500 text-xs px-2 py-1 rounded-full">
                      {item.badge}
                    </span>
                  )}
                  
                  {isOpen && hasSubItems && (
                    <ChevronDown 
                      size={16} 
                      className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                    />
                  )}
                </div>

                {/* Submenu Items */}
                {isOpen && hasSubItems && isExpanded && (
                  <div className="ml-8 mt-1 space-y-1">
                    {item.subItems?.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        href={`/admin/${subItem.link}`}
                        className={`flex items-center gap-3 p-2 rounded-lg text-sm transition-all duration-200 ${
                          pathname?.includes(subItem.link)
                            ? 'bg-blue-600/50 text-white'
                            : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                        }`}
                      >
                        <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                        <span className="whitespace-nowrap">{subItem.name}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Divider */}
        {isOpen && <div className="my-4 border-t border-gray-700"></div>}

        {/* Bottom Links */}
        <div className='space-y-1'>
          {bottomLinks.map((item, index) => {
            const Icon = item.icon;
            const hasSubItems = item.subItems && item.subItems.length > 0;
            const isExpanded = expandedMenus.includes(item.name);
            
            return (
              <div key={index}>
                <div
                  onClick={() => hasSubItems && toggleSubMenu(item.name)}
                  className={`flex items-center p-2 rounded-lg cursor-pointer hover:bg-gray-700/50 text-gray-300 hover:text-white transition-all duration-200 ${
                    isOpen ? 'justify-between' : 'justify-center'
                  }`}
                >
                  <Link 
                    href={`/admin/${item.link}`}
                    className={`flex items-center flex-1 ${isOpen ? 'gap-3' : 'justify-center'}`}
                    onClick={(e) => hasSubItems && e.preventDefault()}
                  >
                    <Icon size={20} className="shrink-0" />
                    {isOpen && (
                      <span className="text-sm font-medium whitespace-nowrap">{item.name}</span>
                    )}
                  </Link>
                  
                  {isOpen && hasSubItems && (
                    <ChevronDown 
                      size={16} 
                      className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                    />
                  )}
                </div>

                {/* Submenu Items for bottom links */}
                {isOpen && hasSubItems && isExpanded && (
                  <div className="ml-8 mt-1 space-y-1">
                    {item.subItems?.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        href={`/admin/${subItem.link}`}
                        className="flex items-center gap-3 p-2 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-gray-700/50 transition-all duration-200"
                      >
                        <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                        <span className="whitespace-nowrap">{subItem.name}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* User Profile Section */}
      <div onClick={handelLogout} className={`mt-auto pt-4 px-2 border-t border-gray-700 ${isOpen ? 'block' : 'flex justify-center'}`}>
        <div className={`flex items-center ${isOpen ? 'gap-3' : 'flex-col'} p-2 rounded-lg hover:bg-gray-700/50 transition-colors cursor-pointer`}>
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shrink-0">
            <span className="text-sm font-bold">JD</span>
          </div>
          {isOpen && (
            <>
              <div className="flex-1 min-w-0" >
                <p className="text-sm font-medium truncate">John Doe</p>
                <p className="text-xs text-gray-400 truncate">admin@example.com</p>
              </div>
              <LogOut size={18} className="text-gray-400 hover:text-white transition-colors" />
            </>
          )}
        </div>
      </div>

      {/* Notification Bell - Only visible when collapsed */}
      {!isOpen && (
        <div className="flex justify-center mt-4">
          <div className="relative">
            <Bell size={20} className="text-gray-400 hover:text-white transition-colors cursor-pointer" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Slider;