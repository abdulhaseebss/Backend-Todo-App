import express from 'express'
import Users from '../models/users.mjs'
import verifyToken from '../middleweres/verifyToken.mjs'
const router = express.Router()

router.get('/', async (req, res) => {
    const users = await Users.find()
    res.send({ data: users })
})

router.post('/register', async (req, res) => {
    try {
        
        const { email } = req.body

        //Step 1: Check if email exists
        const user = await Users.findOne({ email })
    
        if (user) {
         res.status(404).send({ message: 'User Already regestered!' })
            
        }else{
            await Users.create(req.body)
            res.send({ message: 'User registered successfully!'})
        }
    } catch (e) {
        res.status(400).send({ message: e.message })
    }
})

router.put('/login', async (req, res) => {
    try {
        const { email, password } = req.body

        //Step 1: Check if email exists
        const user = await Users.findOne({ email })
    
        if (!user) {
            res.status(404).send({ message: 'Email not found!' })
            return
        }
    
        //Step 2: Compare Password
        const isCorrectPassword = user.comparePassword(password)
    
        if (!isCorrectPassword) {
            res.status(404).send({ message: 'Password is incorrect!' })
        }else{
            //Step 3: Generate Token
        const token = user.generateToken()
        user.tokens.push(token)
        await user.save()
    
        res.send({ message: 'User logged in successfully!', token })
        }
    
        
    } catch (e) {
        res.status(400).send({ message: e.message })
    }
})

router.put('/logout', verifyToken, async (req, res) => {
    await Users.findByIdAndUpdate(req.userId, { $pull: { tokens: req.tokenToRemove } })
    res.send({ message: 'Logged out successfully!' })
})

export default router