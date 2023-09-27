import React, { useEffect, useState } from 'react';
import axios from 'axios';
import List from '../Components/List'

function TodoAccordions() {
  const [todosByUser, setTodosByUser] = useState([]);
  const [isLoad, setIsLoad] = useState(true);
  const [Err, setErr] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://jsonplaceholder.typicode.com/todos'
        );
        const groupedTodos = response.data.reduce((acc, todo) => {
          const userId = todo.userId;
          if (!acc[userId]) {
            acc[userId] = [];
          }
          acc[userId].push(todo);
          return acc;
        }, {});

        setTodosByUser(groupedTodos);
      } catch (error) {
        setErr('Error fetching data: ' + error.message);
      } finally {
        setIsLoad(false);
      }
    };

    fetchData();
  }, []);



  const handleEdit = (id) => {
    const updatedTodosByUser = { ...todosByUser };
  
    for (const userId in updatedTodosByUser) {
      updatedTodosByUser[userId] = updatedTodosByUser[userId].map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
    }
  
    setTodosByUser(updatedTodosByUser);
  };

const handleDelete = (id)=>{
  const updatedTodosByUser = { ...todosByUser };

  for (const userId in updatedTodosByUser) {
    updatedTodosByUser[userId] = updatedTodosByUser[userId].filter(
      (todo) => todo.id !== id
    );
  }
  setTodosByUser(updatedTodosByUser);
}
  return (

    <div style={{height:'80vh', overflowY:'scroll'}} className='container mt-5 mb-5 py-5'>


{isLoad && <h2 className='text-center mt-5'>Loading...</h2>}
{Err && <h2 className='text-center mt-5'>{Err}</h2>}

{!isLoad && !Err && 
    <> {Object.keys(todosByUser).slice(0, 20).map((userId) => (
        <div key={userId} className="accordion" id={`accordion-${userId}`}>
          <div
            className={`accordion-item`}
            >
            <h2 className="accordion-header">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapse-${userId}`}
              >
                User ID: {userId}
              </button>
            </h2>
          
              <div
                id={`collapse-${userId}`}
                className="accordion-collapse collapse "
                data-bs-parent={`#accordion-${userId}`}
              >
                <div className="accordion-body ">
                  <div >
                    {todosByUser[userId].map((todo) => (
                      <List key={todo.id} id={todo.id} Title={todo.title} Completed = {todo.completed} handleEdit={handleEdit} handleDelete={handleDelete}/>
                    ))}
                  </div>
                </div>
              </div>
          
          </div>
        </div>
      ))}
      </>  }
    </div>
  );
}

export default TodoAccordions;
