import dotenv from "dotenv";

dotenv.config();

//midlleware to verify api key
export const verifyToken = async (req, res, next) => {
  const { authorization } = req.headers;
  //if authorization header not provided return error
  if (!authorization) {
    return res.status(401).json({
      message: "authorization header not provided",
    });
  }
  //if authorization header not start with apikey return error
  if (!authorization.startsWith("apikey")) {
    return res.status(401).json({
      message: "authorization header not provided",
    });
  }
  //get the apikey
  const apikey = authorization.split(" ")[1];
  //if apikey not provided return error
  if (!apikey) {
    return res.status(401).json({
      message: "apikey not provided",
    });
  }
  //check if apikey is valid
  if (process.env.API_KEY !== apikey) {
    return res.status(401).json({
      message: "apikey is not valid",
    });
  }

  //if apikey is valid continue to next middleware
  next();
};
