<template>
  <div id="app">
    <!-- progress bar -->
     <vue-progress-bar></vue-progress-bar>
    <!-- navibar start -->
    <nav id="navbar" ref="navbar" class="navbar is-fixed-top is-twitter" role="navigation" aria-label="main navigation">
        <div class="container">
            <div class="navbar-brand">
            <router-link class="navbar-item" tag="a" :to="'/'">
              <button class="is-roundedfull has-background-primary">
                <img src="/static/favicon.png" alt="icon">
              </button>
            </router-link>
            <button class="button navbar-burger is-twitter is-outliness has-text-white is-radiusless"
                    data-target="navMenu"
                    @click="spanNavigation()"
                    @blur="navbarSpan = false"
                    :class="navbarSpan?'is-active':''">
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
          <div class="navbar-menu is-twitter" :class="navbarSpan?'is-active':''" id="navMenu" @mousedown.prevent>
            <div class="navbar-end" @click="navbarSpan = false">
              <div class="navbar-item">
                <div class="field is-grouped">
                  <p class="control">
                    <router-link class="button is-primary is-rounded is-small" tag="a" :to="isRegistered()?'/user/'+JSON.parse(this.isRegistered()).Eea:'/daftar'">
                      <span class="icon">
                        <img src="/static/favicon.png" alt="">
                      </span>
                      <span>
                        {{isRegistered()?'My Profile':'Login'}}
                      </span>
                    </router-link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
    </nav>
    <!-- navbar end -->
    <!-- start of dynamic router view -->
    <transition name="fade"
                mode="out-in"
                :duration="{enter:300 , leave:400}">
        <router-view/>
    </transition>
    <!-- end of dynamic router view -->
  </div>
</template>
<script>
export default {
  name: 'App',
  data(){
    return{
      navbarSpan:false,
    }
  },
  methods:{
    spanNavigation(){
      this.navbarSpan = !this.navbarSpan;
    },
    isRegistered(){
      return localStorage.getItem('profile');
    },
  },
  created(){
      this.$Progress.start();
      this.$router.beforeEach((to, from, next) => {
        //  does the page we want to go to have a meta.progress object
        if (to.meta.progress !== undefined) {
          let meta = to.meta.progress;
          // parse meta tags
          this.$Progress.parseMeta(meta);
        }
        //  start the progress bar
        this.$Progress.start();
        //  continue to next page
        next();
      });
      //  hook the progress bar to finish after we've finished moving router-view
      this.$router.afterEach((to, from) => {
        //  finish the progress bar
        this.$Progress.finish();
      });
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Noto+Sans');
html{
  background: #141D26 !important;
}
.area-text{
  width: 100%;
  height: 40px;
  border-radius: 4px;
  padding:5px;
  border: 1px solid rgb(100, 100, 100);
  margin-bottom: 10px;
}
.is-have-border{
  background: #5858585b;
  border-radius: 50%;
  box-shadow: 2px 1px 0 #5858585b;
  width: 72px;
  height: 72px;
}
.area-text.is-focus-and-contains{
  border: 2px solid rgb(100, 100, 100);
  height: 120px;
}
.box2{
  background:#243447;
  color:white;
  padding: 20px 20px 5px 20px;
  overflow: auto !important;
  /* border-radius:0px 10px 10px 15px */;
}
.messages{
  border:1px solid rgb(32, 32, 32);
  margin-top: 2.5px; 
  margin-bottom: 2.5px; 
}
.has-gap{
  margin-top:10px;margin-bottom:10px
}
.is-no-outline{
  border-radius: 0px;
  border:0px;
}
.pisuhan{
  font-size:11pt;
}
#app {
  font-family: 'Noto Sans', sans-serif;
  margin-top: 30px;
}
.is-roundedfull{
  width: 40px !important;
  height: 40px !important;
  border-radius:50% !important;
  color: white !important;
  border: none !important;
}
.is-twitter{
  background:#243447 !important; 
}
.is-twitter-dark{
  background:#141D26 !important; 
  color: white;
}
.is-footer-content{
  font-size: 10pt;
  display: -webkit-flex;
  align-items:center;
  width: 100%;
  height: 50px;
  justify-content: center;
}
.is-blue-gradient, .is-blue-gradient:hover, .is-blue-gradient:active, .is-blue-gradient:focus {
    background: #0079C8;
    background: -webkit-linear-gradient(45deg, #0079C8, #2AAFE8);
    background: -o-linear-gradient(45deg, #0079C8, #2AAFE8);
    background: -moz-linear-gradient(45deg, #0079C8, #2AAFE8);
    background: linear-gradient(45deg, #0079C8, #2AAFE8);
    color: #ffffff !important;;
    border:none !important;;
    -webkit-box-shadow: 0px 2px 6px 2px rgba(47, 150, 218, 0.09) !important;;
    -moz-box-shadow: 0px 2px 6px 2px rgba(47, 150, 218, 0.09) !important;;
    box-shadow: 0px 2px 6px 2px rgba(47, 150, 218, 0.09) !important;;
}
.is-outliness{
  border: none !important;
}
</style>
