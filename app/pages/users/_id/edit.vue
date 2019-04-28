<template>
  <div class="py-3 ma-1">
    <v-card style="margin-top: 100px;">
      <v-layout justify-center>
        <v-flex
          v-if="this.$store.getters['user/user']"
          text-xs-center
        >
          <v-avatar
            size="200"
            tile
            v-if="imageUrl || user.userImage"
            mx-auto
            v-on:click="pickFile"
            style="cursor: pointer; margin-top: -100px;"
          >
            <img
              :src="imageUrl ? imageUrl : user.userImage"
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
          <div class="caption mt-2" style="color: gray;">アイコンをクリックして編集してください。</div>
        </v-flex>
      </v-layout>
      <v-card-text>
          <v-text-field
            v-model="username"
            label="あなたの名前は？"
            box
            outline
            counter="32"
          ></v-text-field>
          <v-textarea
            box
            label="プロフィールを入力しましょう。"
            v-model="profile"
            counter="140"
            outline
            rows="10"
          ></v-textarea>
      </v-card-text>
      <v-card-actions>
        <v-layout justify-center>
          <v-btn
            v-on:click="doEdit"
            dark
          >プロフィールを保存する</v-btn>
        </v-layout>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import firebase, { auth, db, storage, getTimestamp } from '~/plugins/firebase'

export default {
  middleware: 'authenticated',
  data() {
    return {
      user: this.$store.getters['user/user'],
      info: this.$store.getters['user/info'],
      uid: this.$store.getters['user/user'].uid,
      imageName: '',
      imageUrl: '',
      imageFile: '',
      sampleImageUrl: 'https://firebasestorage.googleapis.com/v0/b/eeel-app.appspot.com/o/account_sample.png?alt=media&token=224e7297-5fe7-4c2a-9fc1-b43315e3c9c8',
      username: this.$store.getters['user/user'].username,
      profile: this.$store.getters['user/info'].profile
    }
  },
  mounted() {
    console.log('Account edit mounted', this.$store.getters['user/info'])
    this.$store.subscribe((mutation, state) => {
    })
  },
  methods: {
    doEdit () {
      console.log('doEdit')
      const uid = this.uid, username = this.username, profile = this.profile, router = this.$router, store = this.$store
      const userObj = {
        uid: this.uid,
        email: this.user.email,
        username: this.username,
        userImage: this.user.userImage
      }
      if (this.imageFile) {
        const uploadTask = storage.ref().child("users").child(uid).put(this.imageFile)
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
          function(snapshot) {
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            console.log('Upload is ' + progress + '% done')
            switch (snapshot.state) {
              case firebase.storage.TaskState.PAUSED:
                console.log('Upload is paused')
                break;
              case firebase.storage.TaskState.RUNNING:
                console.log('Upload is running')
                break;
            }
          }, function(error) {
          switch (error.code) {
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              break;
            case 'storage/canceled':
              // User canceled the upload
              break;
            case 'storage/unknown':
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        }, function() {
          uploadTask.snapshot.ref.getDownloadURL()
            .then((downloadURL) => {
              console.log('File available at', downloadURL);
              const updateUserObj = {
                username: username,
                profile: profile,
                image_url: downloadURL,
                update_at: getTimestamp()
              }
              db.collection("users").doc(uid).update(updateUserObj)
                .then(function () {
                  db.collection("users").doc(uid).get().then(doc => {
                    store.commit('user/setInfo', doc.data())
                    console.log("Update User Info Success")
                    auth.currentUser.updateProfile({
                      displayName: username,
                      photoURL: downloadURL
                    })
                      .then(function() {
                        console.log("Update User Info Success")
                        userObj.userImage = downloadURL
                        store.commit("user/setUser", userObj)
                        router.push({ path: `/users/${uid}` })
                      })
                      .catch(function(error) {
                        console.log('updateProfile error: ', error)
                      })
                  })
                  .catch(function (error) {
                    console.log('error post: ', error)
                  })
                })
          })
        })
      } else {
        const updateUserObj = {
          username: username,
          profile: profile ? profile : '',
          update_at: getTimestamp()
        }
        db.collection("users").doc(uid).update(updateUserObj)
          .then(function () {
            db.collection("users").doc(uid).get().then(doc => {
              store.commit('user/setInfo', doc.data())
              auth.currentUser.updateProfile({
                displayName: username,
              })
                .then(function() {
                  console.log("Update User Info Success")
                  store.commit("user/setUser", userObj)
                  router.push({ path: `/users/${uid}` })
                })
                .catch(function(error) {
                  console.log('updateProfile error: ', error)
                })
              })
          })
          .catch(function (error) {
            console.log('error post: ', error)
          })
      }
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