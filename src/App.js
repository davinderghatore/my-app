import React, { useState } from "react";

function App() {
  const [ToDolist,setToDolist]=useState([]);
  const saveToDoList=(e)=> {
    e.preventDefault(); 
    const project= e.target.project.value;
    if (!ToDolist.includes(project)) {
      setToDolist([...ToDolist, project]);
      e.target.project.value = "";
    }
    else{
      alert("todo name allready exists  "); 
    
  }
  return(
  <div className="App">
    <h1>Task Management System</h1>
    <form onSubmit={saveToDoList}>
      <input type="text" name='project' /> <button>Add Task</button>  
    </form>
  </div>
  )
}
}

export default App;