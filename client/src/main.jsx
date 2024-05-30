// This imports the react library
import React from 'react'
// This imports the dom for rendering
import ReactDOM from 'react-dom/client'
// Imports functions that handle the navigation and url changes
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// Here we import the app function
import App from './App.jsx'
// Here we import the homepage function
import Homepage from './pages/homepage/homepage.jsx'
import './index.css'

// This function takes an array of route objects and options to define the routing
// structure
const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {
        index: true,
        element: <Homepage/>
      },
      {path: '/Contact', element: <Contact/>}
    ]
  }
])

// This component makes the routing instance available to the entire application
ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
)
