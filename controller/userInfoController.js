require("dotenv").config();
const userSchema = require('../models/userSchema')
const jwt = require("jsonwebtoken");

module.exports = {

    createUser: async (req, res) => {

        try {
            var { name, email } = req.body
            if (name.length === 0 || email.length === 0) {
                return res.status(400).json({ success: false, message: "Please Enter Valid Data" })

            } else {
                var userDetails = {
                    $or: [
                        { name: name },
                        { email: email }
                    ]
                }

                var userData = await userSchema.findOne(userDetails)
                if (!userData) {

                    var userObject = {
                        ...req.body,
                        name: name,
                        email: email
                    }

                    const newUser = new userSchema(userObject);
                    await newUser.save()
                    return res.status(200).json({ success: true, message: "User saved successfully" })

                } else {
                    return res.status(400).json({ success: false, message: "User already exists" })
                }

            }

        } catch (err) {
            console.log("catch error: " + err)
            return res.status(500).json({ success: false, message: "Something went wrong!!" })
        }

    },
    userLogin: async (req, res) => {

        try {

            var {name, email} = req.body

            if (name.length === 0 || email.length === 0) {
                return res.status(400).json({ success: false, message: "Please Enter Valid Data" })
            } else {

                var FindUser = await userSchema.findOne({name: name, email: email})

                if(FindUser){

                    const userInfo = {
                        _id: FindUser._id,
                        name: FindUser.name,
                        email: FindUser.email
                    }

                    const token = jwt.sign(userInfo, process.env.JWT_SECRET)

                    const payload = {
                        userDetails:{
                            name: FindUser.name,
                            email: FindUser.email
                        },
                        token: token
                    }

                    return res.status(200).json({success: true, message:"Login Successfully", data: payload})

                } else {
                    return res.status(400).json({ success: false, message: "User Not Found!!" })
                }

            }

        } catch {
            console.log("catch error: " + err)
            return res.status(500).json({ success: false, message: "Something went wrong!!" })
        }

    }

}