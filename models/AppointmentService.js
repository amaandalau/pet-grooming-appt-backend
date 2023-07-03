const { DataTypes } = require("sequelize")
const sequelize = require("../config/db.config.js")

const ApptService = sequelize.define(
    "AppointmentServices", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: "id"
        },
        apptID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "appointments",
                key: "id"
            },
            field: "appt_id"
        }, 
        serviceID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "services",
                key: "id"
            },
            field: "service_id"
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
        tableName: "appt_services",
        timestamps: false
    }
)

module.exports = ApptService