import { useState } from "react";
import { observer } from "mobx-react-lite";

import usersStore from "../../store/usersStore";
import UserForm from "../userForm";
import Users from "../users";
import Modal from "../modal";
import Pagination from "../pagination";

import "./app.scss";

const App = observer(() => {
  const [modalActiveUser, setModalActiveUser] = useState(false);
  function openModalUser(id) {
    usersStore.getUser(id)
    usersStore.modalEditUser = true
    setModalActiveUser((prev) => !prev)
  }
  function openModalAddUser() {
    usersStore.newUser()
    usersStore.modalEditUser = false
    setModalActiveUser((prev) => !prev)
  }
  return (
    <div className="App">
      <div className="grid-container">
        <Users openModalUser={openModalUser}/>
        <div
          className="grid-elem last"
          onClick={() => openModalAddUser((prev) => !prev)}
        >+</div>
      </div>
      <Pagination usersStore={usersStore} />
      <Modal active={modalActiveUser} setActive={setModalActiveUser}>
        <UserForm />
      </Modal>
    </div>
  );
})

export default App;
