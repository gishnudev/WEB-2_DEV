import { json, Router } from "express";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { authenticate } from "../middleware/auth.js";

dotenv .config()

const Route = Router()

const user = new Map();
const secretKey = process.env.SecretKey;

Route.use(json())


Route.post('/signup', async(req, res) => {
    try {                                   //error handling using try catch method
        console.log("Hi")
        const data = req.body;
        console.log(data.FirstName)
        const { FirstName,
            LastName,
            UserName,
            Password,
            Role } = data;
        console.log(FirstName)

        const newPass = await (bcrypt.hash(Password, 10));
        console.log(newPass)

        if (user.has(UserName)) {
            res.status(400).json({ message: "User already exits" })
        } else {
            user.set(UserName, {
                FirstName, LastName, Password: newPass, Role
            })
        }

        console.log(user.get(UserName))
        res.status(201).json({ Message: "Data Saved" })
    }
    catch (error) {
        res.status(500).json(error);
    }


})

Route.post('/login', async (req, res) => {
    const data = req.body;
    const { UserName, Password } = data;

    const result = user.get(UserName)
    console.log(result);

    if (result) {
        console.log(Password)
        const invalid = await bcrypt.compare(Password, result.Password);
        console.log(invalid);
        if (invalid) {

            const token = jwt.sign({ UserName: UserName, Role: result.Role }, secretKey, { expiresIn: "1h" })
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
Route.post('/issueCirtificate', authenticate, async(req, res) => {
    try {
        console.log('Hello')
        console.log(req.UserName);
        console.log(req.Role);

        const {  CourseId,CandidateName, Grade,IssueDate,CourseName } = req.body
        console.log(CourseId);

        if (req.Role == "admin") {
            if (user.has(CourseId)) {
                res.status(400).json({ message: "Cirtificate already exsist" })
            }
            else {
                user.set(CourseId, { CandidateName, Grade, IssueDate,CourseName})
                res.status(200).json({ message: 'Cirtificate Added Successfully' })
                console.log(user.get(CourseId))
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


Route.get('/viewUser', authenticate, (req, res) => {
    try {
        const user = req.Role;
        res.json({ user });
    }
    catch {
        res.status(404).json({ message: 'user not authorized' });
    }
})

Route.get('/getCertificate/:CourseId',(req,res)=>{
    try{
        const search =req.params.CourseId
   console.log(search);

        if (user.has(search)) {
            console.log(user.get(search));
            const items =user.get(search)
            return res.status(200).json({
                message:search,
                course:items
            })

        }
        else {
            res.status(404).json({ message: "No course found,Check the name" })
        }
    }
    catch (error) {
        res.status(400).json({ message: "Check the input" })
    }
 })


export {Route};