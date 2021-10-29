<template>

  <nav class="navbar " style="background-color:red;" role="navigation" aria-label="main navigation">

  <div class="navbar-brand">
    <p class="navbar-item" >
      <img src="../src/assets/img/pizzayellow.svg" width="28" height="28" style="padding:4px"/>
       <router-link style="color:white;" to="/" >MENU</router-link>
    </p>
  </div>
   
    <div class="navbar-start">
      
      <div class="navbar-item ">
        <router-link  style="color:white;" to="/about" >About</router-link> 
      </div>
      <div class="navbar-item" >
        <router-link style="color:white;" to="/orders" v-if="this.$store.getters.getRole==='admin'" >Orders</router-link>
      </div>
    </div>
    <div class="navbar-end">
      <div class="navbar-item">
        <router-link style="color:white;" v-if="!this.$store.getters.isLoggedIn" to="/sign-up" >SignUp</router-link>
      </div>
      <div class="navbar-item">
        <router-link style="color:white;" v-if="!this.$store.getters.isLoggedIn" to="/login">Login</router-link>
      </div>
      <div class="navbar-item">
        <router-link style="color:white;" v-if="this.$store.getters.isLoggedIn" to="/account">{{$store.getters.getUser}}</router-link>
      </div>
      <div class="navbar-item">
        <router-link class="is-expanded" style="color:white;" v-if="this.$store.getters.isLoggedIn&&this.$store.getters.getRole!=='admin'" to="/cart"> <i class="fas fa-shopping-cart"></i><span v-show="$store.getters.cartQuantity">({{$store.getters.cartQuantity}})</span></router-link>
      </div>
      <div class="navbar-item">
        <router-link style="color:white;" v-if="this.$store.getters.isLoggedIn" to="/logout">Logout</router-link>
      </div>
    </div>
  </nav>
  <div class="container">
  <router-view/>
</div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
   color: #2c3e50;
}

#nav {
  padding: 30px;
}

#router-link:active {
  color:black;
}

</style>
