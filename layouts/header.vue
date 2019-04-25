<template>
  <v-app>
    <v-toolbar
      fixed
      app
    >
      <v-btn
        flat
        v-on:click="gotoHome"
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
        placeholder="キーワード検索"
        style="margin-top: 10px; margin-left: 15px; margin-right: -5px;"
      ></v-text-field>
      </div>
      <v-btn
        icon
        v-on:click="gotoMemberPage"
        style="margin-left: 10px;"
      >
        <v-icon large>account_circle</v-icon>
      </v-btn>
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
      light
    >
      <v-layout
        justify-center
        row
        wrap
      >
        <v-flex
          lighten-2
          py-3
          text-xs-center
          xs12
        >
          <img src="/logo.png" alt="logo" style="height: 35px;">
        </v-flex>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  methods: {
    gotoHome() {
      this.$router.push("/")
    },
    gotoMemberPage() {
      this.$router.push("/member-page")
    },
    gotoCreatePost() {
      this.$router.push("/create-post")
    }
  }
}
</script>