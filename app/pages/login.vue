<template>
  <div>
    <v-container fluid fill-height style="margin-top: 100px;">
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card>
            <v-toolbar>
              <v-toolbar-title>Login</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  v-model="email"
                  :counter="32"
                  label="email"
                  prepend-icon="email"
                ></v-text-field>
                <v-text-field
                  v-model="password"
                  :append-icon="show_password ? 'visibility' : 'visibility_off'"
                  :type="show_password ? 'text' : 'password'"
                  :counter="32"
                  label="password"
                  prepend-icon="lock"
                  @click:append="show_password = !show_password"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn
                flat
                v-on:click="gotoSignup"
              >SIGNUP</v-btn>
              <v-spacer></v-spacer>
              <v-btn
                v-on:click="login"
              >LOGIN</v-btn>
            </v-card-actions>
            <hr>
            <v-spacer></v-spacer>
            <v-btn
              flat
              v-on:click="  gotoResetPassword"
            >パスワードを忘れたかたはこちら</v-btn>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import firebase, { db, storage } from '~/plugins/firebase'

export default {
  layout: 'footer',
  // middleware: 'authenticated',
  data() {
    return {
      email: 'jjj@jjj.jj',
      password: 'jjjjjj',
      show_password: false,
    }
  },
  mounted() {
    console.log('mounted')
    // firebase.auth().onAuthStateChanged((user) => {
    //   if (!user) {
    //     this.$router.push("/login")
    //   } else {
    //     console.log('user', user.uid, user.email)
    //     this.$router.push("/")
    //   }
    // })
  },
  methods : {
    login() {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
      .then(user => {
        db.collection('/users')
          .doc(user.user.uid)
          .get()
          .then(doc => {
            if (doc.exists) {
              // doc.data() でデータを取得
              const userSnapshot = doc.data()
              console.log('userSnapshot', userSnapshot.username);
              this.$store.commit('user/setUser', {
                uid: user.user.uid,
                email: user.user.email,
                username: userSnapshot.username,
                user: userSnapshot
              })
              this.$router.push("/")
            } else {
              console.log("No user");
            }
          })
          .catch(function(error) {
            console.log("Error : ", error);
          })


      }).catch((error) => {
        alert(error)
      });
    },
    gotoSignup() {
      this.$router.push("/signup")
    },
    gotoResetPassword() {
      this.$router.push("/reset-password")
    }
  }
}
</script>