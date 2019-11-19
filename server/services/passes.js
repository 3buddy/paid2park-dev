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


exports.addPasses           = addPasses;
exports.getPassesList       = getPassesList;
exports.getPassesDetails    = getPassesDetails;
exports.updatePasses        = updatePasses;
exports.deletePasses        = deletePasses;



function addPasses(req,res,cb)
{
   let { 
    passes_license,
    passes_customers_name,
    passes_package,
    passes_price,
    passes_amount_paid,
    passes_funds_by,
    passes_reason,
    passes_start_date,
    passes_end_date
     } = req.body;

   let data = {
        status: 0,
        body: {},
        message: ""  
        }

   const addPasses = new Promise((resolve,reject) =>{
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
               data.message = "Passes Added Successfully .";
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
      con.query(`INSERT INTO passes (
        passes_license,
        passes_customers_name,
        passes_package,
        passes_price,
        passes_amount_paid,
        passes_funds_by,
        passes_reason,
        passes_start_date,
        passes_end_date
          ) VALUES (?,?,?,?,?,?,?,?,?)`,[
            passes_license,
            passes_customers_name,
            passes_package,
            passes_price,
            passes_amount_paid,
            passes_funds_by,
            passes_reason,
            passes_start_date,
            passes_end_date] , (error,result) => {
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

function getPassesList(req,res,cb)
{
   
    let data = {
        status: 0,
        body: {},
        message: ""  
        }

     const getPassesList   = new Promise((resolve,reject)=>{
         
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
         passes_id,
         passes_license,
         passes_customers_name,
         passes_package,
         passes_price,
         passes_amount_paid,
         passes_funds_by,
         passes_reason,
         passes_start_date,
         passes_end_date FROM passes`,(err,result)=>{
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

function getPassesDetails(req,res,cb)
{
   const {  passes_id } = req.params;
   let data = {
    status: 0,
    body: {},
    message: ""  
    }

    const getPassesDetails = new Promise((resolve,reject) =>{
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
         passes_id,
         passes_license,
         passes_customers_name,
         passes_package,
         passes_price,
         passes_amount_paid,
         passes_funds_by,
         passes_reason,
         passes_start_date,
         passes_end_date FROM passes WHERE passes_id=?`,[passes_id],(err,result)=>{
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

function updatePasses(req,res,cb)
{

    let { 
        passes_id,
        passes_license,
        passes_customers_name,
        passes_package,
        passes_price,
        passes_amount_paid,
        passes_funds_by,
        passes_reason,
        passes_start_date,
        passes_end_date 
    } = req.body;

    let data = {
         status: 0,
         body: {},
         message: ""  
         }

    const updatePasses = new Promise((resolve,reject)=>{
         async.waterfall([checkId,updateData],(error,result)=>{
              if(error) reject(error)
              else resolve(result)
         })
    })
    .then((resp)=>{

        data.status = typeof resp == 'object' ? 1 : 0
        if(resp.affectedRows > 0)
        {
            data.message = "Passes Has Been Updated Successfully !";
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
       passes_id,
       passes_license,
       passes_customers_name,
       passes_package,
       passes_price,
       passes_amount_paid,
       passes_funds_by,
       passes_reason,
       passes_start_date,
       passes_end_date FROM passes WHERE passes_id=?`,[passes_id],(err,result)=>{
             // console.log(query.sql);
              if(err) cb(err)
              else cb(null,result)
        })

    }

    function updateData(result,cb)
    {
        //console.log(result);

        if(!!passes_license)
        {
            passes_license = passes_license;
        }
        else
        {
            passes_license = result[0].passes_license;
        }

        if(!!passes_customers_name)
        {
            passes_customers_name = passes_customers_name;
        }
        else
        {
            passes_customers_name = result[0].passes_customers_name;
        }

        if(!!passes_package)
        {
            passes_package = passes_package;
        }
        else
        {
            passes_package = result[0].passes_package;
        }

        if(!!passes_price)
        {
            passes_price = passes_price;
        }
        else
        {
            passes_price = result[0].passes_price;
        }

        if(!!passes_amount_paid)
        {
            passes_amount_paid = passes_amount_paid;
        }
        else
        {
            passes_amount_paid = result[0].passes_amount_paid;
        }

        if(!!passes_funds_by)
        {
            passes_funds_by = passes_funds_by;
        }
        else
        {
            passes_funds_by = result[0].passes_funds_by;
        }

        if(!!passes_reason)
        {
            passes_reason = passes_reason;
        }
        else
        {
            passes_reason = result[0].passes_reason;
        }

        if(!!passes_start_date)
        {
            passes_start_date = passes_start_date;
        }
        else
        {
            passes_start_date = result[0].passes_start_date;
        }

        if(!!passes_end_date)
        {
            passes_end_date = passes_end_date;
        }
        else
        {
            passes_end_date = result[0].passes_end_date;
        }

        

        if(result.length > 0)
        {
          con.query(`UPDATE 
          passes SET 
          passes_license=?,
          passes_customers_name=?,
          passes_package=?,
          passes_price=?,
          passes_amount_paid =?,
          passes_funds_by = ?,
          passes_reason = ?,
          passes_start_date = ?,
          passes_end_date = ? 
          WHERE passes_id=?`,[
            passes_license,
            passes_customers_name,
            passes_package,
            passes_price,
            passes_amount_paid,
            passes_funds_by,
            passes_reason,
            passes_start_date,
            passes_end_date,
            passes_id],(error,result)=>{
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

function deletePasses(req,res,cb)
{
    const { passes_id } = req.params;
    let data = {
        status: 0,
        body: {},
        message: ""  
        } 

    const deletePasses = new Promise((resolve,reject)=>{

           async.waterfall([deleteData],(error,result)=>{
               if(error) reject(error)
               else resolve(result)
           })

    }) 
    .then((resp)=>{

        data.status = typeof resp == 'object' ? 1 : 0
        if(resp.affectedRows > 0)
        {
            data.message = "Passes Has Been Deleted Successfully !";
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
        con.query(`DELETE FROM passes WHERE passes_id=?`,[passes_id],(error,result)=>{
              if(error) cb(error)
              else cb(null,result)
        })
    }
}