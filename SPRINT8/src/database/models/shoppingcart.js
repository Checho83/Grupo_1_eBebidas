

module.exports = (sequelize, dataTypes) => {
    let alias = 'shoppingcart'; // esto debería estar en singular
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        items: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            allowNull: false,
        },
        totalPrice: {
            type: dataTypes.DECIMAL(8, 2).UNSIGNED,
            allowNull: false
        },
        client_id: dataTypes.BIGINT(10),
    };
    let config = {
        timestamps: false,
    }
    const shoppingcart = sequelize.define(alias,cols,config);

     //Aquí debes realizar lo necesario para crear las relaciones con el modelo 
       shoppingcart.associate = models =>{
        shoppingcart.belongsTo(
        models.client,
        {
            as: 'cart_client',
            foreignKey:'client_id'
        }); 
        }; 


    return shoppingcart;
};