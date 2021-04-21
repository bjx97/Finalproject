const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();

const users = require("./users.js");
const User = users.model;
const validUser = users.valid;

const jobSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    position: String, 
    posteddate: String,
    openings: String,
    startdate: String, 
    shift: String,
    wage: String, 
    description: String,
    company: String,
    created: {
        type: Date,
        default: Date.now
    }
  });
  
jobSchema.virtual('id')
    .get(function() {
      return this._id.toHexString();
});
  
jobSchema.set('toJSON', {
    virtuals: true
});
  
const Job = mongoose.model('Job', jobSchema);

//get all comments
router.get('/all', async (req, res) => {
    try {
      let jobs = await Job.find().sort({
        created: -1
      }).populate('user');
      return res.send({jobs: jobs});
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });

// get all comments
/*router.get("/all", async (req, res) => {
  try {
    let jobs = await Job.find().sort({
      created: -1
    }).populate('user');
    return res.send(jobs);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});*/

//get my comments
router.get('/:id', validUser, async (req, res) => {
    try {
      let foundJob = await Job.findOne({
        _id: req.params.id
      }).sort({
        created: -1
      }).populate('user');
      return res.send(foundJob);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
});
  
router.post('/', validUser, async (req, res) => {
    const job = new Job({
    user: req.user,
    position: req.body.position,
    posteddate: req.body.posteddate,
    openings: req.body.openings,
    startdate: req.body.startdate,
    shift: req.body.shift,
    wage: req.body.wage,
    description: req.body.description,
    company: req.body.company
  });
  try {
    await job.save();
    res.send({job: job});
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
  
router.delete('/:id', validUser, async (req, res) => {
    try {
      await Job.deleteOne({
        _id: req.params.id
      });
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
});
  
router.put('/:id', validUser, async (req, res) => {
    try {
      let foundJob = await Job.findOne({
        _id: req.params.id
      });
      foundJob.position = req.body.position;
      foundJob.posteddate = req.body.posteddate;
      foundJob.openings = req.body.openings;
      foundJob.startdate = req.body.startdate;
      foundJob.shift = req.body.shift;
      foundJob.wage = req.body.wage;
      foundJob.description = req.body.description;
      foundJob.company = req.body.company
      await foundJob.save();
      res.send(foundJob);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
});

module.exports = {
    model: Job,
    routes: router,
}