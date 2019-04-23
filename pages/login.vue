<template>
  <div>
    <v-container fluid fill-height style="margin-top: 100px;">
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card>
            <v-toolbar color="primary">
              <v-toolbar-title>Login</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  :counter="10"
                  label="email"
                  prepend-icon="email"
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
                v-on:click="gotoSignup"
              >SIGNUP</v-btn>
              <v-spacer></v-spacer>
              <v-btn
                v-on:click="login"
              >LOGIN</v-btn>
            </v-card-actions>
            <hr>
            <v-spacer></v-spacer>
            <v-btn
              flat
              v-on:click="gotoResetPassword"
            >パスワードを忘れたかたはこちら</v-btn>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'
import { mapActions, mapState, mapGetters } from 'vuex'

export default {
  layout: 'footer',
  // middleware: 'authenticated',
  data() {
    return {
      email: 'jjj@jjj.jj',
      password: 'jjjjjj',
      show_password: false,
    }
  },
  computed: {
    ...mapState(['user']),
    ...mapGetters(['isAuthenticated'])
  },
  methods : {
    login() {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
      .then(user => {
        this.$store.dispatch('user/setUser', user)
        this.$router.push("/")
      }).catch((error) => {
        alert(error)
      });
    },
    gotoSignup() {
      this.$router.push("/signup")
    },
    gotoResetPassword() {
      this.$router.push("/reset-password")
    }
  }
}
</script>