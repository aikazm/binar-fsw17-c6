const Users = require('./users')
const Biodata = require('./biodata')
const History = require('./history')

Users.hasOne(Biodata, {
	foreignKey: "user_uuid",
	as: "biodata",
});

Biodata.belongsTo(Users, {
	foreignKey: "user_uuid",
	as: "users",
});

Users.hasOne(History, {
	foreignKey: "user_uuid",
	as: "history",
});

History.belongsTo(Users, {
	foreignKey: "user_uuid",
	as: "users",
});

module.exports = {
	Users,
	Biodata,
	History,
};
