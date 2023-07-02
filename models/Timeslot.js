const { DataTypes } = require("sequelize")
const sequelize = require("../config/db.config.js")

const Timeslot = sequelize.define(
    "Timeslots", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: "id"
        },
        slots: {
            type: DataTypes.DATE,
            allowNull: false,
            field: "slots"
        }, 
        status: {
            type: DataTypes.ENUM('Available', 'Not Available', 'Out-of-office'),
            allowNull: false,
            field: "status"
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
        tableName: "timeslots",
        timestamps: false
    }
)

module.exports = Timeslot