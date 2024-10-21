<?php
require 'vendor/autoload.php';

use Carbon\Carbon;

function formatMessage($username, $text) {
    return [
        'username' => $username,
        'text' => $text,
        'time' => Carbon::now()->format('h:i a')
    ];
}
