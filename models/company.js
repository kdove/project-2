module.exports = (sequelize, DataTypes) => {
    const Company = sequelize.define("Company", {
        Gs1Prefix: {
            type: DataTypes.STRING(12),
            allowNull: false,
            unique: true
        },

        CompanyName: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Company.associate = function(models) {
        Company.hasMany(models.Barcode, {
            onDelete: "cascade"
        });
        Company.hasMany(models.User, {
            onDelete: "cascade"
        });
    };

    return Company;
};
