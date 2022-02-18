const Applicants = require('../models/applicants');

class applicants{
    static async isApplied(req,res,next){
        try{
          let applicants= new Applicants({
              firstname: req.body.firstname,
              lastname: req.body.lastname,
              phonenumber: req.body.phonenumber,
              // picture: pictureName,
              // cv: cvName,
              // date: req.body.date,
              status:'pending',
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
}

module.exports = applicants;
