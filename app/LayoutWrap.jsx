"use client"
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import store from '@/components/store/store'
import ThemeToggle from '@/components/ThemeToggle'
import { ThemeProvider } from 'next-themes'
import { usePathname } from 'next/navigation'
import React from 'react'
import { Provider } from 'react-redux'
import { Slide, ToastContainer } from 'react-toastify'

const LayoutWrap = ({children}) => {
  const pathname = usePathname()

  const hideElement=  pathname.includes("/admin") || pathname.includes("/editor") ||  pathname.includes("/login")
  return (
  <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
    {/* <ThemeToggle /> */}
<ToastContainer
position="top-center"
autoClose={2000}
hideProgressBar
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
transition={Slide}
/>
<Provider store={store}>
  { !hideElement  && 

    <Header />}
    {children}

     { !hideElement &&
<Footer />
}
</Provider>
  
  </ThemeProvider>
  )
}

export default LayoutWrap
