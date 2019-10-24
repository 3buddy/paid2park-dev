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

exports.addVehicle          =  addVehicle;
exports.getVehicleList      =  getVehicleList;
exports.getVehicleDetails   =  getVehicleDetails;
exports.updateVehicle       =  updateVehicle;
exports.deleteVehicle       =  deleteVehicle;


function addVehicle(req,res,cb)
{
   const { customer_id , license , make , model , color } = req.body;
   let data = {
        status: 0,
        body: {},
        message: ""  
        }

   const addVehicle = new Promise((resolve,reject) =>{
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
               data.message = "Vehicle Added Successfully .";
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

      con.query(`INSERT INTO customer_vehicle (customer_id,license,make,model,color) VALUES (?,?,?,?,?)`,[customer_id,license,make,model,color] , (error,result) => {
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

function getVehicleList(req,res,cb)
{
   
    let data = {
        status: 0,
        body: {},
        message: ""  
        }

     const vehicleList   = new Promise((resolve,reject)=>{
         
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
         con.query(`SELECT customer_vehicle_id,customer_id,license,make,model,color FROM customer_vehicle`,(err,result)=>{
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

function getVehicleDetails(req,res,cb)
{
   const {  vehicleId } = req.params;
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


    function getDetails(cb)
    {
        con.query(`SELECT customer_vehicle_id,customer_id,license,make,model,color FROM customer_vehicle WHERE customer_vehicle_id=?`,[vehicleId],(err,result)=>{
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

function updateVehicle(req,res,cb)
{
    let { vehicleId , license , make , model , color } = req.body;
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


    function checkId(cb)
    {
        
        con.query(`SELECT customer_vehicle_id,customer_id,license,make,model,color FROM customer_vehicle WHERE customer_vehicle_id=?`,[vehicleId],(err,result)=>{
              if(err) cb(err)
              else cb(null,result)
        })

    }

    function updateData(result,cb)
    {
        if(!!license)
        {
            license = license;
        }
        else
        {
            license = result[0].license;
        }

        if(!!make)
        {
            make = make;
        }
        else
        {
            make = result[0].make;
        }

        if(!!model)
        {
            model = model;
        }
        else
        {
            model = result[0].model;
        }

        if(!!color)
        {
            color = color;
        }
        else
        {
            color = result[0].color;
        }

        if(result.length > 0)
        {
          con.query(`UPDATE customer_vehicle SET license=?,make=?,model=?,color=? WHERE customer_vehicle_id=?`,[license , make , model , color,vehicleId],(error,result)=>{
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

function deleteVehicle(req,res,cb)
{
    const { vehicleId } = req.params;
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

    function deleteData(cb)
    {
        con.query(`DELETE FROM customer_vehicle WHERE customer_vehicle_id=?`,[vehicleId],(error,result)=>{
              if(error) cb(error)
              else cb(null,result)
        })
    }
}