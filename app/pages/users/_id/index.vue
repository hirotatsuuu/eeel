<template>
  <div class="py-3">
    <v-card style="margin-top: 100px;">
      <v-layout justify-center>
        <v-flex
          v-if="this.user"
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
          <div class="title">{{ user ? user.username : '' }}</div>
        </v-layout>
      </v-card-title>
      <v-card-text>
        <v-layout justify-center>
          <div v-if="info ? info.profile : false">{{ info.profile }}</div>
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
import { mapGetters } from 'vuex'

export default {
  middleware: 'authenticated',
  data() {
    return {
      user: '',
      info: ''
    }
  },
  computed: {
    ...mapGetters({
      getUser: ['user/user'],
      getInfo: ['user/info']
    })
  },
  mounted() {
    console.log('user mounted', this.user)
    this.$store.subscribe((mutation, state) => {
      this.user = this.getUser
      this.info = this.getInfo
    })
    this.user = this.getUser
    this.info = this.getInfo
  },
  methods: {
    gotoEdit() {
      console.log('saa', this.user.uid)
      this.$router.push(this.user.uid + "/edit")
    }
  }
}
</script>