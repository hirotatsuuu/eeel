<template>
  <div>
    <v-layout justify-center>
      <h1>設定</h1>
      <v-btn
        v-on:click="logout"
      >LOGOUT</v-btn>
    </v-layout>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'

export default {
  layout: 'header',
  middleware: 'authenticated',
  mounted() {
    console.log('mounted')
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.$router.push("/login")
      } else {
        console.log('user', user.uid, user.email)
      }
    })
  },
  methods: {
    logout() {
      firebase.auth().signOut()
      .then(() => {
        this.$store.commit('user/setUser', null)
        this.$router.push("/login")
      }).catch((error) => {
        alert(error)
      })
    },
  }
}
</script>
