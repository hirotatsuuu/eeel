<template>
  <v-app v-if="user">
    <v-toolbar
      fixed
      app
    >
      <v-btn
        flat
        v-on:click="gotoHome"
        style="margin-left: -15px"
      >
        <v-icon left>home</v-icon>
        <strong style="margin-left: -10px;">ホーム</strong>
      </v-btn>
      <v-btn
        flat
        disabled
      >
        <v-icon>notifications</v-icon>
        <strong style="margin-left: 3px;">通知</strong>
      </v-btn>
      <v-btn
        flat
        disabled
      >
        <v-icon>mail</v-icon>
        <strong style="margin-left: 5px;">メッセージ</strong>
      </v-btn>
      <v-spacer />
      <v-toolbar-title>
        <span style="cursor: pointer;">
          <img src="/logo.png" alt="logo" style="height: 35px;" v-on:click="gotoHome">
        </span>
      </v-toolbar-title>
      <v-spacer />
      <div style="margin-right: 10px;">
      <v-text-field
        append-icon="search"
        label="キーワード検索"
        style="margin-top: 10px; margin-left: 15px; margin-right: -5px;"
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
              v-if="user.user.image_url"
            >
              <img :src="user.user.image_url" style="object-fit: cover; border-radius: 30px;">
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
            <v-list-tile-avatar v-if="user.user.image_url">
              <img :src="user.user.image_url" style="object-fit: cover;">
            </v-list-tile-avatar>
            <v-list-tile-avatar v-else>
              <v-icon large color="grey darken-1">account_circle</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{ user.username }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ user.email }}</v-list-tile-sub-title>
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
            v-on:click="doLogout"
          >
            <v-list-tile-title>ログアウト</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-btn
        dark
        v-on:click="gotoCreatePost"
      >
        <v-icon>add_circle_outline</v-icon>
        <strong style="margin-left: 3px;">作成</strong>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer
      height="auto"
    >
      <v-container mx-auto>
        <v-layout wrap>
          <v-flex xs9>
            <v-btn
              v-for="link in links"
              :key="link.title"
              :href="link.href"
              class="ml-0 mr-3"
              target="_blank"
              flat
            >
              {{ link.title }}
            </v-btn>
          </v-flex>
          <v-spacer />
            <div style="cursor: pointer;">
              <img src="/logo.png" alt="logo" style="height: 35px;" v-on:click="gotoHome()">
            </div>
        </v-layout>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script>
import firebase from '~/plugins/firebase'

export default {
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
      user: this.$store.getters['user/user']
    }
  },
  mounted() {
    console.log('header', this.$store.getters['user/user'])
  },
  methods: {
    gotoHome() {
      this.$router.push("/")
    },
    gotoMemberPage() {
      this.$router.push("/member-page")
    },
    gotoCreatePost() {
      this.$router.push("/posts/create")
    },
    gotoMyAccount () {
      console.log('gotoMyAccount', this.$store.getters['user/user'])
      this.$router.push("/users/" + this.$store.getters['user/user'].uid)
    },
    gotoSettings() {
      this.$router.push("/settings")
    },
    gotoMemberPage() {
      this.$router.push("/member-page")
    },
    doLogout() {
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