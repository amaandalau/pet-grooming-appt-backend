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
        services: {
            type: DataTypes.ENUM(
                'Bath & Shampoo',
                'Cut & Style',
                'Nail Trimming',
                'Brush & De-Shed',
                'Ear Cleaning'),
            allowNull: false,
            field: "services"
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
        tableName: "appointment_services",
        timestamps: false
    }
)

module.exports = ApptService