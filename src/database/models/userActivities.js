'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class rolepermission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  rolepermission.init({
    roleId: DataTypes.INTEGER,
    permissionId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'userActivities',
  });
  return rolepermission;
};