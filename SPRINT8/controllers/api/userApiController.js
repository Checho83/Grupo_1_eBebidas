
const db = require('../../src/database/models');
//const sequelize = db.sequelize;
//const { Op } = require("sequelize");

const client = db.client;

const userApiController = {

    list:(req, res) =>{
      
      client.findAll({
        attributes: ['id','firstName' , 'lastName','email','avatar']
      })
      .then(clients => {
      //  console.log(req.rawHeaders[1]);
        clients.forEach(client => {
          //  console.log(client);
           client.dataValues.detail = 'http://' + req.rawHeaders[1] + '/api/users/'+ client.dataValues.id;
        });


        let answer = {
            meta: {
                status : 200,
                count: clients.length,
                url: 'http://' + req.rawHeaders[1] + '/api/users'
            },
            users: clients
        }
            res.json(answer);
        })
    },
    detail:(req, res) =>{

      let indexClient = req.params.id;

      client.findByPk(indexClient,{
        attributes: {
            exclude: ['pass']
         }
      })
      .then(client => {

        if (client == null){
            client = 'Cliente no registrado. Ver api/users para los clientes disponibles ';
        } else{
            client.dataValues.avatar = 'http://' + req.rawHeaders[1] + '/images/users/' 
            + client.dataValues.avatar;
        }

        let answer = {
            meta: {
                status: 200,
                count: 1,
                url: 'http://' + req.rawHeaders[1] + '/api/users/' + indexClient,
            },
            user: client
        }
        res.json(answer);
    });
      
    }

} 

module.exports = userApiController;

