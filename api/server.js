// BUILD YOUR SERVER HERE
const express = require('express')
const Users = require(`./users/model`)
const server = express()

server.use(express.json())

//Endpoints:
// GET requests:
server.get(`/api/users`, async (req, res) => {
   try {
      const users = await Users.find()
      res.status(200).json(users)
   } catch (err) {
      res.status(500).json({ message: "The users information could not be retrieved" })
   }
})

server.get(`/api/users/:id`, async (req, res) => {
   try {
      const { id } = req.params
      const userData = await Users.findById(id)

      if (!userData) {
         res.status(404).json({ message: "The user with the specified ID does not exist" })
      } else {
         res.status(200).json(userData)
      }
   }
   catch (err) {
      res.status(500).json({ message: "The user information could not be retrieved" })
   }
})


//POST Request:
server.post(`/api/users`, async (req, res) => {
   try {
      const { name, bio } = req.body

      if (!name || !bio) {
         res.status(400).json({ message: "Please provide name and bio for the user" })
      }
      else {
         const createdUser = await Users.insert({ name, bio })

         res.status(201).json(createdUser)
      }
   } catch (err) {
      res.status(500).json({ message: "There was an error while saving the user to the database" })
   }
})

//PUT Request:
server.put(`/api/users/:id`, async (req, res) => {
   try {
      const { id } = req.params
      const { name, bio } = req.body

      if (!name || !bio) {
         res.status(400).json({ message: "Please provide name and bio for the user" })
      }
      else {
         const updatedUser = await Users.update(id, { name, bio })

         if (!updatedUser) {
            res.status(404).json({ message: "The user with the specified ID does not exist" })
         } else {
            res.status(200).json(updatedUser)
         }
      }
   } catch (err) {
      res.status(500).json({ message: "The user information could not be modified" })
   }
})

// DELETE Request:
server.delete(`/api/users/:id`, async (req, res) => {
   try {
      const { id } = req.params
      const deletedUser = await Users.remove(id)

      if (!deletedUser) {
         res.status(404).json({ message: "The user with the specified ID does not exist" })
      }
      else {
         res.status(200).json(deletedUser)
      }
   }
   catch (err) {
      res.status(500).json({ message: "The user could not be removed" })
   }
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
