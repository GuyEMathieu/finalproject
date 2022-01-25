const express = require('express');
const router = express.Router();
const {check,  validationResult } = require('express-validator');
const { v4: uid } = require('uuid');
const Position = require('./Position')
const Department = require('../departmentRoutes/Department')


// @route       GET api/positions
// @desc        Get list of positions
// @access      private
router.get('/', async (req, res) => {

    try{
        const positions = await Position.find()
        res.json(positions)
    }catch(err){
        console.error(err.msg);
        res.status(500).send('Server Error');
    }
})

// @route       POST api/positions
// @desc        Add a single Position
// @access      private
router.post('/', [
        check("name", "A Position name is required").not().isEmpty(),
    ],
    async (req, res) => {
        try{
            const raw = validationResult(req);
            if(!raw.isEmpty()){
                return res.status(409).json({errors: [{severity: 'error', msg: raw.msg, _id: uid()}]})
            }

            const {name} = req.body;
            let pos = await Position.findOne({name});

            if(pos){
                return res.status(409).json({errors: [{severity: 'error', msg: `${name} Position already exists`, _id: uid()}]})
            }

            const department = await Department.findOne({name: name.split(' ')[0]})
            
            if(!department) {
                return res.status(409).json({errors: [{severity: 'error', msg: `${name.split(' ')[0]} Department does not exist`, _id: uid()}]})
            }

            pos = new Position({name, department: department._id})
            await pos.save()

            res.json(pos)
        }catch(err){
            console.error(err.msg);
            res.status(500).send('Server Error');
        }
    }
)

// @route       POST api/positions/multiple
// @desc        Add a single Position
// @access      private
router.post('/multiple', 
    async (req, res) => {
        try{

            let _positions = [];

            for(let i = 0; i < req.body.length; i++){
                const {name} = req.body[i];
                let pos = await Position.findOne({name});
                if(!pos){
                    const deptName = name.split(' ')[0]
                    const dept = await Department.findOne({name: deptName});

                    if(dept) {
                        pos = new Position({name, department: dept._id});
                        _positions.push(pos)
                    }
                }
            }

            const positions = await Position.insertMany(_positions)
            

            res.json(positions)
        }catch(err){
            console.error(err.msg);
            res.status(500).send('Server Error');
        }
    }
)

module.exports = router