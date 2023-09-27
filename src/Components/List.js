import React from 'react'

const List = ({Title, Completed, handleEdit,handleDelete, id}) => {
  return (
    <form onSubmit={(e)=>e.preventDefault()}>
        <li className='my-2 p-2 rounded-4 d-flex justify-content-between'  style={Completed ? {background:'green'} : {background:'red'}}>

            <input type="checkbox" style={{marginRight:'10px'}} checked={Completed} onChange={()=>handleEdit(id)}/>
            <label style={ Completed ? {textDecoration:'line-through'} : null  }>
              {(window.innerWidth < 590 && Title.length > 20 ) ? `${Title.slice(0,20)}...` : Title}
              </label>
            <button className='btn btn-primary mx-2'  onClick={()=>handleDelete(id)}>Delete</button>
        </li>
        </form>
   
  )
}

export default List