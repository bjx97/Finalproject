const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();

const users = require("./users.js");
const User = users.model;
const jobs = require("./jobs.js");
const Job = jobs.model;
const validUser = users.valid;

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    job: {
      type: mongoose.Schema.ObjectId,
      ref: 'Job'
    },
    text: String,
    //name: String,
    //whenDate: String,
    jobEmail: String,
    created: {
        type: Date,
        default: Date.now
    }
});
  
  
const Comment = mongoose.model('Comment', commentSchema);
  //submit comments/interests for jobs

router.post('/:id', validUser, async (req, res) => {
    try {
        let job = await Job.findOne({_id: req.params.id});
        if (!job) {
            res.send(404);
            return;
        }
        let comment = new Comment({
            job: job,
            text: req.body.text,
            //name: req.body.name,
            //whenDate: req.body.whenDate,
            jobEmail: req.body.jobEmail,
            user: req.user
        });
        await comment.save();
        res.send(comment);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});
  
router.get('/:id', async (req, res) => {
    try {
        let job = await Job.findOne({
            _id: req.params.id
        });
        if (!job) {
            res.send(404);
            return;
        }
        let comments = await Comment.find({
            job:job
        }).populate("user");
        res.send(comments);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});
  
  
router.delete('/:id/:commentID', async (req, res) => {
    try {
        let comment = await Comment.findOne({
            _id:req.params.commentID, job: req.params.id
        });
        if (!comment) {
            res.send(404);
            return;
        }
        await comment.delete();
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

module.exports = {
    model: Comment,
    routes: router,
}