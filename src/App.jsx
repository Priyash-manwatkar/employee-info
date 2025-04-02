import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Employee from './Components/Employee'
import { ToastContainer } from 'react-toastify'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Employee/>
      <ToastContainer/>
    </>
  )
}

export default App
