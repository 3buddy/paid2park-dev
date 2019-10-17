const Promise           = require("promise");
const async             = require("async");
const _                 = require("lodash");
const moment            = require("moment");
const underScore        = require("underscore");
const bcrypt            = require('bcrypt');
const saltRounds        = 10;

exports.addUser         =  addUser;
exports.editUser        =  editUser;
exports.getUserList     =  getUserList;
exports.getUserDetails  =  getUserDetails;
exports.deleteUser      =  deleteUser;  


function addUser(req,res,cb)
{
   
    const { user_fname , user_lname , user_title , user_office , user_email , user_login , user_password , user_role_id , user_isactive  } = req.body;
    let response = {
		status: 0,
		body: {},
		message: ""  
      }  
	  
	  
	    var now = moment.utc().format();
      let encrypted_password = bcrypt.hashSync(user_password, saltRounds);

		const createUser = new Promise((resolve, reject) => {

            async.waterfall([
                checkUser,
                insertUser
              ], (error, result) => {
                if (error) reject(error)
                else resolve(result)
              })

			
		  })
			.then((data) => {
			  
			  if(data.insertId)
			  {
                response.status =  1;
				        response.message = "User Has Been Created Successfully !";
			  }
			  
			  res.json(response)
			})
			.catch((error) => {
			  response.message = "Not Able To Create The User : Error " + error;	
			  res.json(response)
            })
            


            function checkUser(cb)
            {
                con.query(`
                SELECT * FROM user WHERE user_email = ? OR user_login = ? 
                `, [user_email,user_login], (err, result) => {
                    if (err) cb(err)
                    else {
                        cb(null,result);
                    }
                  })
            } 
    
            function insertUser(result,cb)
            {
                if(result.length > 0)
                {
                    response.status = 0;
                    response.message = "User Already Exists . Please Check Email And User Login Fields . ";
                    cb(null,response);
                }
                else
                {
                    con.query(`
                    INSERT INTO user (user_fname , user_lname , user_title , user_office , user_email , user_login , user_password , user_role_id , user_isactive , user_createdby , user_modifiedby ) VALUES (?,?,?,?,?,?,?,?,?,?,?)
                    `, [user_fname,user_lname,user_title,user_office,user_email,user_login,encrypted_password,user_role_id,user_isactive,now,now], (err, result) => {
                        if (err) cb(err)
                        else {
                            cb(null,result);
                        }
                      })
                }
                
            }
}

function editUser(req,res,cb)
{

    let { user_id , user_fname , user_lname , user_title , user_office , user_email , user_login , user_password , user_role_id , user_isactive  } = req.body;
    let response = {
		status: 0,
		body: {},
		message: ""  
      }  

    var now = moment.utc().format();
    


    const updateUser = new Promise((resolve, reject) => {

        async.waterfall([
            getUser,
            upadteUsers
          ], (error, result) => {
            if (error) reject(error)
            else resolve(result)
          })

        
      })
      .then((data) => {
    
      response.status = typeof data == 'object' ? 1 : 0;

      if(data.affectedRows > 0)
      {
        response.message = "User Has Been Updated Successfully !";
      }
      else
      {
          response.message = data;
      }

       res.json(response)
      })
       .catch((error) => {
         response.message = "Not Able To update The User : Error " + error;	
         res.json(response)
      })


      function getUser(cb)
      {
        con.query(`
        SELECT * FROM  user WHERE user_id = ?
        `, [user_id], (err, result) => {
            if (err) cb(err)
            else {
                cb(null,result);
            }
          })
      }
        
     function upadteUsers(result,cb)
      {
          if(result.length > 0)
          {
              if(!!user_fname)
              {
                user_fname = user_fname;
              }
              else
              {
                user_fname = result[0].user_fname;
              }

              if(!!user_lname)
              {
                user_lname = user_lname;
              }
              else
              {
                user_lname = result[0].user_lname;
              }

              if(!!user_title)
              {
                user_title = user_title;
              }
              else
              {
                user_title = result[0].user_title;
              }

              if(!!user_office)
              {
                user_office = user_office;
              }
              else
              {
                user_office = result[0].user_office;
              }

              if(!!user_email)
              {
                user_email = user_email;
              }
              else
              {
                user_email = result[0].user_email;
              }

              if(!!user_login)
              {
                user_login = user_login;
              }
              else
              {
                user_login = result[0].user_login;
              }

              if(!!user_password)
              {
                 user_password = bcrypt.hashSync(user_password, saltRounds);
              }
              else
              {
                user_password = result[0].user_password;
              }

              if(!!user_role_id)
              {
                user_role_id = user_role_id;
              }
              else
              {
                user_role_id = result[0].user_role_id;
              }

              if(!!user_isactive)
              {
                user_isactive = user_isactive;
              }
              else
              {
                user_isactive = result[0].user_isactive;
              }



            con.query(`
            Update user SET user_fname = ?, user_lname =? , user_title =? , user_office =? , user_email =? , user_login =? , user_password  =? , user_role_id =? , user_isactive =? , user_modifiedby =?  WHERE user_id = ?
            `, [user_fname,user_lname,user_title,user_office,user_email,user_login,user_password,user_role_id,user_isactive,now,user_id], (err, result) => {
                if (err) cb(err)
                else {
                    cb(null,result);
                }
              })

          }
          else
          {
              cb(null," Sorry Not A Valid User Id . "); 
          }

      }


}


function getUserList(req,res,cb)
{
    let response = {
		status: 0,
		body: {},
		message: ""  
      }  

    const getUserlist = new Promise((resolve, reject) => {

        con.query(`
             SELECT user_id AS Id  , CONCAT(user_fname,' ',user_lname) AS FullName , user_title , user_office , user_email  AS Email , user_login  , user_role_id , ( SELECT role_name FROM role WHERE role_id = user_role_id ) AS RoleName , user_isactive AS IsActive  FROM user
            `,  (err, result) => {
                if (err) reject(err)
                else {
                        resolve(result);
                }
              })
        
      })
      .then((data) => {
      //console.log(data);
      
      if(data.length > 0)
      {
        response.status = typeof data == 'object' ? 1 : 0;
        response.body = data;
      }
      else
      {
          response.message = "Sorry User List Not Found";
      }


       res.json(response)
      })
       .catch((error) => {
         response.message = "Not Able To Get The User List : Error " + error;	
         res.json(response)
      })



}

function getUserDetails(req,res,cb)
{
    const { userId } = req.params;
    
    let response = {
        status: 0,
        body: {},
        message: ""  
      }  


      const getUserDetails = new Promise((resolve, reject) => {

        con.query(`
             SELECT user_id , user_fname , user_lname , user_title , user_office , user_email , user_login  , user_role_id , user_isactive FROM user WHERE user_id = ?
            `,[userId],  (err, result) => {
                if (err) reject(err)
                else {
                     resolve(result);
                }
              })
        
      })
      .then((data) => {
      //console.log(data);
      
      if(data.length > 0)
      {
        response.status = typeof data == 'object' ? 1 : 0;
        response.body = data[0];
      }
      else
      {
          response.message = "Sorry User List Not Found";
      }


       res.json(response)
      })
       .catch((error) => {
         response.message = "Not Able To Get The User List : Error " + error;	
         res.json(response)
      })


}

function deleteUser(req,res,cb)
{
   const { user_id } = req.params;
   let response = {
    status: 0,
    body: {},
    message: ""  
  }  

const deleteUser = new Promise((resolve, reject) => {

    async.waterfall([
        getUser,
        deleteUsers
      ], (error, result) => {
        if (error) reject(error)
        else resolve(result)
      })

    
  })
  .then((data) => {
  //console.log(data)
  response.status = typeof data == 'object' ? 1 : 0;
  if(data.affectedRows > 0)
  {
    response.message = "User Has Been Deleted Successfully !";
  }
  else
  {
    response.message = data;
  }
   res.json(response)
  })
   .catch((error) => {
     response.message = "Not Able To Delete The User : Error " + error;	
     res.json(response)
  })


  function getUser(cb)
  {
    con.query(`
    SELECT * FROM  user WHERE user_id = ?
    `, [user_id], (err, result) => {
        if (err) cb(err)
        else {
            cb(null,result);
        }
      })
  }
    
 function deleteUsers(result,cb)
  {
      if(result.length > 0)
      {
        
        con.query(`
        DELETE FROM user WHERE user_id = ?
        `, [user_id], (err, result) => {
            if (err) cb(err)
            else {
                cb(null,result);
            }
          })

      }
      else
      {
          
          cb(null,"Sorry Not A Valid User Id .");
      }

  }

}