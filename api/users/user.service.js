const pool = require("../../config/database")
console.log("pool calling from user service file",pool);


module.exports ={
    create:(data,callback)=>{
        pool.query(
            `insert into registration(pass,emailId,name)
            values(?,?,?)`,
            [
                data.pass,
                data.emailId,
                data.name
            ],
            (error,result,fields)=>{

                if(error) {
                  return  callback(error)
                }
              return  callback(null,result)
            }
        )
    }
    ,
    getUsers:(callback)=>{
        pool.query(
            `select * from registration`,
            [],
            (error,result,fields)=>{
                if(error) {
                 return  callback(error)
                }
                return callback(null,result)
            }
        )
    },
    getUsersById:(id,callback)=>{
        pool.query(
            `select * from registration where id=?`,
            [id],
            (error,result,fields)=>{
                if(error) {
                 return  callback(error)
                }
                return callback(null,result[0])
            }
        )
    },

    updateUsers:(data,callback)=>{
       
        pool.query(
             `update registration set pass = '${data.pass}', emailId = '${data.emailId}', name = '${data.name}' where id = ${data.id} `,
          
            (error,result,fields)=>{
                if(error) {
                 return   callback(error)
                }
                return  callback(null,result)
            }
        )
    },

    deleteUsers:(data,callback)=>{
        pool.query(
            `delete from registration where id=?`,
        [data.id],
        (error,result,fields)=>{
            if(error) {
                return callback(error)
            }
            return callback(null,result[0])
        }
        )
    },
    getUserByEmail:(data,callback)=>{
        pool.query(
            'select * from registration where emailId=?',
            [data],
            (error,result,fields)=>{
                if(error) {
                    return callback(error)
                }
                else{
                    return callback(null,result[0])
                }
            }
        )
    }
}