module.exports = (sequelize, DataTypes) => {
    const Rows = sequelize.define("Rows", {
        name: {
           type: DataTypes.STRING
        },
        isFull: {
            allowNull: false,
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

    Rows.associate = models => {
        Rows.belongsTo(models.Halls, {
            foreingKey: {
                allowNull: false
            }
        });
        Rows.hasMany(models.Seats, {
            onDelete: "cascade"
        });
        Rows.hasMany(models.Tickets, {
            onDelete: "cascade"
        });
    };
    return Rows;
}