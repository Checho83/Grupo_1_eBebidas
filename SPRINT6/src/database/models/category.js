
module.exports = (sequelize, dataTypes) => {
    let alias = 'category'; // esto debería estar en singular
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

    const category = sequelize.define(alias,cols,config);

     category.associate = models =>{
        category.hasMany(
        models.product,
        {
            as: 'product_category',
            foreignKey:'category_id'
        });
        
    };

    return category;
};