<template>
  <div style="padding-bottom:60px">
    <section class="section">
      <div class="container">
        <div class="has-text-centered">
          <div class="columns">
            <div class="column is-3"></div>
            <div class="column is-6">
              <div v-if="profile">
                <img :src="profile.pictures" :alt="profile.U3" class="is-have-border">
                <h1>{{profile.name}}</h1>
                <br>
              </div>
              <textarea class="textarea" placeholder=" Misuho neng kene!!" v-model="pisuhanmu"></textarea>
              <br>
              <button class="button is-info is-small" @click="addPisuhanToFirebase">Caci Maki Saja Diriku</button>
              <!-- content here -->
              <div style="margin-top:30px">
                <div class="has-text-centered" :class="!loading?'is-hidden':''">
                  <i class="fas fa-spinner fa-spin"></i>
                </div>
                <div v-for="(key, index) in Messages" :key="index" class="messages">
                  <article class="media">
                    <div class="media-left">
                        <button class="button is-roundedfull is-warning"> <i class="fas fa-poo"></i></button>
                    </div>
                    <div class="box2 media-content">
                      <div class="content pisuhan">
                        {{key.message}}
                        <br>
                        <div style="color:gray; font-size:7pt !important" class="has-text-right">{{key.timestamp}}</div>
                      </div>
                    </div>
                  </article>
                </div>
                <div class="has-text-centered pisuhan" v-if="Messages.length === 0" :class="loading?'is-hidden':''">
                  Durung ono sek memisuhimu loh!
                </div>
              </div>
            </div>
            <div class="column is-3"></div>
          </div>
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
  name: 'Home',
  data () {
    return {
      Messages:[],
      pisuhanmu:null,
      loading:true,
      profile:null
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
      })
      .catch(function (error) {
        vueContext.loading = false;
        vueContext.$snackbar.open(error);
      });
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
      vueContext.loading = true;
      messageRef.add({
        message:vueContext.pisuhanmu,
        timestamp:timeStamp
      })
      .then(function(docRef) {
        vueContext.getAllMessageFromFirebase();
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
    }
  },
  mounted(){
    this.getAllMessageFromFirebase();
    this.getProfile();
  }
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
  .pisuhan{
    font-size:11pt;
    font-style: italic;
  }
  .is-roundedfull{
    width: 40px;
    height: 40px;
    border-radius:50%;
  }
  .box2{
    border: 1px solid rgb(247, 245, 245);
    background:rgb(252, 252, 252);
    padding: 20px 20px 5px 20px;
    border-radius:0px 10px 10px 15px;
  }
  .messages{
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .is-have-border{
     border-radius: 50%;
     box-shadow: 2px 1px 0 #0000005b;
  }
</style>
