module.exports = (sequelize, DataTypes) => {
    const Seats = sequelize.define("Seats", {
        name: {
           type: DataTypes.STRING
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE
        },
        isEmpty: {
            allowNull: false,
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE
        }
    });

    Seats.associate = models => {
        Seats.belongsTo(models.Rows, {
            foreingKey: {
                allowNull: false
            }
        });
        Seats.belongsTo(models.Halls, {
            foreingKey: {
                allowNull: false
            }
        });
        Seats.hasMany(models.Tickets, {
            onDelete: "cascade"
        });
    };
    return Seats;
}