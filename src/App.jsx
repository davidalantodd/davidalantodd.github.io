
// import reactLogo from './assets/react.svg'
import './index.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import About from "./components/About"
import Home from "./components/Home"
import Experience from './components/Experience'
import Projects from './components/Projects'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <BrowserRouter>
        <Header/>
        <main>
          <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/about" element={<About/>}></Route>
            <Route path="/experience" element={<Experience/>}></Route>
            <Route path="/projects" element={<Projects/>}></Route>
          </Routes>
        </main>
        <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
