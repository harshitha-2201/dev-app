const express = require('express');
const mongoose = require('mongoose');
const devuser = require('./devusermodels');
const app = express();
const jwt = require('jsonwebtoken');
const middleware = require('./middleware');
const reviewmodel = require('./reviewmodel');
const cors = require('cors');
// const bcrypt = require('bcryptjs'); 

app.use(express.json()); 
app.use(cors({origin : "*"}));

mongoose.connect("mongodb+srv://harshithaakkina22:hQhh5eHwl5xPtIze@cluster0.utqrkzs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log('db is connected'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

app.get('/', (req, res) => {
    return res.send('Hello world9');
});

app.post('/register', async (req, res) => {
    try {
        const { fullname, email, mobile, skill, password, confirmpassword } = req.body;

        const exist = await devuser.findOne({ email });
        if (exist) {
            return res.status(400).send('User Already Registered');
        }
        if (password !== confirmpassword) {
            return res.status(403).send('Password Invalid');
        }

        let newUser = new devuser({
            fullname, email, mobile, skill, password, confirmpassword
        });

        await newUser.save(); // Make sure to await save operation

        return res.status(200).send('User registered');
    } catch (err) {
        console.error(err);
        return res.status(500).send('Server Error');
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const exist = await devuser.findOne({ email });
        if (!exist) {
            return res.status(400).send('Invalid credentials');
        }
        
        // Compare hashed passwords using bcrypt.compare
        if (exist.password !== password) {
            return res.status(400).send('Invalid credentials');
        }


        // Generate JWT token
        let payload = {
            user: {
                id: exist.id
            }
        };
        jwt.sign(payload, 'jwtPassword', { expiresIn: '1h' }, (err, token) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Failed to generate token');
            }
            return res.json({ token });
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send('Server Error');
    }
});



app.get('/allprofiles' , middleware , async(req,res) =>{
    try{
        let allprofiles = await devuser.find();
        return res.json(allprofiles)
    }
    catch(err){
        console.log(err)
        return res.status(500).send('server error')
    }
})

app.get('/myprofile' , middleware , async(req,res) =>{
    try{
     
        let user = await devuser.findById(req.user.id);
        return res.json(user);
    }
    catch(err){
        console.log(err)
        return res.status(500).send('server error')
    }

})


app.post('/addreview' , middleware , async(req,res) =>{
    try{
      
     const {taskworker , rating} = req.body;
     const exist = await devuser.findById(req.user.id);
     const  newreview = new reviewmodel({
        taskprovider:exist.fullname,
        taskworker,rating
     })

     newreview.save()
        return res.status(200).send('review add sucessfully')
     

    }
    catch(err){
        console.log(err)
        return res.status(500).send('server error')
    }
})

app.get('/myreview' , middleware , async(req,res) =>{
    try{
      
     let allreviews = await reviewmodel.find();
     let myreviews = allreviews.filter(review => review.taskworker === req.user.id.toString())
     return res.status(200).json(myreviews)

    }
    catch(err){
        console.log(err)
        return res.status(500).send('server error')
    }
})

app.listen(5000, () => {
    console.log('Server is running');
});
