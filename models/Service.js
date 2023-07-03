const { DataTypes } = require('sequelize')
const sequelize = require("../config/db.config.js")

const Service = sequelize.define(
    "Service", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            field: "id"
        },
        services: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "services"
        },
        groomerID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "users",
                key: "id"
            },
            field: "groomer_id"
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
        tableName: "services",
        timestamps: false
    }
)

module.exports = Service