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
Authentification:

```sh
user: admin
password: 1234
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
  ]
```
Tags list:

```
GET /apiv1/ads/tags
[
  "lifestyle",
  "motor",
  "mobile",
  "work"
]
```

Ad picture:

```
GET /images/ads/iphone.png

```

Tags (single) query example:

```
GET /apiv1/ads?tags=mobile
```
Tags (multiple) query example:

```
GET /apiv1/ads?tags=lifestyle,work
```

Pagination query example:

```
GET /apiv1/ads?tags=mobile&skip=1&limit=1
```


