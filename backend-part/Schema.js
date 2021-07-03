const mongoose = require('mongoose');
const Joi = require("joi");

const signupSchema = mongoose.Schema({
    name: {
        type: String,
        minlength: 5,
        maxlength: 255
    },
    email: {
        type: String,
        minlength: 5,
        maxlength: 255
    },
    password: {
        type: String,
        minlength: 6,
        maxlength: 225,
    },
    role: {
        type: String
    }

})

const Signup = mongoose.model('signup_data', signupSchema);


function validateSignupData(signup) {
    const schema = Joi.object({
        name: Joi.string().min(5),
        email: Joi.string().min(5),
        password: Joi.string().min(5),
        role: Joi.string(),
    })

    return schema.validate(signup);
}

const addProjectSchema = mongoose.Schema({
    projectName: String,
    totalTask: String,
    completTask: String,
    pendingTask: String,
});

const addTaskSchema = mongoose.Schema({
    taskName: String,
    asighTo: String,
    status: String,
    createdDate: String,
    modifiedDate: String,
    createdBy: String,
    modifiedBy: String,
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin'
    }
});

const AddProject = mongoose.model("admin", addProjectSchema);
const AddTask = mongoose.model("manager", addTaskSchema);


module.exports.Signup = Signup;
module.exports.validateSignupData = validateSignupData;
module.exports.AddProject = AddProject;
module.exports.AddTask = AddTask;