const users = [
  {
    id: 1,
    email: 'anto@test.com',
    password: '1234',
    nombre: 'Antonella Brochini',
    celular: '+59898765432',
    wallet: {
      balance:0,
      currency: 'UYU',
    },
    cards: [ {
        id: 1,
        brand: "VISA",
        last4: "1111",
        cardHolder:"anotnella",
        cardNumber:"0002 0000 8989 8989", 
        expiryDate:"12/25",
        cvv:"123",
        isPrimary: true,
      }]
  }
];

module.exports = users;
