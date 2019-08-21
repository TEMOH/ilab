//util function to check if a string is a valid email address
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const Applicants = require('../models/applicant');
const Editions = require('../models/edition');
const Message = require('../models/message');
const Quiz = require('../models/Quiz');
const checkValidation = require('../validation/validate');
let id=null;


class Admin {
static async isRegistered (req,res,next){
try {
    const { email, password } = req.body;
    if (!checkValidation.isEmail(email)) {
      throw new Error('Email must be a valid email address.');
    }
    if (typeof password !== 'string') {
      console.log(password);
      throw new Error('Password must be a string.')
      
    }
    const user = new User({ email, password });
    const persistedUser = await user.save();

    res.status(201).json({
      title: 'User Registration Successful',
      detail: 'Successfully registered new user',
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

static async isLoggedIn(req,res,next){

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
      next(); 
};



static async isApplicants(req,res){
Applicants.find({}).then((data)=>{
  if(data){
      res.status(200).json({
        title: 'Successfull request',
        detail: data,
      })
  }else{
      res.status(404).json({
        errors: [
          {
            title: 'Bad request',
            detail: 'there is no regitered user for the specified date',
            errorMessage: err.message,
          },
        ],
      })
  }
}).catch(err=>{
  res.status(500).json({
      message:'Forbidden'
  })
})
}
static async isReject(req,res,next){
  const {phonenumber}= req.body
  try{
    
 Applicants.deleteOne({phonenumber}).then((data)=>{
   
      res.status(200).json({
        title:"Succesful ",
        detail:'applicant has been removed'
    }) 
  })
}catch(err){
  console.log(err.message);
  
}
}

static async isEdition(req,res){
  
  try{
  Editions.find({}).then((data)=>{
      if(data.length==0){
        let editions = new Editions({
          edition:req.body.edition
        })
        editions.save().then((data)=>{
         id=data._id
          res.status(200).json({
            title: 'Successfuly saved',
            detail: data,
          })
      })
    }
    else{
      Editions.find({},function(err,data) {
        data[0].edition.push( req.body.edition );
        data[0].save(function(data){
          res.status(200).json({
            detail:"Successfully posted"
          })
        });
     });
    }

})
}
catch(err){
res.status(500).json({
  errors: [
    {
      title: 'Bad request',
      detail: 'internal error',
      errorMessage: err.message,
    },
  ],
})
}
}

static async isMessage(req,res){
  const message = await Message.find().then((data)=>{;
  // message.then(
    if (data.length == -1){
      res.status(400).json({
        errors: [
          {
            title: 'Bad request',
            detail: 'Can\'t find any message',
          },
        ]
      })
    }else{
      res.status(200).json({
        title:"Successful request",
        details: data
      })
    }
  })
}

static async getEdition(req,res){
  try{
    Editions.find().then((data)=>{
      if (data.length ==-1){
        res.status(400).json({
          title:'bad request',
          detail: 'the table for edition is empty'
        })
      }else{
        res.status(200).json(data[0].edition)
      }
    })
  }catch (err) {
    res.status(404).json({
      result:err.message
    })
  }
}
static async editedEdition(req,res){
  const {index, newUpdate}=req.body;
  console.log(id);
  
  try{
    var edition= await Editions.findOneAndUpdate({_id:id},{$set :{["edition." +index]:newUpdate}},{new:true})
    if(edition){
      console.log('hello');
       edition.save().then((savedUsers)=>{
         console.log('hello');
         
          res.status(201).json({
            title:'successful request',
            detail: "edited edition has been saved"
          })
          
      }).catch(err=>{
          console.log(err)
      })
      
      }else{
        res.status(404).json({
          errors: [
            {
              title: 'Bad request',
              detail: 'Can\'t find specified request',
              errorMessage: err.message,
            },
          ],
        })
      }
  }catch(err){
    res.status(404).json({
      errors: [
        {
          title: 'Bad request',
          detail: 'Not found!',
          errorMessage: err.message,
        },
      ],
    })
  }
}
static async delEdition(req,res){
  const {index}=req.body;
Editions.findOne({_id:id}).then(data=>{
  console.log(data);
  
  if(data){
    data.edition.splice(index,1)
    data.save().then((elm)=>{
      console.log('hello');
      res.status(201).json({
        detail:"edition has been deleted"
      })
    })
  }

})
}

static async isSelect(req,res){
  let specified =req.body.edition;
Applicants.find({edition:specified})
  .then((data)=>{
  if(data){
      res.status(200).json({
          result:data
      })
  }else{
      res.status(404).json({
        errors: [
          {
            title: 'Bad request',
            detail: 'there is no regitered user for the specified date',
            errorMessage: err.message,
          },
        ],
      })
  }
}).catch(err=>{
  res.status(500).json({
      message:'Forbidden'
  })
})
}
//admin get specified question
static async findQuiz(req,res){
  try{
    const {specification} = req.body;
    var questions= await Quiz.find({specification})
      if(questions){
        res.status(201).json({
          title:'successful request',
          detail: questions[0].questions
        })
      }else{
        res.status(404).json({
          errors: [
            {
              title: 'Bad request',
              detail: 'Can\'t find specified request',
              errorMessage: err.message,
            },
          ],
        })
      }
  }catch(err){
    res.status(404).json({
      errors: [
        {
          title: 'Bad request',
          detail: 'Not found!',
          errorMessage: err.message,
        },
      ],
    })
  }
}

//this route is for edited quiz
static async editedQuiz(req,res){
  const {index, newUpdate, specification}=req.body;
  try{
    var questions= await Quiz.findOneAndUpdate({specification},{$set :{["questions." +index]:newUpdate}},{new:true})
      if(questions){
       questions.save().then((savedUsers)=>{
         console.log('hello');
         
          res.status(201).json({
            title:'successful request',
            detail: "edited question has been saved"
          })
          
      }).catch(err=>{
          console.log(err)
      })
      
      }else{
        res.status(404).json({
          errors: [
            {
              title: 'Bad request',
              detail: 'Can\'t find specified request',
              errorMessage: err.message,
            },
          ],
        })
      }
  }catch(err){
    res.status(404).json({
      errors: [
        {
          title: 'Bad request',
          detail: 'Not found!',
          errorMessage: err.message,
        },
      ],
    })
  }
}


// deleting quiz from database
static async delQuiz(req,res){
  const {index, specification}=req.body;
Quiz.findOne({specification}).then(data=>{
  if(data){
    data.questions.splice(index,1)
    data.save().then((elm)=>{
      res.status(201).json({
        detail:"question has been deleted"
      })
    })
  }
  console.log(data);
  
})
}
//admin set quiz questions
static async setQuiz (req,res){
  try{
  Quiz.find().then((data)=>{
    if(data.length == 0){
      let quiz= new Quiz({
        specification:req.body.specification,
        questions:req.body.questions,
      })
      quiz.save().then((data)=>{
        res.status(200).json({
          title:'Successful request',
          detail:'question has been saved'
        })
      }).catch((err)=>{
        res.status(400).json({
          errors: [
            {
              title: 'Bad request',
              detail: 'Error in saving data',
              errorMessage: err.message,
            },
          ],
        })
      })
    }else{
      Quiz.findOneAndUpdate({specification:req.body.specification},{"$push":{questions:req.body.questions}},
      {new:true})
      .then((data)=>{
      if (data){
      data.save().then((data)=>{
        res.status(201).json({
          title: 'Successful request',
          detail: 'Quiz question has successfully updated'
        })
      }).catch(err=>{
          res.status(400).json({
            errors: [
              {
                title: 'Bad request',
                detail: 'Error in saving data',
                errorMessage: err.message,
              },
            ],
          })
      })
    }else{
      let quiz= new Quiz({
        specification:req.body.specification,
        questions:req.body.questions,
      })
      quiz.save().then((data)=>{
        res.status(200).json({
          title:'Successful request',
          detail:'question has been saved'
        })
      }).catch((err)=>{
        res.status(400).json({
          errors: [
            {
              title: 'Bad request',
              detail: 'Error in saving data',
              errorMessage: err.message,
            },
          ],
        })
    })
  }
})
  }
  })
}catch(err){
  res.status(404).json({
    errors: [
      {
        title: 'Bad request',
        detail: 'there is no regitered user for the specified date',
        errorMessage: err.message,
      },
    ],
  })
}
}


}
module.exports =Admin ;