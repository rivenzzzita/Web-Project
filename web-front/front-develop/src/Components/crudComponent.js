import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';

import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} from '../crudFront';


Modal.setAppElement('#root');

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const fetchUsers = async () => {
    try {
      const usersData = await getAllUsers();
      console.log('Usuarios recuperados:', usersData);
      setUsers(usersData);
    } catch (error) {
      console.error('Error al obtener la lista de usuarios:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <h1 className='div__UserList-h1'>BIENVENIDO...</h1>
      <p>
        Bienvenido al apartado de usuarios, desde aquí podrás hacer las siguientes acciones:<br/>
        <a href="/users/get">-Consultar usuarios por ID</a><br />
        <a href="/users/create">-Crear un nuevo usuario.</a><br />
        <a href="/users/update">-Actualizar un usuario existente.</a><br />
        <a href="/users/delete">-Eliminar un usuario existente.</a><br />
      </p>
      <button className='div__UserList-button' onClick={openModal}>Consultar todos los usuarios</button>
      <Modal
  isOpen={modalIsOpen}
  onRequestClose={closeModal}
  contentLabel="Lista de Usuarios"
  style={{
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    content: {
      width: '60%',
      margin: 'auto',
      background: 'white',
      padding: '20px'
    }
  }}
>
  <h2>Lista de Usuarios</h2>
  <table className="table table-striped">
    <thead>
      <tr>
        <th>ID</th>
        <th>Nombre</th>
        <th>Apellido</th>
        <th>Identificación</th>
      </tr>
    </thead>
    <tbody>
      {users.map(user => (
        <tr key={user.id}>
          <td>{user.id}</td>
          <td>{user.name}</td>
          <td>{user.surname}</td>
          <td>{user.identification}</td>
        </tr>
      ))}
    </tbody>
  </table>
  <button className="btn btn-secondary" onClick={closeModal}>
    Cerrar
  </button>
</Modal>

    </div>
  );
};


const GetUserById = () => {
  const [userId, setUserId] = useState('');
  const [user, setUser] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleGetUserById = async () => {
    try {
      const userData = await getUserById(userId);
      setUser(userData);
    } catch (error) {
      console.error('Error al obtener el usuario por ID:', error);
    }
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <h2>Obtener Usuario por ID</h2>
      <button onClick={openModal}>Consultar Usuario por ID</button>
      <Link to="/users">
        <button>Volver</button>
      </Link>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Consulta de Usuario por ID"
      >
        <h2>Consulta de Usuario por ID</h2>
        <label htmlFor="userId">ID del Usuario:</label>
        <input
          type="number"
          id="userId"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <button onClick={handleGetUserById}>Consultar Usuario</button>

        {user && (
          <div>
            <h3>Usuario Encontrado:</h3>
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Identificación</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.surname}</td>
                  <td>{user.identification}</td>
                  
                  
                </tr>
              </tbody>
            </table>
          </div>
        )}

        <button onClick={closeModal}>Cerrar</button>
      </Modal>
    </div>
  );
};

Modal.setAppElement('#root');

const CreateUser = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [identification, setIdentification] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    // Limpiar los campos del formulario al cerrar la ventana emergente
    setName('');
    setSurname('');
    setIdentification('');
  };

  const handleCreateUser = async () => {
    try {
      const newUser = { name, surname, identification };
      await createUser(newUser);
      console.log('Usuario creado con éxito');
      closeModal(); // Cerrar la ventana emergente después de crear el usuario
    } catch (error) {
      console.error('Error al crear el usuario:', error);
    }
  };

  return (
    <div>
      <h2>Crear Usuario</h2>
      <button onClick={openModal}>Crear Nuevo Usuario</button>
      <Link to="/users">
        <button>Volver</button>
      </Link>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Crear Nuevo Usuario"
      >
        <h2>Crear Nuevo Usuario</h2>
        <form className="user-form">
          <label>Nombre:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

          <label>Apellido:</label>
          <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} />

          <label>Identificación:</label>
          <input type="text" value={identification} onChange={(e) => setIdentification(e.target.value)} />

          <button type="button" onClick={handleCreateUser}>Crear Usuario</button>
        </form>

        <button onClick={closeModal}>Cerrar</button>
      </Modal>
    </div>
  );
};

Modal.setAppElement('#root');

const UpdateUser = () => {
  const [userId, setUserId] = useState('');
  const [newName, setNewName] = useState('');
  const [newSurname, setNewSurname] = useState('');
  const [newIdentification, setNewIdentification] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleUpdateUser = async () => {
    try {
      const updatedUser = {
        name: newName,
        surname: newSurname,
        identification: newIdentification,
      };

      await updateUser(userId, updatedUser);
      console.log('Usuario actualizado con éxito');
      closeModal();
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
    }
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <h2>Actualizar Usuario</h2>
      <button onClick={openModal}>Actualizar Usuario</button>
      <Link to="/users">
        <button>Volver</button>
      </Link>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Actualizar Usuario"
      >
        <h2>Actualizar Usuario</h2>
        <label>ID del Usuario:</label>
        <input
          type="text"
          placeholder="ID del Usuario"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />

        <label>Nuevo Nombre:</label>
        <input
          type="text"
          placeholder="Nuevo Nombre"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />

        <label>Nuevo Apellido:</label>
        <input
          type="text"
          placeholder="Nuevo Apellido"
          value={newSurname}
          onChange={(e) => setNewSurname(e.target.value)}
        />

        <label>Nueva Identificación:</label>
        <input
          type="text"
          placeholder="Nueva Identificación"
          value={newIdentification}
          onChange={(e) => setNewIdentification(e.target.value)}
        />

        <button onClick={handleUpdateUser}>Guardar Cambios</button>
        <button onClick={closeModal}>Cancelar</button>
      </Modal>
    </div>
  );
};

Modal.setAppElement('#root');

const DeleteUser = () => {
  const [userId, setUserId] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleDeleteUser = async () => {
    try {
      await deleteUser(userId);
      console.log('Usuario eliminado con éxito');
      closeModal();
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
    }
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <h2>Eliminar Usuario</h2>
      <button onClick={openModal}>Eliminar Usuario</button>
      <Link to="/users">
        <button>Volver</button>
      </Link>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Eliminar Usuario"
      >
        <h2>Eliminar Usuario</h2>
        <label>ID del Usuario a Eliminar:</label>
        <input
          type="text"
          placeholder="ID del Usuario a Eliminar"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />

        <button onClick={handleDeleteUser}>Eliminar Usuario</button>
        <button onClick={closeModal}>Cancelar</button>
      </Modal>
    </div>
  );
};

const Header = () => {
  return (
    <header>
      <nav className='nav'>
        <ul className='nav__ul'>
          <li className='nav__li' ><i className="fa-solid fa-house"></i><Link to="/">Home</Link></li>
          <li className='nav__li'><i className="fa-solid fa-user"></i><Link to="/users">Users</Link></li>
        </ul>
      </nav>
    </header>
  );
};

const Home = () => {
  
  return (
    <div>
      <h1 className='h1'>This page was developed by Johan...</h1>
    </div>
    
  );
};

const Users = () => {
  return (
    <div>
      <h2>Users</h2>
    </div>
  );
};

export { UserList, GetUserById, CreateUser, UpdateUser, DeleteUser, Home, Users };
export default Header; 