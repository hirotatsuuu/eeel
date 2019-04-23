<template>
  <div>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card>
            <v-toolbar color="primary">
              <v-toolbar-title>Reset Password</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form>
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
              <v-spacer></v-spacer>
              <v-btn
                v-on:click="login"
              >SEND</v-btn>
            </v-card-actions>
            <hr>
            <v-spacer></v-spacer>
            <v-btn
              flat
              v-on:click="gotoLogin"
            >Login</v-btn>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'

export default {
  data() {
    return {
      email: 'jjj@jjj.jj',
      password: 'jjjjjj',
      show_password: false,
    }
  },
  methods : {
    signup() {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
      .then(user => {
        this.$router.push("/member-page")
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