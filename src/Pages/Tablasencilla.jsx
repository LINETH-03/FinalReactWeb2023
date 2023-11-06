import { useEffect, useState, useRef } from 'react'
import { API_ENDPOINT } from '../config/consts'


export const Tablasencilla = () => {

 

  const [users, setUsers] = useState([])
  const dialogRef = useRef(null)
  const dialogDeleteRef = useRef(null)
  const [currentUser, setCurrentUser] = useState({
    userId: 0,
    id: 0,
    title: '',
    completed: '',
 
  })

  const getAll =async ()=>{
    let fetchResp = await fetch(API_ENDPOINT + "/todos",)
    let dataJson = await fetchResp.json()
    setUsers(dataJson)
  }
  useEffect(() => {
    //useEffect vacio, significa que lo va ejecutar cuando se cargue el componente en memoria.
    (async () => {
        await getAll()
    })()
  }, [])

  const newUserClick = (e) => {
    e.preventDefault()
    dialogRef.current.showModal()
  }

  const closeNewUserModal = (e) => {
    e.preventDefault()
    dialogRef.current.close()
  }

  const valueHasChanged = (e) => {
    setCurrentUser({
      ...currentUser,
      [e.target.name]: e.target.value,
    })
  }

  const formSubmit = async (e) =>{
    e.preventDefault()
    if (currentUser.userId <= 0){
      //Create
      await postData(currentUser)
    }
    else{
      await updateData(currentUser)
    }
    setCurrentUser({
        userId: 0,
        id: 0,
        title: '',
        completed: '',
     
    })
    dialogRef.current.close()
  }

  const postData = async (data)=>{
    let fetchResp = await fetch(API_ENDPOINT + "/todos", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
      })
      let json = await fetchResp.json()
      await getAll()
  }


  const updateData = async (data)=>{
    let fetchResp = await fetch(API_ENDPOINT + "/todos/" +  data.userId, {
      method: "PUT",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
      })
      let json = await fetchResp.json()
      await getAll()
  }

  const deleteRow = async (row)=>{
    setCurrentUser(row)
    dialogDeleteRef.current.showModal()
  }

  const deleteData = async (row) =>{
    let fetchResp = await fetch(API_ENDPOINT + "/todos/" +  row.userId, {
      method: "DELETE",
      headers: {
          "Content-Type": "application/json"
      }
      })
      let json = await fetchResp.json()
      await getAll()
  }

  const confirmDelete = async(e)=>{
    e.preventDefault();
    await deleteData(currentUser)
    dialogDeleteRef.current.close()
  }

  const showEdit = (row)=>{
    setCurrentUser(row)
    dialogRef.current.showModal()
  }


  
  return (
    <>
      <dialog ref={dialogRef}>
        <h4>Nuevo usuario</h4>
        <form onSubmit={formSubmit} className="w3-container">
        <label htmlFor="userId">UserId</label>
          <input
            type="number"
            id="userId"
            name="userId"
            className="w3-input"
            value={currentUser.userId}
            onChange={valueHasChanged}
          />
          <label htmlFor="id">id</label>
          <input
            type="number"
            id="id"
            name="id"
            className="w3-input"
            value={currentUser.id}
            onChange={valueHasChanged}
          />
          <label htmlFor="title">title</label>
          <input
            type="text"
            id="title"
            name="title"
            className="w3-input"
            value={currentUser.title}
            onChange={valueHasChanged}
          />
         
          <label htmlFor='completed'>completed</label>
          <select
           className='w3-select'
           name="completed"
           id="completed"
           value={currentUser.completed}
           onChange={valueHasChanged}
          >
            <option>Seleccione</option>
            <option value="SI">SI</option>
            <option value="NO">NO</option>
          </select>
          <div className="w3-row">
            <div className="w3-col m4">
              <button type="submit" className="w3-button w3-green">Guardar</button>         
            </div>
            <div className="w3-col m4">
              <button className="w3-button w3-red" onClick={closeNewUserModal}>Cerrar</button>
            </div>
          </div>
        </form>
      </dialog>
      <button onClick={newUserClick} >Nuevo usuario</button>
      <h1>Mantenimiento de usuarios</h1>
      <table className="w3-table w3-striped w3-bordered w3-border">
        <thead>
          <tr>
            <th>userId</th>
            <th>id</th>
            <th>title</th>

            <th>completed</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((row) => (
            <tr key={'user' + row.userId} style={{backgroundColor: row.completed === "SI" ? "olive": ""}}>
              <td>{row.userId}</td>
              <td>{row.id}</td>
              <td>{row.title}</td>
              <td>{row.completed}</td>
              <td>
                <button className="w3-button w3-yellow" onClick={(e)=> { showEdit(row) }}>Editar</button>
                <button className="w3-button w3-red" onClick={(e)=> {deleteRow(row)}}>Borrar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <dialog ref={dialogDeleteRef}>
        <h4>Confirmación de borrado</h4>
        <form onSubmit={confirmDelete} className="w3-container">
           
            Esta seguro que desea eliminar a {currentUser.title}
            <div className='w3-row'>
              <div className='w3-col m6'>
                <button className="w3-button w3-red" type="submit">Confirmar</button>
              </div>
              <div className='w3-col m6'>
                  <button className="w3-button w3-blue" onClick={(e)=>{
                  e.preventDefault()
                  dialogDeleteRef.current.close()
                }} >Cancelar</button>
              </div>
            </div>
        </form>
      </dialog>
    </>
  )
}