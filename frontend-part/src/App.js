import './App.css';
import { useEffect, useState } from 'react';
function App() {
  const [screen, setScreen] = useState(true);
  const [page, setPage] = useState(1);

  const [sname, setSname] = useState('');
  const [semail, setSemail] = useState('');
  const [spass, setSpass] = useState('');
  const [srole, setSrole] = useState('Admin');
  const [lemail, setLemail] = useState('');
  const [lpass, setLpass] = useState('');

  const [screen1, setScreen1] = useState();
  const [addPro, setAddPro] = useState();
  const [addTas, setAddTas] = useState();
  const [addDev, setAddDev] = useState();
  const [pStatus, setPstatus] = useState();

  const [userName, setUsername] = useState();
  const [userRole, setUserRole] = useState();
  const [userId, setUserId] = useState();

  const [Allproject, setProject] = useState([]);
  const [AllTask, setTask] = useState([]);



  useEffect(() => {
    getTask();
    getProject();


  }, [])

  const handleInputChange = async (event) => {
    event.preventDefault();
    let val = event.target.value;
    let input_name = event.target.name;
    switch (input_name) {
      case 'name':
        setSname(val);
        break;
      case 'email':
        setSemail(val);
        break;
      case 'password':
        setSpass(val);
        break;
      case 'role':
        setSrole(val);
        break;
      case 'lemail':
        setLemail(val);
        break;
      case 'lpass':
        setLpass(val);
        break;
      case 'pname':
        setAddPro(val);
        break;
      case 'ptask':
        setAddTas(val);
        break;
      case 'pdev':
        setAddDev(val);
        break;
      case 'pstatus':
        setPstatus(val);
        break;

      default:
        break;
    }
  }
  const signup = async (event) => {
    event.preventDefault();
    let data = { name: sname, email: semail, password: spass, role: srole };
    let response = await fetch('http://localhost:5000/signup', {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-type": "application/json"
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data)
    })
    let resp = await response.json();
    // console.log(resp);
    setScreen(false)
  }
  const signin = async (e) => {
    e.preventDefault();
    let data = { email: lemail, password: lpass };
    let response = await fetch('http://localhost:5000/login', {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-type": "application/json"
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data)
    })
    let resp = await response.json();
    console.log(resp);

    if (resp[0].name) {
      setUsername(resp[0].name)
      setUserRole(resp[0].role)

      switch (resp[0].role) {
        case 'Admin':
          setPage(2);
          setScreen1(1)
          break;

        case 'Manager':
          setPage(2);
          setScreen1(2)
          break;
        case 'Developer':
          setPage(2);
          setScreen1(3)
          break;
        default:
          break;
      }
    } else {
      alert("Email or password not match")
    }

  }

  const getProject = async () => {
    let response = await fetch('http://localhost:5000/getProject');
    let resp = await response.json();
    setProject(resp, () => console.log("dataset"))
    console.log(Allproject, "gfyugy");
  }
  const getTask = async () => {
    let response = await fetch('http://localhost:5000/getTask');
    let resp = await response.json();
    setTask(resp)
  }

  const AddProject = async (event) => {
    event.preventDefault();

    let data = { projectName: addPro };
    let response = await fetch('http://localhost:5000/addProject', {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-type": "application/json"
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data)
    })
    let resp = await response.json();
    console.log(resp);
  }
  const AddTask = async (event) => {
    event.preventDefault();
    let data = { taskName: addTas, asighTo: addDev, createdBy: "me" };
    let response = await fetch('http://localhost:5000/addTask', {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-type": "application/json"
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data)
    })
    let resp = await response.json();
    console.log(resp);
  }
  const UpdateTask = async (event) => {
    event.preventDefault();
    let data = { status: pStatus, modifiedBy: userName, modifiedDate: new Date().toUTCString() };
    let response = await fetch('http://localhost:5000//updateTask:id', {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-type": "application/json"
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data)
    })
    let resp = await response.json();
    console.log(resp);
  }


  return (
    <>
      {page === 1 ?
        <div className="App">
          {screen ?

            <form onChange={handleInputChange} onSubmit={signup}>
              <div className="signup_container">
                <h4>Signup Here</h4>
                <label htmlFor="name">Enter Name</label>
                <input type="text" name="name" id="name" required />
                <br />
                <label htmlFor="email">Enter Email</label>
                <input type="email" name="email" id="email" required />
                <br />
                <label htmlFor="password">Enter Password</label>
                <input type="password" name="password" id="password" required />
                <br />
                <label htmlFor="role"></label>
                <select name="role" id="role" required>
                  <option value="Admin">Admin</option>
                  <option value="Manager">Manager</option>
                  <option value="Devloper">Developer</option>
                </select>
                <div className="login_container_btn">
                  <button type='submit'  >Signup</button>
                </div>
              </div>
            </form>
            : <form onChange={handleInputChange} onSubmit={signin}>
              <div className="login_container">
                <h4>Login Here</h4>
                <label htmlFor="email">Enter Email</label>
                <input type="email" name="lemail" id="email" required />
                <br />
                <label htmlFor="password">Enter Password</label>
                <input type="password" name="lpass" id="password" required />
                <br />
                <div className="login_container_btn">
                  <button type='submit'>Login </button>
                </div>
              </div></form>}
          <div className="footer">
            <button onClick={() => setScreen(false)} style={!screen ? { background: "green", color: "white" } : { background: "white", color: "black" }} >Login</button>
            <button onClick={() => setScreen(true)} style={!screen ? { background: "white", color: "black" } : { background: "green", color: "white" }}>Signup</button>
          </div>
        </div>
        : page === 2 ? <div>
          <header className='HA'>
            <p></p>
            <h3>Hello <span> -{userName} </span><span> {userRole}</span></h3>
            <button className='HAB'>Logout</button>
          </header>
          <hr />
          {
            screen1 === 1 ?
              <form onChange={handleInputChange}  >
                <section className='HAS1'>
                  <div>
                    <input type="text" name="pname" id="" placeholder='Enter Project Name' required />
                    <button type='submit' onClick={AddProject} className='HAB'>Add</button>
                  </div>

                  <div className="left">
                    {Allproject.map((item, i) => (
                      <  div key={i} className="HAPI">
                        <div>
                          <p> <strong> Project name :</strong> <span>{item.projectName}</span> </p>
                          <p> <strong> Current Task :</strong> <span>{item.totalTask}</span> </p>
                        </div>
                        <div>
                          <span className='HAB'>Delete</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </form>
              : ""}
          {screen1 === 2 ?
            <form onChange={handleInputChange} onSubmit={AddTask}>
              <section className="HM">
                <div className="HML">
                  {Allproject.map((item, i) => (
                    <div key={i} className="HMLPI">
                      <p>{item.projectName}</p>
                    </div>
                  ))}
                </div>
                <div className="HMR">
                  <div>
                    <input type="text" name="ptask" id="" placeholder='Enter Task Name' />
                    <select name="pdev" id="">
                      <option value="">Select Devloper</option>
                    </select>
                    <button className='HAB'>Add Task</button>
                  </div>
                  <div className='HMRD1'>
                    <div className='HMRP'>
                      <p><strong>Projrct Name- </strong><span>HelloWorld</span> </p>
                      <p><strong>Asign to- </strong><span>Jhon</span> </p>
                      <p><strong>Status- </strong><span>Pending</span> </p>
                      <p><strong>Created Date- </strong><span>Pending</span> </p>
                      <p><strong>Modified Date- </strong><span>Pending</span> </p>
                      <p><strong>Created By- </strong><span>Pending</span> </p>
                      <p><strong>Modified By- </strong><span>Pending</span> </p>

                    </div>
                  </div>
                </div>
              </section>
            </form>
            : ""}
          {screen1 === 3 ?
            <form onChange={handleInputChange} onSubmit={UpdateTask}>
              <section className='HM'>
                <div className="HML">
                  <div className="HMLPI">
                    <p>Task Name</p>
                    <p>Task Name</p>
                  </div>
                </div>
                <div className="HMR">
                  <div className='HDRP'>
                    <p><strong>Projrct Name- </strong><span>HelloWorld</span> </p>
                    <p><strong>Asign By- </strong><span>Jhon</span> </p>
                    <p><strong>Created Date- </strong><span>Pending</span> </p>
                    <p><strong>Created By- </strong><span>Pending</span> </p>
                    <p><strong>Modified By- </strong><span>Pending</span> </p>
                    <p><strong>Status-</strong>
                      <select name="pstatus" id="">
                        <option value="">Pending</option>
                        <option value="">Working</option>
                        <option value="">Completed</option>
                      </select>
                    </p>
                    <button className='HAB HDB'>Save</button>
                  </div>
                </div>
              </section>
            </form>
            : ""}
        </div>
          : ""}
    </>
  );
}

export default App;
