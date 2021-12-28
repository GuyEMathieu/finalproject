const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator')
const Department = require('./Department');
const auth = require('../userAuthRoutes/auth');
const Position = require('./Position');
const { v4: uid } = require('uuid');


// @route       GET api/depts_positions
// @desc        Get departments and positions list
// @access      private
router.get('/', auth, async (req, res) => {
    try {
        const departments = await Department.find()
            .select('-lastModified').select('-__v')
            .sort({name: 1});
        
        const positions = await Position.find()
            .select('-lastModified').select('-__v')
            .sort({ name: 1 });
        
        res.json({ departments, positions });

    } catch (err) {
        console.error(err.msg);
        res.status(500).send('Server Error');
    }
})



// #region DEPARTMENT

// @route       GET api/depts_positions/departments
// @desc        Get Department list
// @access      private
router.get('/departments', auth, async (req, res) => {
    try {
        const departments = await Department.find()
            .select('-lastModified').select('-__v')
            .sort({name: 1});
        
        res.json(departments);

    } catch (err) {
        console.error(err.msg);
        res.status(500).send('Server Error');
    }
})

// @route       PATCH api/depts_positions/departments
// @desc        Update Department
// @access      private
router.patch('/departments/:_id', auth, async (req, res) => {
    try {
        const filter = {_id: req.params._id};
        const update = req.body;
        console.info("filter by id", req.body)

        const dept = await Department.findOneAndUpdate(filter, update, { new: true })
        console.info("updated version", dept)
        res.json(dept)

    } catch (err) {
        console.error(err.msg);
        res.status(500).send('Server Error');
    }
})


// @route       GET api/depts_positions/departments
// @desc        Get Department list
// @access      private
router.post('/departments', [auth,
    [
        check("name", "A Department name is required").not().isEmpty(),
    ]],
    async (req, res) => {

        let rawErrors = validationResult(req);
        let alerts = []

        if (!rawErrors.isEmpty()) {
            rawErrors = rawErrors.array();
            for (let i = 0; i < rawErrors.length; i++) {
                alerts.push({severity: 'error', msg: rawErrors[i].msg, _id: uid()})
            }
            return res.status(400).json(alerts)
        }

        try {
            let department = await Department.findOne({name: req.body.name})
            
            if (department) {
                return res.status(501).json({alerts: [{severity: 'error', msg: 'Department already exists', _id: uid()}]})
            }

            department = new Department(req.body);

            await department.save();
            
            res.json(department);

        } catch (err) {
            console.error(err.msg);
            res.status(500).send('Server Error');
        }
    }
)


// @route       GET api/depts_positions/departments
// @desc        Get Department list
// @access      private
router.post('/departments/multiple', auth, async (req, res) => {
    try {
        let departments = [];
        for (let i = 0; i < req.body.length; i++){
            let _dept = await Department.findOne({ name: req.body[i].name })
            
            if (!_dept) {
                departments.push({ name: req.body[i].name })
            }
        }

        const newDepartments = await Department.insertMany(departments)
        
        res.json(newDepartments);

    } catch (err) {
        console.error(err.msg);
        res.status(500).send('Server Error');
    }
})

// @route       DELETE api/depts_positions/departments/:id
// @desc        delete Department
// @access      private
router.delete('/departments/:_id', auth, async (req, res) => {
    try {

        //verify if department has any position associated with it
        const positionsInDepartment = await Position.find({department: req.params._id});

        if(positionsInDepartment.length > 0){
            return res.status(409).json(
                {alerts: [{
                    severity: 'error',  
                    msg: "Conflict! Deleting this department will create orphan positions. Please first delete all positions associated with this department.",
                    _id: uid()
                }] 
            })
        }

        await Department.findOneAndDelete({ _id: req.params._id })
        
        // Request success full and returns no content
        return res.status(204).json()
    } catch (err) {
        console.error(err.msg);
        res.status(500).send('Server Error');
    }
})
// #endRegion


// #Region      
// @route       GET api/depts_positions/positions
// @desc        Get Positions list
// @access      Private
router.get('/positions', auth, async (req, res) => {

    try {
        const positions = await Position.find()
            .select('-lastModified').select('-__v')
            .sort({name: 1});
        
        res.json(positions);

    } catch (err) {
        console.error(err.msg);
        res.status(500).send('Server Error');
    }
})


// @route       GET api/depts_positions/positions
// @desc        Add Position 
// @access      private
router.post('/positions', [auth,
    [
        check("name", "A Position name is required").not().isEmpty(),
        check("department", "A Department is required").not().isEmpty(),
    ]],
    async (req, res) => {

        let rawErrors = validationResult(req);
        let errors = []

        if (!rawErrors.isEmpty()) {
            rawErrors = rawErrors.array();
            for (let i = 0; i < rawErrors.length; i++) {
                errors.push({severity: 'error', msg: rawErrors[i].msg, _id: uid()})
            }
            return res.status(400).json(errors)
        }

        try {
            const { name, department } = req.body;

            let position = await Position.findOne({name})
            
            if (position) {
                return res.status(501).json({alerts: [{severity: 'error', msg: 'Department already exists', _id: uid()}]})
            }

            const newPosition = new Position({ name, department });

            await newPosition.save();
            
            res.json(newPosition);

        } catch (err) {
            console.error(err.msg);
            res.status(500).send('Server Error');
        }
    }
)


// @route       GET api/depts_positions/positions
// @desc        Add Multiple Positions
// @access      private
router.post('/positions/multiple', auth, async (req, res) => {
    try {

        let positions = [];

        for (let i = 0; i < req.body.length; i++) {
            const name = req.body[i].name;
            const dept = name.split(' ')[0];

            const existsInDB = await Position.findOne({ name })
            const existsInTemp = await positions.find(position => position.name === name)

            if (!existsInDB && !existsInTemp) {
                const department = await Department.findOne({ name: dept})
                positions.push({ name, department: department._id })
            }
        }

        const newPositions = await Position.insertMany(positions)
        
        res.json(newPositions);

    } catch (err) {
        console.error(err.msg);
        res.status(500).send('Server Error');
    }
})

// @route       DELETE api/depts_positions/positions/:id
// @desc        delete Position
// @access      private
router.delete('/positions/:_id', auth, async (req, res) => {
    try {

        await Position.findOneAndDelete({ _id: req.params._id })
        
        // Request success full and returns no content
        return res.status(204).json()
    } catch (err) {
        console.error(err.msg);
        res.status(500).send('Server Error');
    }
})

// @route       PATCH api/depts_positions/position
// @desc        Update Department
// @access      private
router.patch('/positions/:_id', auth, async (req, res) => {
    try {
        const filter = {_id: req.params._id};
        const update = req.body;

        const dept = await Position.findOneAndUpdate(filter, update, { new: true })
        res.json(dept)

    } catch (err) {
        console.error(err.msg);
        res.status(500).send('Server Error');
    }
})
// #endRegion


module.exports = router;
