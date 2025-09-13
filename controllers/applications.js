const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

// Applications Index Page
router.get('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        res.render('applications/index.ejs', {
            applications: currentUser.applications
        });
    } catch(error) {
        console.log(error);
        res.redirect('/');
    };
});

// Applications Create Form Page
router.get('/new', (req, res) => {
    try {
        res.render('applications/new.ejs');
    } catch(error) {
        console.log(error)
    }
})

// Application Create Route
router.post('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        currentUser.applications.push(req.body);
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/applications`);
    } catch(error) {
        console.log(error)
    }
})

// Applications Show Route
router.get('/:applicationId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const application = currentUser.applications.id(req.params.applicationId)
        res.render('applications/show.ejs', {
            application: application,
        })
    } catch (error) {
        console.log(error);
        res.redirect("/")
    }
})

// Applications Delete Route
router.delete('/:applicationId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        currentUser.applications.id(req.params.applicationId).deleteOne();
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/applications`);
    } catch(error) {
        console.log(error);
        res.redirect('/');
    }
})

// Applications Edit Form Route
router.get('/:applicationId/edit', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const application = currentUser.applications.id(req.params.applicationId);
        res.render('applications/edit.ejs', {
            application: application,
        });
    } catch(error) {
        console.log(error);
        res.redirect("/");
    }
})

// Applications Update Route
router.put('/:applicationId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const application = currentUser.applications.id(req.params.applicationId);
        application.set(req.body);
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/applications/${req.params.applicationId}`)
    } catch(error) {
        console.log(error)
        res.redirect("/")
    }
})

module.exports = router;