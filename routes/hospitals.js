// * Hospitals routes

const express = require('express');
const app = express.Router();
var mongoUtil = require('../mongoUtil');
var DB1 = mongoUtil.getDb1();

var db1 = DB1.collection('hospitals');

// ! Fetching Hospitals List
app.get('/', (req, res) => {
    db1.find().toArray()
    .then((data) => {
        res.send(data);
    })
    .catch(err => console.log(err));
})

// ! Fetching a particular Hospital
app.get('/:id', (req, res) => {
    var id = req.params.id;
    db1.find({ hId:id }).toArray()
    .then((data) => {
        res.send(data); 
    })
    .catch(err => console.log(err));
})


// ! Searching Hospitals by their name
app.get('/hosp/search', (req, res) => {
    var name = req.body.name + " hospital";
    //res.send(status);
    var query = { name: name };
    db1.find(query).toArray()
    .then((data) => {
        res.send(data);
    })
    .catch(err => console.log(err));
})


// ! Adding hospital Details
app.post('/add', (req, res) => {
    db1.insertOne(
        req.body
    )
    .then(() => {
        res.send("Data added");
    })
    .catch(err => res.send(err))
})

// ! Deleting hospitals by hId
app.delete('/delete/:id', (req, res) => {
    var id = req.params.id;
    db1.remove({ hId: id })
    .then(() => {
        res.send("Deleted Successfully");
    })
    .catch(err => res.send(err));
})

// ! Updating hospitals by hId
app.put('/update/:id', (req, res) => {
    var id = req.params.id;
    db1.update(
        { hId: id },
        {
            hId: id,
            name: req.body.name,
            location: req.body.location,
            address: req.body.address,
            contactNo: req.body.contactNo 
        }
    )
    .then(() => {
        res.send("Updated successfully")
    })
    .catch(err => res.send(err))
})

module.exports = app;

// Hospitals Array
// [
//     {
//         "_id": "5f6ed57da3c70025bc10d6c9",
//         "hId": "H1",
//         "name": "Apollo hospital",
//         "location": "17.398644, 78.484334",
//         "address": "Plot No. 3-5-874/1 Near, Old MLA Quarters Rd, Hyderguda,Hyderabad,Telangana 500029",
//         "contactNo": "040-23231380"
//     },
//     {
//         "_id": "5f6ed5afa3c70025bc10d6ca",
//         "hId": "H2",
//         "name": "KIMS hospital",
//         "location": "15.398644, 56.484334",
//         "address": "Plot No. 3-5-874/1 Near, Old RdSecundarabad,Telangana 500029",
//         "contactNo": "040-12345678"
//     },
//     {
//         "_id": "5f6ed66fa3c70025bc10d6cc",
//         "hId": "H3",
//         "name": "Rainbow hospital",
//         "location": "76.395644, 78.487834",
//         "address": "Plot No. 3-5-874/1 Near, Medium Rd,Hyd,TG 110001",
//         "contactNo": "040-123697854"
//     }
// ]



// Fetching Hospitals List
// app.get('/', (req, res) => {
//     db.find().toArray()
//     .then((data) => {
//         {data.map(x => res.send(x.name))} // -----------> For any particular Field
//     })
//     .catch(err => console.log(err));
// })

// {
//     "_id": "5f6ed7c9a3c70025bc10d6cd",
//     "hId": "H4",
//     "name": "Rainbow hospital",
//     "location": "76.395644, 78.487834",
//     "address": "Plot No. 3-5-874/1 Near, Medium Rd,Hyd,TG 110001",
//     "contactNo": "040-456987123"
// }

// "name": "Rainbow hospital",
//         "location": "76.395644, 78.487834",
//         "address": "Plot No. 3-5-874/1 Near, Medium Rd,Hyd,TG 110001",
//         "contactNo": "040-456987123"