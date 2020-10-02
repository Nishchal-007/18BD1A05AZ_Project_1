// * Ventilators routes
// ! DON'T FORGET TO ADD "module.exports = app;""

const express = require('express');
const app = express.Router();
var mongoUtil = require('../mongoUtil');
var DB2 = mongoUtil.getDb2();

var db2 = DB2.collection('ventilators');

// ! Fetching Ventilators List
app.get('/', (req, res) => {
    db2.find().toArray()
    .then((data) => {
        res.send(data);
    })
    .catch(err => res.send(err));
})

// ! Fetching a particular Ventilator
app.get('/:id', (req, res) => {
    var id = req.params.id;
    db2.find({ ventilatorId:id }).toArray()
    .then((data) => {
        res.send(data); 
    })
    .catch(err => res.send(err));
})

// ! Searching Ventilators by their Hospital Name and status
app.get('/vent/search', (req, res) => {
    var status = req.body.status;
    var name = req.body.name + " hospital";
    //res.send(status);
    var query = { name: name, status: status };
    db2.find(query).toArray()
    .then((data) => {
        res.send(data);
    })
    .catch(err => res.send(err));
})


// ! Searching Ventilators by their status
app.get('/vent/searchStatus', (req, res) => {
    var status = req.body.status;
    //res.send(status);
    var query = { status: status };
    db2.find(query).toArray()
    .then((data) => {
        res.send(data);
    })
    .catch(err => res.send(err));
})

// ! Searching Ventilators by their Name
app.get('/vent/searchName', (req, res) => {
    var name = req.body.name + " hospital";
    //res.send(status);
    var query = { name: name };
    db2.find(query).toArray()
    .then((data) => {
        res.send(data);
    })
    .catch(err => res.send(err));
})

// ! Adding Ventilators Details
app.post('/add', (req, res) => {
    db2.insertOne(
        req.body
    )
    .then(() => {
        res.send("Data added");
    })
    .catch(err => res.send(err))
})

// ! Deleting Ventilators by ventilator ID
app.delete('/delete/:id', (req, res) => {
    var id = req.params.id;
    db2.remove({ ventilatorId: id })
    .then(() => {
        res.send("Deleted Successfully");
    })
    .catch(err => res.send(err));
})

// ! Updating AllThings by ventilator ID
app.put('/updateAll/:id', (req, res) => {
    var id = req.params.id;
    db2.update(
        { ventilatorId: id }, // Checking condition
        {
            hId: req.body.hId,
            ventilatorId: id,
            status: req.body.status,
            name: req.body.name
        }
    )
    .then(() => {
        res.send("Updated successfully")
    })
    .catch(err => res.send(err))
})

// ! Updating status only by ventilator ID
app.put('/update/:id', (req, res) => {
    var id = req.params.id;
    var val = { $set: { status: req.body.status} };
    db2.updateOne(
        { ventilatorId: id }, // Checking condition
        val
    )
    .then(() => {
        res.send("Updated successfully")
    })
    .catch(err => res.send(err))
})

module.exports = app;

// Ventilators Array

// [
//     {
//         "_id": "5f7025e01f4c4daa2281a7e8",
//         "hId": "H1",
//         "ventilatorId": "H1V5",
//         "status": "occupied",
//         "name": "Apollo hospital"
//     },
//     {
//         "_id": "5f7026fdd9d53e0f10264ca7",
//         "hId": "H2",
//         "ventilatorId": "H2V2",
//         "status": "in-maintainence",
//         "name": "KIMS hospital"
//     },
//     {
//         "_id": "5f7027bbd9d53e0f10264cab",
//         "hId": "H2",
//         "ventilatorId": "H2V1",
//         "status": "available",
//         "name": "KIMS hospital"
//     },
//     {
//         "_id": "5f7027cad9d53e0f10264cac",
//         "hId": "H2",
//         "ventilatorId": "H2V3",
//         "status": "occupied",
//         "name": "KIMS hospital"
//     },
//     {
//         "_id": "5f7027e0d9d53e0f10264cad",
//         "hId": "H3",
//         "ventilatorId": "H3V1",
//         "status": "occupied",
//         "name": "Rainbow hospital"
//     }
// ]


