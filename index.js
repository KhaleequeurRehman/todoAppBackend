const express = require("express");
var logger = require("morgan");
require("dotenv").config();
const fileupload = require('express-fileupload');
const cors = require("cors");

// const indexRouter = require("./Routes/index");
const todoRoutes = require("./routes/todoRoute");
const appointmentRoutes = require('./routes/appointmentRoutes')
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
	res.send('App is Running');
});

app.use('/api/v1', appointmentRoutes)
// app.use('/api/v1/',todoRoutes);


// throw 404 if URL not found
app.all("*", function(req, res) {
	return res.status(404).json({ status: false, message:"Page not found"});
});


app.listen(PORT, () => console.log("Server running on port " + PORT));