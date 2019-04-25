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
                  label="username"
                  prepend-icon="person"
                ></v-text-field>
                <v-text-field
                  v-model="email"
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
                v-on:click="doSignup"
              >SIGNUP</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import firebase, { db, getTimestamp } from '~/plugins/firebase'

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
    doSignup() {
      console.log('doSignup')
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        .then(user => {
          this.createUser(user.user.uid)
        }).catch((error) => {
          alert(error.message)
        })
    },
    createUser(uid) {
      console.log('createUser', uid)
      const user = {
        username: this.username,
        email: this.email,
        img: null,
        profile: null,
        posts: null,
        likes: null,
        is_auth: false,
        is_deleted: false,
        is_hide: false,
        created_at: getTimestamp(),
        update_at: getTimestamp(),
      }
      db.collection('users').doc(uid).set(user)
        .then(() => {
          this.$store.commit('user/setUser', {
            uid: uid,
            email: this.email,
            username: this.username
          })
          this.$router.push("/")
        })
        .catch(function (error) {
          console.log('error user: ', error)
        })
    },
    gotoLogin() {
      this.$router.push("/login")
    }
  }
}
</script>