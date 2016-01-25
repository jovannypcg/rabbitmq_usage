/**
 * Script that shows the usage of RabbitMQ.
 * This is a basic example that sends a message to a queue.
 *
 * @author  Jovanny Pablo Cruz Gomez
 *          Software Engineer
 *          jovannypcg@yahoo.com
 */

/** The host in which the producer will connect. */
const HOST  = 'amqp://localhost';

/** The name of the queue that will receive the message from the producer. */
const QUEUE = 'hello_queue';

/** The message to send. */
const MSG   = 'Hello world!'

/** Contains the methods for a producer through callbacks. */
var amqp = require('amqplib/callback_api');

/*
 * Connects to the provided host to execute the function
 * sent as parameter.
 *
 * @param HOST  The host to connect.
 * @param function The function to be executed after connecting.
 */
amqp.connect(HOST, function(err, conn) {
    /*
     * Creates a channel and executes the function sent as parameter.
     * The embedded function 'creates' a queue and then sends the message
     * to that queue.
     */
    conn.createChannel(function(err, ch) {
        ch.assertQueue(QUEUE, {durable: false});
        ch.sendToQueue(QUEUE, new Buffer(MSG));

        console.log(' [x] Sent: %s', MSG);
    });

    setTimeout(function() {
        conn.close();
        process.exit(0);
    }, 50);
});
