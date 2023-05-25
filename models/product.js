const getDb = require('../util/database').getDB;

class Product  {
  constructor(title, price, description, imaheUrl){
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imaheUrl;
  }
  save(){
    const db =  getDb();
    
    return db.collection('products')
      .insertOne(this)
      .then((result)=>{
        console.log(result)
      })
      .catch(err=>console.log(err))
  }
}


module.exports = Product;