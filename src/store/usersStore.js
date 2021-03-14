import { runInAction, makeAutoObservable } from 'mobx'

class UsersStore {
  users = []
  totalItems = 0
  currentPage = 1 
  perPage = 0
  totalPages = 0
  itemUser = {avatar: '', first_name: '', last_name: '', email: ''}
  modalEditUser = false
  constructor(){
    makeAutoObservable(this)
    this.getUserListByPage()
  }
  addUser() {
    fetch('https://reqres.in/api/users', {
      method: 'POST', 
      body: JSON.stringify(this.itemUser), 
      headers: {'Content-Type': 'application/json'}
    })
    .then(res => res.json())
    .then(json => {
      runInAction(()=>{
        if (this.currentPage <= 2) {
          this.users = []
          this.currentPage = this.totalPages + 1
          this.totalPages = this.totalPages + 1
        }
        this.users.push(json)
      })
    })
  }
  removeUser(){
    fetch(`https://reqres.in/api/users/${this.itemUser.id}`, {
      method: 'DELETE', 
    })
    .then(() => {
      runInAction(()=>{
        this.users = this.users.filter(user => user.id !== this.itemUser.id)
      })
    })
  }

  editUser(key, value){
    this.itemUser[key] = value
  }

  updateUser(){
    fetch(`https://reqres.in/api/users/${this.itemUser.id}`, {
      method: 'PUT', 
      body: JSON.stringify(this.itemUser), 
      headers: {'Content-Type': 'application/json'}
    })
    .then(res => res.json())
    .then(json => {
      const index = this.users.findIndex(user => user.id === this.itemUser.id)
      runInAction(()=>{
        if (index !== -1) this.users[index] = json
      })
    })
  }

  async getUser(id){
    const res = await fetch(`https://reqres.in/api/users/${id}`)
    if (res.ok){
      const user = await res.json();  
      runInAction(()=>{
        this.itemUser = user.data;
      })
    } else {
      const index = this.users.findIndex(user => user.id === id)
      runInAction(()=>{
        if (index !== -1) this.itemUser = this.users[index]
      })
    }
  }

  newUser() {
    this.itemUser = {avatar: '', first_name: '', last_name: '', email: ''}
  }

  changePage(number){
    this.currentPage = number
    this.getUserListByPage()
  }

  getUserListByPage() {
    fetch(`https://reqres.in/api/users?page=${this.currentPage}`)
    .then(res=>res.json())
    .then((response) => {
      runInAction(()=>{
        this.users = response.data;
        this.totalItems = response.total;
        this.perPage = response.per_page;
        this.totalPages = response.total_pages;
      })
    }) 
  }
}

export default new UsersStore()