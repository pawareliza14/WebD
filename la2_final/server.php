<?php

require 'vendor/autoload.php';

use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;

class Chat implements MessageComponentInterface {
    protected $clients;
    protected $users; // Store user information

    public function __construct() {
        $this->clients = new \SplObjectStorage;
        $this->users = [];
    }

    public function onOpen(ConnectionInterface $conn) {
        // Store the new connection
        $this->clients->attach($conn);
    }

    public function onMessage(ConnectionInterface $from, $msg) {
        $data = json_decode($msg, true);
        
        if ($data['type'] === 'joinRoom') {
            // Handle joining room
            $username = $data['username'];
            $room = $data['room'];
            $this->users[$from->resourceId] = ['username' => $username, 'room' => $room];
            $from->send(json_encode(['message' => 'Welcome to ChatCord!', 'bot' => true]));

            foreach ($this->clients as $client) {
                if ($client !== $from && $this->users[$client->resourceId]['room'] === $room) {
                    $client->send(json_encode(['message' => "$username has joined the chat", 'bot' => true]));
                }
            }
        } elseif ($data['type'] === 'chatMessage') {
            // Handle chat messages
            $user = $this->users[$from->resourceId];
            $room = $user['room'];

            foreach ($this->clients as $client) {
                if ($client !== $from && $this->users[$client->resourceId]['room'] === $room) {
                    $client->send(json_encode(['message' => $user['username'] . ': ' . $data['message'], 'bot' => false]));
                }
            }
        }
    }

    public function onClose(ConnectionInterface $conn) {
        // Remove the connection
        if (isset($this->users[$conn->resourceId])) {
            $username = $this->users[$conn->resourceId]['username'];
            $room = $this->users[$conn->resourceId]['room'];

            foreach ($this->clients as $client) {
                if ($client !== $conn && $this->users[$client->resourceId]['room'] === $room) {
                    $client->send(json_encode(['message' => "$username has left the chat", 'bot' => true]));
                }
            }

            unset($this->users[$conn->resourceId]);
        }

        $this->clients->detach($conn);
    }

    public function onError(ConnectionInterface $conn, \Exception $e) {
        $conn->close();
    }
}

// Run the server
$server = new Ratchet\App('localhost', 3000);
$server->route('/chat', new Chat, ['*']);
$server->run();
