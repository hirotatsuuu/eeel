<template>
  <div v-if="user">
    <v-toolbar
      fixed
      app
    >
      <v-btn
        flat
        round
        v-on:click="gotoHome"
        style="margin-left: -15px"
      >
        <v-icon left>home</v-icon>
        <strong style="margin-left: -10px;">ホーム</strong>
      </v-btn>
      <v-btn
        flat
        round
        disabled
      >
        <v-icon>notifications</v-icon>
        <strong style="margin-left: 3px;">通知</strong>
      </v-btn>
      <v-btn
        flat
        round
        disabled
      >
        <v-icon>mail</v-icon>
        <strong style="margin-left: 5px;">メッセージ</strong>
      </v-btn>
      <v-spacer />
      <v-toolbar-title>
        <span style="cursor: pointer;">
          <img src="@/assets/images/logo.png" alt="logo" style="height: 35px;" v-on:click="gotoHome">
        </span>
      </v-toolbar-title>
      <v-spacer />
      <div style="margin-right: 10px;">
      <v-text-field
        append-icon="search"
        label="キーワード検索"
        style="margin-top: 10px; margin-left: 15px; margin-right: -5px;"
        disabled
      ></v-text-field>
      </div>
      <v-menu offset-y open-on-hover>
        <template v-slot:activator="{ on }">
          <v-btn
            icon
            style="margin-left: 10px;"
            v-on="on"
          >
            <v-avatar
              size="30"
              tile
              v-if="user.userImage"
            >
              <img :src="user.userImage" style="object-fit: cover; border-radius: 30px;">
            </v-avatar>
            <v-avatar
              size="30"
              tile
              v-else
            >
              <v-icon large color="grey darken-1">account_circle</v-icon>
            </v-avatar>
          </v-btn>
        </template>
        <v-list>
          <v-list-tile avatar v-on:click="gotoMyAccount">
            <v-list-tile-content>
              <v-list-tile-title><span class="title">{{ user.username }}</span></v-list-tile-title>
              <v-list-tile-sub-title><span class="caption">{{ user.email }}</span></v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider></v-divider>
          <v-list-tile
            v-on:click="gotoMyAccount"
          >
            <v-list-tile-title>プロフィール</v-list-tile-title>
          </v-list-tile>
          <v-list-tile
            v-on:click="gotoSettings"
          >
            <v-list-tile-title>設定</v-list-tile-title>
          </v-list-tile>

          <v-list-tile
            @click.stop="isLogoutDialog = true"
          >
            <v-list-tile-title>ログアウト</v-list-tile-title>
          </v-list-tile>

        </v-list>
      </v-menu>
      <v-btn
        dark
        round
        v-on:click="gotoCreatePost"
      >
        <v-icon>add_circle_outline</v-icon>
        <strong style="margin-left: 3px;">作成</strong>
      </v-btn>
    </v-toolbar>
    <v-dialog
      v-model="isLogoutDialog"
      width="500"
    >
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
            v-on:click="doLogout"
          >
            ログアウトする
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'

export default {
  middleware: 'authenticated',
  data() {
    return {
      links: [
        {
          title: 'eeelについて',
          url: '',
        },
        {
          title: 'ガイドライン',
          url: '',
        },
        {
          title: 'プライバシーポリシー',
          url: '',
        },
        {
          title: '利用規約',
          url: '',
        },
        {
          title: 'Twitter',
          url: '',
        }
      ],
      user: this.$store.getters['user/user'],
      isLogoutDialog: false
    }
  },
  computed: {
    ...mapGetters({
      getUser: ['user/user']
    }),
  },
  created () {
    console.log('header created', this.user)
    this.$store.subscribe((mutation, state) => {
      this.user = this.getUser
    })
  },
  methods: {
    gotoHome() {
      this.$router.push("/")
    },
    gotoCreatePost() {
      this.$router.push("/posts/create")
    },
    gotoMyAccount () {
      console.log('gotoMyAccount', this.user)
      this.$router.push("/users/" + this.user.uid)
    },
    gotoSettings() {
      this.$router.push("/settings")
    },
    doLogout() {
      firebase.auth().signOut()
        .then(() => {
          this.isLogoutDialog = !this.isLogoutDialog
          this.$store.commit('user/setUser', null)
          this.$router.push("/account/login")
        }).catch((error) => {
          alert(error)
        })
    }
  }
}
</script>