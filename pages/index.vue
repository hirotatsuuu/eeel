<template>
  <div>
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
          <h1>ホームページ</h1>
          <v-btn
            color="primary"
            v-on:click="logout"
          >LOGOUT</v-btn>
          <v-btn
            color="primary"
            v-on:click="gotoMemberPage"
          >メンバー専用ページへ</v-btn>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'

export default {
  layout: 'header',
  mounted() {
    // TODO: ログイン確認
    // firebase.auth().onAuthStateChanged((user) => {
    //   console.log('user', user.uid, user.email)
    //   this.isAuthenticated
    // })
  },
  methods: {
    logout() {
      firebase.auth().signOut()
      .then(() => {
        this.$store.dispatch('user/setUser', null)
        this.$router.push("/login")
      }).catch((error) => {
        alert(error)
      })
    },
    gotoMemberPage() {
      this.$router.push("/member-page")
    }
  }
}
</script>
