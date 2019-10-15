let Promise = require('promise');
let async  = require('async');


exports.addBillingData = addBillingData;

function addBillingData(req,res,cb)
{

    let { Kiosk_Trans_Id, CC_Name, CC_Number, CC_Billing_Zip, CRV,
        Hours_Purchased, Price, License_Plate, State, Text_Or_Email, Cell, Cell_Carrier,
        Approval_Transaction_Id } = req.body;

    let response = {
        status: 0,
        body: {},
        message: ""
    }

    let addBillingData = new Promise((resolve,reject) =>{

      async.waterfall([
          insertBillingDetail,
          getDetails

      ], (err,resul) =>{
          if(err) reject(err);
          else resolve(resul);
      })

    }).then((data)=>{

        if(typeof data == "object")
        {
            response.status = 1;
            response.message = data;
        }
        res.json(response);
    }).catch((erro)=>{
        res.json(erro);
    })

    function insertBillingDetail(cb)
    {
        con.query('INSERT into kiosk (Kiosk_Trans_Id, CC_Name, CC_Number, CC_Billing_Zip, CRV,Hours_Purchased, Price, License_Plate, State, Text_Or_Email, Cell, Cell_Carrier,Approval_Transaction_Id) values(?,?,?,?,?,?,?,?,?,?,?,?,?)', [Kiosk_Trans_Id, CC_Name, CC_Number, CC_Billing_Zip, CRV,
            Hours_Purchased, Price, License_Plate, State, Text_Or_Email, Cell, Cell_Carrier,
            Approval_Transaction_Id],(erro,results)=>{

            if(erro) cb(erro);
            else cb(null, results);
        });
    }

    function getDetails(info,cb)
    {
        console.log(info.insertId);
        
            if(!!info.insertId)
            {
                con.query('SELECT * from kiosk where  Kiosk_Id =?',[info.insertId],(err,rest)=>{
                        if(err) cb(err);
                        else cb(null, rest);
                });
            }
    }
}