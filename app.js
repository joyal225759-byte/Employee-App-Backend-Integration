// Task1: initiate app and run server at 3000
const express = require('express');
const app = new express();
const cors = require('cors');
const logger = require('morgan');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const path=require('path');
app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));
app.use(express.static(path.join(__dirname, 'dist', 'Frontend')));

// Task2: create mongoDB connection 
const mongoose = require('mongoose');

// Connect to MongoDB Atlas database
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://joyal225759_db_user:Joyal123**@cluster0.bqgou07.mongodb.net/EmployeeDB?retryWrites=true&w=majority";

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Database Connected successfully!");
  })
  .catch((err) => {
    console.log("Error connecting to database:", err.message);
  });

// Schema and Model for Employee
const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  salary: {
    type: Number,
    required: true
  }
});

const employeeModel = mongoose.models.Employee || mongoose.model("Employee", employeeSchema);

//Task 2 : write api with error handling and appropriate api mentioned in the TODO below

//TODO: get data from db  using api '/api/employeelist'
app.get(['/api/employeelist', '/employeelist'], async (req, res) => {
  try {
    const data = await employeeModel.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch employees", details: err.message });
  }
});

//TODO: get single data from db  using api '/api/employeelist/:id'
app.get(['/api/employeelist/:id', '/employeelist/:id'], async (req, res) => {
  try {
    const data = await employeeModel.findById(req.params.id);
    if (!data) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch employee", details: err.message });
  }
});

//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}
app.post(['/api/employeelist', '/employeelist'], async (req, res) => {
  try {
    const newEmployee = new employeeModel({
      name: req.body.name,
      location: req.body.location,
      position: req.body.position,
      salary: req.body.salary
    });
    const saved = await newEmployee.save();
    res.status(200).json(saved);
  } catch (err) {
    res.status(500).json({ error: "Failed to add employee", details: err.message });
  }
});

//TODO: delete a employee data from db by using api '/api/employeelist/:id'
app.delete(['/api/employeelist/:id', '/employeelist/:id'], async (req, res) => {
  try {
    const deleted = await employeeModel.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.status(200).json({ status: "ok", result: deleted });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete employee", details: err.message });
  }
});

//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}
app.put(['/api/employeelist', '/employeelist'], async (req, res) => {
  try {
    const id = req.body._id || req.body.id;
    const updateData = {
      name: req.body.name,
      location: req.body.location,
      position: req.body.position,
      salary: req.body.salary
    };
    const updated = await employeeModel.findByIdAndUpdate(id, updateData, { new: true });
    if (!updated) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.status(200).json({ status: "ok", result: updated });
  } catch (err) {
    res.status(500).json({ error: "Failed to update employee", details: err.message });
  }
});

app.put(['/api/employeelist/:id', '/employeelist/:id'], async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = {
      name: req.body.name,
      location: req.body.location,
      position: req.body.position,
      salary: req.body.salary
    };
    const updated = await employeeModel.findByIdAndUpdate(id, updateData, { new: true });
    if (!updated) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.status(200).json({ status: "ok", result: updated });
  } catch (err) {
    res.status(500).json({ error: "Failed to update employee", details: err.message });
  }
});

//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});

// Run server at 3000
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
