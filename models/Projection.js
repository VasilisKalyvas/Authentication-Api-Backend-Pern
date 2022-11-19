module.exports = (sequelize, DataTypes) => {
    const Projection = sequelize.define("Projection", {
        TimeAndDate: {
            allowNull: false,
            type: DataTypes.DATE
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
    Projection.associate = models => {
      Projection.belongsTo(models.Halls, {
        onDelete: "cascade"
      });
      Projection.belongsTo(models.Movie, {
        onDelete: "cascade"
      });
      Projection.hasMany(models.Tickets, {
        onDelete: "cascade"
      });
  };
    return Projection;
}