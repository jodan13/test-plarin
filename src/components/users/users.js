import React from "react";
import { observer } from "mobx-react-lite";

import usersStore from "../../store/usersStore";

import "./users.scss";

const Users = observer(({openModalUser}) => (
  <>
    {usersStore.users.map((user) => (
      <div 
        className="grid-elem" 
        key={user.id}
        onClick={() => openModalUser(user.id)}
        style={{ 
          backgroundImage: `url(${user.avatar})`,
        }}
      >
        {user.first_name}
      </div>
    ))}
  </>
))

export default Users