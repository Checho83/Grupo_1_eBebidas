
module.exports = (sequelize, dataTypes) => {
    let alias = 'brand'; // esto debería estar en singular
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
        }
    };

    let config = {
        timestamps: false,
    }

    const brand = sequelize.define(alias,cols,config);

     brand.associate = models =>{
        brand.hasMany(
        models.product,
        {
            as: 'product_brand',
            foreignKey:'brand_id'
        });
        
    };

    return brand;
};