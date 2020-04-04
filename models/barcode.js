module.exports = (sequelize, DataTypes) => {
    const Barcode = sequelize.define("Barcode", {
        Upc: {
            type: DataTypes.STRING(128),
            allowNull: false
        },

        Description: {
            type: DataTypes.STRING(50),
            allowNull: true
        },

        Active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },

        Retired: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },

        DateActivated: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    });

    Barcode.create(fakeBarcode);

    Barcode.associate = (models) => {
        Barcode.belongsTo(models.User);
    }

    return Barcode;
};
