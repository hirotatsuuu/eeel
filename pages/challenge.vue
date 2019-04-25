<template>
  <div>
    <v-layout justify-center>
      <h1>挑戦詳細</h1>
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
  }
}
</script>
