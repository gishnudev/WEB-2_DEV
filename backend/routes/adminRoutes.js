import { Router, json } from "express";
import bcrypt, { compare } from 'bcrypt';
import jwt from "jsonwebtoken"
import { authenticate } from "../middleware/auth.js";
import mongoose from 'mongoose'

const Route = Router();

// const user = new Map();
// const course = new Map();

const seceretKey = "hello";
//Define userSchema
const userSchema = new mongoose.Schema(
    {
        FirstName:String,
        LastName:String,
        UserName:{type:String,unique:true},
        Password:String,
        Role:String
    }
)
//define course schema
const courseSchema = new mongoose.Schema(
    {
        CourseName:{type:String,unique:true},
        CourseId:String,
        Description:String,
        CourseType:String,
        Price:String
})

//create model
const user = mongoose.model('userDeteails',userSchema)
const course = mongoose.model('coursedetails',courseSchema)

mongoose.connect('mongodb://localhost:27017/KBA_Coursese')

Route.use(json())

Route.post('/signup', async(req,res) => {
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

        const existingUser=await user.findOne({UserName:UserName})

        if (existingUser) {
            res.status(400).json({ message: "User already exits" })
            
            
        } else {
            //create new user
            const newUser = new user({
                FirstName:FirstName,
                LastName:LastName,
                UserName:UserName,
                Password:newPass,
                Role:Role
            })
            await newUser.save()
            res.status(200).json({message:"User registered successfully"})

            // user.set(UserName, {
            //     FirstName, LastName, Password: newPass, Role
            // })
        }

        //console.log(user.get(UserName))
       // res.status(201).json({ Message: "Data Saved" })
    }
    catch (error) {
        res.status(500).json(error);
    }


})

Route.post('/login', async (req, res) => {
    const data = req.body;
    const { UserName, Password } = data;

    const result = await user.findOne({UserName:UserName})
    console.log(result);

    if (result) {
        console.log(Password)
        const invalid = await bcrypt.compare(Password,result.Password);
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
        res.status(403).json({ message: "User is not exist" })
    }



})


Route.post('/addcourse', authenticate,async (req, res) => {
    try {
        console.log('Hello')
        console.log(req.UserName);
        console.log(req.Role);

        const { CourseName,CourseId,Description,CourseType,Price } = req.body
        console.log(CourseName);

        if (req.Role == "admin") {
            const existingCourse = await course.findOne({CourseName:CourseName})


             if (existingCourse) {
                res.status(400).json({ message: "Course already exist" })
            }
            else {
                const newCourse = new course({
                    CourseName:CourseName,
                    CourseId:CourseId,
                    Description:Description,
                    CourseType:CourseType,
                    Price:parseInt(Price)
                });
                await newCourse.save()
                res.status(200).json({message:"Course added successfully"})

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

// //using query
// Route.get('/getCourse', (req, res) => {
//     try {
//         const search = req.query.CourseName;
//         console.log(search);
//         const result = course.get(search)
//         if (result) {

//             res.send(result);
//         }
//         else {
//             res.status(404).json({ message: "No course found,Check the name" })
//         }
//     }
//     catch (error) {
//         res.status(400).json({ message: "Check the input" })
//     }
// })



// Route.post('/upadate', authenticate,(req, res) => {
//     try {
//         if (req.UserName) {

//             const body = req.body;
//             console.log(body);
//             const { newCourseId, CourseName, newCourseType, newDescription, newPrice } = body;
//             // console.log(cid, cname, ctype, cdescription, cprice);

//             if (CourseName) {
//                 const oldData = course.get(CourseName)
//                 console.log(oldData);

//                 oldData.CourseId = newCourseId || oldData.CourseId;
//                 oldData.CourseType = newCourseType || oldData.CourseType;
//                 oldData.Description = newDescription || oldData.Description;
//                 oldData.Price = newPrice || oldData.Price;

//                 console.log(oldData);
//                 course.set(CourseName, oldData);

//                 res.status(200).json({ message: "successfully Updated" })
//                 console.log(course);

//             } else {
//                 console.log('id is not found!');
//                 return res.status(404).json({ message: "Course not found" });
//             }
//         } else {
//             console.log('user not loggined')
//             return res.status(401).json({ message: "User not authenticated" });
//         }

//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: "Internal Server Error" });

//     }
// });

// Route.post('/Search', (req, res) => {

// })

Route.get('/viewUser', authenticate, (req, res) => {
    try {
        const user = req.Role;
        res.json({ user });
    }
    catch {
        res.status(404).json({ message: 'user not authorized' });
    }
})


Route.get('/viewCourse',async(req,res)=>{
   
    const FIND=await course.find()

    if(FIND.length>0){
        console.log(FIND);
        res.status(200).json(FIND)
    }
    else
    {
        res.status(404).json({message:"there is no book added yet !"})
        console.log('there is no book added yet !')
    }
})


Route.delete('/delete/:id',authenticate,async(req,res)=>{
    try {
            const id = req.params.id;
            console.log(id)
        if(req.Role=='admin'){
            const unique = await course.findOne({CourseName:CourseName})

            // console.log(Role)
            if(unique==CourseName){
                const unique = await course.findOneAndDelete({CourseName:CourseName})
                res.status(200).json({message:"deleted"});
            }else{
                res.status(404).json({message:"Data not found"})
            }
        }

    } catch (error) {
        console.error(error);
        
    }
})


export { Route };