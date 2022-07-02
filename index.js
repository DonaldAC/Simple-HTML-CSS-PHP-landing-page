require('dotenv').config();
const sgMail = require('@sendgrid/mail');
const express = require('express');
const path = require('path');


const app = express();
const port = 3000;
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'))

app.post('/contact', (req, res) => {
    const msg = {
        to: `donald.anthony19@yahoo.com`, 
        from: 'chiayeanthony@gmail.com',
        subject: 'Form submission',
        text: `Message from ${req.body.mail}:\n${req.body.fullName}\n${req.body.phone}`,
    }

    try {
        sgMail.send(msg);
        res.send("Message Successfully Sent!");
    } catch (error) {
        res.send("Message Could not be Sent");
    }
});


app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});