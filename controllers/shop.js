const Product = require('../models/product');
const Order = require('../models/order')

exports.getProducts = (req, res, next) => {
  Product.find()
    .then(products => {
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products'
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products'
      });
    })
    .catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.find()
    .then(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getCart = (req, res, next) => {
  req.user
    .populate('cart.items.productId')
    .then(user => {
      //console.log(user.cart.items)
      let products = user.cart.items
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: products
      })
    })
    .catch(err => console.log(err));
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
  .then((product)=>{
    return req.user.addToCart(product)    
    
  .then((result)=>{
      //console.log(result)
      res.redirect('/cart')
    })
  .catch(err=>console.log(err))
  })

};

exports.postCartDeleteProduct = (req, res, next) => {
  const productId = req.body.productId; // Assuming you're passing the productId in the request body
  // console.log( 'productId----->', productId)
  // console.log('req.user--->', req.user)
  req.user
    .deleteProductFromCart(productId) // Call the deleteProductFromCart method with the productId
    .then(() => {
      console.log('Product Deleted')
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
};



exports.postOrder = (req, res, next) => {
  
  req.user
    .populate('cart.items.productId')
    .then(user => {
      console.log(user.cart.items)
      const products = user.cart.items.map(item => {
        return {
          quantity: item.quantity,
          productData: {
            _id: item.productId._id,
            title: item.productId.title,
            price: item.productId.price,
            description: item.productId.description,
            imageUrl: item.productId.imageUrl,
            userId: item.productId.userId
          }
        };
      });
      const order = new Order({
        user: {
          name: req.user.name,
          userId: req.user
        },
        products: products
      })
      return order.save()
    })
    .then(()=>{
      req.user.clearCart()
      
    })
    .then(()=>{
      
      res.redirect('/orders');
    })
    .catch(err => console.log(err));
};

exports.getOrders = (req, res, next) => {
  Order.find({'user.userId': req.user_id})
  .then(orders => {
    res.render('shop/orders', {
      path: '/orders',
      pageTitle: 'Your Orders',
      orders: orders
    });
  })
    .catch(err => console.log(err));
};
