// Task1: initiate app and run server at 3000
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const EmployeeData = require('./models/employee');


app.use(express.json())                                             // json related
app.use(express.urlencoded({ extended: true }));

const path = require('path');
app.use(express.static(path.join(__dirname + '/dist/FrontEnd')));


// Task2: create mongoDB connection 



let uri = "mongodb+srv://AnjalRajeev:anjalrajeev@cluster0.cgp2vwd.mongodb.net/caseStudyDB?retryWrites=true&w=majority"

async function main() {                                             // main function to connect mongodb

    await mongoose.connect(uri)                                     // connecting node js to database using mongoose
        .then(() => {
            console.log("mongoDB connected successfully")           // successfull msg

        })
        .catch((error) => {
            console.log("connection error", error);                       // error msg
        })

}

main();

//Task 2 : write api with error handling and appropriate api mentioned in the TODO below




//TODO: get data from db  using api '/api/employeelist'
app.get('/api/employeelist', async (req, res) => {
    try {
        const data = await EmployeeData.find()
        console.log(data);
        res.send(data);

    } catch (error) {
        console.log("Get Error:  ", error);
    }
})



//TODO: get single data from db  using api '/api/employeelist/:id'

app.get('/api/employeelist/:id', async (req, res) => {
    try {
        const data = await EmployeeData.findOne({ "_id": req.params.id })
        console.log(data);
        res.send(data);

    } catch (error) {
        console.log("Get one Error:  ", error);
    }
})



//TODO: send data to db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.post('/api/employeelist', async (req, res) => {                          // post method for creating data

    try {                                                           // try block for error handling

        let items = req.body                                        // requesting new data from the body
        console.log(items);
        const user = new EmployeeData(items)                        // comparing incoming data with our model created in student.js
        const savedUser = await user.save()                         // saving data to db 
        console.log("saved data", savedUser);                       // console loging the new data
        res.send(savedUser)                                         // sending response to client

    }
    catch (error) {
        console.log("error", error)                                 // if any error occured, this will work
    }
})




//TODO: delete a employee data from db by using api '/api/employeelist/:id'

app.delete('/api/employeelist/:id', async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id); 
        const user = await EmployeeData.deleteOne({ _id: id })
        .then(function(){
            console.log("Data deleted"); // Success
            res.send()
        }).catch(function(error){
            console.log(error); // Failure
        });

     
        
        
    } catch (error) {
        console.log("DELETE error", error)
    }
        
})





//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.put('/api/employeelist', async (req, res) => {
    try {
        const id = req.body._id;
    console.log(id)
    const user = await EmployeeData.findByIdAndUpdate({"_id":id}, {
        $set:{ 
        "name": req.body.name, 
        "location": req.body.location, 
        "position": req.body.position, 
        "salary": req.body.salary 
        }
    });
    res.send(user)
    console.log(user)
    } catch (error) {
        console.log("PUT error", error)
    }
    
})
 


//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});

//PORT listening
app.listen(3000, () => {
    console.log("Server is running on PORT 3000");
});
