<template>
  <div>
    <!-- ログイン中に表示される画面 -->
    <div v-if="isAuthenticated">
      {{ user.email }}でログイン中です<br>
      <button v-on:click="logout">ログアウト</button><br>
      <a href="/member-page">メンバーページへ</a>
    </div>
    <!-- ログインしていない時に表示される画面 -->
    <div v-else>
      <v-container fluid fill-height>
        <v-layout>
          <h1>ログインしてません</h1>
        </v-layout>
      </v-container>
    </div>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'
import { mapActions, mapState, mapGetters } from 'vuex'

export default {
  middleware: 'authenticated',
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
  mounted() {
    // firebase.auth().onAuthStateChanged((user) => {
    //   console.log('user', user.uid, user.email)
    //   this.isAuthenticated
    // })
  },
  methods : {
    login() {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
      .then(user => {
        this.$router.push("/member-page")
      }).catch((error) => {
        alert(error)
      });
    },
  }
}
</script>