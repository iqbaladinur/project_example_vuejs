// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import buefy from "buefy";
import 'buefy/lib/buefy.css';
import GSignInButton from 'vue-google-signin-button';
import VueClipboards from 'vue-clipboards';
import VueProgressBar from 'vue-progressbar'
import * as firebase from "firebase";

/* use your own config get it on firebase console when you created project */
const config = {
  apiKey: "AIzaSyDKRk9fIbTJ2eDT6wag22n4KzbNyrxJcLU",
  authDomain: "misuh-ec6e6.firebaseapp.com",
  databaseURL: "https://misuh-ec6e6.firebaseio.com",
  projectId: "misuh-ec6e6",
  storageBucket: "misuh-ec6e6.appspot.com",
  messagingSenderId: "162401697545"
};

/* initialize firestore */
firebase.initializeApp(config);

Vue.use(VueProgressBar, {
  color: 'rgb(143, 255, 199)',
  failedColor: 'red',
  height: '2px'
})
Vue.config.productionTip = false;
Vue.use(buefy, {
  defaultIconPack:'fas'
});
Vue.use(GSignInButton);
Vue.use(VueClipboards);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
