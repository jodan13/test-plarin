import React from "react";
import { observer } from 'mobx-react-lite';
import usersStore from '../../store/usersStore';
import "./pagination.scss"

const Pagination = observer(() => {
  const pageNumbers = [];
 
  for(let i = 1; i <= usersStore.totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map(number=>(
          <li key={number} className="page-item" >
            <span className="page-link" onClick={()=>usersStore.changePage(number)}>{number}</span>
          </li>
        ))}
      </ul>
    </nav>
  )
})

export default Pagination