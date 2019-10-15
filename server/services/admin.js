const Promise = require("promise");
const async = require("async");
const multer = require("multer");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const secretKey = "secret987654321";
const _ = require("lodash");
const moment = require("moment");
const underScore = require("underscore");


exports.login  = login;
exports.signup = signup;
exports.deleteUser = deleteUser; 
exports.updateData = updateData;
exports.getUserLists = getUserLists;

function login(req, res) {
  const { email , password } = req.body;
	  let response = {
		status: 0,
		body: {},
		message: ""  
	  }  
	  
	  const getUser = new Promise((resolve, reject) => {
		con.query(`
		  SELECT 
		  Id,
		  username,
		  email,
		  password
		  FROM admin
		  WHERE email = ? 
		`, [email], (err, result) => {
			if (err) reject(err)
			else {
			  if (result.length > 0) {
				let decrypted_password = bcrypt.compareSync(password, result[0].password);
				  if (decrypted_password) {
					resolve(result[0])
				  } else {
					resolve("Wrong password")
				  }
				 
			  } else {
				resolve("Wrong email")
			  }
			}
		  })
	  })
		.then((data) => {
			
		  let token = jwt.sign({ email: data.email, user_type: "admin" }, secretKey);
		  let response = {
			status: 0,
			body: {},
			message: ""  
		  }
		  response.status = typeof data == 'object' ? 1 : 0;
			
		  if(typeof data == 'string')
		  {
			response.message = data		
		  }
			
		 if(typeof data == 'object')
		  {
			response.body = data
		  }
		  
		  res.json(response)
		})
		.catch((error) => {
		  console.log(error)
		  response.message = "Error Loging"	
		  res.json(response)
		})	  
}


function signup(req, res, cb)
{
	let { fname, lname, email, password, role } = req.body;
	let data = {
		status: 0,
		body: {},
		message: ""  
	  }

	  let signup = new Promise((resolve,reject) => {

		async.waterfall([
			checkUser,
			inserData,
			 getData

		], (error, result) => {

			if (error) reject(error);
     		else resolve(result);
		})		

	  }).then((resp) => {
		 	
			 if(typeof resp == 'object')
			 {
				 let token = jwt.sign({ id: resp.user_id, email: resp.email }, secretKey);
				 resp.token = token;	 
			 }
			
			 if(typeof resp == 'string')
			 {
				  if(resp == 'User already Register . Please Verify We Sent You The Otp  . ')
				  {
					data.verifyopt = true;
				  }
			 }
			   
			data.status = typeof resp == 'object' ? 1 : 0
			 if(typeof resp == 'object')
			 {
			   data.body = resp
			 }
			 
			 if(typeof resp == 'string')
			 {
			   data.message = resp		
			 }
			   
			 res.json(data)
	  })

	  function checkUser(cb)
	  {
		con.query(`
		SELECT 
		  COUNT(*) as total
		FROM nodeapi
		WHERE email = ?
	  `, [email], (error, result) => {
		  if (error) {
			cb(error)
		  } else {
			cb(null, result)
		  }
		})
	  }

	  function inserData(count, cb)
	  {
		if(count[0].total > 0)
		{
			cb(null, "User already Register . Please Check Your Email");
		}
		else
		{ 
			let encrypted_password = bcrypt.hashSync(password, saltRounds);
			  con.query(`
        INSERT INTO nodeapi (fname, lname , email , password, role) VALUES (?,?,?,?,?)
      `, [fname, lname, email , encrypted_password ,role], (error, result) => {
          if (error) {
            
            cb(error)
          } else {
            cb(null, result)
          }
        })

		}
	  }

	  function getData(data, cb)
	  {
		if (!!data.insertId) {
			con.query(`
			  SELECT 
				*
				FROM nodeapi
				WHERE id = ?
			`, [data.insertId], (error, result) => {
				if (error) cb(error)
				else cb(null, result[0])
			  })
		  } else {
			cb(null, data)
		  }
	  }

	  }


	  function getUserLists(req,res)
	  {
			let response = {
				status: 0,
				body: {},
				message: ""
			}

			let getUserLists = new Promise((resolve,reject)=>{

				con.query('select fname,lname,role from nodeapi',(err,result)=>{

					if(err){console.log('fdsf');reject(err);} 
					else{resolve(result);} 
					
				});

			}).then((data)=>{
				
				if(data=="")
				{
					  response.message = "Please Add Some Users";
					  res.json(response);
				}
				else{
					
				response.body = "List of Users" ;
				response.message = data;
				res.json(response);
			   }
			   	
				
			}).catch((error)=>{
				res.json(error);
			});
	  }

function deleteUser(req, res, cb)
{
	
	
	let {id} = req.body;
	

	let response = {
		status: 0,
		body: {},
		message: ""
	}
	let deleteUser = new Promise((resolve,reject) => {

		async.waterfall([
			checkuser,
			deleteData
		  ], (error, result) => {
			if (error) reject(error)
			else resolve(result)
		  })

	}).then((resp) =>{
		console.log(resp);
		if(resp == 'Data has been deleted')
		response.status =1;

		response.message= resp;
		res.json(response);
	})
		

	function checkuser(cb)
	{
		con.query(`
			  SELECT 
                COUNT(*) as total
			  FROM nodeapi
			  WHERE id = ?
			`, [id], (error, result) => {
			  if(error) cb(error)
			  else cb(null,"Error in getting result" );
			})
	}	deleteData

	function deleteData(resp, cb)
	{
		if(resp[0].total > 0)
		{
			con.query('delete from nodeapi where id=?',[id], (err, suc) => {

				if(err) cb(null,err);
				else cb(null,"Data has been deleted");
			})
		} else {
			cb(null, "User Doesn't exist");
		}
	}
}


function updateData(req,res,cb)
{
	
	let {id,fname,lname,email} = req.body;
	

	let response = {
		status: 0,
		body: {},
		message: ""
	}

	let updateData = new Promise((resolve, reject)=> {

		async.waterfall([
			checkuser,
			updateusers
		  ], (error, result) => {
			if (error) reject(error)
			else resolve(result)
		  })

	}).then((resp)=>{
	
		console.log(resp);
		res.json(resp);
	}).catch((error)=>{
		response.message = error;
		res.json(response);
	})


	function checkuser(cb)
	{
		con.query(`
			  SELECT 
                COUNT(*) as total,
				id,
				fname,
				lname,
				email,
				password,
				role
			  FROM nodeapi
			  WHERE id = ?
			`, [id], (error, result) => {
			  if(error) cb(error)
			  else cb(null, result)
			})
	}

	function updateusers(data, cb)
	{
		if(data[0].total > 0)
		{
			if(!!fname)
			{
			  fname = fname;
			}
			else
			{
			  fname = data[0].fname;
			}
			
			if(!!lname)
			{
			  lname = lname;
			}
			else
			{
			  lname = data[0].lname;
			}
			if(!!email)
			{
			  email = email;
			}
			else
			{
			  email = data[0].email;
			}
			
			con.query(`
			UPDATE nodeapi
			SET fname = ? , 
			lname = ? ,
			email = ?
			WHERE id = ?
		  `, [fname, lname, email, id], (error, sol) => {
			  if(error) cb(error);
			  else{
				  response.status = 1;
				  response.message = "Profile has been updated";
				  cb(null, response);
			  }
		  })
		}  else {
		  cb(null, "Sorry Not Able To Update , Not A Valid User")
		}
	}
}