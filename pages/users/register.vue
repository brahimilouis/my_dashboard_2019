<template>
      <v-container fluid :style="{'background-image':'url(https://www.justgeek.fr/wp-content/uploads/2021/06/windows-11-fond-ecran-wallpaper-3-scaled.jpg)', backgroundPosition: 'center', backgroundSize: 'cover' }">
          <v-layout column justify-center align-center fill-height>
              <v-flex xs25 sm10 md8>
                  <v-container fluid class="text-xs-center">
              <h2>Register</h2>
            <v-form>
                <v-text-field prepend-icon="person" name="Email" label="Email" v-model="email"></v-text-field>
            <v-text-field prepend-icon="person" name="Username" label="Username" v-model="username"></v-text-field>
            <v-text-field prepend-icon="lock" name="Password" label="Password" v-model="password" :type="'password'"></v-text-field>
            <v-text-field prepend-icon="lock" name="Confirm Password" label="Confirm Password" v-model="confirmpassword" @keyup.enter="alert = true; getRegister()" :type="'password'"></v-text-field>
            <v-card-actions>
              <v-btn href="/users/login">login</v-btn>
              <v-btn @click="getRegister()">Register</v-btn>
            </v-card-actions>
              <v-alert id="alert" :value="alert"></v-alert>
            </v-form>
        </v-container>
        </v-flex>
        </v-layout>
      </v-container>
</template>
<script>
    const isEmail = require("isemail");
    const axios = require('axios');

    export default {
  data() {
    return {
      email:"",
      username:"",
      password:"",
      confirmpassword:"",
      show1: false,
      show2: false,
      alert: false,
      btn: true,
      }
  },

  methods:{

    getRegister() {
        let alert = document.getElementById("alert")
        let message = "ok";
        if (this.password.length <= 8) {
            message= "password too short"
        } else if (this.password !== this.confirmpassword) {
            message = "password different"
        } else if (isEmail.validate(this.email, {errorLevel: true}) !== 0) {
            message = "adress email non valide"
         }
        if (message === "ok")
        {
            message = "Your Pseudo is already used"
            axios
                .post("/request/register", {
                    username: this.username,
                    password: this.password,
                    email: this.email
                })
                .then(response => {
                    this.alert = true
                    if (response.data === true) {
                        alert.classList.remove("error");
                        alert.classList.add("success");
                        alert.setAttribute("type", "success");
                        alert.innerHTML = "your accout is create";
                        setTimeout(() => {
                            window.location.replace("/users/login")
                        }, 500)
                    }
                    else {
                        alert.setAttribute("type", "error");
                        alert.classList.remove("success");
                        alert.classList.add("error");
                        alert.innerHTML = message
                    }
                });
        }
        else {
            this.alert = true
            alert.setAttribute("type", "error");
            alert.classList.remove("success");
            alert.classList.add("error");
            alert.innerHTML = message
        }

    },
  }
}
</script>

