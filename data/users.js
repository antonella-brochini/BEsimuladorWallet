const users = [
  {
    id: 1,
    email: 'anto@test.com',
    password: '1234',
    wallet: {
      balance:0,
      currency: 'UYU',
    },
    cards: [ {
        id: 1,
        brand: "VISA",
        last4: "1111"
      }]
  }
];

module.exports = users;
