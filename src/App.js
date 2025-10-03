import { useState } from 'react'; 

function App() {

  let [todolist,setToDolist]=useState([]);
  let [showinput, setShowInput] = useState(false);
 
  let saveToDoList=(event) => {
    
  let project=event.target.project.value;
  if(!todolist.include(project)){
    let finalToDoList=[...todolist,project];
    setToDolist(finalToDoList); 
    setShowInput(false);
  }
  else{
    alert("project name already exists");   
    return;
  }
    event.preventDefault();
  }
  let list=todolist.map((value,index)=>{
    
    return(
    <ToDolistitems value={value} key={index} indexnumber={index} 
    todolist={todolist}
    setToDolist={todolist} 
    /> 
    )
})
  return (
    <div className="App">   
    <h1>Task Management System</h1>
    <button onClick={()=> setShowInput(!showinput)}>
      {showinput?"cancel":"Add project"}

    </button>
    <form onSubmit={saveToDoList}>
      <input type="text" name='project' placeholder="Add a new task" />
      <button type="submit">Add</button>  
    </form>
    <ul>
      {list}
      </ul>
    </div>
  );
}

export default App; 

function ToDolistitems({value,indexnumber,todolist,setToDolist}){

  let deleteRow=()=>{ 
    let finaldata=todolist.filter((v,i)=>i!==indexnumber);
    setToDolist(finaldata)
  }
  return(
    <li> {indexnumber+1} {value} <span onclick={deleteRow}> &time; </span></li>
  )
}