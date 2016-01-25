/**
 * The host in which the receiver will connect.
 */
const HOST = 'amqp://localhost';

/** The name of the queue that will receive the message from the producer. */
const QUEUE = 'hello_queue';

/** To connect to RabbitMQ and retreive the message from the queue. */
var amqp = require('amqplib/callback_api');

/*
 * Connects to the provided host and if success, the function sent
 * as parameter is executed.
 *
 * The function will creata a channel. This channel needs the name of the queue
 * that has the message.
 */
amqp.connect(HOST, function(err, conn) {
    conn.createChannel(function(err, ch) {
        ch.assertQueue(QUEUE, {durable: false});

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", QUEUE);

        /*
         * Consumes the message from the queue.
         */
        ch.consume(QUEUE, function(msg) {
            console.log(" [x] Received %s", msg.content.toString());
        }, {noAck: true});
    });

    setTimeout(() => { conn.close(); process.exit(0) }, 500);
});
