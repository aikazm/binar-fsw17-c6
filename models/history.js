const { Sequelize, DataTypes, Model } = require('sequelize')
const sequelize = require('../utils/dbConn')

class History extends Model {}

History.init(
	{
		uuid: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		win: DataTypes.INTEGER(4),
		lose: DataTypes.INTEGER(4),
		user_uuid: {
			type: DataTypes.UUID,
			allowNull: false,
		},
	},
	{
		sequelize,
		modelName: "history",
		freezeTableName: true,
		createdAt: true,
		updatedAt: true,
	}
);

module.exports = History;