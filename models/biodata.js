const { Sequelize, DataTypes, Model } = require('sequelize')
const sequelize = require('../utils/dbConn')

class Biodata extends Model {}

Biodata.init(
	{
		uuid: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		age: {
			type: DataTypes.INTEGER(3),
		},
		city: {
			type: DataTypes.STRING(255),
		},
		user_uuid: {
			type: DataTypes.UUID,
			allowNull: false,
		},
	},
	{
		sequelize,
		modelName: "biodata",
		freezeTableName: true,
		createdAt: true,
		updatedAt: true,
	}
);

module.exports = Biodata;