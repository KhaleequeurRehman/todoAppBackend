const express = require("express");
var logger = require("morgan");
// const dataPath = './data/appointment.json'
// const fs = require('fs');
require("dotenv").config();

const cors = require("cors");

// const indexRouter = require("./Routes/index");
const todoRoutes = require("./routes/todoRoute");
const appointmentRoutes = require('./routes/appointmentRoutes')
const connectDb = require('./config/db')

const app = express();
const PORT = process.env.PORT | 5000;


//don't show the log when it is test
if(process.env.NODE_ENV !== "test") {
	app.use(logger("dev"));
}

//Parse Json Payloads
app.use(express.json());

//To allow cross-origin requests
app.use(cors());

connectDb();

// util functions
// const saveAccountData = (data) => {
//     const stringifyData = JSON.stringify(data)
//     fs.writeFileSync(dataPath, stringifyData)
// }
// const getAccountData = () => {
//     const jsonData = fs.readFileSync(dataPath)
//     return JSON.parse(jsonData)   
// }

//Route Prefixes
// app.use("/", indexRouter);
app.get("/", function(req, res) {
	// res.send('TodoApp Backend is Running');
	res.send('App is Running');
});

// app.use('/api/v1/',todoRoutes);
app.use('/api/v1/', appointmentRoutes)


// app.get("/appointments", (req, res) => {
//     const accounts = getAccountData()
//     res.status(200).send(accounts)
//   });

// app.post("/appointments", (req, res)=>{
//     var existAccounts = getAccountData()
//     const newAccountId = Math.floor(100000 + Math.random() * 900000)
 
//     existAccounts[newAccountId] = req.body
   
//     console.log('existAccounts ',existAccounts);
//     saveAccountData(existAccounts);
//     res.status(201).send({success: true, msg: 'appointment added successfully'})
// });

// app.put("/appointments/:id", (req, res) => {
//     var existAccounts = getAccountData()
//     fs.readFile(dataPath, 'utf8', (err, data) => {
//       const accountId = req.params['id'];
//       existAccounts[accountId] = req.body;
//       saveAccountData(existAccounts);
//       res.send(`appointment with id ${accountId} has been updated`)
//     }, true);
//   });

// app.delete("/appointments/:id", (req, res) => {
//     fs.readFile(dataPath, 'utf8', (err, data) => {
//       var existAccounts = getAccountData()
//       const userId = req.params['id'];
//       delete existAccounts[userId]; 
//       saveAccountData(existAccounts);
//       res.send(`accounts with id ${userId} has been deleted`)
//     }, true);
//   });


// throw 404 if URL not found
app.all("*", function(req, res) {
	return res.status(404).json({ status: false, message:"Page not found"});
});


app.listen(PORT, () => console.log("Server running on port " + PORT));