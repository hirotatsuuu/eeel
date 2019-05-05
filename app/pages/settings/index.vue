<template>
  <div>
    <v-layout class="ma-1">
      <v-flex
        v-if="this.$store.getters['post/post']"
      >
        <v-card>
          <div class="pa-1">
            <v-list>
              <v-subheader>アカウント</v-subheader>
              <v-list-tile
                v-on:click=""
                class="ma-1"
              >
                <v-list-tile-content>
                  <v-list-tile-title>メールアドレスの変更</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-btn icon ripple>
                    <v-icon color="grey lighten-1">chevron_right</v-icon>
                  </v-btn>
                </v-list-tile-action>
              </v-list-tile>

              <v-list-tile
                v-on:click=""
                class="ma-1"
              >
                <v-list-tile-content>
                  <v-list-tile-title>パスワードの変更</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-btn icon ripple>
                    <v-icon color="grey lighten-1">chevron_right</v-icon>
                  </v-btn>
                </v-list-tile-action>
              </v-list-tile>

              <v-list-tile
                v-on:click=""
                class="ma-1"
              >
                <v-list-tile-content>
                  <v-list-tile-title>アカウントの削除</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-btn icon ripple>
                    <v-icon color="grey lighten-1">chevron_right</v-icon>
                  </v-btn>
                </v-list-tile-action>
              </v-list-tile>

            </v-list>

            <v-divider />

            <v-list>
              <v-subheader>セキュリティ</v-subheader>
              <v-list-tile
                v-on:click=""
                class="ma-1"
              >
                <v-list-tile-content>
                  <v-list-tile-title>メールアドレスの認証</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-btn icon ripple>
                    <v-icon color="grey lighten-1">chevron_right</v-icon>
                  </v-btn>
                </v-list-tile-action>
              </v-list-tile>

              <v-dialog
                v-model="isLogoutDialog"
                width="500"
              >
                <template v-slot:activator="{ on }">
                  <v-list-tile
                    v-on="on"
                    class="ma-1"
                  >
                    <v-list-tile-content>
                      <v-list-tile-title>ログアウト</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </template>
                <v-card>
                  <v-card-text>
                    ログアウトしてよろしいですか？
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer />
                    <v-btn
                      flat
                      v-on:click="isLogoutDialog = false"
                    >
                      キャンセル
                    </v-btn>
                    <v-btn
                      color="primary"
                      flat
                      v-on:click="logout"
                    >
                      ログアウトする
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>

            </v-list>

            <v-divider />

            <v-list>
              <v-subheader>その他</v-subheader>
              <v-list-tile
                v-on:click=""
                class="ma-1"
              >
                <v-list-tile-content>
                  <v-list-tile-title>eeelについて</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-btn icon ripple>
                    <v-icon color="grey lighten-1">chevron_right</v-icon>
                  </v-btn>
                </v-list-tile-action>
              </v-list-tile>

              <v-list-tile
                v-on:click=""
                class="ma-1"
              >
                <v-list-tile-content>
                  <v-list-tile-title>プライバイシーポリシー</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-btn icon ripple>
                    <v-icon color="grey lighten-1">chevron_right</v-icon>
                  </v-btn>
                </v-list-tile-action>
              </v-list-tile>

              <v-list-tile
                v-on:click=""
                class="ma-1"
              >
                <v-list-tile-content>
                  <v-list-tile-title>利用規約</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-btn icon ripple>
                    <v-icon color="grey lighten-1">chevron_right</v-icon>
                  </v-btn>
                </v-list-tile-action>
              </v-list-tile>

              <v-list-tile
                v-on:click=""
                class="ma-1"
              >
                <v-list-tile-content>
                  <v-list-tile-title>お問い合わせ</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-btn icon ripple>
                    <v-icon color="grey lighten-1">chevron_right</v-icon>
                  </v-btn>
                </v-list-tile-action>
              </v-list-tile>
            </v-list>
          </div>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'

export default {
  middleware: 'authenticated',
  data() {
    return {
      isLogoutDialog: false
    }
  },
  created: () => {
    console.log('settings index created')
  },
  methods: {
    logout() {
      firebase.auth().signOut()
        .then(() => {
          this.isLogoutDialog = !this.isLogoutDialog
          this.$store.commit('user/setUser', null)
          this.$router.push("/account/login")
        }).catch((error) => {
          alert(error)
        })
    },
  }
}
</script>
