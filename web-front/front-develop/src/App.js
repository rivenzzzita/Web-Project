import React from 'react';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/crudComponent';
import { UserList, GetUserById, CreateUser, UpdateUser, DeleteUser, Home } from './Components/crudComponent';

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path="/users" element={<UserList />}/>
            <Route path="/users/get" element={<GetUserById />} />
            <Route path="/users/create" element={<CreateUser />} />
            <Route path="/users/update" element={<UpdateUser />} />
            <Route path="/users/delete" element={<DeleteUser />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App