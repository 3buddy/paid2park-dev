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


exports.addTicketPayment           = addTicketPayment;
exports.addParkingPayments         = addParkingPayments;

exports.getTicketPayment           = getTicketPayment;
exports.getParkingPayment          = getParkingPayment;

exports.getTicketPaymentDetails    = getTicketPaymentDetails;
exports.getParkingPaymentDetails   = getParkingPaymentDetails;

exports.updateTicketPayment        = updateTicketPayment;
exports.updateParkingPayment       = updateParkingPayment;

exports.deleteTicketPayment        = deleteTicketPayment;
exports.deleteParkingPayment       = deleteParkingPayment;




function addTicketPayment(req,res,cb)
{
   let { 
    ticket_payment_tickets,
    ticket_payment_license,
    ticket_payment_ticket_fee,
    ticket_payment_ticket_date,
    ticket_payment_ticket_discount,
    ticket_payment_ticket_balance,
    ticket_payment_payment_amount,
    ticket_payment_funded_by,
    ticket_payment_balance_on_ticket
     } = req.body;

   let data = {
        status: 0,
        body: {},
        message: ""  
        }

   const addTicketPayment = new Promise((resolve,reject) =>{
       async.waterfall([
           add
       ],
        (error, result)=>{
            if (error) reject(error)
			else resolve(result)
       })
   })
   .then((resp) =>{

             data.status = typeof resp == 'object' ? 1 : 0
			 if(typeof resp == 'object')
			 {
               data.body = resp
               data.message = "Ticket Payment Added Successfully .";
			 }
			 
			 if(typeof resp == 'string')
			 {
			   data.message = resp		
			 }
			   
			 res.json(data)

   })
   .catch((error) =>{
            data.message = error
            res.json(data);
   })

   function add(cb)
   {
      
      con.query(`INSERT INTO ticket_payment (
        ticket_payment_tickets,
        ticket_payment_license,
        ticket_payment_ticket_fee,
        ticket_payment_ticket_date,
        ticket_payment_ticket_discount,
        ticket_payment_ticket_balance,
        ticket_payment_payment_amount,
        ticket_payment_funded_by,
        ticket_payment_balance_on_ticket
          ) VALUES (?,?,?,?,?,?,?,?,?)`,[
            ticket_payment_tickets,
            ticket_payment_license,
            ticket_payment_ticket_fee,
            ticket_payment_ticket_date,
            ticket_payment_ticket_discount,
            ticket_payment_ticket_balance,
            ticket_payment_payment_amount,
            ticket_payment_funded_by,
            ticket_payment_balance_on_ticket] , (error,result) => {
        if (error) 
        {
           cb(error)
        }
        else
        {
            cb(null, result)
        }
      })

   }
}

function getTicketPayment(req,res,cb)
{
   
    let data = {
        status: 0,
        body: {},
        message: ""  
        }

     const getTicketPayment   = new Promise((resolve,reject)=>{
         
         async.waterfall([getList],(error,result)=>{
              if(error) reject(error)
              else resolve(result)
         })
         
         
     })
     .then((resp)=>{

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
     .catch((error)=>{
        data.message = error
        res.json(data);
     }) 


     function getList(cb)
     {
         con.query(`SELECT 
         ticket_payment_id,
         ticket_payment_tickets,
         ticket_payment_license,
         ticket_payment_ticket_fee,
         ticket_payment_ticket_date,
         ticket_payment_ticket_discount,
         ticket_payment_ticket_balance,
         ticket_payment_payment_amount,
         ticket_payment_funded_by,
         ticket_payment_balance_on_ticket FROM ticket_payment`,(err,result)=>{
             if(err) cb(err)
             else
             {
                 if(result.length > 0)
                 {
                   cb(null,result)
                 }
                 else
                 {
                   cb(null,"Sorry List Not Found")
                 }
             }
         })
     }

}


function getTicketPaymentDetails(req,res,cb)
{
   const {  ticket_payment_id } = req.params;
   let data = {
    status: 0,
    body: {},
    message: ""  
    }

    const getVehicleDetails = new Promise((resolve,reject) =>{
          async.waterfall([getDetails],(error,result)=>{
              if(error) reject(error)
              else resolve(result)
          })
    })
    .then((resp)=>{
            data.status = typeof resp == 'object' ? 1 : 0
            if(typeof resp == 'object')
            {
            data.body = resp[0]
            }
            
            if(typeof resp == 'string')
            {
            data.message = resp		
            }
            
            res.json(data)
    })
    .catch((error)=>{
        data.message = error
        res.json(data);
    })


    function getDetails(cb)
    {
        con.query(`SELECT 
         ticket_payment_id,
         ticket_payment_tickets,
         ticket_payment_license,
         ticket_payment_ticket_fee,
         ticket_payment_ticket_date,
         ticket_payment_ticket_discount,
         ticket_payment_ticket_balance,
         ticket_payment_payment_amount,
         ticket_payment_funded_by,
         ticket_payment_balance_on_ticket
         FROM ticket_payment 
         WHERE ticket_payment_id=?`,[ticket_payment_id],(err,result)=>{
               if(err) cb(err)
               else
               {
                   if(result.length > 0)
                   {
                      cb(null,result);
                   }
                   else
                   {
                       cb(null,"Sorry Not A Valid Id")
                   }
               }
        })

    }

}


function updateTicketPayment(req,res,cb)
{

    let { 
        ticket_payment_id,
        ticket_payment_tickets,
        ticket_payment_license,
        ticket_payment_ticket_fee,
        ticket_payment_ticket_date,
        ticket_payment_ticket_discount,
        ticket_payment_ticket_balance,
        ticket_payment_payment_amount,
        ticket_payment_funded_by,
        ticket_payment_balance_on_ticket
     } = req.body;

    let data = {
         status: 0,
         body: {},
         message: ""  
         }

    const updateVehicle = new Promise((resolve,reject)=>{
         async.waterfall([checkId,updateData],(error,result)=>{
              if(error) reject(error)
              else resolve(result)
         })
    })
    .then((resp)=>{

        data.status = typeof resp == 'object' ? 1 : 0
        if(resp.affectedRows > 0)
        {
            data.message = "Payment Has Been Updated Successfully !";
        }
        else
        {
            data.message = resp;
        }
        
        res.json(data)
    })
    .catch((error)=>{
        data.message = error
        res.json(data);
    })     


    function checkId(cb)
    {

       var query = con.query(`SELECT ticket_payment_id,
       ticket_payment_tickets,
       ticket_payment_license,
       ticket_payment_ticket_fee,
       ticket_payment_ticket_date,
       ticket_payment_ticket_discount,
       ticket_payment_ticket_balance,
       ticket_payment_payment_amount,
       ticket_payment_funded_by,
       ticket_payment_balance_on_ticket
        FROM ticket_payment WHERE ticket_payment_id= ?`,[ticket_payment_id],(err,result)=>{
             // console.log(query.sql);
              if(err) cb(err)
              else cb(null,result)
        })

    }

    function updateData(result,cb)
    {
        //console.log(result);

        if(!!ticket_payment_tickets)
        {
            ticket_payment_tickets = ticket_payment_tickets;
        }
        else
        {
            ticket_payment_tickets = result[0].ticket_payment_tickets;
        }

        if(!!ticket_payment_license)
        {
            ticket_payment_license = ticket_payment_license;
        }
        else
        {
            ticket_payment_license = result[0].ticket_payment_license;
        }

        if(!!ticket_payment_ticket_fee)
        {
            ticket_payment_ticket_fee = ticket_payment_ticket_fee;
        }
        else
        {
            ticket_payment_ticket_fee = result[0].ticket_payment_ticket_fee;
        }

        if(!!ticket_payment_ticket_date)
        {
            ticket_payment_ticket_date = ticket_payment_ticket_date;
        }
        else
        {
            ticket_payment_ticket_date = result[0].ticket_payment_ticket_date;
        }

        if(!!ticket_payment_ticket_discount)
        {
            ticket_payment_ticket_discount = ticket_payment_ticket_discount;
        }
        else
        {
            ticket_payment_ticket_discount = result[0].ticket_payment_ticket_discount;
        }

        if(!!ticket_payment_ticket_balance)
        {
            ticket_payment_ticket_balance = ticket_payment_ticket_balance;
        }
        else
        {
            ticket_payment_ticket_balance = result[0].ticket_payment_ticket_balance;
        }

        if(!!ticket_payment_payment_amount)
        {
            ticket_payment_payment_amount = ticket_payment_payment_amount;
        }
        else
        {
            ticket_payment_payment_amount = result[0].ticket_payment_payment_amount;
        }

        if(!!ticket_payment_funded_by)
        {
            ticket_payment_funded_by = ticket_payment_funded_by;
        }
        else
        {
            ticket_payment_funded_by = result[0].ticket_payment_funded_by;
        }

        if(!!ticket_payment_balance_on_ticket)
        {
            ticket_payment_balance_on_ticket = ticket_payment_balance_on_ticket;
        }
        else
        {
            ticket_payment_balance_on_ticket = result[0].ticket_payment_balance_on_ticket;
        }
        


        if(result.length > 0)
        {
          con.query(`UPDATE ticket_payment
           SET ticket_payment_tickets=?,
           ticket_payment_license=?,
           ticket_payment_ticket_fee=?,
           ticket_payment_ticket_date=?,
           ticket_payment_ticket_discount=?,
           ticket_payment_ticket_balance= ?,
           ticket_payment_payment_amount= ?,
           ticket_payment_funded_by= ?,
           ticket_payment_balance_on_ticket=?
           WHERE ticket_payment_id=?`,[
            ticket_payment_tickets,
            ticket_payment_license,
            ticket_payment_ticket_fee,
            ticket_payment_ticket_date,
            ticket_payment_ticket_discount,
            ticket_payment_ticket_balance,
            ticket_payment_payment_amount,
            ticket_payment_funded_by,
            ticket_payment_balance_on_ticket,
            ticket_payment_id],(error,result)=>{
              if(error) cb(error)
              else cb(null,result);
          }) 
        }
        else
        {
            cb(null,"Sorry Not A Valid Id")
        }
    }
}

function deleteTicketPayment(req,res,cb)
{
    const { ticket_payment_id } = req.params;
    let data = {
        status: 0,
        body: {},
        message: ""  
        } 

    const deleteTicketPayment = new Promise((resolve,reject)=>{

           async.waterfall([deleteData],(error,result)=>{
               if(error) reject(error)
               else resolve(result)
           })

    }) 
    .then((resp)=>{

        data.status = typeof resp == 'object' ? 1 : 0
        if(resp.affectedRows > 0)
        {
            data.message = "Payment Has Been Deleted Successfully !";
        }
        else
        {
            data.message = resp;
        }
        
        res.json(data)

    })
    .catch((error)=>{

        data.message = error
        res.json(data);

    })

    function deleteData(cb)
    {
        con.query(`DELETE FROM ticket_payment WHERE ticket_payment_id=?`,[ticket_payment_id],(error,result)=>{
              if(error) cb(error)
              else cb(null,result)
        })
    }
}


function addParkingPayments(req,res,cb)
{
   let { parking_payment_license,
         parking_payment_customer_name,
         parking_payment_app_packages_available,
         parking_payment_min_to_add_to_account,
         parking_payment_parking_amount_paid,
         parking_payment_funds_by 
        } = req.body;
   let data = {
        status: 0,
        body: {},
        message: ""  
        }

   const addKiosk = new Promise((resolve,reject) =>{
       async.waterfall([
           add
       ],
        (error, result)=>{
            if (error) reject(error)
			else resolve(result)
       })
   })
   .then((resp) =>{

             data.status = typeof resp == 'object' ? 1 : 0
			 if(typeof resp == 'object')
			 {
               data.body = resp
               data.message = "Payment Added Successfully .";
			 }
			 
			 if(typeof resp == 'string')
			 {
			   data.message = resp		
			 }
			   
			 res.json(data)

   })
   .catch((error) =>{
            data.message = error
            res.json(data);
   })

   function add(cb)
   {
      
      con.query(`INSERT INTO parking_payment (
        parking_payment_license,
        parking_payment_customer_name,
        parking_payment_app_packages_available,
        parking_payment_min_to_add_to_account,
        parking_payment_parking_amount_paid,
        parking_payment_funds_by 
          ) VALUES (?,?,?,?,?,?)`,
          [
            parking_payment_license,
            parking_payment_customer_name,
            parking_payment_app_packages_available,
            parking_payment_min_to_add_to_account,
            parking_payment_parking_amount_paid,
            parking_payment_funds_by 
          ] , (error,result) => {
        if (error) 
        {
           cb(error)
        }
        else
        {
            cb(null, result)
        }
      })

   }
}

function getParkingPayment(req,res,cb)
{
   
    let data = {
        status: 0,
        body: {},
        message: ""  
        }

     const getParkingPaymentList   = new Promise((resolve,reject)=>{
         
         async.waterfall([getList],(error,result)=>{
              if(error) reject(error)
              else resolve(result)
         })
         
         
     })
     .then((resp)=>{

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
     .catch((error)=>{
        data.message = error
        res.json(data);
     }) 


     function getList(cb)
     {
         con.query(`SELECT 
         parking_payment_id,
         parking_payment_license,
         parking_payment_customer_name,
         parking_payment_app_packages_available,
         parking_payment_min_to_add_to_account,
         parking_payment_parking_amount_paid,
         parking_payment_funds_by  FROM parking_payment`,(err,result)=>{
             if(err) cb(err)
             else
             {
                 if(result.length > 0)
                 {
                   cb(null,result)
                 }
                 else
                 {
                   cb(null,"Sorry List Not Found")
                 }
             }
         })
     }

}

function getParkingPaymentDetails(req,res,cb)
{
   const {  parking_payment_id } = req.params;
   let data = {
    status: 0,
    body: {},
    message: ""  
    }

    const getParkingPaymentDetails = new Promise((resolve,reject) =>{
          async.waterfall([getDetails],(error,result)=>{
              if(error) reject(error)
              else resolve(result)
          })
    })
    .then((resp)=>{
            data.status = typeof resp == 'object' ? 1 : 0
            if(typeof resp == 'object')
            {
            data.body = resp[0]
            }
            
            if(typeof resp == 'string')
            {
            data.message = resp		
            }
            
            res.json(data)
    })
    .catch((error)=>{
        data.message = error
        res.json(data);
    })


    function getDetails(cb)
    {
        con.query(`SELECT 
        parking_payment_id,
        parking_payment_license,
        parking_payment_customer_name,
        parking_payment_app_packages_available,
        parking_payment_min_to_add_to_account,
        parking_payment_parking_amount_paid,
        parking_payment_funds_by  FROM parking_payment WHERE parking_payment_id=?`,[parking_payment_id],(err,result)=>{
               if(err) cb(err)
               else
               {
                   if(result.length > 0)
                   {
                      cb(null,result);
                   }
                   else
                   {
                       cb(null,"Sorry Not A Valid Id")
                   }
               }
        })

    }

}

function updateParkingPayment(req,res,cb)
{

    let {  
        parking_payment_id,
        parking_payment_license,
        parking_payment_customer_name,
        parking_payment_app_packages_available,
        parking_payment_min_to_add_to_account,
        parking_payment_parking_amount_paid,
        parking_payment_funds_by  
    } = req.body;

    let data = {
         status: 0,
         body: {},
         message: ""  
         }

    const updateParkingPayment = new Promise((resolve,reject)=>{
         async.waterfall([checkId,updateData],(error,result)=>{
              if(error) reject(error)
              else resolve(result)
         })
    })
    .then((resp)=>{

        data.status = typeof resp == 'object' ? 1 : 0
        if(resp.affectedRows > 0)
        {
            data.message = "Payment Has Been Updated Successfully !";
        }
        else
        {
            data.message = resp;
        }
        
        res.json(data)
    })
    .catch((error)=>{
        data.message = error
        res.json(data);
    })     


    function checkId(cb)
    {

       var query = con.query(`SELECT 
        parking_payment_id,
        parking_payment_license,
        parking_payment_customer_name,
        parking_payment_app_packages_available,
        parking_payment_min_to_add_to_account,
        parking_payment_parking_amount_paid,
        parking_payment_funds_by
        FROM parking_payment WHERE parking_payment_id=?`,[parking_payment_id],(err,result)=>{
             // console.log(query.sql);
              if(err) cb(err)
              else cb(null,result)
        })

    }

    function updateData(result,cb)
    {
        //console.log(result);

        if(!!parking_payment_license)
        {
            parking_payment_license = parking_payment_license;
        }
        else
        {
            parking_payment_license = result[0].parking_payment_license;
        }

        if(!!parking_payment_customer_name)
        {
            parking_payment_customer_name = parking_payment_customer_name;
        }
        else
        {
            parking_payment_customer_name = result[0].parking_payment_customer_name;
        }

        if(!!parking_payment_app_packages_available)
        {
            parking_payment_app_packages_available = parking_payment_app_packages_available;
        }
        else
        {
            parking_payment_app_packages_available = result[0].parking_payment_app_packages_available;
        }

        if(!!parking_payment_min_to_add_to_account)
        {
            parking_payment_min_to_add_to_account = parking_payment_min_to_add_to_account;
        }
        else
        {
            parking_payment_min_to_add_to_account = result[0].parking_payment_min_to_add_to_account;
        }

        if(!!parking_payment_parking_amount_paid)
        {
            parking_payment_parking_amount_paid = parking_payment_parking_amount_paid;
        }
        else
        {
            parking_payment_parking_amount_paid = result[0].parking_payment_parking_amount_paid;
        }

        if(!!parking_payment_funds_by)
        {
            parking_payment_funds_by = parking_payment_funds_by;
        }
        else
        {
            parking_payment_funds_by = result[0].parking_payment_funds_by;
        }

        

        if(result.length > 0)
        {
          con.query(`UPDATE parking_payment SET
          parking_payment_license=?,
          parking_payment_customer_name=?,
          parking_payment_app_packages_available=?,
          parking_payment_min_to_add_to_account=?,
          parking_payment_parking_amount_paid =?,
          parking_payment_funds_by = ? 
           WHERE parking_payment_id=?`,[
            parking_payment_license,
            parking_payment_customer_name,
            parking_payment_app_packages_available,
            parking_payment_min_to_add_to_account,
            parking_payment_parking_amount_paid,
            parking_payment_funds_by,
            parking_payment_id],(error,result)=>{
              if(error) cb(error)
              else cb(null,result);
          }) 
        }
        else
        {
            cb(null,"Sorry Not A Valid Id")
        }
    }
}

function deleteParkingPayment(req,res,cb)
{
    const { parking_payment_id } = req.params;
    let data = {
        status: 0,
        body: {},
        message: ""  
        } 

    const deleteVehicle = new Promise((resolve,reject)=>{

           async.waterfall([deleteData],(error,result)=>{
               if(error) reject(error)
               else resolve(result)
           })

    }) 
    .then((resp)=>{

        data.status = typeof resp == 'object' ? 1 : 0
        if(resp.affectedRows > 0)
        {
            data.message = "Payment Has Been Deleted Successfully !";
        }
        else
        {
            data.message = resp;
        }
        
        res.json(data)

    })
    .catch((error)=>{

        data.message = error
        res.json(data);

    })

    function deleteData(cb)
    {
        con.query(`DELETE FROM parking_payment WHERE parking_payment_id=?`,[parking_payment_id],(error,result)=>{
              if(error) cb(error)
              else cb(null,result)
        })
    }
}