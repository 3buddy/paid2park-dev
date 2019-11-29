const Promise        = require("promise");
const async          = require("async");
const multer         = require("multer");
const bcrypt         = require('bcrypt');
const saltRounds     = 10;
const jwt            = require("jsonwebtoken");
const secretKey      = "secret987654321";
const _              = require("lodash");
const moment         = require("moment");
const underScore     = require("underscore");


exports.addEnforcements        = addEnforcements;
exports.getEnforcements        = getEnforcements;
exports.getEnforcementsDetails = getEnforcementsDetails; 
exports.updateEnforcements     = updateEnforcements;
exports.deleteEnforcements     = deleteEnforcements;



function addEnforcements(req,res,cb)
{


  const { 
    enforcements_assign_id,
    enforcements_first_name,
    enforcements_last_name,
    enforcements_address,
    enforcements_city,
    enforcements_state,
    enforcements_zip,
    enforcements_phone,
    enforcements_email,
    enforcements_dob,
    enforcements_ss,
    enforcements_hire_date,
    enforcements_start_date,
    enforcements_app_login,
    enforcements_app_password,
    enforcements_hours_desired,
    enforcements_wage,
    enforcements_ticket_bonus,
    enforcements_w_4_with_holding,
    enforcements_start_with_holding,
    enforcements_comp_rate,
    enforcements_ot_rate ,
    enforcements_status
       } = req.body;


  let response = {
      status: 0,
      body: {},
      message: ""  
      }  
	  
	  

  let encrypted_enforcements_app_password = bcrypt.hashSync(enforcements_app_password, saltRounds);
	const createEnforcements = new Promise((resolve, reject) => {

            async.waterfall([
                checkEnforcements,
                insertEnforcements
              ], (error, result) => {
                if (error) reject(error)
                else resolve(result)
              })

			
		  })
			.then((data) => {
			  
			  if(data.insertId)
			  {
          response.status =  1;
			    response.message = "Enforcements Has Been Created Successfully !";
			  }
			  
			  res.json(response)
			})
			.catch((error) => {
               console.log(error);
			         response.message = "Not Able To Create The Enforcements : Error " + error;	
			         res.json(response)
            })
            


            function checkEnforcements(cb)
            {
                con.query(`
                SELECT * FROM enforcements WHERE enforcements_email = ?
                `, [enforcements_email], (err, result) => {
                    if (err) cb(err)
                    else {
                        cb(null,result);
                    }
                  })
            } 
    
            function insertEnforcements(result,cb)
            {
                if(result.length > 0)
                {
                    response.status = 0;
                    response.message = "Customer Already Exists . Please Check Email Address Fields . ";
                    cb(null,response);
                }
                else
                {
                    con.query(`
                    INSERT INTO enforcements 
                    (
                        enforcements_assign_id,
                        enforcements_first_name,
                        enforcements_last_name,
                        enforcements_address,
                        enforcements_city,
                        enforcements_state,
                        enforcements_zip,
                        enforcements_phone,
                        enforcements_email,
                        enforcements_dob,
                        enforcements_ss,
                        enforcements_hire_date,
                        enforcements_start_date,
                        enforcements_app_login,
                        enforcements_app_password,
                        enforcements_hours_desired,
                        enforcements_wage,
                        enforcements_ticket_bonus,
                        enforcements_w_4_with_holding,
                        enforcements_start_with_holding,
                        enforcements_comp_rate,
                        enforcements_ot_rate,
                        enforcements_status  
                         )
                      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
                    `, [
                        enforcements_assign_id,
                        enforcements_first_name,
                        enforcements_last_name,
                        enforcements_address,
                        enforcements_city,
                        enforcements_state,
                        enforcements_zip,
                        enforcements_phone,
                        enforcements_email,
                        enforcements_dob,
                        enforcements_ss,
                        enforcements_hire_date,
                        enforcements_start_date,
                        enforcements_app_login,
                        encrypted_enforcements_app_password,
                        enforcements_hours_desired,
                        enforcements_wage,
                        enforcements_ticket_bonus,
                        enforcements_w_4_with_holding,
                        enforcements_start_with_holding,
                        enforcements_comp_rate,
                        enforcements_ot_rate,
                        enforcements_status 
                    ], (err, result) => {
                        if (err) cb(err)
                        else {
                            cb(null,result);
                        }
                      })
                }
                
            }


}


function getEnforcements(req,res,cb)
{
  let response = {
		status: 0,
		body: {},
		message: ""  
      }  

    const getEnforcementsList = new Promise((resolve, reject) => {

        con.query(`
             SELECT 
              enforcements_id,
              enforcements_assign_id,
              enforcements_first_name,
              enforcements_last_name,
              enforcements_address,
              enforcements_city,
              enforcements_state,
              enforcements_zip,
              enforcements_phone,
              enforcements_email,
              enforcements_dob,
              enforcements_ss,
              enforcements_hire_date,
              enforcements_start_date,
              enforcements_app_login,
              enforcements_hours_desired,
              enforcements_wage,
              enforcements_ticket_bonus,
              enforcements_w_4_with_holding,
              enforcements_start_with_holding,
              enforcements_comp_rate,
              enforcements_ot_rate,
              enforcements_status  FROM enforcements
            `,  (err, result) => {
                if (err) reject(err)
                else {
                        resolve(result);
                }
              })
        
      })
      .then((data) => {

      if(data.length > 0)
      {
        response.status = typeof data == 'object' ? 1 : 0;
        response.body = data;
      }
      else
      {
        response.message = "Sorry Enforcements List Not Found";
      }
       res.json(response)
      })
       .catch((error) => {
         response.message = "Not Able To Get The Enforcements List : Error " + error;	
         res.json(response)
      })


}


function getEnforcementsDetails(req,res,cb)
{
  const { enforcements_id } = req.params;
    
  let response = {
      status: 0,
      body: {},
      message: ""  
    }  


    const getEnforcementsDetail = new Promise((resolve, reject) => {

      con.query(`
           SELECT 
              enforcements_id,
              enforcements_assign_id,
              enforcements_first_name,
              enforcements_last_name,
              enforcements_address,
              enforcements_city,
              enforcements_state,
              enforcements_zip,
              enforcements_phone,
              enforcements_email,
              enforcements_dob,
              enforcements_ss,
              enforcements_hire_date,
              enforcements_start_date,
              enforcements_app_login,
              enforcements_hours_desired,
              enforcements_wage,
              enforcements_ticket_bonus,
              enforcements_w_4_with_holding,
              enforcements_start_with_holding,
              enforcements_comp_rate,
              enforcements_ot_rate,
              enforcements_status  FROM enforcements WHERE enforcements_id = ?
          `,[enforcements_id],  (err, result) => {
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
        response.message = "Sorry Enforcements List Not Found";
    }


     res.json(response)
    })
     .catch((error) => {
       response.message = "Not Able To Get The Enforcements List : Error " + error;	
       res.json(response)
    })

}


function deleteEnforcements(req,res,cb)
{
  const { enforcements_id } = req.params;
   let response = {
    status: 0,
    body: {},
    message: ""  
  }  

const deleteEnforcement = new Promise((resolve, reject) => {

    async.waterfall([
      getEnforcementsDetails,
      deleteEnforcements
      ], (error, result) => {
        if (error) reject(error)
        else resolve(result)
      })

    
  })
  .then((data) => {
  // console.log(data)
  response.status = typeof data == 'object' ? 1 : 0;
  if(data.affectedRows > 0)
  {
    response.message = "Customer Has Been Deleted Successfully !";
  }
  else
  {
    response.message = data;
  }
   res.json(response)
  })
   .catch((error) => {
     response.message = "Not Able To Delete The Customer : Error " + error;	
     res.json(response)
  })


  function getEnforcementsDetails(cb)
  {
    con.query(`
    SELECT * FROM  enforcements WHERE enforcements_id  = ?
    `, [enforcements_id], (err, result) => {
        if (err) cb(err)
        else {
            cb(null,result);
        }
      })
  }
    
 function deleteEnforcements(result,cb)
  {
      if(result.length > 0)
      {
        con.query(`
        DELETE FROM enforcements WHERE enforcements_id  = ?
        `, [enforcements_id], (err, result) => {
            if (err) cb(err)
            else {
                cb(null,result);
            }
          })
      }
      else
      {
          cb(null,"Sorry Not A Valid Enforcements Id .");
      }

  }

}


function updateEnforcements(req,res,cb)
{


  let { 
          enforcements_id,
          enforcements_assign_id,
          enforcements_first_name,
          enforcements_last_name,
          enforcements_address,
          enforcements_city,
          enforcements_state,
          enforcements_zip,
          enforcements_phone,
          enforcements_email,
          enforcements_dob,
          enforcements_ss,
          enforcements_hire_date,
          enforcements_start_date,
          enforcements_app_login,
          enforcements_app_password,
          enforcements_hours_desired,
          enforcements_wage,
          enforcements_ticket_bonus,
          enforcements_w_4_with_holding,
          enforcements_start_with_holding,
          enforcements_comp_rate,
          enforcements_ot_rate,
          enforcements_status } = req.body;

        let response = {
        status: 0,
        body: {},
        message: ""  
          }  

  var now = moment.utc().format();
  


  const updateEnforcements = new Promise((resolve, reject) => {

      async.waterfall([
          getEnforcements,
          updateEnforcementsFunction
        ], (error, result) => {
          if (error) reject(error)
          else resolve(result)
        })

      
    })
    .then((data) => {
  
    response.status = typeof data == 'object' ? 1 : 0;

    if(data.affectedRows > 0)
    {
      response.message = "Enforcements Has Been Updated Successfully !";
    }
    else
    {
        response.message = data;
    }

     res.json(response)
    })
     .catch((error) => {
       response.message = "Not Able To update The Enforcements : Error " + error;	
       res.json(response)
    })


    function getEnforcements(cb)
    {
      con.query(`
      SELECT * FROM  enforcements WHERE enforcements_id  =?`,[enforcements_id], (err, result) => {
          if (err) cb(err)
          else {
              cb(null,result);
          }
        })
    }
      
   function updateEnforcementsFunction(result,cb)
    {

        if(result.length > 0)
        {
            if(!!enforcements_assign_id)
            {
              enforcements_assign_id = enforcements_assign_id;
            }
            else
            {
              enforcements_assign_id = result[0].enforcements_assign_id;
            }

            if(!!enforcements_first_name)
            {
              enforcements_first_name = enforcements_first_name;
            }
            else
            {
              enforcements_first_name = result[0].enforcements_first_name;
            }


            if(!!enforcements_last_name)
            {
              enforcements_last_name = enforcements_last_name;
            }
            else
            {
              enforcements_last_name = result[0].enforcements_last_name;
            }

            if(!!enforcements_address)
            {
              enforcements_address = enforcements_address;
            }
            else
            {
              enforcements_address = result[0].enforcements_address;
            }

            if(!!enforcements_city)
            {
              enforcements_city = enforcements_city;
            }
            else
            {
              enforcements_city = result[0].enforcements_city;
            }

            if(!!enforcements_state)
            {
              enforcements_state = enforcements_state;
            }
            else
            {
              enforcements_state = result[0].enforcements_state;
            }


            if(!!enforcements_zip)
            {
              enforcements_zip = enforcements_zip;
            }
            else
            {
              enforcements_zip = result[0].enforcements_zip;
            }

            if(!!enforcements_phone)
            {
              enforcements_phone = enforcements_phone;
            }
            else
            {
              enforcements_phone = result[0].enforcements_phone;
            }

            if(!!enforcements_email)
            {
              enforcements_email = enforcements_email;
            }
            else
            {
              enforcements_email = result[0].enforcements_email;
            }


            if(!!enforcements_dob)
            {
              enforcements_dob = enforcements_dob;
            }
            else
            {
              enforcements_dob = result[0].enforcements_dob;
            }

            if(!!enforcements_ss)
            {
              enforcements_ss = enforcements_ss;
            }
            else
            {
              enforcements_ss = result[0].enforcements_ss;
            }


             if(!!enforcements_hire_date)
            {
              enforcements_hire_date = enforcements_hire_date;
            }
            else
            {
              enforcements_hire_date = result[0].enforcements_hire_date;
            }

            if(!!enforcements_start_date)
            {
              enforcements_start_date = enforcements_start_date;
            }
            else
            {
              enforcements_start_date = result[0].enforcements_start_date;
            }

            if(!!enforcements_app_login)
            {
              enforcements_app_login = enforcements_app_login;
            }
            else
            {
              enforcements_app_login = result[0].enforcements_app_login;
            }


            if(!!enforcements_app_password)
            {
              
              enforcements_app_password =  bcrypt.hashSync(enforcements_app_password, saltRounds);
            }
            else
            {
              enforcements_app_password = result[0].enforcements_app_password;
            }

            if(!!enforcements_hours_desired)
            {
              enforcements_hours_desired = enforcements_hours_desired;
            }
            else
            {
              enforcements_hours_desired = result[0].enforcements_hours_desired;
            }


            if(!!enforcements_wage)
            {
              enforcements_wage = enforcements_wage;
            }
            else
            {
              enforcements_wage = result[0].enforcements_wage;
            }

            if(!!enforcements_ticket_bonus)
            {
              enforcements_ticket_bonus = enforcements_ticket_bonus;
            }
            else
            {
              enforcements_ticket_bonus = result[0].enforcements_ticket_bonus;
            }


            if(!!enforcements_w_4_with_holding)
            {
              enforcements_w_4_with_holding = enforcements_w_4_with_holding;
            }
            else
            {
              enforcements_w_4_with_holding = result[0].enforcements_w_4_with_holding;
            }


            if(!!enforcements_start_with_holding)
            {
              enforcements_start_with_holding = enforcements_start_with_holding;
            }
            else
            {
              enforcements_start_with_holding = result[0].enforcements_start_with_holding;
            }

            if(!!enforcements_comp_rate)
            {
              enforcements_comp_rate = enforcements_comp_rate;
            }
            else
            {
              enforcements_comp_rate = result[0].enforcements_comp_rate;
            }

            if(!!enforcements_ot_rate)
            {
              enforcements_ot_rate = enforcements_ot_rate;
            }
            else
            {
              enforcements_ot_rate = result[0].enforcements_ot_rate;
            }

            if (!!enforcements_status) {
              enforcements_status = enforcements_status
            } else {
              enforcements_status = result[0].enforcements_status
            }

            

          con.query(`
          Update enforcements SET
          enforcements_first_name = ? ,
          enforcements_first_name = ?,
          enforcements_last_name = ? ,
          enforcements_address = ?,
          enforcements_city = ?,
          enforcements_state = ?,
          enforcements_zip = ?,
          enforcements_phone = ?,
          enforcements_email = ?,
          enforcements_dob = ?,
          enforcements_ss =?,
          enforcements_hire_date = ?,
          enforcements_start_date =? ,
          enforcements_app_login =?,
          enforcements_app_password =?,
          enforcements_hours_desired =?,
          enforcements_wage =?,
          enforcements_ticket_bonus =?,
          enforcements_w_4_with_holding =?,
          enforcements_start_with_holding =?,
          enforcements_comp_rate =?,
          enforcements_ot_rate=?,
          enforcements_status=?  WHERE enforcements_id = ?
          `, [
            enforcements_assign_id,
            enforcements_first_name,
            enforcements_last_name,
            enforcements_address,
            enforcements_city,
            enforcements_state,
            enforcements_zip,
            enforcements_phone,
            enforcements_email,
            enforcements_dob,
            enforcements_ss,
            enforcements_hire_date,
            enforcements_start_date,
            enforcements_app_login,
            enforcements_app_password,
            enforcements_hours_desired,
            enforcements_wage,
            enforcements_ticket_bonus,
            enforcements_w_4_with_holding,
            enforcements_start_with_holding,
            enforcements_comp_rate,
            enforcements_ot_rate,
            enforcements_status,
            enforcements_id
            ], (err, result) => {
              if (err) cb(err)
              else {
                  cb(null,result);
              }
            })

        }
        else
        {
            cb(null," Sorry Not A Valid Enforcements Id . "); 
        }

    }


}