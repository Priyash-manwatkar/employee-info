import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Employee from './Components/Employee'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Employee/>
    </>
  )
}

export default App
