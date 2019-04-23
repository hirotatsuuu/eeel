
<template>
  <div v-if="loaded">
    <slot/>
    <h3>メンバーページ</h3>
    <button v-on:click="logout">ログアウト</button>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  data() {
    return {
      loaded: false
    }
  },
  async mounted() {
    setTimeout(() => {
      if (!this.$store.dispatch('user/getter')) {
        // ログインしていなかったら飛ぶページを設定
        this.$router.push('account')
      }
      this.loaded = true
    }, 0)
  },
  methods : {
    logout() {
      firebase.auth().signOut()
      .then(() => {
        this.setUser(null)
      }).catch((error) => {
        alert(error)
      })
    }
  }
}
</script>