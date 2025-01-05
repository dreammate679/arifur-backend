const jwt = require("jsonwebtoken");
const User = require("../Models/user");

exports.isAuthenticatedMember = async (req, res, next) => {
  try {
    let token;
    // Check if the token is in the Authorization header or cookies
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies?.token) {
      token = req.cookies.token;
    }

    // If no token is found, return an error response
    if (!token) {
      return res.status(401).json({ message: "You need to login first!" });
    }

    // Verify the token and extract the user data
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user by the ID in the decoded token
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "User not found, access denied!" });
    }

    // Attach the user to the request object and proceed to the next middleware
    req.user = user;
    next();
    
  } catch (err) {
    return res.status(500).json({ message: "Internal server error", error: err.message });
  }
};
