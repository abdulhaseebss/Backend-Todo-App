import express from 'express'
import users from './users.mjs'
import todos from './todos.mjs'
const router = express.Router()
    

router.use('/users', users)
router.use('/todos', todos)

export default router