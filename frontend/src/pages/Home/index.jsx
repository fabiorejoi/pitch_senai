import './style.css'
import { useEffect, useState, useRef } from 'react'
import Trash from '../../assets/trash-2.svg'
import api from '../../services/api'

function Home() {
  const [users, setUsers] = useState([])

  const inputName = useRef()
  const inputAge = useRef()
  const inputEmail = useRef()

  async function getUsers() {
    const usersFromApi = await api.get('/usuarios')

    setUsers(usersFromApi.data)
  }

  async function createUsers() {

    await api.post('/usuarios', {
      name: inputName.current.value,
      age: parseInt(inputAge.current.value),
      email: inputEmail.current.value
    })

    inputName.current.value = ''
    inputAge.current.value = ''
    inputEmail.current.value = ''
    getUsers()
  }

  async function deleteUsers(id) {
    await api.delete(`/usuarios/${id}`)
    getUsers()
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div className='container'>
      <form>
        <h1>Bem-vindo ao Pitch!</h1>
        <h2>Cadastro de Usuários</h2>
        <input name="nome" type="text" placeholder='Nome' ref={inputName} />
        <input name="idade" type="number" placeholder='Idade' ref={inputAge} />
        <input name="email" type="email" placeholder='Email' ref={inputEmail} />
        <button type='button' onClick={createUsers}>Cadastrar</button>
      </form>

      {users.slice(-3).map((user) => (
        <div key={user.id} className="card">
          <div>
            <p>Nome: <span>{user.name}</span></p>
            <p>Idade: <span>{user.age}</span></p>
            <p>Email: <span>{user.email}</span></p>
          </div>

          <button onClick={() => deleteUsers(user.id)}>
            <img src={Trash} alt="" />
          </button>

        </div>
      ))}

    </div>
  )
}

export default Home
