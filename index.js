const express = require("express");
const fs = require('fs');
const path = require('path');
var logger = require("morgan");
require("dotenv").config();
const fileupload = require('express-fileupload');
const cors = require("cors");

// const dataPath = './temp/appointment.json'
const dataPath = path.join(__dirname,'../temp/appointment.json')

// const indexRouter = require("./Routes/index");
// const todoRoutes = require("./routes/todoRoute");
// const appointmentRoutes = require('./routes/appointmentRoutes')
// const connectDb = require('./config/db')

const app = express();
const PORT = process.env.PORT | 5000;


//don't show the log when it is test
if(process.env.NODE_ENV !== "test") {
	app.use(logger("dev"));
}

app.use(fileupload({
    useTempFiles: true,
    tempFileDir: "/tmp",
}))

//Parse Json Payloads
app.use(express.json());

//To allow cross-origin requests
app.use(cors());


// connectDb();

//Route Prefixes
// app.use("/", indexRouter);
app.get("/", function(req, res) {
	// res.send('TodoApp Backend is Running');
	// const accounts = getAccountData()
    res.status(200).json({success:true,msg:'appointments fetched successfully',data:[]})
	// res.send('App is Running');
});

// util functions
// const saveAccountData = (data) => {
//     const stringifyData = JSON.stringify(data)
//     fs.writeFileSync(dataPath, stringifyData)
// }
// const getAccountData = () => {
//     const jsonData = fs.readFileSync(dataPath)
//     return JSON.parse(jsonData)   
// }

// app.get("/appointments", (req, res) => {
//     const accounts = getAccountData()
//     res.status(200).json({success:true,msg:'appointments fetched successfully',data:accounts})
//   });

// app.post("/appointments", (req, res)=>{
//     var existAccounts = getAccountData()
//     const newAccountId = Math.floor(100000 + Math.random() * 900000)
 
//     existAccounts[newAccountId] = req.body
   
//     console.log('existAccounts ',existAccounts);
//     saveAccountData(existAccounts);
//     res.status(201).json({success: true, msg: 'appointment added successfully'})
// });

// app.put("/appointments/:id", (req, res) => {
//     var existAccounts = getAccountData()
//     fs.readFile(dataPath, 'utf8', (err, data) => {
//       const accountId = req.params['id'];
//       existAccounts[accountId] = req.body;
//       saveAccountData(existAccounts);
//       res.json({success:true, msg:`appointment with id ${accountId} has been updated`})
//     }, true);
//   });

// app.delete("/appointments/:id", (req, res) => {
//     fs.readFile(dataPath, 'utf8', (err, data) => {
//       var existAccounts = getAccountData()
//       const userId = req.params['id'];
//       delete existAccounts[userId]; 
//       saveAccountData(existAccounts);
//       res.json({success:true, msg:`accounts with id ${userId} has been deleted`})
//     }, true);
//   });

// app.use('/api/v1/', appointmentRoutes)
// app.use('/api/v1/',todoRoutes);


// throw 404 if URL not found
app.all("*", function(req, res) {
	return res.status(404).json({ status: false, message:"Page not found"});
});


app.listen(PORT, () => console.log("Server running on port " + PORT));

module.exports = app;