module.exports = (sequelize, DataTypes) => {
    const Halls = sequelize.define("Halls", {
        name: {
           type: DataTypes.STRING
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
    Halls.associate = models => {
        Halls.hasMany(models.Rows, {
            onDelete: "cascade"
        });
        Halls.hasMany(models.Seats, {
            onDelete: "cascade"
        });
        Halls.hasOne(models.Projection, {
            onDelete: "cascade"
        });
        Halls.hasMany(models.Tickets, {
            onDelete: "cascade"
        });
    };
    return Halls;
}