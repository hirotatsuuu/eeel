<template>
  <div class="pt-5">
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6 xg4>
        <v-card>
          <v-card-title>
            <v-layout align-center justify-center>
              <span class="title mt-3">パスワード再設定</span>
            </v-layout>
          </v-card-title>
          <v-card-text class="pb-0">
            <v-form class="account_form my-0">
              <v-text-field
                v-model="email"
                :counter="32"
                label="めーるあどれす"
                prepend-icon="mail"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions class="pb-0">
            <v-layout align-center justify-center>
              <v-btn
                v-on:click="send"
                large
                block
                :dark="!!email"
                :disabled="!(!!email)"
                class="mx-5"
              >確定</v-btn>
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
import firebase from '~/plugins/firebase'

export default {
  layout: 'account',
  data() {
    return {
      email: '',
      show_password: false,
    }
  },
  methods : {
    send() {
      // TODO: パスワード再設定
      this.$router.push("/account/login")
    },
    gotoLogin() {
      this.$router.push("/account/login")
    }
  }
}
</script>