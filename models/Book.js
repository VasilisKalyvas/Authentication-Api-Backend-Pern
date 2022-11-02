module.exports = (sequelize, DataTypes) => {
    const Book = sequelize.define("Book", {
        title: {
           type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        published: {
            type: DataTypes.BOOLEAN
        },
        publishedYear: {
            type: DataTypes.NUMBER
        },
        writter: {
            type: DataTypes.STRING
        },
        bookImage: {
            type: DataTypes.STRING
        },
        copies: {
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
    return Book;
}