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
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE
          },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE
        }
    });

    User.associate = models => {
        User.hasMany(models.BorrowedBooks, {
            onDelete: "cascade"
        });
        User.hasMany(models.DebtBooks, {
            onDelete: "cascade"
        });
    };
    return User;
}