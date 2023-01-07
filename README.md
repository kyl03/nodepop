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
  ]
```
Ad picture:

```
/images/ads/<ad.pict>
```

Tag query example:

```
/apiv1/ads?tags=mobile
```

Pagination query example:

```
/apiv1/ads?tags=mobile&skip=1&limit=1
```


