<template>
  <div class="pt-5">
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md6 xg4>
          <v-card>
            <v-card-title>
              <v-layout align-center justify-center>
                  <img src="@/assets/images/logo.png" alt="logo" style="height: 60px;">
              </v-layout>
            </v-card-title>
            <v-layout align-center justify-center>
            <span style="color: gray;" class="caption">~ 挑戦と応援をつなぐ ~</span>
              </v-layout>
            <v-card-text class="pb-0">
              <v-form class="account_form my-0">
                <v-text-field
                  v-model="email"
                  :counter="32"
                  label="めーるあどれす"
                  prepend-icon="email"
                ></v-text-field>
                <v-text-field
                  v-model="password"
                  :append-icon="show_password ? 'visibility' : 'visibility_off'"
                  :type="show_password ? 'text' : 'password'"
                  :counter="32"
                  label="ぱすわーど"
                  prepend-icon="lock"
                  @click:append="show_password = !show_password"
                ></v-text-field>
              </v-form>
              <div
                class="text-xs-right"
              >
                <v-btn
                v-on:click="gotoResetPassword"
                flat
                small
              ><span style="color: gray;" class="caption mx-4">パスワードを忘れた方はこちら</span></v-btn>
              </div>
            </v-card-text>
            <v-card-actions class="pb-0">
              <v-layout align-center justify-center>
              <v-btn
                v-on:click="doLogin"
                large
                block
                dark
                class="mx-5"
              >ログイン</v-btn>
              </v-layout>
            </v-card-actions>
              <v-layout align-center justify-center>
              <v-btn
                v-on:click="gotoSignup"
                flat
                small
              ><span style="color: gray;" class="caption mx-5">新規登録はこちら</span></v-btn>
              </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
  </div>
</template>

<script>
import firebase, { db, storage } from '~/plugins/firebase'

export default {
  layout: 'account',
  data() {
    return {
      email: 'jjj@jjj.jj',
      password: 'jjjjjj',
      show_password: false
    }
  },
  methods : {
    doLogin() {
      this.$nuxt.$loading.start()
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
      .then(user => {
        db.collection('/users')
          .doc(user.user.uid)
          .get()
          .then(doc => {
            if (doc.exists) {
              // doc.data() でデータを取得
              const userSnapshot = doc.data()
              console.log('userSnapshot', userSnapshot.username)
              this.$store.commit('user/setUser', {
                uid: user.user.uid,
                email: user.user.email,
                username: user.user.displayName,
                userImage: user.user.photoURL,
              })
              this.$store.commit('user/setInfo', userSnapshot)
              this.$nuxt.$loading.finish()
              this.$router.push("/")
            } else {
              console.log("No user")
            }
          })
          .catch(function(error) {
            console.log("Error : ", error)
          })
      }).catch((error) => {
        alert(error)
      });
    },
    gotoSignup() {
      this.$router.push("/account/signup")
    },
    gotoResetPassword() {
      this.$router.push("/account/reset-password")
    }
  }
}
</script>

<style>
@media screen and (max-width: 600px) {
  .account_form {
    padding: 0;
    margin: 0;
  }
}
@media screen and (min-width: 601px) {
  .account_form {
    margin: 10%;
  }
}
</style>
