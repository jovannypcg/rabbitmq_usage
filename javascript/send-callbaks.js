const HOST  = 'amqp://localhost';
const QUEUE = 'hello_queue';
const MSG   = 'Hello world!'

var amqp = require('amqplib/callback_api');

amqp.connect(HOST, function(err, conn) {
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
