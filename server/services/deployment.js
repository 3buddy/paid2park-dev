const Promise = require("promise");
const async = require("async");
const _ = require("lodash");
const moment = require("moment");
const underScore = require("underscore");


exports.addDeployment           =  addDeployment;
exports.getDeployment           =  getDeployment;
exports.getDeploymentDetails    =  getDeploymentDetails;
exports.deleteDeployment        =  deleteDeployment;
exports.updateDeployment        =  updateDeployment;

function addDeployment(req,res,cb) {

    let response = {
        status: 0,
        body: {},
        message: ""  
        }  

    const {
            deployment_assign_id,
            deployment_name,
            deployment_billing_address,
            deployment_billing_city,
            deployment_billing_state,
            deployment_billing_zip,
            deployment_billing_phone_contact,
            deployment_billing_phone,
            deployment_billing_email,
            deployment_min_minutes_to_park,
            deployment_parking_charge_times,
            deployment_monday_start_and_end,
            deployment_tuesday_start_and_end,
            deployment_wednesday_start_and_end,
            deployment_thursday_start_and_end,
            deployment_friday_start_and_end,
            deployment_saturday_start_and_end,
            deployment_sunday_start_and_end,
            deployment_parking_percentage,
            deployment_tickets_percentage,
            deployment_ticket_transaction_charges,
            deployment_monthly_service_charge_parking,
            deployment_monthly_service_charge_enforcement,
            deployment_bill_day_of_month,
            deployment_min_monthly_bill,
            deployment_parking_revenue,
            deployment_parking_draft_day_of_month,
            deployment_parking_draft_routing,
            deployment_parking_draft_account,
            deployment_parking_draft_bank_name,
            deployment_parking_draft_note,
            deployment_ticket_revenue,
            deployment_ticket_draft_day_of_month,
            deployment_ticket_draft_routing,
            deployment_ticket_draft_account,
            deployment_ticket_draft_bank_name,
            deployment_ticket_draft_note,
            deployment_kiosks_price_per_hour
          } = req.body;    


    const addDeployment = new Promise( (resolve,reject) => {
         async.waterfall([check , add],(error,result) => {
             if (error) reject(error)
             else resolve(result)
         })
    })
    .then( (data) => {

        if(data.insertId)
	    {
                response.status =  1;
			    response.message = "Deployment Has Been Created Successfully !";
		}
			  
		res.json(response)
    })
    .catch((error) => {
        // console.log(error);
        response.message = "Not Able To Create The Deployment : Error " + error;	
        res.json(response)
    });
        
   function check() {

     con.query(
         `SELECT * FROM deployment WHERE deployment_billing_email =?`,
          [deployment_billing_email],
          (error,result) => {
                if (err) cb(err)
                else {
                    cb(null,result);
                }
             })

   }

   function add(result,cb) {
       if(result.length > 0) {
        response.status = 0;
        response.message = "Deployment Already Exists . Please Check Email Address Fields . ";
        cb(null,response);
       } else {
            con.query(`
            INSERT INTO deployment (
                deployment_assign_id,
                deployment_name,
                deployment_billing_address,
                deployment_billing_city,
                deployment_billing_state,
                deployment_billing_zip,
                deployment_billing_phone_contact,
                deployment_billing_phone,
                deployment_billing_email,
                deployment_min_minutes_to_park,
                deployment_parking_charge_times,
                deployment_monday_start_and_end,
                deployment_tuesday_start_and_end,
                deployment_wednesday_start_and_end,
                deployment_thursday_start_and_end,
                deployment_friday_start_and_end,
                deployment_saturday_start_and_end,
                deployment_sunday_start_and_end,
                deployment_parking_percentage,
                deployment_tickets_percentage,
                deployment_ticket_transaction_charges,
                deployment_monthly_service_charge_parking,
                deployment_monthly_service_charge_enforcement,
                deployment_bill_day_of_month,
                deployment_min_monthly_bill,
                deployment_parking_revenue,
                deployment_parking_draft_day_of_month,
                deployment_parking_draft_routing,
                deployment_parking_draft_account,
                deployment_parking_draft_bank_name,
                deployment_parking_draft_note,
                deployment_ticket_revenue,
                deployment_ticket_draft_day_of_month,
                deployment_ticket_draft_routing,
                deployment_ticket_draft_account,
                deployment_ticket_draft_bank_name,
                deployment_ticket_draft_note,
                deployment_kiosks_price_per_hour
            )
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
            `,[deployment_assign_id,
                deployment_name,
                deployment_billing_address,
                deployment_billing_city,
                deployment_billing_state,
                deployment_billing_zip,
                deployment_billing_phone_contact,
                deployment_billing_phone,
                deployment_billing_email,
                deployment_min_minutes_to_park,
                deployment_parking_charge_times,
                deployment_monday_start_and_end,
                deployment_tuesday_start_and_end,
                deployment_wednesday_start_and_end,
                deployment_thursday_start_and_end,
                deployment_friday_start_and_end,
                deployment_saturday_start_and_end,
                deployment_sunday_start_and_end,
                deployment_parking_percentage,
                deployment_tickets_percentage,
                deployment_ticket_transaction_charges,
                deployment_monthly_service_charge_parking,
                deployment_monthly_service_charge_enforcement,
                deployment_bill_day_of_month,
                deployment_min_monthly_bill,
                deployment_parking_revenue,
                deployment_parking_draft_day_of_month,
                deployment_parking_draft_routing,
                deployment_parking_draft_account,
                deployment_parking_draft_bank_name,
                deployment_parking_draft_note,
                deployment_ticket_revenue,
                deployment_ticket_draft_day_of_month,
                deployment_ticket_draft_routing,
                deployment_ticket_draft_account,
                deployment_ticket_draft_bank_name,
                deployment_ticket_draft_note,
                deployment_kiosks_price_per_hour],(error,InsertData) => {
                if (err) cb(err)
                else {
                    cb(null,result);
                }
            })
       }

   }

}

function getDeployment(req,res,cb) {

    let response = {
        status: 0,
        body: {},
        message: ""  
        } 
        
    const  getDeployment  = new Promise( (resolve,reject) => {
           async.waterfall([get],(error,result) => {
               if (error) reject(error)
               else resolve(result)
           });
    })
    .then( (data) => {
        if(data.length > 0)
        {
          response.status = typeof data == 'object' ? 1 : 0;
          response.body = data;
        }
        else
        {
          response.message = "Sorry Deployment List Not Found";
        }
         res.json(response)
    })
    .catch( (error) => {
        response.message = "Not Able To Get The Deployment List : Error " + error;	
        res.json(response)
    })


    function get(cb) {
        con.query(
            `SELECT * FROM deployment`,
             (error,result) => {
                   if (err) cb(err)
                   else {
                       cb(null,result);
                   }
                })
    }
   
}

function getDeploymentDetails(req,res,cb) {

    const { deployment_id } = req.params;
    let response = {
        status: 0,
        body: {},
        message: ""  
        }  

     const getDeploymentDetails = new Promise( (resolve,result) => {
           async.waterfall([getDetails],(error,result) => {
                 if (error) reject(error);
                 else resolve(result);
           }); 
     })
     .then((data) => {
        if(data.length > 0)
        {
          response.status = typeof data == 'object' ? 1 : 0;
          response.body = data[0];
        }
        else
        {
          response.message = "Sorry Deployment List Not Found";
        }
        res.json(response)
     })
     .catch( (error) => {
        response.message = "Not Able To Get The Deployment List : Error " + error;	
        res.json(response)
     })

     function getDetails(cb) {
        con.query(
            `SELECT * FROM deployment WHERE deployment_id = ?`,
            [deployment_id],
             (error,result) => {
                   if (err) cb(err)
                   else {
                       cb(null,result);
                   }
                })
     }
}

function updateDeployment(req,res,cb) {

    let response = {
        status: 0,
        body: {},
        message: ""  
        }  
        const {
            deployment_id,
            deployment_assign_id,
            deployment_name,
            deployment_billing_address,
            deployment_billing_city,
            deployment_billing_state,
            deployment_billing_zip,
            deployment_billing_phone_contact,
            deployment_billing_phone,
            deployment_billing_email,
            deployment_min_minutes_to_park,
            deployment_parking_charge_times,
            deployment_monday_start_and_end,
            deployment_tuesday_start_and_end,
            deployment_wednesday_start_and_end,
            deployment_thursday_start_and_end,
            deployment_friday_start_and_end,
            deployment_saturday_start_and_end,
            deployment_sunday_start_and_end,
            deployment_parking_percentage,
            deployment_tickets_percentage,
            deployment_ticket_transaction_charges,
            deployment_monthly_service_charge_parking,
            deployment_monthly_service_charge_enforcement,
            deployment_bill_day_of_month,
            deployment_min_monthly_bill,
            deployment_parking_revenue,
            deployment_parking_draft_day_of_month,
            deployment_parking_draft_routing,
            deployment_parking_draft_account,
            deployment_parking_draft_bank_name,
            deployment_parking_draft_note,
            deployment_ticket_revenue,
            deployment_ticket_draft_day_of_month,
            deployment_ticket_draft_routing,
            deployment_ticket_draft_account,
            deployment_ticket_draft_bank_name,
            deployment_ticket_draft_note,
            deployment_kiosks_price_per_hour
          } = req.body;        
        
    const updateDeployment = new Promise( (resolve,reject) => {
         
        async.waterfall( [check,updateData], (error,result) => {
            if (error) reject(error)
            else resolve(result)
        });
    })
    .then( (data) => {
        response.status = typeof data == 'object' ? 1 : 0;
        if(data.affectedRows > 0)
        {
          response.message = "Deployment Has Been Updated Successfully !";
        }
        else
        {
            response.message = data;
        }
         res.json(response)
    })
    .catch( (error) => {
        response.message = "Not Able To update The Deployment : Error " + error;	
        res.json(response)
    });

    function check(cb) {
        con.query(`
        SELECT * FROM deployment WHERE deployment_id = ?
      `, [deployment_id], (err, result) => {
            if (err) cb(err)
            else {
                cb(null,result);
            }
          })
    }

    function updateData(result,cb) {

        if ( result.length > 0 ) {

            if(!!deployment_assign_id)
            {
                deployment_assign_id = deployment_assign_id;
            }
            else
            {
                deployment_assign_id = result[0].deployment_assign_id;
            }

            if(!!deployment_name)
            {
                deployment_name = deployment_name;
            }
            else
            {
                deployment_name = result[0].deployment_name;
            }

            if(!!deployment_billing_address)
            {
                deployment_billing_address = deployment_billing_address;
            }
            else
            {
                deployment_billing_address = result[0].deployment_billing_address;
            }

            if(!!deployment_billing_city)
            {
                deployment_billing_city = deployment_billing_city;
            }
            else
            {
                deployment_billing_city = result[0].deployment_billing_city;
            }

            
            if(!!deployment_billing_state)
            {
                deployment_billing_state = deployment_billing_state;
            }
            else
            {
                deployment_billing_state = result[0].deployment_billing_state;
            }

            if(!!deployment_billing_zip)
            {
                deployment_billing_zip = deployment_billing_zip;
            }
            else
            {
                deployment_billing_zip = result[0].deployment_billing_zip;
            }

            if(!!deployment_billing_phone_contact)
            {
                deployment_billing_phone_contact = deployment_billing_phone_contact;
            }
            else
            {
                deployment_billing_phone_contact = result[0].deployment_billing_phone_contact;
            }

            if(!!deployment_billing_phone)
            {
                deployment_billing_phone = deployment_billing_phone;
            }
            else
            {
                deployment_billing_phone = result[0].deployment_billing_phone;
            }

            if(!!deployment_billing_email)
            {
                deployment_billing_email = deployment_billing_email;
            }
            else
            {
                deployment_billing_email = result[0].deployment_billing_email;
            }

            if(!!deployment_min_minutes_to_park)
            {
                deployment_min_minutes_to_park = deployment_min_minutes_to_park;
            }
            else
            {
                deployment_min_minutes_to_park = result[0].deployment_min_minutes_to_park;
            }

            if(!!deployment_parking_charge_times)
            {
                deployment_parking_charge_times = deployment_parking_charge_times;
            }
            else
            {
                deployment_parking_charge_times = result[0].deployment_parking_charge_times;
            }


             if(!!deployment_monday_start_and_end)
            {
                deployment_monday_start_and_end = deployment_monday_start_and_end;
            }
            else
            {
                deployment_monday_start_and_end = result[0].deployment_monday_start_and_end;
            }

            if(!!deployment_tuesday_start_and_end)
            {
                deployment_tuesday_start_and_end = deployment_tuesday_start_and_end;
            }
            else
            {
                deployment_tuesday_start_and_end = result[0].deployment_tuesday_start_and_end;
            }


            if(!!deployment_wednesday_start_and_end)
            {
                deployment_wednesday_start_and_end = deployment_wednesday_start_and_end;
            }
            else
            {
                deployment_wednesday_start_and_end = result[0].deployment_wednesday_start_and_end;
            }

            if(!!deployment_thursday_start_and_end)
            {
                deployment_thursday_start_and_end = deployment_thursday_start_and_end;
            }
            else
            {
                deployment_thursday_start_and_end = result[0].deployment_thursday_start_and_end;
            }

            if(!!deployment_friday_start_and_end)
            {
                deployment_friday_start_and_end = deployment_friday_start_and_end;
            }
            else
            {
                deployment_friday_start_and_end = result[0].deployment_friday_start_and_end;
            }

            if(!!deployment_saturday_start_and_end)
            {
                deployment_saturday_start_and_end = deployment_saturday_start_and_end;
            }
            else
            {
                deployment_saturday_start_and_end = result[0].deployment_saturday_start_and_end;
            }


            if(!!deployment_sunday_start_and_end)
            {
                deployment_sunday_start_and_end = deployment_sunday_start_and_end;
            }
            else
            {
                deployment_sunday_start_and_end = result[0].deployment_sunday_start_and_end;
            }


            if(!!deployment_parking_percentage)
            {
                deployment_parking_percentage = deployment_parking_percentage;
            }
            else
            {
                deployment_parking_percentage = result[0].deployment_parking_percentage;
            }

            if(!!deployment_tickets_percentage)
            {
                deployment_tickets_percentage = deployment_tickets_percentage;
            }
            else
            {
                deployment_tickets_percentage = result[0].deployment_tickets_percentage;
            }

            if(!!deployment_ticket_transaction_charges)
            {
                deployment_ticket_transaction_charges = deployment_ticket_transaction_charges;
            }
            else
            {
                deployment_ticket_transaction_charges = result[0].deployment_ticket_transaction_charges;
            }

            if(!!deployment_monthly_service_charge_parking)
            {
                deployment_monthly_service_charge_parking = deployment_monthly_service_charge_parking;
            }
            else
            {
                deployment_monthly_service_charge_parking = result[0].deployment_monthly_service_charge_parking;
            }

            if(!!deployment_monthly_service_charge_enforcement)
            {
                deployment_monthly_service_charge_enforcement = deployment_monthly_service_charge_enforcement;
            }
            else
            {
                deployment_monthly_service_charge_enforcement = result[0].deployment_monthly_service_charge_enforcement;
            }

            if(!!deployment_bill_day_of_month)
            {
                deployment_bill_day_of_month = deployment_bill_day_of_month;
            }
            else
            {
                deployment_bill_day_of_month = result[0].deployment_bill_day_of_month;
            }

            if(!!deployment_min_monthly_bill)
            {
                deployment_min_monthly_bill = deployment_min_monthly_bill;
            }
            else
            {
                deployment_min_monthly_bill = result[0].deployment_min_monthly_bill;
            }

            if(!!deployment_parking_revenue)
            {
                deployment_parking_revenue = deployment_parking_revenue;
            }
            else
            {
                deployment_parking_revenue = result[0].deployment_parking_revenue;
            }

            if(!!deployment_parking_draft_day_of_month)
            {
                deployment_parking_draft_day_of_month = deployment_parking_draft_day_of_month;
            }
            else
            {
                deployment_parking_draft_day_of_month = result[0].deployment_parking_draft_day_of_month;
            }

            if(!!deployment_parking_draft_routing)
            {
                deployment_parking_draft_routing = deployment_parking_draft_routing;
            }
            else
            {
                deployment_parking_draft_routing = result[0].deployment_parking_draft_routing;
            }

            if(!!deployment_parking_draft_account)
            {
                deployment_parking_draft_account = deployment_parking_draft_account;
            }
            else
            {
                deployment_parking_draft_account = result[0].deployment_parking_draft_account;
            }

            if(!!deployment_parking_draft_bank_name)
            {
                deployment_parking_draft_bank_name = deployment_parking_draft_bank_name;
            }
            else
            {
                deployment_parking_draft_bank_name = result[0].deployment_parking_draft_bank_name;
            }

            if(!!deployment_parking_draft_note)
            {
                deployment_parking_draft_note = deployment_parking_draft_note;
            }
            else
            {
                deployment_parking_draft_note = result[0].deployment_parking_draft_note;
            }

            if(!!deployment_ticket_revenue)
            {
                deployment_ticket_revenue = deployment_ticket_revenue;
            }
            else
            {
                deployment_ticket_revenue = result[0].deployment_ticket_revenue;
            }

            if(!!deployment_ticket_draft_day_of_month)
            {
                deployment_ticket_draft_day_of_month = deployment_ticket_draft_day_of_month;
            }
            else
            {
                deployment_ticket_draft_day_of_month = result[0].deployment_ticket_draft_day_of_month;
            }


            if(!!deployment_ticket_draft_routing)
            {
                deployment_ticket_draft_routing = deployment_ticket_draft_routing;
            }
            else
            {
                deployment_ticket_draft_routing = result[0].deployment_ticket_draft_routing;
            }

            if(!!deployment_ticket_draft_account)
            {
                deployment_ticket_draft_account = deployment_ticket_draft_account;
            }
            else
            {
                deployment_ticket_draft_account = result[0].deployment_ticket_draft_account;
            }

            if(!!deployment_ticket_draft_bank_name)
            {
                deployment_ticket_draft_bank_name = deployment_ticket_draft_bank_name;
            }
            else
            {
                deployment_ticket_draft_bank_name = result[0].deployment_ticket_draft_bank_name;
            }

            if(!!deployment_ticket_draft_note)
            {
                deployment_ticket_draft_note = deployment_ticket_draft_note;
            }
            else
            {
                deployment_ticket_draft_note = result[0].deployment_ticket_draft_note;
            }

            if(!!deployment_kiosks_price_per_hour)
            {
                deployment_kiosks_price_per_hour = deployment_kiosks_price_per_hour;
            }
            else
            {
                deployment_kiosks_price_per_hour = result[0].deployment_kiosks_price_per_hour;
            }

            con.query(`
            Update deployment SET
            deployment_assign_id,
            deployment_name,
            deployment_billing_address,
            deployment_billing_city,
            deployment_billing_state,
            deployment_billing_zip,
            deployment_billing_phone_contact,
            deployment_billing_phone,
            deployment_billing_email,
            deployment_min_minutes_to_park,
            deployment_parking_charge_times,
            deployment_monday_start_and_end,
            deployment_tuesday_start_and_end,
            deployment_wednesday_start_and_end,
            deployment_thursday_start_and_end,
            deployment_friday_start_and_end,
            deployment_saturday_start_and_end,
            deployment_sunday_start_and_end,
            deployment_parking_percentage,
            deployment_tickets_percentage,
            deployment_ticket_transaction_charges,
            deployment_monthly_service_charge_parking,
            deployment_monthly_service_charge_enforcement,
            deployment_bill_day_of_month,
            deployment_min_monthly_bill,
            deployment_parking_revenue,
            deployment_parking_draft_day_of_month,
            deployment_parking_draft_routing,
            deployment_parking_draft_account,
            deployment_parking_draft_bank_name,
            deployment_parking_draft_note,
            deployment_ticket_revenue,
            deployment_ticket_draft_day_of_month,
            deployment_ticket_draft_routing,
            deployment_ticket_draft_account,
            deployment_ticket_draft_bank_name,
            deployment_ticket_draft_note,
            deployment_kiosks_price_per_hour  WHERE deployment_id = ?
            `, [
                deployment_assign_id,
                deployment_name,
                deployment_billing_address,
                deployment_billing_city,
                deployment_billing_state,
                deployment_billing_zip,
                deployment_billing_phone_contact,
                deployment_billing_phone,
                deployment_billing_email,
                deployment_min_minutes_to_park,
                deployment_parking_charge_times,
                deployment_monday_start_and_end,
                deployment_tuesday_start_and_end,
                deployment_wednesday_start_and_end,
                deployment_thursday_start_and_end,
                deployment_friday_start_and_end,
                deployment_saturday_start_and_end,
                deployment_sunday_start_and_end,
                deployment_parking_percentage,
                deployment_tickets_percentage,
                deployment_ticket_transaction_charges,
                deployment_monthly_service_charge_parking,
                deployment_monthly_service_charge_enforcement,
                deployment_bill_day_of_month,
                deployment_min_monthly_bill,
                deployment_parking_revenue,
                deployment_parking_draft_day_of_month,
                deployment_parking_draft_routing,
                deployment_parking_draft_account,
                deployment_parking_draft_bank_name,
                deployment_parking_draft_note,
                deployment_ticket_revenue,
                deployment_ticket_draft_day_of_month,
                deployment_ticket_draft_routing,
                deployment_ticket_draft_account,
                deployment_ticket_draft_bank_name,
                deployment_ticket_draft_note,
                deployment_kiosks_price_per_hour,
                deployment_id
              ], (err, result) => {
                if (err) cb(err)
                else {
                    cb(null,result);
                }
              })



        } else {
            cb(null," Sorry Not A Valid Deployment Id . "); 
        }


    }
}

function deleteDeployment(req,res,cb) {

    const { deployment_id } = req.params;
    let response = {
        status: 0,
        body: {},
        message: ""  
        }  



     const deleteDeployment = new Promise((resolve, reject) => {

        async.waterfall([
            get,
            remove
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
            response.message = "Deployment Has Been Deleted Successfully !";
        }
        else
        {
            response.message = data;
        }
        res.json(response)
        })
        .catch((error) => {
            response.message = "Not Able To Delete The Deployment : Error " + error;	
            res.json(response)
        })


            function get(cb)
            {
                con.query(`
                SELECT * FROM  deployment WHERE deployment_id  = ?
                `, [deployment_id], (err, result) => {
                    if (err) cb(err)
                    else {
                        cb(null,result);
                    }
                })
            }
    
        function remove(result,cb)
        {
            if(result.length > 0)
            {
                con.query(`
                DELETE FROM deployment WHERE deployment_id  = ?
                `, [deployment_id], (err, result) => {
                    if (err) cb(err)
                    else {
                        cb(null,result);
                    }
                })
            }
            else
            {
                
                cb(null,"Sorry Not A Valid Deployment Id .");
            }
        }
}