<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-card>
        <v-card-title class="headline">Welcome to the Dashboard project</v-card-title>
          <v-spacer></v-spacer>
          <v-btn color="cyan" flat nuxt to="/users/login">Log in</v-btn>
          <v-btn color="cyan" flat nuxt to="/users/register">Sign in</v-btn>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  name: 'Home',
  middleware: 'redirect',
  data() {
    return {
    }
  }
}
</script>
