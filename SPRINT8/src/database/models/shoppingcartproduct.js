
module.exports = (sequelize, dataTypes) => {
    let alias = 'shoppingcartproduct'; // esto debería estar en singular
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        qty: dataTypes.BIGINT(10),
        products_id: dataTypes.BIGINT(10),
        shoppingCart_id: dataTypes.BIGINT(10)
    };
    let config = {
        timestamps: false,
    }
    const shoppingcartproduct = sequelize.define(alias,cols,config);

      //Aquí debes realizar lo necesario para crear las relaciones con el modelo 
     shoppingcartproduct.associate = models =>{
         shoppingcartproduct.belongsTo(
            models.product,
            {
                as: 'cartProducts',
                foreignKey:'products_id',
              //  targetKey: 'products_id'
        }); 
        shoppingcartproduct.belongsTo(
        models.shoppingcart,
        {
            as: 'cartId',
            foreignKey:'shoppingCart_id'
        }); 

    }


    return shoppingcartproduct;
};