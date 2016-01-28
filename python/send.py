#!/usr/bin/env python
import pika

# Host in which RabbitMQ is running.
HOST = 'localhost'

# Name of the queue.
QUEUE = 'pages'

# The message to send.
MESSAGE = 'Hi there! This is a test message =)'

# Getting the connection using pika.
# Creating the channel.
# Declaring the queue.
connection = pika.BlockingConnection(pika.ConnectionParameters(HOST))
channel = connection.channel()
channel.queue_declare(queue=QUEUE)

# Sends the 'MESSAGE' to the queue.
# Default empty 'exchange' with 'routing_key' equal to the queue name
# will route the message to that queue.
channel.publish(exchange='', routing_key=QUEUE, body=MESSAGE)

# The connection is closed.
connection.close()
