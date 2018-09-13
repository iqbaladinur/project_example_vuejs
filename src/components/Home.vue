  <template>
    <div id="home">
      <section class="section is-paddingless-left is-paddingless-right">
        <div class="container is-fluid">
          <div class="has-text-right">
            <div class="columns">
              <div class="column is-3 is-hidden-mobile">
                <div v-if="isRegistered() != null">
                  <div class="box is-twitter has-text-centered is-radiusless">
                    <img :src="JSON.parse(this.isRegistered()).Paa" alt="L" class="is-have-border">
                    <h3 class="has-text-white">
                      {{JSON.parse(this.isRegistered()).ig}}
                    </h3>
                    <p class="is-size-7">
                      ({{JSON.parse(this.isRegistered()).U3}})
                    </p>
                    <input type="text" class="input is-small is-twitter-dark is-no-outline has-gap" :value="baseUrl()+'/user/'+JSON.parse(this.isRegistered()).Eea">
                    <p>
                      <router-link class="button is-blue-gradient is-rounded is-small" tag="a" :to="'/daftar'">
                        <span class="icon">
                          <i class="fas fa-user"></i>
                        </span>
                        <span>
                          switch account
                        </span>
                      </router-link>
                      <button class="button is-rounded is-small is-primary" @click="logout()">
                        <span class="icon">
                          <i class="fas fa-sign-out-alt"></i>
                        </span>
                        <span>
                          logout
                        </span>
                      </button>
                    </p>
                  </div>
                </div>
                <div v-else class="box has-text-centered is-twitter is-radiusless">
                  <a href="https://ostryan.com" target="_blank">
                    <img src="/static/ads2.png" alt="ostryan.com">
                  </a>
                  <p class="is-size-7 has-text-left has-text-grey-light">ads by ostryan</p>
                </div>
                <div class="box is-twitter has-text-left has-text-grey-lighter is-size-7 is-radiusless has-gap">
                    <p>Bad Words Example</p>
                    --------------------------------
                    <ul class="has-border">
                      <li>Kampret</li>
                      <li>Kampang</li>
                      <li>Bangsat si anjing</li>
                      <li>Jancuk</li>
                      <li>Fuck off</li>
                      <li>Nyerah aja..</li>
                      <li>Asu ya</li>
                    </ul>
                  </div>
              </div>
              <div class="column is-6">
                <div class="box is-twitter-light">
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
                  <button :class="focusForm == true || pisuhanmu.length != 0?'':'is-hidden'" 
                          class="button is-outlined is-rounded is-small is-light" 
                          @click="addPisuhanToFirebase">
                    <i class="fas fa-pencil-alt"> Pisuh</i>
                  </button>
                </div>
                <!-- content here -->
                <div>
                 <!--  <div style="margin-bottom:20px" class="has-text-centered" :class="!loading?'is-hidden':''">
                    <i class="fas fa-spinner fa-spin"></i>
                  </div> -->
                  <div v-for="(key, index) in Messages" :key="index" class="messages animated fadeInUp">
                    <article class="media box is-radiusless is-marginless is-twitter">
                      <div class="media-left">
                          <button class="button is-roundedfull is-uppercase is-twitter-dark">
                            <b>
                              {{key.data.message.slice(0,1)}}
                            </b>
                          </button>
                      </div>
                      <div class="box2 media-content">
                        <div class="content pisuhan">
                          {{key.data.message}}
                          <br>
                          <div style="color:gray; font-size:7pt !important" class="has-text-right">{{getWellDate(key.data.timestamp)}}</div>
                        </div>
                      </div>
                    </article>
                  </div>
                  <br>
                  <div class="is-fullwidth" :class="(Messages.length == 0)?'is-hidden':''">
                    <button :class="loadmore?'is-loading':''" class="button is-fullwidth is-radiusless is-twitter is-no-outline has-text-white" @click="getMoreMessageFromFirebase()">
                      {{loadMoreText}}
                    </button>
                  </div>
                </div>
              </div>
              <div class="column is-3">
                <div class="box is-twitter is-radiusless">
                  <a href="https://ostryan.com" target="_blank">
                    <img src="/static/ads.png" alt="ostryan.com">
                  </a>
                  <p class="is-size-7 has-text-left has-text-grey-light">ads by ostryan</p>
                  <p class="has-gap">
                    <router-link class="button is-rounded is-small is-primary" tag="a" :to="'/privacy-policy'">
                      <span>
                        privacy police
                      </span>
                    </router-link>
                  </p>
                </div>
              </div>
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
        pisuhanmu:"",
        loading:true,
        loadmore:false,
        focusForm:false,
        profile:JSON.parse(this.isRegistered()),
        lastSnap:[],
        limitData:25,
        loadMoreText:"more"
      }
    },
    methods:{
      /* methods untuk mendapatkan seluruh pesan */
      getMoreMessageFromFirebase(){
        const vueContext = this;
        vueContext.loadmore = true;
        const messageRef = db.collection("pisuhan");
        const lastData = vueContext.Messages[vueContext.Messages.length -1].snap;
        messageRef.orderBy('timestamp', 'desc').startAfter(lastData).limit(vueContext.limitData).get().then(function (snapshot) {
          let counter = 0;
          snapshot.forEach(function(doc) {
            vueContext.Messages.push({data:doc.data(), id:doc.id, snap:doc});
            counter++;
          });
          vueContext.loadmore = false;
          vueContext.loadMoreText = counter == 0?'no more dude':'more'; 
        })
        .catch(function (error) {
          vueContext.loadmore = false;
          vueContext.$snackbar.open("error");
        });
      },
      /* methods get Realtime data */
      getRealtimeDataFromFirebase(){
        const vueContext = this;
        const messageRef = db.collection("pisuhan");
        messageRef.orderBy('timestamp', 'desc').limit(vueContext.limitData).onSnapshot(function (querySnapshot) {
          let messageData = [];
          querySnapshot.forEach(function(doc) {
            messageData.push({data:doc.data(), id:doc.id, snap:doc});
          });
          setTimeout(() => {
            vueContext.loading = false;
            vueContext.Messages = messageData;
            vueContext.$Progress.finish();
          }, 1000);
        })
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
      /* local days */
      getWellDate(string){
        return moment(string).fromNow();
      },
      isRegistered(){
        return localStorage.getItem('profile');
      },
      baseUrl(){
        return window.location.hostname;
      },
      logout(){
        localStorage.removeItem('profile');
        location.reload();
      }
    },
    mounted(){
      this.getRealtimeDataFromFirebase();
    },
  }
  </script>

  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
    .is-footer-content{
      font-size: 10pt;
      display: flex;
      align-items:center;
      width: 100%;
      justify-content: center;
    }
    .is-paddingless-left{
      padding-left: 0px; 
    }
    .is-paddingless-right{
      padding-right: 0px; 
    }
  </style>
