const { Sequelize, DataTypes, Model } = require('sequelize')
const sequelize = require('../utils/dbConn')

class Users extends Model {}

Users.init(
	{
		uuid: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		username: {
			type: DataTypes.STRING(255),
			allowNull: false,
			unique: true,
		},
		email: {
			type: DataTypes.STRING(255),
			allowNull: false,
			unique: true,
		},
		password: {
			type: DataTypes.STRING(255),
			allowNull: false,
		},
	},
	{
		sequelize,
		modelName: "users",
		freezeTableName: true,
		createdAt: true,
		updatedAt: true,
	}
);

module.exports = Users;