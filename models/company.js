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

    Company.create(fakeCompany);

    return Company;
};
