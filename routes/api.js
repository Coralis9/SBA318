
module.exports = function(users) {
    const express = require('express');
    const router = express.Router();
  
    // GET all users
    router.get('/', (req, res) => {
      res.json(users);
    });
  
    // GET user by ID
    router.get('/:id', (req, res) => {
      const user = users.find(u => u.id === parseInt(req.params.id));
      if (!user) return res.status(404).json({ error: 'User not found' });
      res.json(user);
    });
  
    // POST create user
    router.post('/', (req, res) => {
      const { name } = req.body;
      const newUser = { id: users.length + 1, name };
      users.push(newUser);
      res.status(201).json(newUser);
    });
  
    return router;
  };