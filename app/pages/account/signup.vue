<template>
  <div class="pt-5">
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6 xg4>
        <v-card>
          <v-card-title>
            <v-layout align-center justify-center>
              <span class="title mt-3">新規登録</span>
            </v-layout>
          </v-card-title>
          <v-card-text class="pb-0">
            <v-form class="account_form my-0">
              <v-text-field
                v-model="username"
                :counter="32"
                label="ゆーざねーむ"
                prepend-icon="person"
              ></v-text-field>
              <v-text-field
                v-model="email"
                :counter="32"
                label="めーるあどれす"
                prepend-icon="mail"
              ></v-text-field>
              <v-text-field
                v-model="password"
                :counter="32"
                :append-icon="show_password ? 'visibility' : 'visibility_off'"
                :type="show_password ? 'text' : 'password'"
                label="ぱすわーど"
                prepend-icon="lock"
                @click:append="show_password = !show_password"
              ></v-text-field>
            </v-form>
            <v-layout align-center justify-center>
              <div>
                <input
                  type="checkbox"
                  v-model="termsCheck"
                >
              <span style="color: gray;" class="caption"><a href="" style="text-decoration: none; color: black;">利用規約</a>に同意する</span>
              </div>
            </v-layout>
          </v-card-text>
          <v-card-actions class="pb-0">
            <v-layout align-center justify-center>
              <v-btn
                v-on:click="doSignup"
                large
                block
                :dark="termsCheck && !!username && !!email && !!password"
                class="mx-5"
                :disabled="!termsCheck || !(!!username) || !(!!email) || !(!!password)"
              >登録</v-btn>
            </v-layout>
          </v-card-actions>
          <v-layout align-center justify-center>
            <v-btn
              v-on:click="gotoLogin"
              flat
              small
            ><span style="color: gray;" class="caption mx-5">ログイン画面に戻る</span></v-btn>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import firebase, { db, getTimestamp } from '~/plugins/firebase'

export default {
  layout: 'account',
  data() {
    return {
      username: '',
      email: '',
      password: '',
      show_password: false,
      termsCheck: false
    }
  },
  methods : {
    doSignup () {
      console.log('doSignup')
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        .then(user => {
          this.createUser(user.user.uid)
        }).catch((error) => {
          alert(error.message)
        })
    },
    createUser (uid) {
      console.log('createUser', uid)
      const user = {
        username: this.username,
        email: this.email,
        image_url: null,
        profile: null,
        posts: null,
        likes: null,
        is_auth: false,
        is_deleted: false,
        is_hide: false,
        created_at: getTimestamp(),
        update_at: getTimestamp(),
      }
      db.collection('users').doc(uid).set(user)
        .then(() => {
          this.$store.commit('user/setUser', {
            uid: uid,
            email: this.email,
            username: this.username
          })
          this.$router.push("/")
        })
        .catch(function (error) {
          console.log('error user: ', error)
        })
    },
    gotoLogin () {
      this.$router.push("/account/login")
    },
  }
}
</script>