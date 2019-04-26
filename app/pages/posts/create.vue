<template>
  <div>
    <v-container grid-list-md text-xs-center style="margin-top: -20px;">
      <v-flex>
        <v-card style="margin: 5px;">
          <v-img
            :src="imageUrl ? imageUrl : postSample"
            height="200px"
          >
          </v-img>
          <v-card-title>
            <span
              class="title"
            >{{ title ? title : sampleTitle }}</span>
          </v-card-title>
          <v-card-actions>
            <v-list-tile class="grow">
              <v-list-tile-avatar>
                <v-img
                  class="elevation-6"
                  :src="accountSample"
                ></v-img>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>hirotatsu</v-list-tile-title>
              </v-list-tile-content>
              <v-spacer></v-spacer>
              <v-btn icon @click="show = !show">
                <v-icon>{{ show ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}</v-icon>
              </v-btn>
            </v-list-tile>
          </v-card-actions>
          <v-slide-y-transition>
            <v-card-text v-show="show">
              <span style="white-space:pre-wrap; word-wrap:break-word;">{{ contents }}</span>
            </v-card-text>
          </v-slide-y-transition>
        </v-card>
      </v-flex>

      <v-divider style="margin: 30px" />

      <v-text-field
        v-model="title"
        label="あなたの挑戦をひとことで表すと？"
        autofocus
        box
        outline
        counter="32"
      ></v-text-field>
      <v-flex>
        <v-textarea
          box
          label="あなたの挑戦をくわしくききたいな。"
          v-model="contents"
          counter="1000"
          outline
          rows="10"
        ></v-textarea>
      </v-flex>
      <v-btn
        outline
        large
        v-on:click="pickFile"
        v-model="imageName"
      >
        <v-icon>add_photo_alternate</v-icon>
        <strong style="margin-left: 5px;">画像アップロード</strong>
        <input
          type="file"
          style="display: none"
          ref="image"
          v-on:change="onFilePicked"
        >
      </v-btn>
      <v-btn
        v-on:click="createPost"
        outline
        large
        color="red"
      >挑戦する</v-btn>
    </v-container>
  </div>
</template>

<script>
import firebase, { db, getTimestamp, storage } from '~/plugins/firebase'

export default {
  layout: 'header',
  middleware: 'authenticated',
  data() {
    return {
      title: '',
      contents: '',
      src: '',
      dialog: false,
      imageName: '',
      imageUrl: '',
      imageFile: '',
      sampleTitle: '〇〇に挑戦します！',
      accountSample: 'https://firebasestorage.googleapis.com/v0/b/eeel-app.appspot.com/o/account_sample.png?alt=media&token=224e7297-5fe7-4c2a-9fc1-b43315e3c9c8',
      postSample: 'https://firebasestorage.googleapis.com/v0/b/eeel-app.appspot.com/o/post_sample.png?alt=media&token=d72afff6-5f94-4d2b-b39a-47b79c0241a4',
      show: false,
    }
  },
  mounted() {
    console.log('mounted', this.$store.getters['user/user'])
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.$router.push("/login")
      } else {
        console.log('user', user.uid, user.email)
      }
    })
  },
  methods: {
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
        this.imageName = ''
        this.imageFile = ''
        this.imageUrl = ''
      }
    },
    createPost() {
      console.log('createPost')
      const post = {
        uid: this.$store.getters['user/user'].uid,
        username: this.$store.getters['user/user'].username,
        user_image_url: this.$store.getters['user/isUserImage'] ? this.$store.getters['user/userImage'] : null,
        post_image_url: null,
        title: this.title,
        contents: this.contents,
        likes: null,
        comments: null,
        comment_num: 0,
        like_num: 0,
        is_start: true,
        is_fin: false,
        is_hide: false,
        created_at: getTimestamp(),
        update_at: getTimestamp(),
      }
      db.collection("posts").add(post)
        .then((doc) => {
          console.log("create post", doc.id)
          this.uploadImg(doc.id)
        })
        .catch((error) => {
          console.log('error post: ', error)
        })
    },
    uploadImg(pid) {
      console.log('uploadImg', pid, this.imageFile)
      const uploadTask = storage.ref().child("posts").child(pid).put(this.imageFile)
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        function(snapshot) {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log('Upload is paused');
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log('Upload is running');
              break;
          }
        }, function(error) {

        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
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
        // Upload completed successfully, now we can get the download URL
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log('File available at', downloadURL);
          const post = {
            post_image_url: downloadURL,
          }
          db.collection("posts").doc(pid).set(post, {merge: true})
            .then(function (doc) {
              console.log("Create Post Fin!!!!!!!!!!!!!!!!", doc)
            })
            .catch(function (error) {
              console.log('error post: ', error)
            })
        });
      });
    }
  }
}
</script>
