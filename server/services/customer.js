const Promise = require("promise");
const async = require("async");
const _ = require("lodash");
const moment = require("moment");
const underScore = require("underscore");


exports.addCustomer           =  addCustomer;
exports.getCustomer           =  getCustomer;
exports.getCustomerDetails    =  getCustomerDetails;
exports.deleteCustomer        =  deleteCustomer;
exports.updateCustomer        =  updateCustomer;



function addCustomer(req,res,cb)
{


  const { 
    customer_assign_id,
    customer_last_name,
    customer_first_name,
    customer_mail_address,
    customer_mail_city,
    customer_mail_state,
    customer_mail_zip,
    customer_minute_available,
    customer_last_payment_date,
    customer_last_payment_amount,
    customer_last_minutes_received,
    customer_last_parking_date,
    customer_last_pass_purchase_date,
    customer_last_pass_start_date,
    customer_last_pass_end_date,
    customer_last_pass_cost,
    customer_email_address,
    customer_cell,
    customer_cell_carrier,
    customer_notify_mins_in_advance,
    customer_number_of_tickets_ytd 
       } = req.body;


  let response = {
      status: 0,
      body: {},
      message: ""  
      }  
	  
	  


	const createCustomer = new Promise((resolve, reject) => {

            async.waterfall([
                checkCustomer,
                insertCustomer
              ], (error, result) => {
                if (error) reject(error)
                else resolve(result)
              })

			
		  })
			.then((data) => {
			  
			  if(data.insertId)
			  {
                response.status =  1;
				        response.message = "Customer Has Been Created Successfully !";
			  }
			  
			  res.json(response)
			})
			.catch((error) => {
        console.log(error);
			  response.message = "Not Able To Create The Customer : Error " + error;	
			  res.json(response)
            })
            


            function checkCustomer(cb)
            {
                con.query(`
                SELECT * FROM customers WHERE customer_email_address = ?
                `, [customer_email_address], (err, result) => {
                    if (err) cb(err)
                    else {
                        cb(null,result);
                    }
                  })
            } 
    
            function insertCustomer(result,cb)
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
                    INSERT INTO customers 
                    (customer_assign_id,
                      customer_last_name,
                      customer_first_name,
                      customer_mail_address,
                      customer_mail_city,
                      customer_mail_state,
                      customer_mail_zip,
                      customer_minute_available,
                      customer_last_payment_date,
                      customer_last_payment_amount,
                      customer_last_minutes_received,
                      customer_last_parking_date,
                      customer_last_pass_purchase_date,
                      customer_last_pass_start_date,
                      customer_last_pass_end_date,
                      customer_last_pass_cost,
                      customer_email_address,
                      customer_cell,
                      customer_cell_carrier,
                      customer_notify_mins_in_advance,
                      customer_number_of_tickets_ytd  )
                      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
                    `, [customer_assign_id,
                      customer_last_name,
                      customer_first_name,
                      customer_mail_address,
                      customer_mail_city,
                      customer_mail_state,
                      customer_mail_zip,
                      customer_minute_available,
                      customer_last_payment_date,
                      customer_last_payment_amount,
                      customer_last_minutes_received,
                      customer_last_parking_date,
                      customer_last_pass_purchase_date,
                      customer_last_pass_start_date,
                      customer_last_pass_end_date,
                      customer_last_pass_cost,
                      customer_email_address,
                      customer_cell,
                      customer_cell_carrier,
                      customer_notify_mins_in_advance,
                      customer_number_of_tickets_ytd], (err, result) => {
                        if (err) cb(err)
                        else {
                            cb(null,result);
                        }
                      })
                }
                
            }


}





function getCustomer(req,res,cb)
{


  let response = {
		status: 0,
		body: {},
		message: ""  
      }  

    const getUserlist = new Promise((resolve, reject) => {

        con.query(`
             SELECT 
             customer_id,
             customer_assign_id,
             customer_last_name,
             customer_first_name,
             customer_mail_address,
             customer_mail_city,
             customer_mail_state,
             customer_mail_zip,
             customer_minute_available,
             customer_last_payment_date,
             customer_last_payment_amount,
             customer_last_minutes_received,
             customer_last_parking_date,
             customer_last_pass_purchase_date,
             customer_last_pass_start_date,
             customer_last_pass_end_date,
             customer_last_pass_cost,
             customer_email_address,
             customer_cell,
             customer_cell_carrier,
             customer_notify_mins_in_advance,
             customer_number_of_tickets_ytd FROM customers
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
          response.message = "Sorry Customer List Not Found";
      }


       res.json(response)
      })
       .catch((error) => {
         response.message = "Not Able To Get The Customer List : Error " + error;	
         res.json(response)
      })


}




function getCustomerDetails(req,res,cb)
{

  const { customerId } = req.params;
    
  let response = {
      status: 0,
      body: {},
      message: ""  
    }  


    const getUserDetails = new Promise((resolve, reject) => {

      con.query(`
           SELECT 
           customer_id,
           customer_assign_id,
           customer_last_name,
           customer_first_name,
           customer_mail_address,
           customer_mail_city,
           customer_mail_state,
           customer_mail_zip,
           customer_minute_available,
           customer_last_payment_date,
           customer_last_payment_amount,
           customer_last_minutes_received,
           customer_last_parking_date,
           customer_last_pass_purchase_date,
           customer_last_pass_start_date,
           customer_last_pass_end_date,
           customer_last_pass_cost,
           customer_email_address,
           customer_cell,
           customer_cell_carrier,
           customer_notify_mins_in_advance,
           customer_number_of_tickets_ytd FROM customers WHERE customer_id = ?
          `,[customerId],  (err, result) => {
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




function deleteCustomer(req,res,cb)
{
  const { customerId } = req.params;
   let response = {
    status: 0,
    body: {},
    message: ""  
  }  

const deleteUser = new Promise((resolve, reject) => {

    async.waterfall([
        getCustomer,
        deleteCustomer
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


  function getCustomer(cb)
  {
    con.query(`
    SELECT * FROM  customers WHERE customer_id  = ?
    `, [customerId], (err, result) => {
        if (err) cb(err)
        else {
            cb(null,result);
        }
      })
  }
    
 function deleteCustomer(result,cb)
  {
      if(result.length > 0)
      {
        
        con.query(`
        DELETE FROM customers WHERE customer_id  = ?
        `, [customerId], (err, result) => {
            if (err) cb(err)
            else {
                cb(null,result);
            }
          })

      }
      else
      {
          
          cb(null,"Sorry Not A Valid Customer Id .");
      }

  }

}





function updateCustomer(req,res,cb)
{


  let { 
    customer_id,
    customer_assign_id,
    customer_last_name,
    customer_first_name,
    customer_mail_address,
    customer_mail_city,
    customer_mail_state,
    customer_mail_zip,
    customer_minute_available,
    customer_last_payment_date,
    customer_last_payment_amount,
    customer_last_minutes_received,
    customer_last_parking_date,
    customer_last_pass_purchase_date,
    customer_last_pass_start_date,
    customer_last_pass_end_date,
    customer_last_pass_cost,
    customer_email_address,
    customer_cell,
    customer_cell_carrier,
    customer_notify_mins_in_advance,
    customer_number_of_tickets_ytd } = req.body;
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
      response.message = "Customer Has Been Updated Successfully !";
    }
    else
    {
        response.message = data;
    }

     res.json(response)
    })
     .catch((error) => {
       response.message = "Not Able To update The Customer : Error " + error;	
       res.json(response)
    })


    function getUser(cb)
    {
      con.query(`
      SELECT * FROM  customers WHERE customer_id  = ?
    `, [customer_id], (err, result) => {
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

          

            if(!!customer_assign_id)
            {
              customer_assign_id = customer_assign_id;
            }
            else
            {
              customer_assign_id = result[0].customer_assign_id;
            }

            if(!!customer_last_name)
            {
              customer_last_name = customer_last_name;
            }
            else
            {
              customer_last_name = result[0].customer_last_name;
            }

            if(!!customer_first_name)
            {
              customer_first_name = customer_first_name;
            }
            else
            {
              customer_first_name = result[0].customer_first_name;
            }

            if(!!customer_mail_address)
            {
              customer_mail_address = customer_mail_address;
            }
            else
            {
              customer_mail_address = result[0].customer_mail_address;
            }

            if(!!customer_mail_city)
            {
              customer_mail_city = customer_mail_city;
            }
            else
            {
              customer_mail_city = result[0].customer_mail_city;
            }

            if(!!customer_mail_state)
            {
              customer_mail_state = customer_mail_state;
            }
            else
            {
              customer_mail_state = result[0].customer_mail_state;
            }

            if(!!customer_mail_zip)
            {
              customer_mail_zip = customer_mail_zip;
            }
            else
            {
              customer_mail_zip = result[0].customer_mail_zip;
            }

            if(!!customer_minute_available)
            {
              customer_minute_available = customer_minute_available;
            }
            else
            {
              customer_minute_available = result[0].customer_minute_available;
            }

            if(!!customer_last_payment_date)
            {
              customer_last_payment_date = customer_last_payment_date;
            }
            else
            {
              customer_last_payment_date = result[0].customer_last_payment_date;
            }

            if(!!customer_last_payment_amount)
            {
              customer_last_payment_amount = customer_last_payment_amount;
            }
            else
            {
              customer_last_payment_amount = result[0].customer_last_payment_amount;
            }

            if(!!customer_last_minutes_received)
            {
              customer_last_minutes_received = customer_last_minutes_received;
            }
            else
            {
              customer_last_minutes_received = result[0].customer_last_minutes_received;
            }


             if(!!customer_last_parking_date)
            {
              customer_last_parking_date = customer_last_parking_date;
            }
            else
            {
              customer_last_parking_date = result[0].customer_last_parking_date;
            }

            if(!!customer_last_pass_purchase_date)
            {
              customer_last_pass_purchase_date = customer_last_pass_purchase_date;
            }
            else
            {
              customer_last_pass_purchase_date = result[0].customer_last_pass_purchase_date;
            }


            if(!!customer_last_pass_start_date)
            {
              customer_last_pass_start_date = customer_last_pass_start_date;
            }
            else
            {
              customer_last_pass_start_date = result[0].customer_last_pass_start_date;
            }

            if(!!customer_last_pass_end_date)
            {
              customer_last_pass_end_date = customer_last_pass_end_date;
            }
            else
            {
              customer_last_pass_end_date = result[0].customer_last_pass_end_date;
            }


            if(!!customer_last_pass_cost)
            {
              customer_last_pass_cost = customer_last_pass_cost;
            }
            else
            {
              customer_last_pass_cost = result[0].customer_last_pass_cost;
            }

            if(!!customer_email_address)
            {
              customer_email_address = customer_email_address;
            }
            else
            {
              customer_email_address = result[0].customer_email_address;
            }


            if(!!customer_cell)
            {
              customer_cell = customer_cell;
            }
            else
            {
              customer_cell = result[0].customer_cell;
            }


            if(!!customer_cell_carrier)
            {
              customer_cell_carrier = customer_cell_carrier;
            }
            else
            {
              customer_cell_carrier = result[0].customer_cell_carrier;
            }

            if(!!customer_notify_mins_in_advance)
            {
              customer_notify_mins_in_advance = customer_notify_mins_in_advance;
            }
            else
            {
              customer_notify_mins_in_advance = result[0].customer_notify_mins_in_advance;
            }

            if(!!customer_number_of_tickets_ytd)
            {
              customer_number_of_tickets_ytd = customer_number_of_tickets_ytd;
            }
            else
            {
              customer_number_of_tickets_ytd = result[0].customer_number_of_tickets_ytd;
            }


          con.query(`
          Update customers SET
          customer_assign_id = ? ,
          customer_last_name = ?,
          customer_first_name = ? ,
          customer_mail_address = ?,
          customer_mail_city = ?,
          customer_mail_state = ?,
          customer_mail_zip = ?,
          customer_minute_available = ?,
          customer_last_payment_date = ?,
          customer_last_payment_amount = ?,
          customer_last_minutes_received =?,
          customer_last_parking_date = ?,
          customer_last_pass_purchase_date =? ,
          customer_last_pass_start_date =?,
          customer_last_pass_end_date =?,
          customer_last_pass_cost =?,
          customer_email_address =?,
          customer_cell =?,
          customer_cell_carrier =?,
          customer_notify_mins_in_advance =?,
          customer_number_of_tickets_ytd =?  WHERE customer_id = ?
          `, [
            customer_assign_id,
            customer_last_name,
            customer_first_name,
            customer_mail_address,
            customer_mail_city,
            customer_mail_state,
            customer_mail_zip,
            customer_minute_available,
            customer_last_payment_date,
            customer_last_payment_amount,
            customer_last_minutes_received,
            customer_last_parking_date,
            customer_last_pass_purchase_date,
            customer_last_pass_start_date,
            customer_last_pass_end_date,
            customer_last_pass_cost,
            customer_email_address,
            customer_cell,
            customer_cell_carrier,
            customer_notify_mins_in_advance,
            customer_number_of_tickets_ytd,
            customer_id
            ], (err, result) => {
              if (err) cb(err)
              else {
                  cb(null,result);
              }
            })

        }
        else
        {
            cb(null," Sorry Not A Valid Customer Id . "); 
        }

    }


}





