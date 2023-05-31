'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class rolesUserActivities extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  rolesUserActivities.init({
    roleId: DataTypes.INTEGER,
    userActivityId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'rolesUserActivities',
  });
  return rolesUserActivities;
};