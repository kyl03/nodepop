'use strict'

//Initiate the database with the minimum amount of data required to function

//Connect to the database
const connection = require('./lib/connectMongoose');
const readline = require('readline')
//Load the models
const Ad = require('./models/Ad');
const { resolve } = require('path');
const { rejects } = require('assert');

async function main() {
  //ask user if he really wants to continue
  const toContinue = await question('Are you sure, sure that you want to delete the database? (Y/N)\n');
  if(!toContinue){
    process.exit();
  }
  //Initiate the collection of ads
  await initAds();
  //Disconnect from the database

  connection.close();
}
main().catch(err => console.log('Hubo un error', err));


async function initAds(){
  //Delete all the documents from the collection of ads
  const result = await Ad.deleteMany();
  console.log(`Deleted ${result.deletedCount} posts.`);
  
  //Create the initial ads
  const inserted = await Ad.insertMany([
    {
      "name": "Bike",
      "forSale": true,
      "price": 230.15,
      "pict": "http://localhost:3000/images/ads/bici.png",
      "tags": [ "lifestyle", "motor"]
      },
      {
      "name": "iPhone 3GS",
      "forSale": false,
      "price": 50.00,
      "pict": "http://localhost:3000/images/ads/iphone.png",
      "tags": [ "lifestyle", "mobile"]
      },
      {
      "name": "Ball",
      "forSale": true,
      "price": 1000.00,
      "pict": "http://localhost:3000/images/ads/ball.png",
      "tags": [ "lifestyle"]
      },
      {
      "name": "Laptop",
      "forSale": true,
      "price": 300.00,
      "pict": "http://localhost:3000/images/ads/laptop.png",
      "tags": [ "lifestyle", "work"]
      },
      {
      "name": "Phone case",
      "forSale": true,
      "price": 10.00,
      "pict": "http://localhost:3000/images/ads/iphonecase.png",
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
