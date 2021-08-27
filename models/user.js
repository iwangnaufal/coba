'use strict';
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const saltRounds = 10

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    checkPassword= password => bcrypt.compareSync(password, this.password)

    generateToken = () =>{
      const payload ={
        id: this.id,
        name: this.name

      }
      const rahasia = "ini rahasia"
      const token = jwt.sign(payload, rahasia)
      return token
    }

    static authenticate = async({email,password})=>{
     try{

     const user = await this.findOne({where:{email:email}})
      if(!user) return Promise.reject("email not found!")


      const isPasswordValid = user.checkPassword(password)
      if (!isPasswordValid) return Promise.reject("wrong password")

      return Promise.resolve(user)
    } catch (err){
      return Promise.reject(err)
    }
    }
  };
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: async(user) => {
        user.password = await bcrypt.hash(user.password, saltRounds)
      },
      beforeBulkCreate: async(user) => {
        // user.password = await bcrypt.hash(user.password, saltRounds)
        console.log(user);
      }
    }
  });
  return User;
};