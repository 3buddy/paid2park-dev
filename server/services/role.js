const Promise          = require("promise");
const async            = require("async");
const _                = require("lodash");
const moment           = require("moment");
const underScore       = require("underscore");

exports.addRole           =  addRole;
exports.editRole          =  editRole;
exports.getRoleList       =  getRoleList;
exports.getRoleDetails    =  getRoleDetails;




function addRole(req,res,cb)
{

    const { role_name , role_permission } = req.body;
    let response = {
		status: 0,
		body: {},
		message: ""  
      }  
	  
	  
	    var now = moment.utc().format();

		const createrole = new Promise((resolve, reject) => {
			con.query(`
			INSERT INTO role (role_name , role_permission , role_createdby , role_modifiedby) VALUES (?,?,?,?)
			`, [role_name,JSON.stringify(role_permission),now,now], (err, result) => {
				if (err) reject(err)
				else {
					resolve(result);
				}
			  })
		  })
			.then((data) => {
			  response.status = typeof data == 'object' ? 1 : 0;
			  if(data.insertId)
			  {
				response.message = "Role Has Been Created Successfully !";
			  }
			  
			  res.json(response)
			})
			.catch((error) => {
			  response.message = "Not Able to Create The Role : Error " + error;	
			  res.json(response)
			})
	
  
}


function editRole(req,res,cb)
{
   
    const { role_id , role_name , role_permission } = req.body;
    let response = {
		status: 0,
		body: {},
		message: ""  
      }  
	  
	  
	    var now = moment.utc().format();

		const editRole = new Promise((resolve, reject) => {
			con.query(`
			UPDATE role SET role_name = ? , role_permission = ? , role_modifiedby = ? WHERE role_id = ?
			`, [role_name,JSON.stringify(role_permission),now,role_id], (err, result) => {
				if (err) reject(err)
				else {
					resolve(result);
				}
			  })
		  })
			.then((data) => {
               // console.log(data)
			  response.status = typeof data == 'object' ? 1 : 0;
			  if(data.affectedRows > 0)
			  {
				response.message = "Role Has Been Updated Successfully !";
			  }
			  
			  res.json(response)
			})
			.catch((error) => {
			  response.message = "Not Able to update The Role : Error " + error;	
			  res.json(response)
			})

}


function getRoleList(req,res,cb)
{
  
    let response = {
		status: 0,
		body: {},
		message: ""  
      }  

    const getRolelist = new Promise((resolve, reject) => {

        con.query(`
             SELECT role_id , role_name , role_createdby , role_modifiedby  FROM role
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
          response.message = "Sorry Role List Not Found";
      }


       res.json(response)
      })
       .catch((error) => {
         response.message = "Not Able To Get The Role List : Error " + error;	
         res.json(response)
      })



}

function getRoleDetails(req,res,cb)
{
    const { roleId } = req.params;
    let response = {
        status: 0,
        body: {},
        message: ""  
      }  


      const getRoleDetails = new Promise((resolve, reject) => {

        con.query(`
        SELECT role_id , role_name , role_permission , role_createdby , role_modifiedby  FROM role WHERE role_id =? `,[roleId],  (err, result) => {
                if (err) reject(err)
                else 
                {
                    if(result.length > 0)
                    {
                        let roleDataObject = {
                            role_id : result[0].role_id,
                            role_name : result[0].role_name,
                            role_permission : JSON.parse(result[0].role_permission),
                            role_createdby : result[0].role_createdby,
                            role_modifiedby : result[0].role_modifiedby
                        }
                        resolve(roleDataObject);
                    }
                    else
                    {
                        resolve(result);
                    }
                }
              })
        
      })
      .then((data) => {
          //console.log(data);
          //console.log(typeof(data))

          if(_.isEmpty(data))
          {
            response.message = "Sorry Role List Not Found";
          }
          else
          {
            response.status = typeof data == 'object' ? 1 : 0;
            response.body = data;
          }

       res.json(response)
      })
       .catch((error) => {
         response.message = "Not Able To Get The Role List : Error " + error;	
         res.json(response)
      })

}