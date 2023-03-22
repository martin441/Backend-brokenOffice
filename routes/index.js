const express = require("express");
const router = express.Router();
const userRouter = require("./user");
const { User, Office } = require("../models");

/* 
    {
  "name": "Pepe",
  "lastName": "Gomez",
  "type": "standard",
  "password": "12345",
  "email": "pepe@mail.com"
}
{
  "name": "Buenos Aires",
  "address": "Por ahí",
  "coordinates": "34x, 45y"
}
*/

router.use("/user", userRouter);

router.post("/models", async (req, res) => {
  try {
    // const user = await User.create(req.body);
    // const office = await Office.create(req.body)
    /* const singleOff = await Office.findOne(req.body);
    const singleUsr = await User.findOne({name: "Pepe"});
    singleUsr.office = singleOff._id;
    singleUsr.save(); */
    //const singleUsr = await User.findOne({name: "Pepe"}).populate("office");
    // const test = await singleUsr.populate("office");
    const singleUsr = await User.findOneAndUpdate({name: "Pepe"}, {office: "641b0ffb95c796a5fd6dc8bc"}, {runValidators: true, new:true}).populate("office");
    
    res.send(singleUsr);
  } catch (error) {
    console.error(error);
    res.send(error)
  }
});

module.exports = router;
