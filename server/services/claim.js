const Promise = require("promise");
const async = require("async");
const _ = require("lodash");
const moment = require("moment");
const underScore = require("underscore");

exports.addClaim       =  addClaim;
exports.getClaim       =  getClaim;
exports.addClaimStates =  addClaimStates;

function addClaim(req,res,cb)
{
    const { claim_name } = req.body;
    let response = {
		status: 0,
		body: {},
		message: ""  
      }  
	  
	  
	var now = moment.utc().format();

		const createClaim = new Promise((resolve, reject) => {
			con.query(`
			INSERT INTO claim (claim_name , claim_createdby , claim_modifiedby) VALUES (?,?,?)
			`, [claim_name,now,now], (err, result) => {
				if (err) reject(err)
				else {
					resolve(result);
				}
			  })
		  })
			.then((data) => {
				//console.log(data)
			  response.status = typeof data == 'object' ? 1 : 0;
			  if(data.insertId)
			  {
				response.message = "Claim Has Been Created Successfully !";
			  }
			  
			  res.json(response)
			})
			.catch((error) => {
			  console.log(error)
			  response.message = "Error Loging"	
			  res.json(response)
			})
	
      

}

function getClaim(req,res,cb)
{
	let response = {
		status: 0,
		body: {},
		message: ""  
	  }  
	  
	let finalresult =
	{
		claim:'',
		claimStates:''
	}  

	  const getClaim = new Promise((resolve, reject) => {
		async.waterfall([
			getClaimResult,
			getClaimStatesResult,
			managetheresult
		  ], (error, result) => {
			if (error) reject(error)
			else resolve(result)
		  })
	  })
		.then((data) => {
		  response.status = typeof data == 'object' ? 1 : 0;
		  if(typeof data == 'object')
		  {
            response.body = data
		  }
		  
		  if(typeof data == 'string')
		  {
			response.message = data		
		  }
		  
		  res.json(response)
		})
		.catch((error) => {
		  console.log(error)
		  response.message = "Error Loging"	
		  res.json(response)
		})

		function getClaimResult(cb)
		{
			con.query(`
			SELECT * FROM claim`, (err, result) => {
				if (err) cb(err)
				else {
					finalresult.claim = result;
					cb(null,finalresult);
				}
			  })

		}

		function getClaimStatesResult(result,cb)
		{
			//console.log(result.claim.length);
			if(result.claim.length > 0)
			{
				con.query(`
				SELECT * FROM claim_states`, (err, claimStatesResult) => {
					if (err) cb(err)
					else {
						finalresult.claimStates = claimStatesResult;
						cb(null,finalresult);
					}
				  })
			}
			else
			{
				response.message = "Sorry Claim List Not Found !";
                cb(null,response);
			}

		}

		function managetheresult(result,cb)
		{
		   if(_.has(result,'message'))
		   { 
               cb(null,result);
		   }
		   else
		   {
			  let claimData = result.claim;
			  let claimStatesData = result.claimStates;
			  
			  resultData = [];
				_.forEach(claimData, function(value, key) {
					
					let resultDataObject = 
					 {
						claim_id : value.claim_id,
						claim_name : value.claim_name,
						claim_createdby : value.claim_createdby,
						claim_modifiedby : value.claim_modifiedby,
						claim_states: _.filter(claimStatesData, { 'claim_id': value.claim_id})
					 }
					resultData.push(resultDataObject);
				});

				cb(null,resultData);
		   }
		}

}

function addClaimStates(req,res,cb)
{
    const { claim_id , claim_states_name} = req.body;
    let response = {
		status: 0,
		body: {},
		message: ""  
      }  

		const createClaimState = new Promise((resolve, reject) => {
			con.query(`
			INSERT INTO claim_states (claim_id , claim_states_name) VALUES (?,?)
			`, [claim_id,claim_states_name], (err, result) => {
				if (err) reject(err)
				else {
					resolve(result);
				}
			  })
		  })
			.then((data) => {
				//console.log(data)
			  response.status = typeof data == 'object' ? 1 : 0;
			  if(data.insertId)
			  {
				response.message = "Claim States Has Been Created Successfully !";
			  }
			  
			  res.json(response)
			})
			.catch((error) => {
			  console.log(error)
			  response.message = "Error Loging"	
			  res.json(response)
			})
	
}