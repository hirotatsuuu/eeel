<template>
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
        <h1>index.vueのページ</h1>
        <a href="/login">Loginページへ</a>
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
</template>

<script>

export default {
  layout: 'header',
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
