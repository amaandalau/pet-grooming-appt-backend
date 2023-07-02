const { DataTypes } = require("sequelize")
const sequelize = require("../config/db.config.js")

const Appointment = sequelize.define(
    "Appointments", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: "id"
        },
        apptDate: {
            type: DataTypes.DATE,
            allowNull: false,
            field: "appt_date"
        },
        specialInstructions: {
            type: DataTypes.STRING,
            allowNull: true,
            field: "special_instructions"
        }, 
        status: {
            type: DataTypes.ENUM('pending', 'confirmed', 'in-progress', 'completed', 'cancelled'),
            allowNull: false,
            defaultValue: "pending",
            field: "status"
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
        petID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "pets",
                key: "id"
            },
            field: "pet_id"
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
        timeslotID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "timeslots",
                key: "id"
            },
            field: "timeslot_id"
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
        tableName: "appointments",
        timestamps: false
    }
)

module.exports = Appointment