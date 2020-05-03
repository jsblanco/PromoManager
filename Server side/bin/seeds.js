require("dotenv").config({ path: '../.env' });
const mongoose = require("mongoose")
const Project = require('../models/project');
const Phase = require('../models/phase');
const Task = require('../models/task');
const User = require('../models/user');
const projectSeeds = require('./projectJSON')
const phaseSeeds = require('./phaseSeed')
const taskSeeds = require('./taskJSON')
const userSeeds = require('./userJSON')



mongoose.connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    keepAlive: true,
    useNewUrlParser: true,
  })

Project.collection.drop();
Phase.collection.drop();
Task.collection.drop();
User.collection.drop();



Project.create(projectSeeds, (err) => {
    if (err) {
        throw (err)
    }
    console.log(`Created ${projectSeeds.length} projects`)
    mongoose.connection.close();
});

Phase.create(phaseSeeds, (err) => {
    if (err) {
        throw (err)
    }
    console.log(`Created ${phaseSeeds.length} phases`)
    mongoose.connection.close();
});

Task.create(taskSeeds, (err) => {
    if (err) {
        throw (err)
    }
    console.log(`Created ${taskSeeds.length} phases`)
    mongoose.connection.close();
});

User.create(userSeeds, (err) => {
    if (err) {
        throw (err)
    }
    console.log(`Created ${userSeeds.length} users`)
    mongoose.connection.close();
});