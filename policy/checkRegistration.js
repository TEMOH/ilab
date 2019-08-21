module.exports = {
   async register (req, res, next) {
        const firstname = await req.body.firstname;
        const lastname = await req.body.lastname;
        const email = await req.body.email;
        const reason = await req.body.reason;
        const edition = await req.body.edition;
        const stage = await req.body.stage;
        const specification = await req.body.specification;
        if (firstname == ''){
            res.status(400).json({
                data: "firstname cant be empty"
        })
        }   
        else if (lastname == ''){
            res.status(400).json({
                data: "lastname cant be empty"
        })
        }
        else if (email == ''){
            res.status(400).json({
                data: "email cant be empty"
        })
        } 
        else if (reason == ''){
            res.status(400).json({
                data: "reason cant be empty"
        })
         }
        else if (stage == ''){
            res.status(400).json({
                data: "reason cant be empty"
        })
        }
        else if (specification == ''){
            res.status(400).json({
                data: "reason cant be empty"
        })
        }
        else if (edition == ''){
            res.status(400).json({
                data: "reason cant be empty"
        })
        }
        else{
            next()
        }
    }
}