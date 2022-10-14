

module.exports = (sequelize, dataTypes) => {
    let alias = 'product'; // esto debería estar en singular
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        price: {
            type: dataTypes.DECIMAL(3, 1).UNSIGNED,
            allowNull: false
        },
        discount: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            allowNull: false
        },
        offer: {
            type: dataTypes.STRING(2),
            allowNull: false
        },
        stock: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            allowNull: false
        },
        description: {
            type: dataTypes.TEXT,
            allowNull: false
        },
        image: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        brand_id: dataTypes.BIGINT(10),
        category_id: dataTypes.BIGINT(10)
    };
    let config = {
        timestamps: false,
    }
    const product = sequelize.define(alias,cols,config);

     //Aquí debes realizar lo necesario para crear las relaciones con el modelo 
     product.associate = models =>{
        product.belongsTo(
        models.brand,
        {
            as: 'product_brand',
            foreignKey:'brand_id'
        });
        product.belongsTo(
            models.category,
            {
                as: 'product_category',
                foreignKey:'category_id'
        });
    };


    return product;
};