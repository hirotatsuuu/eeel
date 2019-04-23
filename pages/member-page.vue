<template>
  <div>
    <h1>ログインしていないと見れないページ</h1>
    <a href="/sample/account">アカウントページへ</a>
    <v-btn
      color="primary"
      v-on:click="logout"
    >LOGOUT</v-btn>
  </div>
</template>

<script>
export default {
  layout: 'home',
  methods: {
    logout() {
      firebase.auth().signOut()
      .then(() => {
        this.$store.dispatch('user/setUser', null)
      }).catch((error) => {
        alert(error)
      })
    }
  }
}
</script>