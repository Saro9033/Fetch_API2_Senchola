import React from 'react'


const Nav = () => {
  return (
    <nav id='navbar' className="navbar px-1 navbar-dark " style={{ background: 'black', color: 'white', zIndex: '1', position: 'sticky', top: '0' }}   >
    <div className="container-fluid">
        <a href='/' className="navbar-brand text-dark bg-info rounded-3 px-2" >
            TodoList
        </a>

        <div className="justify-content-end " >
            <ul className="navbar-nav ">
                <li className="nav-item ">
                <a className="nav-link p-1 text-light rounded-2 mx-1" href='/' >Home </a>
                </li>
            </ul>
        </div>
    </div>
</nav>  )
}

export default Nav