<template>
    <div class="forbidden">
      <div class="status">
        Forbidden
      </div>
      <div class="message">
        You do not have permission to view this page.
      </div>
    </div>
</template>
<style>
  .forbidden {
    line-height: 1.2;
    text-align: center;
    font-family: "Oswald", sans-serif;
    padding: 80px 20px;
  }
  .forbidden >.status {
      font-size: 100px;
      color: greenyellow;
    }
  .forbidden > .message {
      font-size: 25px;
    }
  
</style>