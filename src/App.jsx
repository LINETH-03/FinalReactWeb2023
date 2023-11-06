import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import {Layout} from './Pages/Layout'
import {Tablasencilla} from './Pages/Tablasencilla'
import {Gallery} from './Pages/Gallery'



//import {Vizualizar} from './Pages/Visualizar'
import "./App.css"

function App() {
 
  
  return (
    <>
      <BrowserRouter>
        <Routes>
    
       
          <Route path="/" element={<Layout />}>
            <Route index path="/Tablasencilla" element={<Tablasencilla />} />
            <Route index path="/Gallery" element={<Gallery />} />
         
          
        
            
          </Route>
          
          <Route path="*" 
              element={<>
                <h2>No encontramos la pagina</h2>
              </>} />

        </Routes>
      </BrowserRouter>
    </>
  )
}
export default App
