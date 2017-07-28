/* eslint-disable */
const express = require('express');
const cors = require('cors');

// const DEV = process.env.NODE_ENV === 'development';

const app = express();
app.use(cors());

app.get('/history', (req, res) => {
  res.json(
    {orders: [
      {amount: 10, avg_price: 11, price: 12, deal_amount: 13, create_date: 32455234123, status: -1},
      {amount: 10, avg_price: 11, price: 12, deal_amount: 13, create_date: 32455234123, status: -1},
      {amount: 10, avg_price: 11, price: 12, deal_amount: 13, create_date: 32455234123, status: -1},
      {amount: 10, avg_price: 11, price: 12, deal_amount: 13, create_date: 32455234123, status: -1},
      {amount: 10, avg_price: 11, price: 12, deal_amount: 13, create_date: 32455234123, status: -1},
      {amount: 10, avg_price: 11, price: 12, deal_amount: 13, create_date: 32455234123, status: -1},
      {amount: 10, avg_price: 11, price: 12, deal_amount: 13, create_date: 32455234123, status: -1},
      {amount: 10, avg_price: 11, price: 12, deal_amount: 13, create_date: 32455234123, status: -1},
      {amount: 10, avg_price: 11, price: 12, deal_amount: 13, create_date: 32455234123, status: -1},
      {amount: 10, avg_price: 11, price: 12, deal_amount: 13, create_date: 32455234123, status: -1},
      {amount: 10, avg_price: 11, price: 12, deal_amount: 13, create_date: 32455234123, status: -1},
      {amount: 10, avg_price: 11, price: 12, deal_amount: 13, create_date: 32455234123, status: -1},
      {amount: 10, avg_price: 11, price: 12, deal_amount: 13, create_date: 32455234123, status: -1},
      {amount: 10, avg_price: 11, price: 12, deal_amount: 13, create_date: 32455234123, status: -1},
      {amount: 10, avg_price: 11, price: 12, deal_amount: 13, create_date: 32455234123, status: -1},
      {amount: 10, avg_price: 11, price: 12, deal_amount: 13, create_date: 32455234123, status: -1},
      {amount: 10, avg_price: 11, price: 12, deal_amount: 13, create_date: 32455234123, status: -1}
    ]}
  );
});

app.get('/depth', (req, res) => {
  res.json(
    {orders: {
      "asks": [
        [
          18391,
          5.609
        ], [
          18380,
          1.308
        ], [
          18379,
          0.16
        ], [
          18370,
          2.07
        ], [
          18330,
          10.451
        ]
      ],
      "bids": [
        [
          18328.1,
          4.027
        ], [
          18328,
          1.82
        ], [
          18327,
          0.989
        ], [
          18326,
          0.3
        ], [
          18323,
          0.1
        ]
      ]
    }}
  );
});

app.get('/tradetype', (req, res) => {
  res.json(
    {data: [
      {id: 1, name: '冰山委托'},
      {id: 2, name: '时间加权委托'}
    ]}
  );
});

app.listen(3001, () => {
  console.info('访问：http://localhost:3001/');
});
