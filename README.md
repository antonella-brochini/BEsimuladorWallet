# Simulador Wallet - Backend

Este es el backend de la aplicación **Simulador Wallet**, un proyecto de prueba que simula un sistema de billetera digital con usuarios, tarjetas y transacciones. Está construido con **Node.js** y **Express**.

---

## 🛠 Tecnologías

- Node.js
- Express
- AsyncStorage (simulado con arrays en memoria)
- JavaScript (ES6)


## 🛠 Dependecias y Ejecutar
- Nesecitas tener Node.js
- npm install
- node index

# BackendResumen de Endpoints - Wallet API

1. GET /balance
Descripción: Obtiene el saldo actual de la billetera del usuario
Header requerido: x-user-id (ID del usuario)

2. POST /topup
Descripción: Recarga dinero a la billetera del usuario usando una tarjeta
Header requerido: x-user-id (ID del usuario)
Body requerido: amount y cardId

POST /login
Descripción: Autentica un usuario con email y contraseña
Body requerido: email y contrasena

GET /user
Descripción: Obtiene la información completa del usuario
Header requerido: X-User-Id (ID del usuario)

1. POST /card
Descripción: Registra una nueva tarjeta de crédito para el usuario
Header requerido: X-User-Id (ID del usuario)
Body requerido: cardHolder, cardNumber, expiryDate, cvv

2. GET /cards
Descripción: Obtiene todas las tarjetas del usuario
Header requerido: X-User-Id (ID del usuario)

3. DELETE /card/:id
Descripción: Elimina una tarjeta del usuario
Header requerido: X-User-Id (ID del usuario)
Parámetro de ruta: id (ID de la tarjeta a eliminar)

1. POST /wallet
Descripción: Realiza un pago desde la billetera del usuario
Header requerido: X-User-Id (ID del usuario)
Body requerido: amount, recipient, description

2. POST /card
Descripción: Realiza un pago usando una tarjeta de crédito
Header requerido: X-User-Id (ID del usuario)
Body requerido: amount, recipient, description , cardId 

# Aclaraciones
Actualmente uso el userId en el header para identificar al usuario, pero no es seguro. Lo correcto es usar un token (como JWT),
que se entrega al hacer login y se envía en cada request. Así el servidor valida la identidad sin exponer IDs y protege mejor los datos.
A su vez actualmente solo se guarda el id del usuario en el context de la app pero posteriormente tendrian que guardarse mas datos para no llamar tan seguido a la api.
