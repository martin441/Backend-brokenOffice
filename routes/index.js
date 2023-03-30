const express = require("express");
const router = express.Router();
const userRouter = require("./user");
const officesRouter = require("./offices");
const collaboratorsRouter = require("./collaborators");
const reportsRouter = require("./reports");
const { validateUser } = require("../middleware/auth");
const { Office } = require("../models");


router.use("/user", userRouter);
router.use("/offices", validateUser, officesRouter);
router.use("/collaborators", validateUser, collaboratorsRouter);
router.use("/reports", validateUser, reportsRouter);

router.get("/probando", async (req, res) => {
    const casa = { type: "Point", coordinates: [-62.261036, -38.709426] };
    try {
        const algo = await Office.aggregate([{
            $geoNear: {
                near: casa,
                spherical: true,
                distanceField: "calcDistance",
                distanceMultiplier: 0.001,
            }
        }]);
        console.log(algo);
        res.send(algo)
    } catch (error) {
        console.error(error)
    }
})

module.exports = router;

/* 
    {
    "name": "Name",
    "lastName": "Last name",    
    "role": "Developer",
    "addressName": "Some adress 236",   
    "office": "6425a5a4ace63680769c24e0"    
}
*/