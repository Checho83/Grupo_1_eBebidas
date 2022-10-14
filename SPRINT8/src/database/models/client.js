
module.exports = (sequelize, dataTypes) => {
    let alias = 'client'; // esto debería estar en singular
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        firstName: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        lastName: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        email: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        phone: {
            type: dataTypes.BIGINT(20).UNSIGNED,
            allowNull: false
        },
        address: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        birthdate: {
            type: dataTypes.DATEONLY,
            allowNull: false
        },
        city: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        province: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        cp:{
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false
        },
        pass: {
            type: dataTypes.STRING(200),
            allowNull: false
        },
        avatar: {
            type: dataTypes.STRING(50),
            allowNull: false
        }
    };
    let config = {
        timestamps: false
      /*   timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false */
    }
    const client = sequelize.define(alias,cols,config);


    return client;
};