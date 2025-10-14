import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './components/Home/Home'
import EmptyVideoPage from './components/pages/videoPages/EmptyVideoPage'



const router = createBrowserRouter(
  createRoutesFromElements(
   <Route path='/' element={<Layout />} >
      <Route path='' element={<Home/>} />
      <Route path='/novideo' element={<EmptyVideoPage/>} />
   </Route>
  )
)


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
