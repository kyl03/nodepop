// Hacer un script de inicialización de la base de datos, que cargue el json de anuncios.
// Se puede llamar p.e. init-db.js, debería borrar las tablas y cargar anuncios. Lo
// podemos poner en el package.json para poder usar npm run init-db. Referencias:
// a. Cargar vuestro módulo connectMongoose.js y vuestros modelos
// b. http://mongoosejs.com/docs/api.html#query_Query-deleteMany
// c. http://mongoosejs.com/docs/api.html#model_Model.insertMany
// d. Estas operaciones deberán hacerse una detrás de la otra, o dicho de otro
// modo, cuando termine la primera se lanzará la segunda. Para esto podéis usar
// callbacks, promesas (si miráis la doc veréis que devuelven una promesa!) o
// promesas con async/await (recomendado).
'use strict'

//Inicializar la base de datos con los datos minimos para funcionar

//conectar a la base de datos
const connection = require('./lib/connectMongoose');
const readline = require('readline')
//cargamos los modelos
const Ad = require('./models/Ad');
const { resolve } = require('path');
const { rejects } = require('assert');

async function main() {
  //ask user if he really wants to continue
  const toContinue = await question('Are you sure, sure that you want to delete the database? (Y/N)\n');
  if(!toContinue){
    process.exit();
  }
  //inicializar la coleccion de ads
  await initAds();
  //desconectamos de la base de datos

  connection.close();
}
main().catch(err => console.log('Hubo un error', err));


async function initAds(){
  //borrar todos los documentos de la collecion de anuncios
  const result = await Ad.deleteMany();
  console.log(`Deleted ${result.deletedCount} posts.`);
  
  //crear anuncios iniciales
  const inserted = await Ad.insertMany([
    {
      "name": "Bike",
      "forSale": true,
      "price": 230.15,
      "pict": "bici.png",
      "tags": [ "lifestyle", "motor"]
      },
      {
      "name": "iPhone 3GS",
      "forSale": false,
      "price": 50.00,
      "pict": "iphone.png",
      "tags": [ "lifestyle", "mobile"]
      },
      {
      "name": "Ball",
      "forSale": true,
      "price": 1000.00,
      "pict": "ball.png",
      "tags": [ "lifestyle"]
      },
      {
      "name": "Laptop",
      "forSale": true,
      "price": 300.00,
      "pict": "laptop.png",
      "tags": [ "lifestyle", "work"]
      },
      {
      "name": "Phone case",
      "forSale": true,
      "price": 10.00,
      "pict": "iphonecase.png",
      "tags": [ "lifestyle", "mobile"]
      }
  ]);
  console.log(`Created ${inserted.length} posts.`);
}

function question(text) {
  return new Promise((resolve, reject)=>{
    const interFace = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    interFace.question(text, answer =>{
      interFace.close();
      if(answer.toLowerCase()==='y'){
        resolve(true);
        return;
      } else{
        resolve(false);
      }
    });
  })  
}
