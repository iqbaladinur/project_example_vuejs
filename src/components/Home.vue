  <template>
    <div style="padding-bottom:60px">
      <section class="section">
        <div class="container">
          <div class="has-text-centered">
            <button class="button is-danger" style="margin-bottom:30px"><i class="fab fa-freebsd is-size-1"></i></button>
            <h1 class="title">misuh</h1>
            <h3> Platform untuk misuh-misuh</h3>
            <br>
            <div class="columns">
              <div class="column is-3"></div>
              <div class="column is-6">
                <textarea class="textarea" placeholder=" Misuho neng kene!!" v-model="pisuhanmu"></textarea>
                <br>
                <button class="button is-dark is-small" @click="addPisuhanToFirebase"><i class="fab fa-telegram-plane"> kirim misuh</i></button>
                <!-- content here -->
                <div style="margin-top:30px">
                  <div class="has-text-centered" :class="!loading?'is-hidden':''">
                    <i class="fas fa-spinner fa-spin"></i>
                  </div>
                  <div v-for="(key, index) in Messages" :key="index" class="messages">
                    <article class="media">
                      <div class="media-left">
                          <button class="button is-roundedfull is-uppercase" :class="randCLassColor()">
                            <b>
                              {{key.message.slice(0,1)}}
                            </b>
                          </button>
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
  /* moment.js */
  const moment = require('moment');

  /* use firebase */
  import * as firebase from "firebase";
  import 'firebase/firestore';
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
      /* methods untuk mendapatkan seluruh pesan */
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
          vueContext.$Progress.finish();
        })
        .catch(function (error) {
          vueContext.loading = false;
          vueContext.$snackbar.open(error);
          vueContext.$Progress.fail();
        });
      },

      /* methods untuk menambah data */
      addPisuhanToFirebase(){
        const vueContext = this;
        const messageRef = db.collection("pisuhan");
        const timeStamp = firebase.firestore.FieldValue.serverTimestamp();
        if (vueContext.pisuhanmu.trim()) {
          vueContext.loading = true;
          messageRef.add({
            message:vueContext.pisuhanmu,
            timestamp:timeStamp
          })
          .then(function(docRef) {
            vueContext.getAllMessageFromFirebase();
            vueContext.pisuhanmu = null;
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

      /* local days */
      getWellDate(string){
        return moment(string).fromNow();
      }
    },
    mounted(){
      this.getAllMessageFromFirebase();
    },
    beforeCreate(){
      this.$Progress.start();
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
