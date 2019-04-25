<template>
  <div>
    <v-container grid-list-md text-xs-center style="margin-top: -20px;">
      <v-flex xs8 offset-xs2>
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
        v-on:click="doCreatePost"
        outline
        large
        color="red"
      >挑戦する</v-btn>

      <v-divider style="margin: 30px" />

      <v-btn
        v-on:click="getPosts"
      >取得</v-btn>
      <div>
        <form>
          <input type="file" v-on:change="onUpload">
          <v-btn
            v-on:click="uploadImg"
          >storageへ</v-btn>
        </form>
      </div>
      <v-btn
        v-on:click="downloadImg"
      >画像を取得</v-btn>
      <div>
      <img
        :src="src"
        height="200px"
      >
      <div>{{ src }}と{{ title }}</div>
      <img id="image">
    </div>
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
      img: 'url',
      src: '',
      title: "",
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
    getPosts () {
      const querySnapshot = db
        .collection('posts')
        .where('is_start', '==', true)
        .onSnapshot(querySnapshot => {
          var posts = [];
          querySnapshot.forEach(doc => {
            console.log('title: ', doc.data().title)
            posts.push(doc.data().title);
          });
        });
    },
    doCreatePost() {
      console.log('doCreatePost')
      const post = {
        uid: this.$store.getters['user/user'].uid,
        username: this.$store.getters['user/user'].username,
        img: this.img,
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
        .then(function () {
          console.log("create post")
        })
        .catch(function (error) {
          console.log('error post: ', error)
        })
    },
    uploadImg() {
      console.log('uploadImg', this.file)
      const uploadTask = storage.ref().child("users").child("profile").put(this.file[0])
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
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
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          console.log('File available at', downloadURL);
        });
      });
    },
    onUpload (event) {
      console.log('onUpload', event)
      this.file = event.target.files
    },
    downloadImg () {
      console.log('downloadImg')
      var profileRef = storage.ref().child('users/profile');

      // Get the download URL
      profileRef.getDownloadURL().then(function(url) {
        // Insert url into an <img> tag to "download"
        console.log('url', url)
        // document.getElementById('image').src = url;
        this.src = url
      }).catch(function(error) {

        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/object-not-found':
            // File doesn't exist
            break;

          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;

          case 'storage/canceled':
            // User canceled the upload
            break;


          case 'storage/unknown':
            // Unknown error occurred, inspect the server response
            break;
        }
      });
    },
    pickFile () {
      this.$refs.image.click ()
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
        })
      } else {
        this.imageName = ''
        this.imageFile = ''
        this.imageUrl = ''
      }
    },
  }
}
</script>
