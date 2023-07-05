const { DataTypes } = require("sequelize")
const sequelize = require("../config/db.config.js")

const Review = sequelize.define(
    "Reviews",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: "id"
        },
        rating: {
            type: DataTypes.INTEGER,
            validate: {
                max: 5,
                min: 1
            },
            allowNull: false,
            field: "rating"
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "title"
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
            field: "description"
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
        tableName: "reviews",
        timestamps: false
    }
)

module.exports = Review