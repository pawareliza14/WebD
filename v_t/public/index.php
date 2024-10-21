<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/style.css">
    <title>Chat App</title>
</head>
<body>
    <div class="chat-container">
        <header class="chat-header">
            <h1>Chat App</h1>
        </header>
        <main class="chat-main">
            <div class="chat-messages"></div>
        </main>
        <div class="chat-form-container">
            <form id="chat-form">
                <input id="msg" type="text" placeholder="Enter Message" required autocomplete="off"/>
                <button type="submit">Send</button>
            </form>
        </div>
    </div>
    <script src="js/main.js"></script>
</body>
</html>
