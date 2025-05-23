const express = require("express")
const app = express()

const amqp = require('amqplib');
const amqpUrl = process.env.AMQP_URL || 'amqp://localhost:5672';

orderData = {
        customerId: 3,
        orderId: 5,
        number: "122 222 3333"
    }

app.get('/', async (req, res) => {
    try {
        const connection = await amqp.connect(amqpUrl);
        const channel = await connection.createChannel();
        channel.assertQueue("order.shipped", {durable: true});
        channel.sendToQueue("order.shipped", Buffer.from(JSON.stringify(orderData)));
    } catch (error) {
        console.log(error)
        
    }
    
  })

app.listen(8000, () => {
    console.log("ORDERS API listening on port 8000")
})