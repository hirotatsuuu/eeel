<template>
  <div>
    <v-layout class="ma-1">
      <v-flex
        v-if="this.$store.getters['post/post']"
      >
        <v-card>
          <v-card-title>
            <v-layout justify-center>
              <div class="title">設定</div>
            </v-layout>
          </v-card-title>
          <v-layout justify-center>
            <div class="caption" style="color: gray;">アカウント</div>
          </v-layout>
          <v-layout justify-center align-center text-xs-center>
            <v-flex>
              <v-btn
                dark
                v-on:click="logout"
              >ログアウトする</v-btn>
            </v-flex>
          </v-layout>
          <v-layout justify-center align-center text-xs-center>
            <v-flex>
              <v-btn
                dark
              >メールアドレスの変更</v-btn>
            </v-flex>
          </v-layout>
            <v-layout justify-center align-center text-xs-center>
            <v-flex>
              <v-btn
              dark
              >パスワードの変更</v-btn>
            </v-flex>
          </v-layout>
          <v-layout justify-center align-center text-xs-center>
            <v-flex>
              <v-btn
                color="red"
                dark
              >アカウントの削除</v-btn>
            </v-flex>
          </v-layout>
          <v-divider class="ma-3"/>
          <v-layout justify-center>
            <div class="caption" style="color: gray;">その他</div>
          </v-layout>
          <v-layout justify-center align-center text-xs-center>
            <v-flex>
              <v-btn
              >eeelについて</v-btn>
            </v-flex>
          </v-layout>
          <v-layout justify-center align-center text-xs-center>
            <v-flex>
              <v-btn
              >プライバシーポリシー</v-btn>
            </v-flex>
          </v-layout>
          <v-layout justify-center align-center text-xs-center>
            <v-flex>
              <v-btn
              >利用規約</v-btn>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'

export default {
  middleware: 'authenticated',
  created: () => {
    console.log('settings index created')
  },
  methods: {
    logout() {
      firebase.auth().signOut()
        .then(() => {
          this.$store.commit('user/setUser', null)
          this.$router.push("/account/login")
        }).catch((error) => {
          alert(error)
        })
    },
  }
}
</script>
