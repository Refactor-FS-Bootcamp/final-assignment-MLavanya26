import { useState } from 'react';
import './App.css';
import TodoList from './components/TodoList';

function App() {
  const [task,setTask] =useState("")
  const [todos, setTodos] =useState([]);
  const changeHandler=e=>{
    setTask(e.target.value)
  }

  const submitHandler=e=>{
    e.preventDefault();
     const newTodos=[...todos,task];
     setTodos(newTodos);
     setTask("");
  }

  const deleteHandler=(indexValue)=>{
     const newTodos=todos.filter((todo,index)=> index !== indexValue);
     setTodos(newTodos);
  }

  

  return (
    <div>
    <center>
     <div className='card'>
      <div className='card-body'>
        <h3 className='card-title'>Todo Management Application</h3>
        <form onSubmit={submitHandler}>
          <input  size='30' type='text'  name='task' value={task} onChange={changeHandler}/>
          <input  size='20' type='submit' value='Add' name='Add'/>
        </form>
        <TodoList todolist={todos} deleteHandler={deleteHandler}  /> 
      </div>
     </div>
    </center>
    </div>
  );
}

export default App;
