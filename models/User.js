module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        name: {
           type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        role: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        borrowed: {
            type: DataTypes.ARRAY(DataTypes.STRING)
        },
        debts: {
            type: DataTypes.ARRAY(DataTypes.STRING)
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE
          },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE
        }
    });
    return User;
}