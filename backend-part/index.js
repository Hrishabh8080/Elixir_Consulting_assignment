const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
require('dotenv/config');
const app = express();
const { validateSignupData, Signup, AddProject, AddTask } = require('./Schema')

mongoose.connect(process.env.DB_URL + '/elixirDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Database is connected..."))
    .catch(err => console.log("Database failed to connect ", err));

    app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));





app.post('/signup', async (req, res) => {
    const result = validateSignupData(req.body);
    console.log(result);

    if (result.error) {
        return res.status(400).send(result.error.details[0].message);
    }
    let newUser = new Signup({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
    })

    const user = await newUser.save();
    res.send(user);


})

app.post('/login', async (req, res) => {
    const user = await Signup.find({ email: req.body.email, password: req.body.password });
    if (user.length == 0) return res.status(404).send("Incorrect Details");
    console.log(user);
    res.send(user);

})
app.get('/getProject', async (req, res) => {
    const project = await AddProject.find();
    res.send(project);
})
app.post('/addProject', async (req, res) => {
    let addProject = new AddProject({
        projectName: req.body.projectName,
        totalTask: 0,
        completTask: 0,
        pendingTask: 0,

    })
    const project = await addProject.save();
    res.send(project);

})
app.get('/getTask', async (req, res) => {
    const task = await AddTask.find();
    res.send(task);
})
app.post('/addTask', async (req, res) => {
    let addTask = new AddTask({
        taskName: req.body.taskName,
        asighTo: req.body.asighTo,
        status: "pending",
        createdDate: new Date().toUTCString(),
        modifiedDate: "-",
        createdBy: req.body.name,
        modifiedBy: "-",
    })
    const task = await addTask.save();
    res.send(task);

})


app.put('/updateTask:id', async (req, res) => {
    const task = await AddTask.findByIdAndUpdate(req.params.id, {
        $set: {
            status: req.body.status,
            modifiedBy: req.body.modifiedBy,
            modifiedDate: req.body.modifiedDate,
        }
    }, { new: true })

})

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening to port ${port}....`));
