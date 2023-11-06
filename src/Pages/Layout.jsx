import { NavLink, Outlet } from "react-router-dom"

export const Layout =()=>{

    return(
        <div>
       
            <NavLink className="w3-bar-item w3-button" to="/Tablasencilla">
                MANTENIMIENTO
            </NavLink>
            <NavLink className="w3-bar-item w3-button" to="/Gallery">
                GALLERY
            </NavLink>
            <NavLink className="w3-bar-item w3-button" to="/Dinamicform">
                DinamicForm
            </NavLink>
           
           
           
           
         
            <Outlet/>
        </div>
    )
}