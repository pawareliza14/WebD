<?php
// Start a session to store user data (if necessary)
session_start();

// You can retrieve the room name and username from session or query parameters if needed
$roomName = isset($_SESSION['room']) ? $_SESSION['room'] : 'Default Room'; // Example default room
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.1/css/all.min.css" integrity="sha256-mmgLkCYLUQbXn0B1SRqzHar6dCnv9oZFPEC1g1cwlkk=" crossorigin="anonymous" />
  <link rel="stylesheet" href="css/style.css">
  <title>ChatCord App</title>
</head>
<body>
  <div class="chat-container">
    <header class="chat-header">
      <h1><i class="fas fa-smile"></i> ChatCord</h1>
      <a href="index.php" class="btn">Leave Room</a> <!-- Change to index.php -->
    </header>
    <main class="chat-main">
      <div class="chat-sidebar">
        <h3><i class="fas fa-comments"></i> Room Name:</h3>
        <h2 id="room-name"><?php echo htmlspecialchars($roomName); ?></h2> <!-- Display room name securely -->
        <h3><i class="fas fa-users"></i> Users</h3>
        <ul id="users">
          <!-- User list will be populated here via JavaScript -->
        </ul>
      </div>
      <div class="chat-messages">
        <!-- Chat messages will be displayed here via JavaScript -->
      </div>
    </main>
    <div class="chat-form-container">
      <form id="chat-form" action="send_message.php" method="POST"> <!-- Change action to send_message.php -->
        <input
          id="msg"
          type="text"
          name="message" 
          placeholder="Enter Message"
          required
          autocomplete="off"
        />
        <button class="btn"><i class="fas fa-paper-plane"></i> Send</button>
      </form>
    </div>
  </div>
  
  <script src="https://cdnjs.cloudflare.com/ajax/libs/qs/6.12.1/qs.js"
    integrity="sha512-+7lw3wSUwfkyzVLYon2wTk6FXUtycaRNYw9Zhpw/m/ftAIrQONsNtTcwMEznxGzOc+kXKp8kg6FGD9wS2SkZ4A=="
    crossorigin="anonymous" referrerpolicy="no-referrer"></script>
  <script src="/socket.io/socket.io.js"></script>
  <script src="js/main.js"></script>
</body>
</html>
