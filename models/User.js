const { DataTypes } = require('sequelize')
const sequelize = require('../config/db.config.js')

const User = sequelize.define(
    "User", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: "id"
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
            field: "name"
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            field: "email"
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "password"
        },
        isVerified: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            field: "is_verified"
        },
        role: {
            type: DataTypes.ENUM('owner', 'groomer', 'admin'),
            allowNull: false,
            field: "role"
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
        tableName: "users",
        timestamps: false,
        defaultScope: {
            attributes: {
                exclude: ['password'] // Exclude password by default
            }
        }
    }
)

module.exports = User