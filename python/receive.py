#!/usr/bin/env python

import pika

# Host in which RabbitMQ is running.
HOST = 'localhost'

# Name of the queue.
QUEUE = 'pages'

# Specifies what to do after consuming messages from RabbitMQ.
def handler(channel, method, properties, body):
    print '-> Handled: [%s]' % body

# Getting the connection using pika.
# Creating the channel.
connection = pika.BlockingConnection(pika.ConnectionParameters(host=HOST))
channel = connection.channel()

print '* Handling  messages...'

# The consumption is defined.
# Notice the 'handler' as first argument.
channel.basic_consume(handler, queue=QUEUE, no_ack=True)

# Starting the consumption.
channel.start_consuming()
