module.exports = (sequelize, DataTypes) => {
    const Hashtag = sequelize.define('Hashtag',{
        name : {
            type : DataTypes.STRING(20),
            allowNull : false,
        },
    },{
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',  
    });

    db.Hashtag.belongsToMany(db.post, {through : 'PostHashtag'});
    return Hashtag;
}