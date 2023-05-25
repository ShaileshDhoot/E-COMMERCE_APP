const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name:{
        type:  String,
        required: true
    },
    email: {type:String, required: true},
    cart: {
        items: [{
            productId: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }]
    }
})

module.exports = mongoose.model('User',UserSchema)


//*********************using MONGOdb-------- */
// // const mongodb = require('mongodb')
// // const getDb = require('../util/database').getDB;

// class User {
//   constructor(username, email, cart, id){
//     this.name = username;
//     this.email = email;
//     this.cart = cart;
//     this._id = id;
//   }

//   save(){
//     const db = getDb();
//     //let dbOp;
    
//       return db.collection('users').insertOne(this)
    
//   }
//   addProductToCart(product) {
//     const cartProductIndex = this.cart.items.findIndex(item => item.productId.toString() === product._id.toString());
  
//     if (cartProductIndex !== -1) {
//       // If the product already exists, update the quantity
//       this.cart.items[cartProductIndex].quantity += 1;
//     } else {
//       // If the product does not exist, add it to the cart
//       this.cart.items.push({ productId: new mongodb.ObjectId(product._id), quantity: 1 });
//     }
//     const updatedCart = { ...this.cart };
//     const db = getDb();
//     return db.collection('users').updateOne(
//       { _id: new mongodb.ObjectId(this._id) },
//       { $set: { cart: updatedCart } }
//     );
//   }
  
//   getCart() {
//     const db = getDb();
//     const productIds = this.cart.items.map(item => {
//       return item.productId;
//     });
//     return db
//       .collection('products')
//       .find({ _id: { $in: productIds } })
//       .toArray()
//       .then(products => {
//         return products.map(p => {
//           return {
//             ...p,
//             quantity: this.cart.items.find(i => {
//               return i.productId.toString() === p._id.toString();
//             }).quantity
//           };
//         });
//       })
//       .catch(err => console.log(err));
//   }

//   deleteProductFromCart(productId) {
//     const updatedCartItems = this.cart.items.filter(item => item.productId.toString() !== productId.toString());
//     this.cart.items = updatedCartItems;
  
//     const db = getDb();
//     return db.collection('users').updateOne(
//       { _id: new mongodb.ObjectId(this._id) },
//       { $set: { cart: this.cart } }
//     );
//   }

//   addOrder(){
//     const db = getDb();
//     return this.getCart().then(products=>{
//       const order = {
//         items: products,
//         user: {
//           _id: new mongodb.ObjectId(this._id) ,
//           name: this.name,
//           email: this.email
//         }
//       }
//       return db.collection('orders').insertOne( order)
//     })
//     .then(result=>{
//       this.cart = {items : []}
//       return db
//       .collection('users')
//       .updateOne(
//         { _id: new mongodb.ObjectId(this._id) },
//         { $set: { cart: {items: []} } })
//     })
//   }

//   getOrders(){
//     const db = getDb();
//     return db.collection('orders').find({'user._id':new mongodb.ObjectId(this._id)}).toArray()
//   }

//   static findUserById(userId){
//     const db = getDb();
//     return db.collection('users').findOne({_id: new mongodb.ObjectId(userId) }).then((user)=>{
//       console.log(user);
//       return user;
//     }).catch(err=>console.log(err))
//   }
// }

// module.exports = User;
