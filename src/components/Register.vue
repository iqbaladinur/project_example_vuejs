<template>
  <div>
    <section class="section">
      <div class="container">
        <div class="columns">
          <div class="column"></div>
          <div class="column has-text-centered">
            <div class="box">
              <i class="fas fa-user-circle fa-5x" v-if="!isRegistered"></i>
              <div v-if="isRegistered">
                <img :src="profile.Paa" alt="L" class="is-have-border">
                <h1>{{profile.ig}}</h1>
              </div>
              <hr>
              <h1>{{message}}</h1>
            </div>
            <div v-if="isRegistered">
              <input type="text" class="input is-small" v-model="url">
              <br><br>
              <router-link class="button is-blue-gradient is-rounded is-small" tag="a" :to="'/user/'+ profile.Eea">
                <span class="icon">
                  <i class="fas fa-user"></i>
                </span>
                <span>
                  Lihat Halaman Saya >>
                </span>
              </router-link>
              <button class="button is-blue-gradient is-rounded is-small" v-clipboard="url" @click="toastCopy">
                <span class="icon">
                  <i class="fas fa-copy"></i>
                </span>
                <span>
                  Salin URL
                </span>
              </button>
            </div>
            <br>
            <g-signin-button
              :params="googleSignInParams"
              @success="onSignInSuccess"
              @error="onSignInError"
              class="button is-blue-gradient is-small is-rounded">
              <span class="icon">
                <i class="fab fa-google"></i>
              </span>
              <span>
                {{btnGoogle}}
              </span>
            </g-signin-button>
          </div>
          <div class="column"></div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import * as firebase from "firebase";
import 'firebase/firestore';
const db = firebase.firestore();
export default {
  name:'register',
  data () {
    return {
      /**
       * The Auth2 parameters, as seen on
       * https://developers.google.com/identity/sign-in/web/reference#gapiauth2initparams.
       * As the very least, a valid client_id must present.
       * @type {Object}
       */
      googleSignInParams: {
        client_id: '162401697545-t9e1f02srt0568qq4djjot5kemutog6g.apps.googleusercontent.com'
      },
      profile:null,
      isRegistered:false,
      message:"Daftar untuk menampung kebencian teman-teman mu!",
      url:null,
      btnGoogle:"Daftar dengan Google"
    }
  },
  methods: {
    onSignInSuccess (googleUser) {
      const vueInstance = this;
      const messageRef = db.collection("user");
      const rawProfile = googleUser.getBasicProfile(); // etc etc
      const uId     = googleUser.getId();
      messageRef.doc(uId).set({
        pictures:rawProfile.Paa,
        email:rawProfile.U3,
        name:rawProfile.ig
      })
      .then(function(docRef) {
        vueInstance.profile = rawProfile;
        vueInstance.isRegistered = true;
        vueInstance.message = "Halaman ujaran kebencian yang completely anonymous untukmu telah dibuat!";
        vueInstance.url = "https://misuh.azurewebsites.net/user/"+uId;
        localStorage.setItem('profile', JSON.stringify(rawProfile));
      })
      .catch(function(error) {
        vueInstance.$snackbar.open(error.message);
      });
    },
    onSignInError (error) {
      this.$snackbar.open(error.error.replace(/_/g, " "));
    },
    toastCopy(){
      this.$toast.open({
        position: 'is-bottom',
        message: `copied`,
      });
    },
  },
  mounted(){
    const vueInstance = this;
    if (localStorage.getItem('profile')) {
      const data = JSON.parse(localStorage.getItem('profile'));
      vueInstance.profile = data;
      vueInstance.isRegistered = true;
      vueInstance.message = "Halaman ujaran kebencian yang completely anonymous untukmu telah dibuat!";
      vueInstance.url = "https://misuh.azurewebsites.net/user/"+ data.Eea;
      vueInstance.btnGoogle = "Pakai Akun Lain"
    }
    this.$Progress.finish();
  }
}
</script>
<style scoped>
  .g-signin-button {
    /* This is where you control how the button looks. Be creative! */
    display: inline-block;
    padding: 4px 8px;
    border-radius: 3px;
    background-color: #3c82f7;
    color: #fff;
    box-shadow: 0 3px 0 #0f69ff;
    cursor:pointer;
  }
  .is-have-border{
    background: #5858585b;
    border-radius: 50%;
    box-shadow: 2px 1px 0 #5858585b;
    width: 96px;
    height: 96px;
  }
</style>
