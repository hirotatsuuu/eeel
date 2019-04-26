<template>
  <div>
    <v-card>
      <v-card-title>
        <v-layout justify-center>
          <div class="title">設定</div>
        </v-layout>
      </v-card-title>
      <v-card-actions>
        <v-layout justify-center>
          <v-btn
          >メールアドレス編集</v-btn>
          <v-btn
          >パスワード変更</v-btn>
          <v-btn
            v-on:click="logout"
          >ログアウトする</v-btn>
        </v-layout>
      </v-card-actions>
    </v-card>
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
