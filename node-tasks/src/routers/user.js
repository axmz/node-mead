const express = require('express');
const User = require('../models/user')
const auth = require('../middleware/auth')

const router = new express.Router()

// CREATE USER
router.post('/users', async (req, res) => {
  try {
    const user = await new User(req.body);
    const token = await user.generateAuthToken();
    await user.save()
    res.status(201).send({
      user,
      token
    })
  } catch (e) {
    res.status(400).send('Not good! ' + e)
  }
})

// LOGIN USER
router.post('/users/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateAuthToken()
    res.send({
      user,
      token
    })
  } catch (e) {
    res.status(500).send('error: ' + e)
  }
})

// LOGOUT USER
router.post('/users/logout', auth, async (req, res) => {
  try {
    const user = req.user
    const token = req.token 
    user.tokens = user.tokens.filter((tkn) => {

      return tkn.token !== token
    })
    await user.save()
    res.send('logged out' + user)
  } catch (e) {
    
    res.status(500).send('error ' + e)
  }
})

// LOGOUT ALL TOKENS
router.post('/users/logoutAll', auth, async (req, res) => {
  try {
    const user = req.user
    user.tokens = []
    await user.save()
    res.send('logged out' + user)
  } catch (e) {
    res.status(500).send('error ' + e)
  }
})

// GET USERS
router.get('/users', auth, async (req, res) => {
  try {
    const users = await User.find()
    res.send(users)
  } catch (e) {
    res.status(500).send(e)
  }
})

// GET ME
router.get('/users/me', auth, async (req, res) => {
  try {
    res.send(req.user)
  } catch (e) {
    res.status(400).send(e) 
  }
})

// GET USER
router.get('/users/:id', auth, async (req, res) => {
  try {
    const _id = req.params.id
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).send()
    }
    res.send(user)
  } catch (e) {
    res.status(500).send(e)
  }
})

// EDIT ME
router.patch('/users/me', auth, async (req, res) => {
  const keys = Object.keys(req.body);
  const allowedUpdates = ['name', 'age', 'password']
  const updateAllowed = keys.every(key => allowedUpdates.includes(key));


  if (!updateAllowed) {
    return res.status(400).send('Update is not allowed')
  }

  try {
    const user = req.user
    keys.forEach(key => user[key] = req.body[key])
    await user.save()
    res.send(user)
  } catch (e) {
    res.status(500).send(e)
  }

})
// EDIT USER
router.patch('/users/:id', auth, async (req, res) => {
  const keys = Object.keys(req.body);
  const allowedUpdates = ['name', 'age', 'password']
  const updateAllowed = keys.every(key => allowedUpdates.includes(key));


  if (!updateAllowed) {
    return res.status(400).send('Update is not allowed')
  }

  try {
    //    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

    const user = await User.findById(req.params.id)
    keys.forEach(key => user[key] = req.body[key])
    await user.save()

    res.send(user)
  } catch (e) {
    res.status(500).send(e)
  }

})

// DELETE ME
router.delete('/users/me', auth, async (req, res) => {
  try {
    await req.user.remove()
    res.send('user deleted')
  } catch (e) {
    res.status(500).send(e)
  }
})

// DELETE USER
router.delete('/users/:id', auth, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)
    if (!user) {
      return res.status(404).send('no such user')
    }
    res.send('user deleted')
  } catch (e) {
    res.status(500).send(e)
  }

})

module.exports = router