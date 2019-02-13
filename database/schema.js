const mongoose = require('mongoose');
const faker = require('faker');
const Schema = mongoose.Schema;
const db = require('./index.js');


let ProductSchema = new Schema({
  productID: Number,
  name: String,
  brand: String,
  price: String,
  description: String,
  sizes: Array,
  colors: Array,
  images: Array
});

let Product = mongoose.model('Product', ProductSchema);


let allProducts = [];

let product1 = new Product({
  productID: 1,
  name: 'Tiger Wool Blend Sweater',
  brand: 'GUCCI',
  price: '$1,500.00',
  description: 'Wild style is refined for the contemporary gent on an intricate jacquard-knit wool-blend sweater featuring a bold, fierce tiger face in front.',
  sizes: ['Medium', 'Large', 'X-Large', 'XX-Large'],
  colors: ['Black Gold'],
  images: [
    [
      'https://s3-us-west-1.amazonaws.com/n3rdstorm/top_1.jpeg',
      'https://s3-us-west-1.amazonaws.com/n3rdstorm/top_2.jpeg',
      'https://s3-us-west-1.amazonaws.com/n3rdstorm/top_3.jpeg'
    ]
  ]
});

let product2 = new Product({
  productID: 2,
  name: 'Faux Leather Leggings',
  brand: 'SPANX',
  price: '$98.00',
  description: 'A slick finish adds extra edge to stretchy faux-leather leggings flattered by a subtle control top.',
  sizes: ['X-Small', 'Small', 'X-Large'],
  colors: ['Black'],
  images: [
    [
      'https://s3-us-west-1.amazonaws.com/n3rdstorm/bottoms_1.jpeg',
      'https://s3-us-west-1.amazonaws.com/n3rdstorm/bottoms_2.jpeg',
      'https://s3-us-west-1.amazonaws.com/n3rdstorm/bottoms_3.jpeg',
      'https://s3-us-west-1.amazonaws.com/n3rdstorm/bottoms_4.jpeg'
    ]
  ]
});

let product3 = new Product({
  productID: 3,
  name: 'Gravitissima Thigh High Boot',
  brand: 'CHRISTIAN LOUBOUTIN',
  price: '$1,895.00',
  description: 'Striking, graffiti-inspired patterning adds to the edgy, avant-garde aesthetic of a dramatic thigh-high boot finished with the unmistakable lipstick-red sole.',
  sizes: ['6US / 36EU', '6.5US / 36.5EU', '7US / 37EU', '8.5US / 38.5 EU'],
  colors: ['Black/White'],
  images: [
    [
      'https://s3-us-west-1.amazonaws.com/n3rdstorm/shoes_1.jpeg',
      'https://s3-us-west-1.amazonaws.com/n3rdstorm/shoes_2.jpeg',
      'https://s3-us-west-1.amazonaws.com/n3rdstorm/shoes_3.jpeg',
      'https://s3-us-west-1.amazonaws.com/n3rdstorm/shoes_4.jpeg',
      'https://s3-us-west-1.amazonaws.com/n3rdstorm/shoes_5.jpeg',
      'https://s3-us-west-1.amazonaws.com/n3rdstorm/shoes_6.jpeg'
    ]
  ]
});

let product4 = new Product({
  productID: 4,
  name: 'Diamond Lux Pavé Station Rope Bracelet',
  brand: 'LAGOS',
  price: '$20,000.00',
  description: 'One hundred-fifteen sparkling pavé diamonds illuminate the sculptural Caviar metalwork of an elegant bracelet that makes a refined statement when worn solo.',
  sizes: ['Medium'],
  colors: ['Silver/Diamond'],
  images: [
    [
      'https://s3-us-west-1.amazonaws.com/n3rdstorm/accessory_1.jpeg',
      'https://s3-us-west-1.amazonaws.com/n3rdstorm/accessory_2.jpeg',
      'https://s3-us-west-1.amazonaws.com/n3rdstorm/accessory_3.jpeg',
      'https://s3-us-west-1.amazonaws.com/n3rdstorm/accessory_4.jpeg'
    ]
  ]
});

let product5 = new Product({
  productID: 5,
  name: 'Luxe Faux Fur Coat',
  brand: 'TOPSHOP',
  price: '$180.00',
  description: 'One hundred-fifteen sparkling pavé diamonds illuminate the sculptural Caviar metalwork of an elegant bracelet that makes a refined statement when worn solo.',
  sizes: ['2 US (fits like 0)', '4 US (fits like 0-2)', '6 US (fits like 2-4)', '8 US (fits like 6-8)', '10 US (fits like 10-12)', '12 US (fits like 14)'],
  colors: ['Rust', 'Teal'],
  images: [
    [
      'https://s3-us-west-1.amazonaws.com/n3rdstorm/outerwear_rust1.jpeg',
      'https://s3-us-west-1.amazonaws.com/n3rdstorm/outerwear_rust2.jpeg',
      'https://s3-us-west-1.amazonaws.com/n3rdstorm/outerwear_rust3.jpeg',
      'https://s3-us-west-1.amazonaws.com/n3rdstorm/outerwear_rust4.jpeg'
    ],
    [
      'https://s3-us-west-1.amazonaws.com/n3rdstorm/outerwear_teal1.jpeg',
      'https://s3-us-west-1.amazonaws.com/n3rdstorm/outerwear_teal2.jpeg',
      'https://s3-us-west-1.amazonaws.com/n3rdstorm/outerwear_teal3.jpeg',
      'https://s3-us-west-1.amazonaws.com/n3rdstorm/outerwear_teal4.jpeg',
      'https://s3-us-west-1.amazonaws.com/n3rdstorm/outerwear_teal5.jpeg'
    ]
  ]
});

allProducts.push(product1, product2, product3, product4, product5);


let fakeProductGenerator = (productCount) => {
  let product = new Product({
    productID: productCount,
    name: faker.commerce.productName(),
    brand: faker.random.word().toUpperCase(),
    price: '$' + faker.commerce.price(),
    description: faker.lorem.sentences(),
    sizes: ['Small', 'Medium', 'Large', 'X-Large'],
    colors: [],
    images: []
  });

  // Generates 3 colors with 4 images each
  for (let i = 0; i < 3; i++) {
    product.colors.push(faker.commerce.color());

    let imageArr = [];
    for (let j = 0; j < 4; j++) imageArr.push(faker.image.image());
    product.images.push(imageArr);
  }
  return new Product (product);
};

// Generates 95 fake products and pushes them to the allProducts array
for (let i = 6; i <= 100; i++) {
  allProducts.push(fakeProductGenerator(i));
}

Product.insertMany(allProducts, () => db.close());