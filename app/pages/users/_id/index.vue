<template>
  <div class="py-3 ma-1">
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
              style="object-fit: cover; border-radius: 100px;"
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
            round
            large
          >プロフィールを編集する</v-btn>
        </v-layout>
      </v-card-actions>
      <v-card-text class="pa-0 ma-0">
        <v-tabs
          v-model="tabs"
          fixed-tabs
          class="mx-3 mt-3"
        >
          <v-tab href="#tab-1">
            <span class="title">挑戦リスト</span>
          </v-tab>
          <v-tab href="#tab-2">
            <span class="title">応援リスト</span>
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tabs">
          <v-tab-item value="tab-1">
            <v-card flat>
              <v-card-text>
                <v-container fluid fill-height>
                  <v-layout align-center justify-center>
                    <v-flex xs12 sm8 md4>
                      <span>まだ挑戦している企画はありません</span>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item value="tab-2">
            <v-card flat>
              <v-card-text>
                <v-container fluid fill-height>
                  <v-layout align-center justify-center>
                    <v-flex xs12 sm8 md4>
                      <span>まだ応援している企画はありません</span>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card-text>
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
      info: '',
      tabs: null,
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