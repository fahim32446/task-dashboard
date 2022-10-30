import React from 'react'
import Sidebar from './components/Sidebar/Sidebar'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Product from './pages/Product'
import User from './pages/User'
import AddProduct from './pages/AddProduct'
import Register from './pages/Register'
import AddNewUser from './pages/AddNewUser'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'

const App = () => {


  const ProtectedRoute = ({ children }) => {
    const token = JSON.parse(localStorage?.getItem('user'));
    if (!token) {
      return <Navigate to="/login" />;
    }
    return children;
  };


  return (
    <BrowserRouter>
      <Sidebar>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<ProtectedRoute> <Product /> </ProtectedRoute>} />
          <Route path="/add-product" element={<ProtectedRoute> <AddProduct /> </ProtectedRoute>} />
          <Route path="/update-product/:id" element={<ProtectedRoute> <AddProduct /> </ProtectedRoute>} />
          <Route path="/user" element={<ProtectedRoute> <User /> </ProtectedRoute>} />
          {/* <Route path="/register" element={<Register />} /> */}
          <Route path="/add-new-user" element={<ProtectedRoute> <AddNewUser /> </ProtectedRoute>} />
        </Routes>
      </Sidebar>
    </BrowserRouter>
  )
}

export default App