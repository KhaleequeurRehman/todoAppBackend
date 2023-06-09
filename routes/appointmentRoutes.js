const { Router } = require("express");
const fs = require('fs');
const path = require('path');
// const dataPath = './temp/appointment.json'
const dataPath = path.join(__dirname,'../temp/appointment.json')


const router = Router();
// console.log('dataPath ',dataPath)

// util functions
const saveAccountData = (data) => {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync(dataPath, stringifyData)
}
const getAccountData = () => {
    const jsonData = fs.readFileSync(dataPath)
    return JSON.parse(jsonData)   
}

router.get("/appointments", (req, res) => {
    const accounts = getAccountData()
    res.status(200).json({success:true,msg:'appointments fetched successfully',data:accounts})
  });

router.post("/appointments", (req, res)=>{
    var existAccounts = getAccountData()
    const newAccountId = Math.floor(100000 + Math.random() * 900000)
 
    existAccounts[newAccountId] = req.body
   
    console.log('existAccounts ',existAccounts);
    saveAccountData(existAccounts);
    res.status(201).json({success: true, msg: 'appointment added successfully'})
});

router.put("/appointments/:id", (req, res) => {
    var existAccounts = getAccountData()
    fs.readFile(dataPath, 'utf8', (err, data) => {
      const accountId = req.params['id'];
      existAccounts[accountId] = req.body;
      saveAccountData(existAccounts);
      res.json({success:true, msg:`appointment with id ${accountId} has been updated`})
    }, true);
  });

router.delete("/appointments/:id", (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
      var existAccounts = getAccountData()
      const userId = req.params['id'];
      delete existAccounts[userId]; 
      saveAccountData(existAccounts);
      res.json({success:true, msg:`accounts with id ${userId} has been deleted`})
    }, true);
  });

module.exports = router;