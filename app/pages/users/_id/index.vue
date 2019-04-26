<template>
  <div>
    <v-card style="margin-top: 100px;">
      <v-layout justify-center>
        <v-flex
          v-if="this.$store.getters['user/user']"
          xs12
          sm8
          md6
          text-xs-center
        >
            <v-avatar
              size="200"
              tile
              v-if="imageUrl || user.user_image_url"
              mx-auto
              v-on:click="pickFile"
              style="cursor: pointer; margin-top: -100px;"
            >
              <img
                :src="imageUrl ? imageUrl : user.user_image_url ? user.user_image_url : sampleImageUrl"
                style="object-fit: cover; border-radius: 100px"
              >
            </v-avatar>
            <v-avatar
              size="200"
              tile
              v-else
              v-on:click="pickFile"
              style="cursor: pointer; margin-top: -100px;"
            >
              <v-icon size="200" color="grey darken-1">account_circle</v-icon>
            </v-avatar>
            <input
              type="file"
              style="display: none"
              ref="image"
              v-on:change="onFilePicked"
            >
          </v-flex>
        </v-layout>
        <v-card-title>
          <v-layout justify-center>
            <div class="title">{{ user.username }}</div>
            <div style="margin-top: 30px;">{{ user.user.profile ? user.user.profile : '' }}</div>
        </v-layout>
      </v-card-title>
      <v-card-actions>
        <v-layout justify-center>
          <v-btn
            v-on:click="gotoSettings"
          >プロフィールを編集する</v-btn>
          <v-btn
            v-on:click="gotoSettings"
          >設定</v-btn>
        </v-layout>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'

export default {
  layout: 'header',
  middleware: 'authenticated',
  data() {
    return {
      user: this.$store.getters['user/user'],
      imageName: '',
      imageUrl: '',
      imageFile: '',
      sampleImageUrl: 'https://firebasestorage.googleapis.com/v0/b/eeel-app.appspot.com/o/account_sample.png?alt=media&token=224e7297-5fe7-4c2a-9fc1-b43315e3c9c8'
    }
  },
  mounted() {
    console.log('mounted', this.user)
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.$router.push("/login")
      } else {
        console.log('user', user.uid, user.email)
      }
    })
  },
  methods: {
    gotoSettings() {
      this.$router.push("/settings")
    },
    gotoMemberPage() {
      this.$router.push("/member-page")
    },
    pickFile () {
      this.$refs.image.click()
    },
    onFilePicked (e) {
      const files = e.target.files
      if(files[0] !== undefined) {
        this.imageName = files[0].name
        if(this.imageName.lastIndexOf('.') <= 0) {
          return
        }
        const fr = new FileReader ()
        fr.readAsDataURL(files[0])
        fr.addEventListener('load', () => {
          this.imageUrl = fr.result
          this.imageFile = files[0] // this is an image file that can be sent to server...
          console.log('imageFile', this.imageFile)
        })
      } else {
        // this.imageName = ''
        // this.imageFile = ''
        // this.imageUrl = ''
      }
    },
  }
}
</script>