<template>
  <div class="py-3">
    <v-card style="margin-top: 100px;">
      <v-layout justify-center>
        <v-flex
          v-if="this.$store.getters['user/user']"
          text-xs-center
        >
          <v-avatar
            size="200"
            tile
            v-if="user.userImage"
            mx-auto
            style="margin-top: -100px;"
          >
            <img
              :src="user.userImage"
              style="object-fit: cover; border-radius: 100px"
            >
          </v-avatar>
          <v-avatar
            size="200"
            tile
            v-else
            style="margin-top: -100px;"
          >
            <v-icon size="200" color="grey darken-1">account_circle</v-icon>
          </v-avatar>
        </v-flex>
      </v-layout>
      <v-card-title>
        <v-layout justify-center>
          <div class="title">{{ user.username }}</div>
        </v-layout>
      </v-card-title>
      <v-card-text>
        <v-layout justify-center>
          <div v-if="userInfo.profile">{{ userInfo.profile }}</div>
          <div v-else style="color: gray;" class="caption">プロフィールがありません。</div>
        </v-layout>
      </v-card-text>
      <v-card-actions>
        <v-layout justify-center>
          <v-btn
            v-on:click="gotoEdit"
            dark
          >プロフィールを編集する</v-btn>
        </v-layout>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'

export default {
  middleware: 'authenticated',
  data() {
    return {
      user: this.$store.getters['user/user'],
      userInfo: this.$store.getters['user/userInfo']
    }
  },
  mounted() {
    console.log('user mounted', this.user)
  },
  methods: {
    gotoEdit() {
      console.log('saa', this.user.uid)
      this.$router.push(this.user.uid + "/edit")
    }
  }
}
</script>