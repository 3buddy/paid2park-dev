const jwt = require("jsonwebtoken");
const secretKey = "secret987654321";

exports.verifyToken = verifyToken;

function verifyToken(req, res, next) {
  //Request header with authorization key
  const bearerHeader = req.headers['authorization'];
  let obj = {
    status: 0,
    body: ""
  }
  //Check if there is  a header 
  if (typeof bearerHeader !== 'undefined') {
    req.token = bearerHeader;
	  try 
	  {
		   let token = jwt.verify(req.token, secretKey);
			con.query(`
				SELECT user_is_verified
				FROM users
				WHERE user_id = ?
			  `, [token.id], (error, result) => {
				if (error) {
				  console.log(error)
				  obj.body = "Unable to verify"
				  obj.message = "Unable to verify"
				  res.send(obj);
				}
				else if (result.length == 0) {
				  obj.body = "Bad Token"
				  obj.message = "Bad Token"
				  res.send(obj)
				}
				else if (result[0].user_is_verified == 0) {
				  obj.body = "You are not verified"
				  obj.message = "You are not verified"
				  res.send(obj)
				} else {
				  next();
				}
			  })
	  } 
	  catch(err) 
	  {
		  obj.body = err.message
		  obj.message = err.message
		  res.send(obj)
	  }
	  
   
  } else {
    res.sendStatus(403);
  }
}