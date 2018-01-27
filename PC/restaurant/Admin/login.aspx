<%@ Page Language="C#" AutoEventWireup="true" CodeFile="login.aspx.cs" Inherits="Admin_login" %>

<!DOCTYPE html>

<html >
<head>
    <meta charset="UTF-8">
    <title>登录</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css">
    <link rel="stylesheet" href="static/css/login.css">
</head>

<body>
<div class="login">
    <header class="header">
        <span class="text">LOGIN</span>
        <span class="loader"></span>
    </header>
    <form class="form">
        <input class="input" id="input-username" type="text", placeholder="Username">
        <input class="input" id="input-password" type="password" placeholder="Password">
        <button class="btn" type="submit"></button>
    </form>
</div>
<script src='http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script>
<script src="static/js/Login.js"></script>
</body>
</html>
