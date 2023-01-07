# Nodepop

Deploy:

```sh
npm install
```

Load initial data to database:

```
npm run init-db
```

Start the application in production with:

```sh
npm start
```

Start the application in development with:

```sh
npm run dev
```

## API Documentation

Ads list:
```
GET /apiv1/ads
[
  {
    "_id": "63b1fb9fdcfaee4ea3ef182f",
    "name": "Bicicleta",
    "forSale": true,
    "price": 230.15,
    "pict": "bici.jpg",
    "tags": [
      "lifestyle",
      "motor"
    ],
    "__v": 0
  },
  {
    "_id": "63b1fb9fdcfaee4ea3ef1830",
    "name": "iPhone 3GS",
    "forSale": false,
    "price": 50,
    "pict": "iphone.png",
    "tags": [
      "lifestyle",
      "mobile"
    ],
    "__v": 0
  },
  {
    "_id": "63b225334ca1f54781c06183",
    "name": "Ball",
    "forSale": true,
    "price": 5,
    "tags": [
      "toy, lifestyle"
    ],
    "__v": 0,
    "pict": "ball.png"
  }
]
```
Ad picture:

```
/images/ads/<ad.pict>
```


