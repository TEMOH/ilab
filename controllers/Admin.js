//util function to check if a string is a valid email address
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const User = require('../models/user');
const Applicants = require('../models/applicants');
const Contact = require('../models/contact');
const checkValidation = require('../validation/validate');


class Users  {

  // Api for Adding Admin
static async isRegistered (req,res,next){
try {
    const { email, password } = req.body;
    if (!checkValidation.isEmail(email)) {
      throw new Error('Email must be a valid email address.');
    }
    if (typeof password !== 'string') {
      throw new Error('Password must be a string.');
    }
    const user = new User({ email, password});
    const persistedUser = await user.save();
    console.log(persistedUser);

    res.status(201).json({
      title: 'User Registration Successful',
      detail: 'Successfully registered new user'+persistedUser.email,
    });
  } catch (err) {
    res.status(400).json({
      errors: [
        {
          title: 'Registration Error',
          detail: 'Something went wrong during registration process.',
          errorMessage: err.message,
        },
      ],
    });
  }
next();
}

// Api for logging in
static async isLoggedIn(req,res, next){

    try {
        const { email, password } = req.body;
        if (!checkValidation.isEmail(email)) {
          return res.status(400).json({
            errors: [
              {
                title: 'Bad Request',
                detail: 'Email must be a valid email address',
              },
            ],
          });
        }
        if (typeof password !== 'string') {
          return res.status(400).json({
            errors: [
              {
                title: 'Bad Request',
                detail: 'Password must be a string',
              },
            ],
          });
        }
        //queries database to find a user with the received email
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error();
        }
    
        //using bcrypt to compare passwords
        const passwordValidated = await bcrypt.compare(password, user.password);
        if (!passwordValidated) {
          throw new Error();
        }
    
        res.json({
          title: 'Login Successful',
          detail: 'Successfully validated user credentials',
        });
      } catch (err) {
        res.status(401).json({
          errors: [
            {
              title: 'Invalid Credentials',
              detail: 'Check email and password combination',
              errorMessage: err.message,
            },
          ],
        });
      }    
}

// Api for sending mail when request is approved
  static async isApproved(req,res){
    try{
      const {email} = req.body;
      if (!checkValidation.isEmail(email)) {
        return res.status(400).json({
          errors: [
            {
              title: 'Bad Request',
              detail: 'Email must be a valid email address',
            },
          ],
        });
      }
      const user = await Applicants.findOne({ email });
      if (!user) {
        throw new Error();
      }
      user.status = 'Approved';
      console.log(user);
      user.save();   
    const transport = nodemailer.createTransport({
      service:'Gmail',
      auth:{
        user:"adesojidaniel139@gmail.com",
        pass:"dnasoj2000"
      }
    });
    var msg = await transport.sendMail( {
      html: "<b>Hello tester</b><p>Accepted</p>",
      createTextFromHtml:true,
      from:"adesojidaniel139@gmail.com",
      to:"lekass205@gmail.com",
      subject:"Ilab Project"
    });
    res.status(200).json({
      title: 'Applicant has been approved',
      detail:"An email has been sent to " + email
    });
  }catch(err){
    res.status(401).json({
      errors:[
        {
          title:"Applicant not accepted",
          detail:"Something went wrong when trying to approve applicant",
          err: err.message,
        }
      ]
    });
  }
  }

  // Api for sending mail when request is rejected

  static async isRejected (req,res){
    try{
      const {email} = req.body;
      if (!checkValidation.isEmail(email)) {
        return res.status(400).json({
          errors: [
            {
              title: 'Bad Request',
              detail: 'Email must be a valid email address',
            },
          ],
        });
      }
      const user = await Applicants.findOne({ email });
      if (!user) {
        throw new Error();
      }
      user.status = 'Rejected';
      var newStatus = user.save();
      
      
      var transport = nodemailer.createTransport({
        service:'Gmail',
        auth:{
          user:"adesojidaniel139@gmail.com",
          pass:"dnasoj2000"
        }
      }); 
      var msg = await transport.sendMail({
        html: "<b>Hello tester</b><p>Rejected</p>",
        createTextFromHtml:true,
        from:"adesojidaniel139@gmail.com",
        to:email,
        subject:"Ilab Project"
      });
      res.status(200).json({
        title: 'Applicants has been rejected',
        detail: "An email has been sent to"+email
      });       



    }catch(err){
      res.status(401).json({
        errors:[
          {
            title:"Applicant not rejected",
            detail:"Something went wrong when trying to send mail",
            err: err.message,
          }
        ]
      });

    }
  }
  // Api Recieving contacts details and message
  static async postContact (req,res){
    try{
      const {name,email,message} = req.body;
      if (!checkValidation.isEmail(email)) {
        throw new Error('Email must be a valid email address.');
      }
      const user = new Contact({name,email,message});
      const persistedUser = await user.save();
      console.log(persistedUser);

      res.status(200).json({
        message: "Dear "+ persistedUser.name + "you message has been recieved, we will get back to you with the provided email",
        detail: "Contact has been saved"
      })
    }
    catch(err){
      res.status(400).json({
        errors: [
          {
            title: 'Message not sent',
            detail: 'Something went wrong during registration process.',
            errorMessage: err.message,
          },
        ],
      });    
    }
  }
  static async getContact (req,res){
    try{
      const contacts = await Contact.find({});
      res.status(200).send(contacts);
    }
    catch(err){
      res.status(400).json({
        errors:[
          {
            message:"something went wrong when trying to fetch datas",
            Error: err.message
          }
        ]
      })
    }
  }

  // Api for deleting messages
  static async deleteContact (req,res){
    const contact_id = req.body.id;
    try{
      const contact_delete = await Contact.findOneAndRemove({_id:contact_id});
      res.status(200).json({
        message:"Deleted"
      })
    }
    catch(err){
      res.status(500).json({
        errors:[
          {
            message:"An error occured",
            Error: err.message
          }
        ]
      })
    }
  }

  // Api for forwarding & replying messages
  static async forwardMessage(req,res){
    try{
      const {email,message} = req.body;
      if (!checkValidation.isEmail(email)) {
        throw new Error('Email must be a valid email address.');
      }
      var transport = nodemailer.createTransport({
        service:'Gmail',
        auth:{
          user:"youremail@gmail", // replace with your email
          pass:"yourpasswwword",  //replace with your password 
        }
      }); 
      var msg = await transport.sendMail({
        html: message,
        createTextFromHtml:true,
        from:"adesojidaniel139@gmail.com",
        to:email,
        subject:"Ilab Project"
      });
      res.status(200).json({
        title: 'message have been sent',
        detail: "An email has been sent to"+email
      });

    }
    catch(err){
      res.status(500).json({
        errors:[
          {
            message:"An error occured",
            Error: err.message
          }
        ]
      })
    }
  }
}

module.exports = Users;