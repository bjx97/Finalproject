<template>
<div class="hero">
  <div class="heroBox">
    <form class="regis-form">
        <h2>Register for an account</h2>
        <br/>
        <input placeholder="Enter first name" v-model="firstName">
        <input placeholder="Enter last name" v-model="lastName">
        <input placeholder="Choose username" v-model="username">
        <input type="password" placeholder="Choose password" v-model="password"><br/>
        <div class="center">
          <button type="submit" class="button" @click.prevent="register">Register</button>
        </div>
    </form>
    <p style="margin: 70px"><strong>OR</strong></p>
    <p v-if="error" class="error">{{error}}</p>
    <form class="login-form">
        <h2>Login</h2><br/>
        <input placeholder="username" v-model="usernameLogin">
        <input type="password" placeholder="password" v-model="passwordLogin"><br/>
        <div class="center">
          <button type="submit" class="button" @click.prevent="login">Login</button>
        </div>
    </form>
    <p v-if="errorLogin" class="error">{{errorLogin}}</p>
  </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'HomePage',
  data() {
    return {
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      usernameLogin: '',
      passwordLogin: '',
      error: '',
      errorLogin: '',
    }
  },
  methods: {
    async register() {
      this.error = '';
      this.errorLogin = '';
      if (!this.firstName || !this.lastName || !this.username || !this.password)
        return;
      try {
        let response = await axios.post('/api/users', {
          firstName: this.firstName,
          lastName: this.lastName,
          username: this.username,
          password: this.password,
        });
        this.$root.$data.user = response.data.user;
      } catch (error) {
        this.error = error.response.data.message;
        this.$root.$data.user = null;
      }
    },
    async login() {
      this.error = '';
      this.errorLogin = '';
      if (!this.usernameLogin || !this.passwordLogin)
        return;
      try {
        let response = await axios.post('/api/users/login', {
          username: this.usernameLogin,
          password: this.passwordLogin,
        });
        this.$root.$data.user = response.data.user;
      } catch (error) {
        this.errorLogin = "Error: " + error.response.data.message;
        this.$root.$data.user = null;
      }
    },
  }
}
</script>

<style scoped>

h1 {
  font-size: 28px;
  font-variant: capitalize;
}

.hero {
  padding: 10px;
  display: flex;
  justify-content: center;
}

.heroBox {
  text-align: center;
  display: flex;
  justify-content: space-around;
}

.regis-form{
  display: flex;
  flex-direction: column;
}

.login-form {
  display: flex;
  flex-direction: column;
}

.hero form {
  font-size: 14px;
}

.hero form legend {
  font-size: 20px;
}

input {
  margin-right: 10px;
}

.error {
  margin-top: 10px;
  display: inline;
  padding: 5px 20px;
  border-radius: 30px;
  font-size: 10px;
  background-color: #d9534f;
  color: #fff;
}

.button{
  padding:5px;
  font-size: 13px;
  transition-duration: 0.4s;
  width: 100px;
}

.button:hover {
  background-color: #227eb4;
  color: white;
}

.center {
  align-items: center;
}
</style>
