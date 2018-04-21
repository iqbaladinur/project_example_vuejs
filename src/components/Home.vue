<template>
  <div style="padding-bottom:60px">
    <section class="section">
      <div class="container">
        <div class="has-text-centered">
          <button class="button is-warning" style="margin-bottom:30px"><i class="fas fa-poo is-size-1"></i></button>
          <h1 class="title">Misuh</h1>
          <h3> Platform misuh-misuh <b><i>completely anonymous</i></b></h3>
          <br>
          <div class="columns">
            <div class="column is-3"></div>
            <div class="column is-6">
              <textarea class="textarea" placeholder=" Misuho neng kene!!" v-model="pisuhanmu"></textarea>
              <br>
              <button class="button is-warning is-small" @click="addPisuhanToFirebase"><i class="fas fa-meh"> Pisuhi</i></button>
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
const config = {
  apiKey: "AIzaSyDKRk9fIbTJ2eDT6wag22n4KzbNyrxJcLU",
  authDomain: "misuh-ec6e6.firebaseapp.com",
  databaseURL: "https://misuh-ec6e6.firebaseio.com",
  projectId: "misuh-ec6e6",
  storageBucket: "misuh-ec6e6.appspot.com",
  messagingSenderId: "162401697545"
};
firebase.initializeApp(config);
const db = firebase.firestore();
export default {
  name: 'Home',
  data () {
    return {
      Messages:[],
      pisuhanmu:null,
      loading:true
    }
  },
  methods:{
    getAllMessageFromFirebase(){
      const vueContext = this;
      const messageRef = db.collection("pisuhan");
      messageRef.orderBy('timestamp', 'desc').get().then(function(querySnapshot) {
        let messageData = [];
        querySnapshot.forEach(function(doc) {
          messageData.push(doc.data());
        });
        vueContext.Messages = messageData;
        vueContext.loading = false;
      });
    },
    addPisuhanToFirebase(){
      const vueContext = this;
      const messageRef = db.collection("pisuhan");
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
</style>
