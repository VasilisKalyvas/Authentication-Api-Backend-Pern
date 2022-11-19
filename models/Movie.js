module.exports = (sequelize, DataTypes) => {
    const Movie = sequelize.define("Movie", {
        title: {
           type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        image: {
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
    Movie.associate = models => {
        Movie.hasMany(models.Tickets, {
            onDelete: "cascade"
        });
        Movie.hasMany(models.Projection, {
            onDelete: "cascade"
          });
    };
    return Movie;
}