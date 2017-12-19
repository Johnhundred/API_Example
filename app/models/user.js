module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
  }, {
    indexes: [
      {
        unique: true,
        fields: ['id'],
      },
      {
        fields: ['email'],
      },
    ],
  });

  const { Op } = sequelize.Sequelize;

  // User.associate = (models) => {
  //   User.hasMany(models.Hat);
  // };

  User.getUserList = () => {
    try {
      return User.findAll({
        raw: true,
      })
        .catch((err) => {
          throw err;
        });
    } catch (err) {
      throw err;
    }
  };

  User.getUser = (id) => {
    try {
      return User.findOne({
        where: {
          id: { [Op.eq]: id },
        },
        raw: true,
      })
        .catch((err) => {
          throw err;
        });
    } catch (err) {
      throw err;
    }
  };

  User.createUser = (email) => {
    try {
      return User.create({
        email,
      })
        .catch((err) => {
          throw err;
        });
    } catch (err) {
      throw err;
    }
  };

  return User;
};
