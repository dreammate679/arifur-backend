//create and send token and save in the cookie
const sendToken =(user,statusCode,res)=>{
    //create jwt token
    const token =user.getJwtToken();
    //options for cookie
    const options = { 
        expires: new Date(Date.now()+process.env.COOKIE_EXPIRES_TIME*24*3600*1000),
        httpOnly: true,
        secure:process.env.NODE_ENV==='prod'
    }
    res.status(statusCode).cookie('token',token,options).json({
        success: true,
        user
    })
    // res.s
}

module.exports =sendToken