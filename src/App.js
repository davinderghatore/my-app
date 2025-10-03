import { useState } from 'react'; 

function App() {
  let [todolist, setToDolist] = useState([]);
  let [showinput, setShowInput] = useState(false);
  let [showMemberPage, setShowMemberPage] = useState(false);
  let [formData, setFormData] = useState({
    name: "",
    email: "",
    jobrole: "",
    project: ""
  });
  let [errors, setErrors] = useState({});
  let [members, setMembers] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email format invalid";
    }
    if (!formData.jobrole) newErrors.jobrole = "Job role is required";
    if (!formData.project) newErrors.project = "Project name is required";
    return newErrors;
  };

  const saveMember = () => {
    let validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setMembers([...members, formData]); 
    alert("Member added successfully ✅");
    setErrors({});
    setFormData({ name: "", email: "", jobrole: "", project: "" });
    setShowMemberPage(false);
  };

  let saveToDoList = (event) => {
    event.preventDefault();
    let project = event.target.project.value;
    if (!todolist.includes(project)) {
      let finalToDoList = [...todolist, project];
      setToDolist(finalToDoList); 
      setShowInput(false);
    } else {
      alert("project name already exists");   
      return;
    }
  };

  let list = todolist.map((value, index) => {
    return (
      <ToDolistitems 
        value={value} 
        key={index} 
        indexnumber={index} 
        todolist={todolist}
        setToDolist={setToDolist} 
      /> 
    )
  });

  if (showMemberPage) {
    return (
      <div>
        <h1>Add New Team Member</h1>
        <button onClick={() => setShowMemberPage(false)}>Back to Home</button>
        
        <div>
          <div>
            <input 
              type="text" 
              name="name" 
              placeholder="Enter Name" 
              value={formData.name}
              onChange={handleChange}
            />
            <br />
            <span style={{color:"red"}}>{errors.name}</span>
          </div>

          <div>
            <input 
              type="email" 
              name="email" 
              placeholder="Enter Email" 
              value={formData.email}
              onChange={handleChange}
            />
            <br />
            <span style={{color:"red"}}>{errors.email}</span>
          </div>

          <div>
            <input 
              type="text" 
              name="jobrole" 
              placeholder="Enter Job Role" 
              value={formData.jobrole}
              onChange={handleChange}
            />
            <br />
            <span style={{color:"red"}}>{errors.jobrole}</span>
          </div>

          <div>
            <select 
              name="project" 
              value={formData.project}
              onChange={handleChange}
            >
              <option value="">Select Project</option>
              {todolist.map((proj, i) => (
                <option key={i} value={proj}>{proj}</option>
              ))}
            </select>
            <br />
            <span style={{color:"red"}}>{errors.project}</span>
          </div>

          <button onClick={saveMember}>Add New Member</button>
        </div>
      </div>
    );
  }

  return (
    <div className="App">   
      <h1>Task Management System</h1>
      <button onClick={() => setShowInput(!showinput)}>
        {showinput ? "cancel" : "Add project"}
      </button>
      {showinput && (
        <div>
          <input 
            type="text" 
            id="projectInput"
            name="project"
            placeholder="Add a new task" 
          />
          <button onClick={(event) => {
            event.preventDefault();
            let project = document.getElementById('projectInput').value.trim();
            if (!project) {
              alert("Please enter a project name");
              return;
            }
            if (!todolist.includes(project)) {
              let finalToDoList = [...todolist, project];
              setToDolist(finalToDoList); 
              setShowInput(false);
              document.getElementById('projectInput').value = '';
            } else {
              alert("project name already exists");   
            }
          }}>Add</button>  
        </div>
      )}
      <hr />

      <button onClick={() => setShowMemberPage(true)}>
        Add New Member
      </button>

      <ul>
        {members.map((m, i) => (
          <li key={i}>
            {m.name} - {m.email} - {m.jobrole} - {m.project}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App; 

function ToDolistitems({value, indexnumber, todolist, setToDolist}) {
  let deleteRow = () => { 
    let finaldata = todolist.filter((v, i) => i !== indexnumber);
    setToDolist(finaldata)
  }
  
  return (
    <li>
      {indexnumber + 1}. {value} 
      <button onClick={deleteRow}>Delete</button>
    </li>
  )
}