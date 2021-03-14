import React from "react";
import { observer } from 'mobx-react-lite';
import usersStore from '../../store/usersStore';
import "./userForm.scss"


const Input = observer(({name}) => {
  function onChange (event) {
    usersStore.editUser(event.target.name, event.target.value)
  }
  return (
    <input 
      className="userForm-input"
      type="text" 
      placeholder={name} 
      name={name} 
      value={usersStore.itemUser[name] || ''}  
      onChange={onChange} 
    />
  )
})

const UserForm = observer(() => (
  <>
    {usersStore.itemUser && <img src={usersStore.itemUser.avatar || ''} alt=''/>}
    <Input name="first_name" />
    <Input name="last_name" />
    <Input name="email" />
  </>
))

export default UserForm