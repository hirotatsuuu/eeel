<template>
  <div>
    <v-layout class="ma-1">
      <v-flex text-xs-center>
        <v-card>
          <div style="cursor: pointer;" v-on:click="pickFile" class="pt-3">
            <input
              type="file"
              style="display: none"
              ref="image"
              v-on:change="onFilePicked"
            >
              <v-container v-if="imageUrl" grid-list-md text-xs-center class="py-0">
                <img
                  :src="imageUrl"
                  style="height: auto; width: 100%; max-height: 500px; object-fit: contain;"
                >
              </v-container>
              <v-container  v-else text-xs-center class="py-0">
                <img
                  src="@/assets/images/post_sample_image.png"
                  style="height: auto; width: 100%;  max-height: 500px; object-fit: contain;"
                >
              </v-container>
            </div>
          <v-divider style="margin: 15px 30px;"/>
          <v-container class="pt-0">
            <v-text-field
              v-model="title"
              label="あなたの挑戦をひとことで表すと？"
              box
              outline
              counter="32"
              maxlength="32"
            ></v-text-field>
            <v-flex>
              <v-textarea
                box
                label="あなたの挑戦をくわしく教えてほしいな"
                v-model="contents"
                outline
                rows="10"
                counter="1000"
                maxlength="1000"
              ></v-textarea>
            </v-flex>
            <v-btn
              v-on:click="createPost"
              outline
              large
              color="red"
              round
              :disabled="!(!!title && !!contents && !!imageFile)"
            >挑戦する</v-btn>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import firebase, { db, getTimestamp, storage } from '~/plugins/firebase'

export default {
  middleware: 'authenticated',
  data() {
    return {
      title: '',
      contents: '',
      imageName: '',
      imageUrl: '',
      imageFile: '',
      postSampleImageUrl: '@/assets/images/post_sample_image.png',
    }
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
      }
    },
    createPost() {
      console.log('createPost')
      const post = {
        uid: this.$store.getters['user/user'].uid,
        username: this.$store.getters['user/user'].username,
        user_image_url: this.$store.getters['user/user'].userImage ? this.$store.getters['user/user'].userImage : null,
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
