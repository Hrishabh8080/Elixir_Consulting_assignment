import './App.css';
import { useState } from 'react';
import { Link } from 'react-router-dom'
import Welcome from './Welcome';
function App() {
  const [screen, setScreen] = useState(true);

  const [sname, setSname] = useState('');
  const [semail, setSemail] = useState('');
  const [spass, setSpass] = useState('');
  const [srole, setSrole] = useState('Admin');
  const [lemail, setLemail] = useState('');
  const [lpass, setLpass] = useState('');
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
    console.log(resp);
    setScreen(false)
  }
  const signin = async (e) => {
    e.preventDefault();
    let data = { email: lemail, password: lpass };
    console.log(data + "gjhgj");
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

    if (resp.length > 0) {

      return (<Welcome name={resp.name} id={resp._id} role={"Admin"} />)

      
    } else {
      alert("Email or password not match")
    }

  }

  return (
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
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="devloper">Developer</option>
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
            {/* <Link to='/dashboard'> */}
            <div className="login_container_btn">
              <button type='submit'>Login </button>
            </div>
            {/* </Link> */}
          </div></form>}
      <div className="footer">
        <button onClick={() => setScreen(false)} style={!screen ? { background: "green", color: "white" } : { background: "white", color: "black" }} >Login</button>
        <button onClick={() => setScreen(true)} style={!screen ? { background: "white", color: "black" } : { background: "green", color: "white" }}>Signup</button>
      </div>
    </div>
  );
}

export default App;
