import React, { useEffect, useState } from 'react'

function Welcome({ name, id, role }) {
    const [screen, setScreen] = useState(1);
    const [addPro, setAddPro] = useState();
    const [addTas, setAddTas] = useState();
    const [addDev, setAddDev] = useState();
    const [pStatus, setPstatus] = useState();


    useEffect(() => {
        console.log(screen);
        switch (role) {
            case 'Admin':
                setScreen(1)
                break;

            case 'Manager':
                setScreen(2)
                break;
            case 'Developer':
                setScreen(3)
                break;
            default:
                break;
        }
    }, [])


    const getProject = async() => {
       let response = await fetch('http://localhost:5000/getProject');
       let resp = await response.json();
       this.setState({courses : resp});
    }
    const getTask = async() => {
       let response = await fetch('http://localhost:5000/getTask');
       let resp = await response.json();
       this.setState({courses : resp});
    }

    const handleInputChange = async (event) => {
        event.preventDefault();
        let val = event.target.value;
        let input_name = event.target.name;
        switch (input_name) {
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
        let data = { status: pStatus, modifiedBy: name, modifiedDate: new Date().toUTCString() };
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
        <div>
            <header className='HA'>
                <p></p>
                <h3>Hello <span> {name}-</span><span>{role}</span></h3>
                <button className='HAB'>Logout</button>
            </header>
            <hr />
            {
                screen === 1 ?
                    <form onChange={handleInputChange} onSubmit={AddProject} >
                        <section className='HAS1'>
                            <div>
                                <input type="text" name="pname" id="" placeholder='Enter Project Name' />
                                <button className='HAB'>Add</button>
                            </div>

                            <div className="left">
                                <div className="HAPI">
                                    <div>

                                        <p> <strong> Project name :</strong> <span>Apple</span> </p>
                                        <p> <strong> Current Task :</strong> <span>0</span> </p>
                                    </div>
                                    <div>
                                        <button className='HAB'>Edit</button> <br />
                                        <button className='HAB'>Delete</button>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </form>
                    : ""}
            {screen === 2 ?
                <form onChange={handleInputChange} onSubmit={AddTask}>
                    <section className="HM">
                        <div className="HML">
                            <div className="HMLPI">
                                <p>Project Name</p>
                                <p>Project Name</p>
                            </div>
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
            {screen === 3 ?
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
    )
}

export default Welcome
