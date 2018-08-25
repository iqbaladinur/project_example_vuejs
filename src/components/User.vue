<template>
  <div style="padding-bottom:60px">
    <section class="section">
      <div class="container">
        <div class="has-text-centered">
          <div class="columns">
            <div class="column is-3">
              <div v-if="profile" class="box is-radiusless is-twitter has-text-centered">
                <img :src="profile.pictures" class="is-have-border">
                <h3 class="has-text-white">
                  {{profile.name}}
                </h3>
                <p class="is-size-7 has-text-white has-gap">
                  Give me your hated opinions.
                </p>
                <input type="text" class="input is-small is-twitter-dark is-no-outline has-gap" :value="baseUrl()+'/user/'+getUid()">
                <p>
                  <router-link class="button is-blue-gradient is-rounded is-small" tag="a" :to="'/daftar'">
                    <span class="icon">
                      <i class="fas fa-user"></i>
                    </span>
                    <span>
                      switch to your account
                    </span>
                  </router-link>
                </p>
              </div>
            </div>
            <div class="column is-6">
              <div class="box is-twitter is-radiusless has-text-right">
                <div class="columns">
                  <div class="column is-2 has-text-left is-hidden-mobile">
                    <button class="is-roundedfull has-background-info">
                      <img src="/static/favicon.png" alt="icon">
                    </button>
                  </div>
                  <div class="column is-10">
                    <div class="control" :class="loading?'is-loading':''">
                      <textarea
                        id="mainboard"
                        ref="mainboard" 
                        class="area-text is-twitter-dark"
                        :class="focusForm == true || pisuhanmu.length != 0?'is-focus-and-contains':''" 
                        placeholder="Misuho neng kene!!" 
                        v-model="pisuhanmu"
                        @focus="focusForm = true"
                        @blur="focusForm = false"
                        ></textarea>
                    </div>
                  </div>
                </div>
                <button class="button is-outlined is-rounded is-small is-light" @click="addPisuhanToFirebase"><i class="fas fa-pencil-alt"> Pisuh</i></button>
              </div>
              <!-- content here -->
              <div style="margin-top:30px">
                <div v-for="(key, index) in Messages" :key="index" class="messages animated fadeInUp">
                  <article class="media box is-radiusless is-marginless is-twitter">
                    <div class="media-left">
                        <button class="button is-roundedfull is-uppercase" :class="randCLassColor()"> <b>{{key.message.slice(0,1)}}</b></button>
                    </div>
                    <div class="box2 media-content">
                      <div class="content pisuhan">
                        {{key.message}}
                        <br>
                        <div style="color:gray; font-size:7pt !important" class="has-text-right">{{getWellDate(key.timestamp)}}</div>
                      </div>
                    </div>
                  </article>
                </div>
                <div class="has-text-centered pisuhan" v-if="Messages.length === 0" :class="loading?'is-hidden':''">
                  Durung ono sek memisuhimu loh!
                </div>
              </div>
            </div>
            <div class="column is-3">
              <div class="box is-twitter is-radiusless">
                <p class="has-text-justify has-text-white has-gap is-size-6">
                  This page is public
                </p>
                <a href="https://ostryan.com" target="_blank">
                  <img src="/static/ads.png" alt="ostryan.com">
                </a>
                <p class="is-size-7 has-text-left has-text-grey-light">ads by ostryan</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>

import * as firebase from "firebase";
import 'firebase/firestore';
const moment = require('moment');
const db = firebase.firestore();
export default {
  name: 'Home',
  data () {
    return {
      Messages:[],
      pisuhanmu:"",
      loading:true,
      profile:null,
      focusForm:false,
    }
  },
  methods:{
    getAllMessageFromFirebase(){
      const vueContext = this;
      const uId = vueContext.$route.params.uId;
      const messageRef = db.collection(uId);
      messageRef.orderBy('timestamp', 'desc').get().then(function(querySnapshot) {
        let messageData = [];
        querySnapshot.forEach(function(doc) {
          messageData.push(doc.data());
        });
        vueContext.Messages = messageData;
        vueContext.loading = false;
        vueContext.$Progress.finish();
      })
      .catch(function (error) {
        vueContext.loading = false;
        vueContext.$snackbar.open(error);
        vueContext.$Progress.fail();
      });
    },
    baseUrl(){
      return window.location.hostname;
    },
    getRealtimeDataFromFirebase(){
      const vueContext = this;
      const uId = vueContext.$route.params.uId;
      const messageRef = db.collection(uId);
      messageRef.orderBy('timestamp', 'desc').onSnapshot(function (querySnapshot) {
        let messageData = [];
        querySnapshot.forEach(function(doc) {
          messageData.push(doc.data());
        });
        setTimeout(() => {
          vueContext.loading = false;
          vueContext.Messages = messageData;
          vueContext.$Progress.finish();
        }, 1000);
      })
    },
    getProfile(){
      const vueContext = this;
      const uId = vueContext.$route.params.uId;
      const messageRef = db.collection('user');
      messageRef.doc(uId).get()
      .then(function(doc) {
        if (doc.exists) {
            vueContext.profile = doc.data();
        } else {
            console.log("No such document!");
        }
      })
      .catch(function (error) {
        vueContext.$snackbar.open(error);
      });
    },
    addPisuhanToFirebase(){
      const vueContext = this;
      const uId = vueContext.$route.params.uId;
      const messageRef = db.collection(uId);
      const timeStamp = firebase.firestore.FieldValue.serverTimestamp();
      if (vueContext.pisuhanmu.trim()) {
        vueContext.loading = true;
        messageRef.add({
          message:vueContext.pisuhanmu,
          timestamp:timeStamp
        })
        .then(function(docRef) {
          vueContext.pisuhanmu = "";
        })
        .catch(function(error) {
          console.error("Error : ", error);
          vueContext.loading = false;
          vueContext.$snackbar.open({
              duration: 5000,
              message: 'Misuhmu gagal dikirim!',
              type: 'is-danger',
              position: 'is-bottom-left',
              actionText: 'Baleni',
              queue: false,
              onAction: () => {
                vueContext.addPisuhanToFirebase();
              }
          })
        });
      }else{
        vueContext.$snackbar.open({
            message: 'Jangan dikosongi!',
            type: 'is-danger',
            position: 'is-bottom-right',
            queue: false,
        })
      }
    },
    /* random color class*/
    randCLassColor(){
      const colors = ['is-warning', 'is-info', 'is-success', 'is-danger', 'is-dark', 'is-light'];
      return colors[Math.floor(Math.random()*colors.length)];
    },
    getUid(){
      return this.$route.params.uId;
    },
    /* local days */
    getWellDate(string){
      return moment(string).fromNow();
    }
  },
  mounted(){
    this.getRealtimeDataFromFirebase();
    this.getProfile();
  },
  beforeCreate(){
    this.$Progress.start();
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .is-no-outline{
    border-radius: 0px;
    border:0px;
  }
  .is-footer-content{
    font-size: 10pt;
    display: flex;
    align-items:center;
    width: 100%;
    justify-content: center;
  }
  .is-roundedfull{
    width: 40px;
    height: 40px;
    border-radius:50%;
  }
  .is-have-border{
     border-radius: 50%;
     box-shadow: 2px 1px 0 #0000005b;
  }
</style>
