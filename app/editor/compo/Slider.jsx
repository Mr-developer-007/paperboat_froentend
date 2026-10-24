"use client"
import React, { useEffect, useState } from 'react';
import { 
  User, Settings, FilePlus, MessageSquare, 
  LogOut, ChevronLeft, ChevronRight, LayoutDashboard,
  Bell,
  Newspaper
} from 'lucide-react';
import axios from 'axios';
import { editor_url } from '@/components/utils';
import { toast } from 'react-toastify';
import LodingEditor from './LodingEditor';
import Link from 'next/link';
axios.defaults.withCredentials =true;


const Slider = () => {
    const [userData,setUserData]=useState( )
  const [isOpen, setIsOpen] = useState(true);
const [loading,setLoading]=useState(true)


const fetchEditor = async()=>{
    try {setLoading(true)
        
const response = await axios.get(`${editor_url}/auth/verifyeditor`,{withCredentials:true})
const data = await response.data;

if(data.success){
  setUserData(data.data)
}else{
  location.href="/login/editor"
}
    } catch (error) {
        
      location.href="/login/editor"
    }finally{
      setLoading(false)
    }
}


useEffect(()=>{
    fetchEditor()
},[])



if(loading){
    return(
        <LodingEditor />
    )
}
  const user = userData 

  

const handelLogout=async()=>{
try {
    const response = await axios.get(`${editor_url}/auth/logout`);
    const data = await response.data;
    if(data.success){
        toast.success(data.message)
     location.href="/login/editor"

    }
} catch (error) {
    toast.error(error.response.data.message)
}
}


  return (
    <div className={`
      relative h-screen transition-all duration-500 ease-in-out
      ${isOpen ? 'w-72' : 'w-20'} 
     border-r border-white/10 p-4 flex flex-col shadow-2xl
    `}>
      
      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -right-3 top-10 bg-black  text-white  rounded-full p-1 border-2 border-gray-950z-50"
      >
        {isOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
      </button>

      {/* User Branding */}
      <div className={`flex items-center mb-8 ${isOpen ? 'px-2' : 'justify-center'}`}>
        <div className="min-w-[40px] h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-indigo-500/20 shadow-lg">
          <User size={24} className="text-white" />
        </div>
        {isOpen && (
          <div className="ml-3 overflow-hidden">
            <p className="text-sm font-bold  truncate">{user?.name}</p>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Premium Editor</p>
          </div>
        )}
      </div>

      {/* Main Nav */}
      <div className="flex-1">
        <p className={`text-[10px] font-bold text-slate-500 mb-4 px-4 tracking-widest ${!isOpen && 'text-center'}`}>
          {isOpen ? 'MAIN MENU' : '•••'}
        </p>
        <NavItem link={"/editor/create"} isOpen={isOpen} icon={FilePlus} label="Create Article" color="text-blue-400" />
        <NavItem  link={"/editor/article"} isOpen={isOpen} icon={Newspaper} label="Articles" color="text-purple-400"  />
               
               
                <NavItem  link={"/"} isOpen={isOpen} icon={MessageSquare} label="Messages" color="text-emerald-400" badge="3" />

        <NavItem  link={"/"} isOpen={isOpen} icon={Bell} label="Notifications" color="text-orange-400" />
      </div>

      {/* Settings & Bottom */}
      <div className="mt-auto border-t border-white/5 pt-4">
        <NavItem  link={"/"} isOpen={isOpen} icon={Settings} label="Settings" color="text-slate-400" />
        <button 
        
        onClick={handelLogout}
        className={`
          flex items-center w-full p-3 rounded-xl transition-all text-red-400 hover:bg-red-500/10 group
          ${isOpen ? 'px-4' : 'justify-center'}
        `}>
          <LogOut size={22} className="group-hover:-translate-x-1 transition-transform" />
          {isOpen && <span className="ml-4 font-semibold text-sm">Logout</span>}
        </button>
      </div>

    </div>
  );
};

export default Slider;



const NavItem = ({ icon: Icon, label, color, badge ,isOpen,link}) => (
    <Link href={link} className={`
      relative flex items-center w-full p-3 my-1 rounded-xl transition-all duration-300 group
      ${isOpen ? 'px-4' : 'justify-center'}
      hover:bg-white/10 hover:shadow-lg
    `}>
      <Icon size={22} className={`${color} transition-transform group-hover:scale-110`} />
      
      {isOpen && (
        <span className="ml-4 font-medium tex-200 text-sm">{label}</span>
      )}

      {badge && isOpen && (
        <span className="ml-auto bg-blue-600 text-[10px] px-2 py-0.5 rounded-full text-white">
          {badge}
        </span>
      )}

      {/* Tooltip for collapsed state */}
      {!isOpen && (
        <div className="absolute left-16 scale-0 group-hover:scale-100 transition-all bg-slate-800 text-white text-xs p-2 rounded-md border border-slate-600 whitespace-nowrap z-50">
          {label}
        </div>
      )}
    </Link>
  );