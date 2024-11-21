import { Router, json } from "express";
import mongoose, { model, Schema } from "mongoose";

const vehicleSchema = new Schema({
    vehicleName: String,
    vehicleType: String,
    vehicleNo: { type: String, unique: true },
    vehicleServiceno: String,
    date: String,
    estimatedTime: String,
    vehicleOwnname: String,
    servicesDetails: String

})
const Vehicle = mongoose.model('VehicleDetails', vehicleSchema)

mongoose.connect('mongodb://localhost:27017/Vehicle')

const route = Router()

route.use(json())

route.post('/addvehicle', async(req, res) => {
    try {

        console.log("hai");
        const data= req.body
        
        const {
            Vehiclename,
            Vehicletype,
            Vehicleno,
            Vehicleserviceno,
            Date,
            EstimatedTime,
            VehicleOwnname,
            ServicesDetails

        } = data
        console.log(data);
        

        const existingV = await Vehicle.findOne({vehicleNo:Vehicleno})
        console.log(existingV);
         
        if(existingV){
            res.status(400).json({message:"Vehicle Already exisits"})
        }
        else{
            const newV = new Vehicle({

                vehicleNo:Vehicleno,
                vehicleName:Vehiclename,
                vehicleType:Vehicletype,
                vehicleServiceno:Vehicleserviceno,
                date:Date,
                estimatedTime:EstimatedTime,
                vehicleOwnname:VehicleOwnname,
                servicesDetails:ServicesDetails

            }) 
 
            await newV.save()
            res.status(200).json({message:"Vehicle details added successfully"})
        }       

    } catch (error) {
        res.status(500).json({ message: "Server Error" })
    }


})

route.put('/upDateVehicle',async(req,res)=>{
    const data=req.body

    const {Vehicleno,newVehicleserviceno,newVname,newVType,newdate,newVETime,newVowner,newVserD}=data

    const olddata= await Vehicle.findOne({vehicleNo:Vehicleno})

    try {
        if(olddata){

            olddata.vehicleName = newVname || olddata.vehicleName
            olddata.vehicleType = newVType || olddata.vehicleType
            olddata.vehicleServiceno = newVehicleserviceno || olddata.vehicleServiceno
            olddata.date = newdate || olddata.date
            olddata.estimatedTime = newVETime || olddata.estimatedTime
            olddata.vehicleOwnname = newVowner || olddata.vehicleOwnname
            olddata.servicesDetails = newVserD || olddata.servicesDetails
    
            await olddata.save()
            res.status(200).json({message:"Data Upadated Successfully"})
    
        }else{
            res.status(400).json({message:"Data Not found"})
        }
    } catch (error) {
        res.status(500).json({message:"Server"})
    }
   
})



route.get('/viewVehicle/:id',async(req,res)=>{

    const vehicleNo = req.params.id
    
    const Result = await Vehicle.findOne({vehicleNo:vehicleNo})
    if(!Result){
        res.status(400).json({message:"No Vehicles Found"})
    }else{
        res.status(200).json(Result)
        console.log(Result)
    }


})

route.get('/viewVehicleByType/:Vid',async(req,res)=>{

    const Type = req.params.Vid
    
    const Result = await Vehicle.find({vehicleType:Type})
    if(!Result){
        res.status(400).json({message:"No Vehicles Found"})
    }else{
        res.status(200).json(Result)
        console.log(Result)
    }


})

route.get('/viewAll',async(req,res)=>{

    
    const Result = await Vehicle.find()
    if(!Result){
        res.status(400).json({message:"No Vehicles Found"})
    }else{
        res.status(200).json(Result)
        console.log(Result)
    }


})

route.delete('/delete/:id',async(req,res)=>{

    const vehicleNo = req.params.id
    
    const Result = await Vehicle.findOneAndDelete({vehicleNo:vehicleNo})
    if(!Result){
        res.status(400).json({message:"No Vehicles Found"})
    }else{
        res.status(200).json({message:"Vehicle details successfully Deleted"})
    }


})


export { route }