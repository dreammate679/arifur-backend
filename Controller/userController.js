const User=require('../Models/user');
const ErrorHandler=require('../Utlis/ErrorHandler');
const sendToken=require('../Utlis/sendToken');
//sign up
exports.signup=async(req,res,next)=>{
    const {name,email,phone,password}=req.body;
    try{
        //send otp
        let user=await User.findOne({email});
        if(user){
            return next(new ErrorHandler('User already exists',400))
        }
         user=await User.create({
            name,
            email,
            phone,
            password,
        })
        const otp=Math.floor(1000+Math.random()*9000);
        user.otp=otp;
        await user.save();
        //send otp
        // const msg = {
        //     to: email, // Change to your recipient
        //     from: '
        //     subject: 'OTP',
        //     text: 'and easy to do anywhere, even with Node.js',
        //     html: `<strong>${otp}</strong>`,
        //   }
        //   sgMail
        //     .send(msg)
        //     .then(() => {
        //       console.log('Email sent')
        //     })
        //     .catch((error) => {
        //       console.error(error)
        //     })
        //send token
        sendToken(user,200,res)
        
    }
    catch(err){
        next(err)
    }
}
//login
exports.login=async(req,res,next)=>{
    try{
        const {email,password}=req.body;
        //check if email and password is entered by user
        if(!email||!password){
            return next(new ErrorHandler('Please enter email and password',400))
        }
        //finding user in database
        let user=await User.findOne({email}).select('+password');
        if(!user){
            return next(new ErrorHandler('Invalid email or password',401))
        }
        //check if password is correct or not
        const isPasswordMatched=await user.comparePassword(password);
        if(!isPasswordMatched){
            return next(new ErrorHandler('Invalid email or password',401))
        }
        //send token
        sendToken(user,200,res)
        // res.status(200).json({
        //     success:true,
        //     token: user.getJwtToken()
        // })

    }
    catch(err){
        return next(ErrorHandler(err.message,err.statusCode))
    }
}

//logout
exports.logout=async(req,res,next)=>{
    try{
        res.cookie('token',null,{
            expires:new Date(Date.now()),
            httpOnly:true
        })
        res.status(200).json({
            success:true,
            message:'Logged out'
        })
    }
    catch(err){
        return next(ErrorHandler(err.message,err.statusCode))
    }

}

//get currently logged in user details
exports.getUserProfile=async(req,res,next)=>{
    try{
        const user=await User.findById(req.user.id);
        res.status(200).json({
            success:true,
            user
        })
    }
    catch(err){
        return next(ErrorHandler(err.message,err.statusCode))
    }
}
//change password
exports.changePassword=async(req,res,next)=>{
    try{
        const user=await User.findById(req.user.id).select('+password');
        //check previous user password
        const isMatched=await user.comparePassword(req.body.oldPassword);
        if(!isMatched){
            return next(new ErrorHandler('Old password is incorrect',400))
        }
        user.password=req.body.newPassword;
        await user.save();
        sendToken(user,200,res)
    }
    catch(err){
        return next(ErrorHandler(err.message,err.statusCode))
    }
}

//verify otp
exports.verifyOtp=async(req,res,next)=>{
    try{
        const user=await User.findById(req.user.id);
        if(user.otp!=req.body.otp){
            return next(new ErrorHandler('Invalid otp',400))
        }
        user.otp=null;
        await user.save();
        sendToken(user,200,res);
    }
    catch(err){
        return next(ErrorHandler(err.message,err.statusCode))
    }
}

