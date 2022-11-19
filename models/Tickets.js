module.exports = (sequelize, DataTypes) => {
    const Tickets = sequelize.define("Tickets", {
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE
          },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE
        }
    });
    Tickets.associate = models => {
        Tickets.belongsTo(models.User, {
            onDelete: "cascade"
        });
        Tickets.belongsTo(models.Movie, {
            onDelete: "cascade"
        });
        Tickets.belongsTo(models.Projection, {
            onDelete: "cascade"
        });
        Tickets.belongsTo(models.Halls, {
            onDelete: "cascade"
        });
        Tickets.belongsTo(models.Rows, {
            onDelete: "cascade"
        });
        Tickets.belongsTo(models.Seats, {
            onDelete: "cascade"
        });
    };
    return Tickets;
}