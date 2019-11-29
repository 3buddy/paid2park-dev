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


exports.addKiosk           = addKiosk;
exports.getKioskList       = getKioskList;
exports.getKioskDetails    = getKioskDetails;
exports.updateKiosk        = updateKiosk;
exports.deleteKiosk        = deleteKiosk;


function addKiosk(req,res,cb)
{
   let { 
       kiosks_number,
       kiosks_mac_address,
       kiosks_guid,
       kiosks_password,
       kiosks_location_address,
       kiosks_city,
       kiosks_network_login,
       kiosks_network_password,
       kiosks_status } = req.body;
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
               data.message = "Kiosk Added Successfully .";
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
      kiosks_password = bcrypt.hashSync(kiosks_password, saltRounds);
      kiosks_network_password = bcrypt.hashSync(kiosks_network_password, saltRounds);
      con.query(`INSERT INTO kiosk (
          kiosks_number,
          kiosks_mac_address,
          kiosks_guid,
          kiosks_password,
          kiosks_location_address,
          kiosks_city,
          kiosks_network_login,
          kiosks_network_password,
          kiosks_status) VALUES (?,?,?,?,?,?,?,?,?)`,[
              kiosks_number,
              kiosks_mac_address,
              kiosks_guid,
              kiosks_password,
              kiosks_location_address,
              kiosks_city,
              kiosks_network_login,
              kiosks_network_password,
              kiosks_status
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

function getKioskList(req,res,cb)
{
   
    let data = {
        status: 0,
        body: {},
        message: ""  
        }

     const getKioskList   = new Promise((resolve,reject)=>{
         
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
         kiosk_Id,
         kiosks_number,
         kiosks_mac_address,
         kiosks_guid,
         kiosks_password,
         kiosks_location_address,
         kiosks_city,
         kiosks_network_login,
         kiosks_network_password,
         kiosks_status FROM kiosk`,(err,result)=>{
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

function getKioskDetails(req,res,cb)
{
   const {  kioskId } = req.params;
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
        kiosk_Id,
        kiosks_number,
        kiosks_mac_address,
        kiosks_guid,
        kiosks_location_address,
        kiosks_city,
        kiosks_network_login,
        kiosks_status FROM kiosk WHERE kiosk_Id=?`,[kioskId],(err,result)=>{
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

function updateKiosk(req,res,cb)
{

    let { 
        kiosk_Id,
        kiosks_number,
        kiosks_mac_address,
        kiosks_guid,
        kiosks_password,
        kiosks_location_address,
        kiosks_city,
        kiosks_network_login,
        kiosks_network_password,
        kiosks_status
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
            data.message = "Kiosk Has Been Updated Successfully !";
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
       kiosk_Id,
       kiosks_number,
       kiosks_mac_address,
       kiosks_guid,
       kiosks_password,
       kiosks_location_address,
       kiosks_city,
       kiosks_network_login,
       kiosks_network_password,kiosks_status
       FROM kiosk WHERE kiosk_Id=?`,[kiosk_Id],(err,result)=>{
             // console.log(query.sql);
              if(err) cb(err)
              else cb(null,result)
        })

    }

    function updateData(result,cb)
    {
        //console.log(result);

        if(!!kiosks_number)
        {
            kiosks_number = kiosks_number;
        }
        else
        {
            kiosks_number = result[0].kiosks_number;
        }

        if(!!kiosks_mac_address)
        {
            kiosks_mac_address = kiosks_mac_address;
        }
        else
        {
            kiosks_mac_address = result[0].kiosks_mac_address;
        }

        if(!!kiosks_guid)
        {
            kiosks_guid = kiosks_guid;
        }
        else
        {
            kiosks_guid = result[0].kiosks_guid;
        }

        if(!!kiosks_password)
        {
            kiosks_password = bcrypt.hashSync(kiosks_password, saltRounds);
        }
        else
        {
            kiosks_password = result[0].kiosks_password;
        }

        if(!!kiosks_location_address)
        {
            kiosks_location_address = kiosks_location_address;
        }
        else
        {
            kiosks_location_address = result[0].kiosks_location_address;
        }

        if(!!kiosks_city)
        {
            kiosks_city = kiosks_city;
        }
        else
        {
            kiosks_city = result[0].kiosks_city;
        }

        if(!!kiosks_network_login)
        {
            kiosks_network_login = kiosks_network_login;
        }
        else
        {
            kiosks_network_login = result[0].kiosks_network_login;
        }

        if(!!kiosks_network_password)
        {
            kiosks_network_password = bcrypt.hashSync(kiosks_network_password, saltRounds);
        }
        else
        {
            kiosks_network_password = result[0].kiosks_network_password;
        }

        if (!!kiosks_status) {
            kiosks_status = kiosks_status;
        } else {
            kiosks_status = result[0].kiosks_status
        }


        if(result.length > 0)
        {
          con.query(`UPDATE kiosk SET 
          kiosks_number=?,
          kiosks_mac_address=?,
          kiosks_guid=?,
          kiosks_password=?,
          kiosks_location_address=?,
          kiosks_city=?,
          kiosks_network_login=?,
          kiosks_network_password=?,
          kiosks_status=?
          WHERE kiosk_Id=?`,
          [
            kiosks_number,
            kiosks_mac_address,
            kiosks_guid,
            kiosks_password,
            kiosks_location_address,
            kiosks_city,
            kiosks_network_login,
            kiosks_network_password,
            kiosks_status,
            kiosk_Id
        ],(error,result)=>{
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

function deleteKiosk(req,res,cb)
{
    const { kioskId } = req.params;
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
            data.message = "Kiosk Has Been Deleted Successfully !";
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
        con.query(`DELETE FROM kiosk WHERE kiosk_Id=?`,[kioskId],(error,result)=>{
              if(error) cb(error)
              else cb(null,result)
        })
    }
}