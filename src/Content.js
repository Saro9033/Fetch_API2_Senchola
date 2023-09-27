import React from 'react'
import { useEffect, useState } from 'react';
import API from './API';
import Profile from './Images/download.jpg'


const Content = () => {


  const [list, setList] = useState([])
  const [error, setError] = useState(null)
  const [isLoad, setIsLoad] = useState(true)


  useEffect(() => {
    const Fetch = async () => {
      try {
        const response = await API.get('')
        setList(response.data)
      } catch (err) {
        if (err.response) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        }
        else { setError(err.message) }
      }finally{
        setIsLoad(false)
      }
    }
    Fetch();
  }, []
  )

  return ( 
    <div className='container mt-5 mb-5'>
      {isLoad && <h2 className='text-center mt-5'>Loading...</h2>}
      {error && <h2 className='text-center mt-5'>`Error: ${error}`</h2>}

    {!isLoad && !error && 

    <div className='row'>
      {list.map(item => {
    return  <div key={item.id}  className="col-12 col-lg-4 col-md-6 p-4 " >
        <div className="card rounded-4 shadow"  >
          <img className="rounded-circle p-1 card-img-top" style={{width:'90px'}} src={Profile} alt={item.id}/>
          <div className="card-body">
            <h5 className="card-title">{item.name}</h5>
            <p>Email: {item.email}</p>
            <p className="card-text">Address: {item.address.street}, {item.address.city}.  </p>
            <p>zip-code:  {item.address.zipcode} </p>
            <p>Phone:  {item.phone} </p>
            <p>Website:  {item.website} </p>
          </div>
        </div>
      </div>
      })}
    </div> } 
    </div>
  )
}

export default Content