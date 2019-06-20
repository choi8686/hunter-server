"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");

const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require("./users")(sequelize, Sequelize);
db.District = require("./district")(sequelize, Sequelize);
db.Team = require("./team")(sequelize, Sequelize);
db.Teamimage = require("./teamimage")(sequelize, Sequelize);
db.Like = require("./like")(sequelize, Sequelize);
db.Message = require("./message")(sequelize, Sequelize);
db.Match = require("./match")(sequelize, Sequelize);
db.Store = require("./store")(sequelize, Sequelize);

db.District.hasMany(db.Team, {
  foreignKey: "districtId",
  sourceKey: "id"
});
db.Team.belongsTo(db.District, {
  foreignKey: "districtId",
  targetKey: "id"
});

db.Store.hasMany(db.Team, {
  foreignKey: "storeId",
  sourceKey: "id"
});
db.Team.belongsTo(db.Store, {
  foreignKey: "storeId",
  targetKey: "id"
});

db.Team.hasMany(db.Teamimage, {
  foreignKey: "teamId",
  sourceKey: "id",
  onDelete: "cascade"
});
db.Teamimage.belongsTo(db.Team, {
  foreignKey: "teamId",
  targetKey: "id",
  onDelete: "cascade"
});

db.User.hasMany(db.Team, { foreignKey: "userId", onDelete: "cascade" });

db.Team.hasMany(db.Like, { foreignKey: "toLikeId", onDelete: "cascade" });
db.Like.belongsTo(db.Team, { foreignKey: "whoLikeId" });

db.Team.hasMany(db.Match, { foreignKey: "teamId", onDelete: "cascade" });
db.Match.belongsTo(db.Team);
module.exports = db;
