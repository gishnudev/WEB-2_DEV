import { Router, json } from "express";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"
import { authenticate } from "../middleware/auth.js";
const Route = Router();

const user = new Map();
const course = new Map();

const seceretKey = "hello";

Route.use(json())

Route.post('/signup', async (req, res) => {
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

            const token = jwt.sign({ UserName: UserName, Role: result.Role }, seceretKey, { expiresIn: "1h" })
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


Route.post('/addcourse', authenticate, (req, res) => {
    try {
        console.log('Hello')
        console.log(req.UserName);
        console.log(req.Role);

        const { CourseName, CourseId, Description, CourseType } = req.body
        console.log(CourseName);

        if (req.Role == "admin") {
            if (course.has(CourseName)) {
                res.status(400).json({ message: "Course already exsist" })
            }
            else {
                course.set(CourseName, { CourseId, Description, CourseType })
                res.status(200).json({ message: 'Course Add Successfully' })
                console.log(course.get(CourseName))
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

Route.post('/upadate', (req, res) => {
    console.log('Your Server is Listening too 8080')
    const { CourseName, NewCourseId, NewCourseName, NewCourseType, NewDescription } = req.body
    if (course.has(CourseName)) {
        const item = course.get(CourseName);
        item.CourseId = NewCourseId || item.CourseId;
        item.CourseType = NewCourseType || item.CourseType;
        item.Description = NewDescription || item.Description
        course.set(CourseName, item);
        console.log(course.get(CourseName));
    }
    else {
        console.log("Not Found")
    }


})
Route.post('/Search', (req, res) => {

})

Route.get('/viewUser',authenticate,(req,res)=>{
    try{
    const user=req.Role;
    res.json({user});}
    catch{
        res.status(404).json({message:'user not authorized'});
    }
})




export { Route };