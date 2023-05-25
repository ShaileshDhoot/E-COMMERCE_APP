const mongodb = require('mongodb')
const getDb = require('../util/database').getDB;

class User {
  constructor(username, email, cart, id){
    this.name = username;
    this.email = email;
    this.cart = cart;
    this._id = id;
  }

  save(){
    const db = getDb();
    //let dbOp;
    
      return db.collection('users').insertOne(this)
    
  }

  addProductToCart(product){
    // const cartProductIndex = this.cart.items.findIndex(item => item.productId.toString() === product._id.toString());

    // if (cartProductIndex !== -1) {
    //   this.cart.items[cartProductIndex].quantity += 1;
    // } else {
    //   // If the product does not exist, add it to the cart
    //   this.cart.items.push({ productId: new mongodb.ObjectId(product._id), quantity: 1 });
    // }
     const updatedCart = {items: [{productId: new mongodb.ObjectId(product._id), quantity:1}]}
    const db = getDb();
    return db.collection('users').updateOne(
      {_id : new mongodb.ObjectId(this._id) },
      {$set: {cart: updatedCart}}
    )
  }

  static findUserById(userId){
    const db = getDb();
    return db.collection('users').findOne({_id: new mongodb.ObjectId(userId) }).then((user)=>{
      console.log(user);
      return user;
    }).catch(err=>console.log(err))
  }
}

module.exports = User;
