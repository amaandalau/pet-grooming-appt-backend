const { DataTypes } = require('sequelize')
const sequelize = require("../config/db.config.js")

const Pet = sequelize.define(
    "Pets", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: "id"
        }, 
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "name"
        }, 
        dateOfBirth: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            field: "date_of_birth"
        }, 
        species: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "species"
        },
        breed: {
            type: DataTypes.STRING,
            allowNull: true,
            field: "breed"
        },
        weightInKG: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            field: "weight_in_kg"
        },
        color: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "color"
        },
        ownerID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "users",
                key: "id"
            },
            field: "owner_id"
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: true,
            field: "created_at"
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true,
            field: "updated_at"
        }
    }, 
    {
        tableName: "pets",
        timestamps: false
    }
)

module.exports = Pet