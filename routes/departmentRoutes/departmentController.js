const express = require('express');
const router = express.Router();
const {check,  validationResult } = require('express-validator');
const { v4: uid } = require('uuid');
const Department = require('./Department')


// @route       GET api/departments
// @desc        Get list of Departments
// @access      private
router.get('/', async (req, res) => {

    try{
        const departments = await Department.find()
        res.json(departments)
    }catch(err){
        console.error(err.msg);
        res.status(500).send('Server Error');
    }
})

// @route       POST api/departments
// @desc        Add a single Department
// @access      private
router.post('/', [
        check("name", "A Department name is required").not().isEmpty()
    ],
    async (req, res) => {
        try{
            const raw = validationResult(req);
            if(!raw.isEmpty()){
                return res.status(409).json({alerts: [{severity: 'error', msg: raw.msg, _id: uid()}]})
            }
            const {name} = req.body;
            let dept = await Department.findOne({name});

            if(dept) {
                return res.status(401).json({errors: [{severity: 'error', msg: `${name} department already exists`, _id: uid()}]})
            }

            dept = new Department({name});
            await dept.save();

            res.json(dept)
        }catch(err){
            console.error(err.msg);
            res.status(500).send('Server Error');
        }
    }
)

// @route       POST api/departments/multiple
// @desc        Add a single Department
// @access      private
router.post('/multiple', 
    async (req, res) => {
        try{

            let _depts = [];

            for(let i = 0; i < req.body.length; i++){
                const {name} = req.body[i];
                let dept = await Department.findOne({name});

                if(!dept){
                    dept = new Department({name})
                    _depts.push(dept)
                }
            }
            const departments = await Department.insertMany(_depts)

            res.json(departments)
        }catch(err){
            console.error(err.msg);
            res.status(500).send('Server Error');
        }
    }
)

module.exports = router