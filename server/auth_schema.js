const jwt = require("jsonwebtoken")
const user = require("./auth_schema_signup")
const bcrypt = require("bcrypt")
const SECRET_KEY="Restaurant";

const signup = async (req,res)=>{
    // Check for exiting user

    console.log(req.body);
    const {username,email,password} = req.body
    console.log(username,email,password)

    try{
        const Checkuser = await user.findOne({
            email: email,
        });

        if(Checkuser){
            console.log("Alredy exists");
            return res.status(400).json({ error: "User already exists" });
        }
        else{
            // Crypting the password
        const password_user = password
        const saltround = 10
        const hashedPassword = await bcrypt.hash(data=password_user,saltround);

    // Create User
        const result = await user.create({
            username:username,
            email:email,
            password:hashedPassword,
        })

        await result.save()
    
        const token = jwt.sign({
            email:result.email,
            id:result._id,
        },SECRET_KEY);

        return res.status(200).json({ token });
        }

        
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            error: "Error while authenticating"
        })
    }
}


const signin = async(req,res)=>{
    const {email, password} = req.body;

    try{
        //  check for existing user

        const checkUser = await user.findOne({
            email: email,
        })
        if(!checkUser){
          
           return res.status(400).json({"error":"User doesn't exist"});
        }
        else {
            const match_password = bcrypt.compare(password, checkUser.password)

        if(!match_password){
            return res.status(400).json({
                error: "Incorrrect password"
            })
        }

        const token = jwt.sign({
            email: checkUser.email,
            id: checkUser._id,
        },SECRET_KEY)

        if(token){
            return res.status(200).json({
                email: checkUser.email,
                token: token
            })
        }
        }
        
            
        

    }catch(error){
        return res.status(500).json({
            error: `${error}` 
        })
    }
}

module.exports =  {signup,signin}