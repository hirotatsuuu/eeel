<template>
  <div>
    <div v-if="$store.getters['user/isAuthenticated']">
      {{ $store.getters['user/user'] }}でログイン中
    </div>
    <div v-else>
      ログインしましょう。
    </div>
    <v-layout
      column
      justify-center
      align-center
    >
      <v-flex
        xs12
        sm8
        md6
      >
        <div class="text-xs-center">
          <h1>プロフィール</h1>
          <v-btn
            v-on:click="gotoSettings"
          >設定</v-btn>
        </div>
      </v-flex>
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
    gotoSettings() {
      this.$router.push("/settings")
    }
  }
}
</script>