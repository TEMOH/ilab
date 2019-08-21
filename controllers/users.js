//util function to check if a string is a valid email address
const Applicants = require('../models/applicant');
const Editions = require('../models/edition');
const Message = require('../models/message');
const Quiz = require('../models/Quiz');
const {isEmpty} = require('../helpers/file')
class Users {
    static async isApplied(req,res,next){
    
    
        let picture = req.body.picture;
        let cv = req.body.cv;
        // console.log(cv);
        
        let pictureName = Date.now()+ `-` +picture.name;
        let cvName = Date.now()+ `-` +cv.name;
       
            // picture.mv(`./public/uploads/photos` + pictureName,(err)=>{
            //     if(err) return err;
            // })  
        //   if(!isEmpty(req.body.cv)){
        //     cv.mv(`./public/uploads/cv` + cvName,(err)=>{
        //       if(err) return err;
        //   }) 
        // }
       console.log(req.body.cv);
       
        try{
          let applicants= new Applicants({
              firstname: req.body.firstname,
              lastname: req.body.lastname,
              phonenumber: req.body.phonenumber,
              picture: pictureName,
              cv: cvName,
              // date: req.body.date,
              email: req.body.email,
              reason: req.body.reason,
              stage: req.body.stage, 
              specification: req.body.specification,
              edition:req.body.edition
          })
          applicants.save().then((data)=>{
              res.status(200).json({
                title: 'Registration Successful',
                detail: 'Datas have saved in the database',
              })
          })
        }catch(err){
            res.status(404).json({
              errors: [
                {
                  title: 'Registration Error',
                  detail: 'Something went wrong during registration process.',
                  errorMessage: err.message,
                },
              ],
            })
          }
      // }
    }

    static async getEdition(req,res){
      try{
        Editions.find().then((data)=>{
          res.status(200).json(data[0].edition)
        })
      }catch (err) {
        res.status(404).json({
          result:err.message
        })
      }
    }
    
    static async isMessage(req,res){
      try{
      const message = await new Message({
        name: req.body.name,
        email: req.body.email,
        message:req.body.message
      })

      message.save().then((data)=>{
        res.status(200).json({
          title: 'Successful request',
          detail: 'message sent successfully'
        }).catch((err)=>{
          res.status(404).json({
            errors: [
              {
                title: 'Message Error',
                detail: 'An error occured.',
                errorMessage: err.message,
              },
            ],
          })
        })
    })

      }catch(err){
        res.status(500).json({
          errors: [
            {
              title: 'Message Error',
              detail: 'An error occured.',
              errorMessage: err.message,
            },
          ],
        })
      }
    }
    static async isQuiz(req,res){
      let spec=req.body.specification;
      
      if(spec ==''){
          res.status(404).json({
            errors: [
              {
                title: 'Invalid Credentials',
                detail: 'specification not defined',
              },
            ],
          })
      }else{
         Quiz.findOne({specification:spec}).then((data)=>{
          var i =0;
            i = Math.floor(Math.random()*(data.questions.length));
            res.status(201).json({
              title:"Successful request",
              detail:data.questions[i]
            })
         })
      }
    }
    }
module.exports =Users ;



