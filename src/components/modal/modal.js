import React from "react";
import usersStore from '../../store/usersStore';

import './modal.scss';

const Modal = ({active, setActive, children}) => {
  function actionUser(kay) {
    usersStore[kay]()
    setActive(false)
  }
  return (
    <div className={"modal " + (active ? "active_modal" : "")} onMouseDown={()=>setActive(false)}>
      <div className={"modal_content " + (active ? "active_content" : "")} onMouseDown={(e)=>e.stopPropagation()}>
        <div className="wrap-button-close">
          <button onClick={()=>setActive(false)}>x</button>
        </div>
        {children}
        {usersStore.modalEditUser
        ? (
          <div className="wrap-buttons-action">
            <button onClick={()=>actionUser("removeUser")}>Удалить</button>
            <button onClick={()=>actionUser("updateUser")}>Сохранить</button>
          </div>
        )
        : (
          <div className="wrap-button-add">
            <button 
              className="button-add"
              onClick={()=>actionUser("addUser")}
            >Добавить</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Modal