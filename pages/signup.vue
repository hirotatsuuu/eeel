<template>
  <div style="margin-top: 100px;">
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card>
            <v-toolbar>
              <v-toolbar-title>Sign Up</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  v-model="username"
                  :counter="10"
                  label="username"
                  prepend-icon="person"
                ></v-text-field>
                <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  :counter="10"
                  label="email"
                  prepend-icon="mail"
                ></v-text-field>
                <v-text-field
                  v-model="password"
                  :append-icon="show_password ? 'visibility' : 'visibility_off'"
                  :type="show_password ? 'text' : 'password'"
                  label="password"
                  prepend-icon="lock"
                  @click:append="show_password = !show_password"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn
                flat
                v-on:click="gotoLogin"
              >LOGIN</v-btn>
              <v-spacer />
              <v-btn
                v-on:click="signup"
              >SIGNUP</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'

export default {
  layout: 'footer',
  data() {
    return {
      username: '',
      email: '',
      password: '',
      show_password: false,
    }
  },
  methods : {
    signup() {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
      .then(user => {
        this.$store.dispatch('user/setUser', user)
        this.$router.push("/")
      }).catch((error) => {
        alert(error)
      })
    },
    gotoLogin() {
      this.$router.push("/login")
    }
  }
}
</script>