module.exports = (sequelize, DataTypes) => {
    const BorrowedBooks = sequelize.define("BorrowedBooks", {
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
            type: DataTypes.STRING
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

    BorrowedBooks.associate = models => {
        BorrowedBooks.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
        BorrowedBooks.belongsTo(models.Book, {
            foreingKey: {
                allowNull: false
            }
        });
    };
    return BorrowedBooks;
}