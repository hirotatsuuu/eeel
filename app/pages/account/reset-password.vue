<template>
  <div style="margin-top: 100px;">
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card>
            <v-toolbar>
              <v-toolbar-title>Reset Password</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  v-model="email"
                  label="email"
                  prepend-icon="email"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn
                flat
                v-on:click="gotoLogin"
              >LOGIN</v-btn>
              <v-spacer></v-spacer>
              <v-btn
                v-on:click="send"
              >SEND</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
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