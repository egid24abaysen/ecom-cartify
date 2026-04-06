import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Customer from './components/Custormer'
import Product from './components/Product'
import Report from './components/Report'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <NavBar />
        <main className="max-w-6xl mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Report />} />
            <Route path="/customers" element={<Customer />} />
            <Route path="/products" element={<Product />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
