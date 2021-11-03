const router = require('express').Router()
const User = require('../model/User')
const bcrypt = require('bcryptjs')
const { registerValidation, loginValidation } = require('../validation')
const jwt = require('jsonwebtoken')
const verify = require('./verifyToken')
//! Register


router.post('/register', async (req, res) => {
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message)

    const emailExist = await User.findOne({email: req.body.email})
    if(emailExist) return res.status(400).send("Email already exists")

    //! Hash the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password,salt)

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })
    // console.log("❤❤", user, "❤❤")
    try {
        const savedUser = await user.save()
        res.send(savedUser)
    } catch (err) {
        res.status(400).send("Error: " + err)
    }
})

//! Login
router.post('/login', async (req, res) => {
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message)

    const user = await User.findOne({email: req.body.email})
    if(!user) return res.status(400).send("Email doesn't exist")

    const validPass = await bcrypt.compare(req.body.password,user.password)
    // console.log("✌✌✌",user.password, req.body.password)
    if(!validPass) return res.status(400).send('Invalid password')

    const token = jwt.sign({_id:user.id},process.env.TOKEN_SECRET)
    res.header('auth-token',token).send(token)

    // res.send("Logged in!")
})

//! Get Data
router.get('/get_data',verify, async (req, res) => {
    // console.log(req.user._id)
    User.findOne({_id: req.user._id},(err, val) => {
        // console.log(val,"🤷‍♀️")
        if(err) res.send(err)
        res.json(val)
    }) //! Finds User tralala
    // res.send(req.user)
})

module.exports = router