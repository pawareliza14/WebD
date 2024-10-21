<?php
$users = [];

// Join user to chat
function userJoin($id, $username, $room) {
    global $users; // Access global variable

    $user = ['id' => $id, 'username' => $username, 'room' => $room];
    $users[] = $user;

    return $user;
}

// Get current user
function getCurrentUser($id) {
    global $users; // Access global variable
    foreach ($users as $user) {
        if ($user['id'] === $id) {
            return $user;
        }
    }
    return null;
}

// User leaves chat
function userLeave($id) {
    global $users; // Access global variable
    foreach ($users as $index => $user) {
        if ($user['id'] === $id) {
            return array_splice($users, $index, 1)[0]; // Remove user from array
        }
    }
    return null;
}

// Get room users
function getRoomUsers($room) {
    global $users; // Access global variable
    return array_filter($users, function($user) use ($room) {
        return $user['room'] === $room;
    });
}

