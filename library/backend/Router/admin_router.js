import { json, Router } from "express";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { authenticate } from "../middleware/auth.js";

dotenv.config()

const adminRoute = Router()

const LibAdmin = new Map();
const Books = new Map()
const secretKey = process.env.SecretKey;

adminRoute.use(json())

adminRoute.post('/signup', async(req, res) => {
    try {                                   //error handling using try catch method
        console.log("Hi")
        const data = req.body;
        console.log(data.Email)
        const { Name,Email,
            Password,
            ConfirmPassword,
            Role } = data;
        console.log(Email)

        if (!Name || !Email || !Password || !ConfirmPassword || !Role) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if(Password !== ConfirmPassword){
            return res.status(400).json({message:"Password do not matching"})
        }

        const newPass = await (bcrypt.hash(Password, 10));
        console.log(newPass)

        if (LibAdmin.has(Name)) {
            res.status(400).json({ message: "User already exits" })
        } else {
            LibAdmin.set(Name,{
                Email,Password:newPass,Role
            })
        }

        console.log(LibAdmin.get(Name))
        res.status(201).json({ Message: "Data Saved" })
    }
    catch (error) {
        res.status(500).json(error);
    }

})

adminRoute.post('/login', async (req, res) => {
    const data = req.body;
    const { Name, Password } = data;

    console.log(data);

    const result = LibAdmin.get(Name)
    console.log("hi");
    console.log(result);

    if (result) {
        console.log(Password)
        const invalid = await bcrypt.compare(Password, result.Password);
        console.log(invalid);
        if (invalid) {

            const token = jwt.sign({ Name: Name, Role: result.Role }, secretKey, { expiresIn: "1h" })
            console.log(token)
            res.cookie('authToken', token, {
                httpOnly: true
            });
            res.status(200).json({ message: "Success" })
        }
        else {
            res.status(403).json({ Message: "Password Is Correct" })
        }

    }
    else {
        res.status(403).json({ message: "User is not exisit" })
    }
})

adminRoute.post('/addBook', authenticate, (req, res) => {
    try {
        console.log('Hello')
        console.log(req.Name);
        console.log(req.Role);

        const { BookName, AutherName, Description } = req.body
        // console.log(BookName);

        if (req.Role == "admin") {
            if (Books.has(BookName)) {
                res.status(400).json({ message: "Book already exist" })
            }
            else {
                Books.set(BookName, { AutherName, Description })
                res.status(200).json({ message: 'Book Add Successfully' })
                console.log(Books.get(BookName))
            }


        }
        else {
            res.status(400).json({ message: 'User Is Not Admin' })
            console.log("User Is Not Admin")

        }


    } catch (error) {
        res.status(500).json(error);

    }

})

adminRoute.get('/viewUser', authenticate, (req, res) => {
    try {
        const user = req.Role;
        res.json({ user });
    }
    catch {
        res.status(404).json({ message: 'user not authorized' });
    }
})

adminRoute.get('/viewBook', async (req, res) => {
    try {
        console.log(Books.size);

        if (Books.size != 0) {


            res.send(Array.from(Books.entries()))
        }
        else {
            res.status(404).json({ message: 'Not Found' });
        }
    }
    catch {
        res.status(404).json({ message: "Internal error" })
    }
});


export {adminRoute};