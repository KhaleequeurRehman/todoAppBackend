const dataPath = './data/appointment.json'
const { Router } = require("express");
const fs = require('fs');


const router = Router();
console.log('dataPath ',dataPath)

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
    res.status(200).send(accounts)
  });

router.post("/appointments", (req, res)=>{
    var existAccounts = getAccountData()
    const newAccountId = Math.floor(100000 + Math.random() * 900000)
 
    existAccounts[newAccountId] = req.body
   
    console.log('existAccounts ',existAccounts);
    saveAccountData(existAccounts);
    res.status(201).send({success: true, msg: 'appointment added successfully'})
});

router.put("/appointments/:id", (req, res) => {
    var existAccounts = getAccountData()
    fs.readFile(dataPath, 'utf8', (err, data) => {
      const accountId = req.params['id'];
      existAccounts[accountId] = req.body;
      saveAccountData(existAccounts);
      res.send(`appointment with id ${accountId} has been updated`)
    }, true);
  });

router.delete("/appointments/:id", (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
      var existAccounts = getAccountData()
      const userId = req.params['id'];
      delete existAccounts[userId]; 
      saveAccountData(existAccounts);
      res.send(`accounts with id ${userId} has been deleted`)
    }, true);
  });

module.exports = router;