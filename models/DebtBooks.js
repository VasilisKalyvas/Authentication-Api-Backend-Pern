module.exports = (sequelize, DataTypes) => {
    const DebtBooks = sequelize.define("DebtBooks", {
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

    DebtBooks.associate = models => {
        DebtBooks.belongsTo(models.User, {
            foreingKey: {
                allowNull: false
            }
        });
        DebtBooks.belongsTo(models.Book, {
            foreingKey: {
                allowNull: false
            }
        });
    };
    return DebtBooks;
}