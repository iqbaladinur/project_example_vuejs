<template>
  <div id="app">
    <!-- progress bar -->
     <vue-progress-bar></vue-progress-bar>
    <!-- navibar start -->
     <nav id="navbar" ref="navbar" class="navbar is-fixed-top has-shadow is-light" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <router-link class="navbar-item" tag="a" :to="'/'">
            <span class="icon">
              <i class="fab fa-freebsd"></i>
            </span>
            <span>
              Platform Misuh
            </span>
          </router-link>
          <button class="button navbar-burger is-light is-no-outline"
                  data-target="navMenu"
                  @click="spanNavigation()"
                  @blur="navbarSpan = false"
                  :class="navbarSpan?'is-active':''">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
        <div class="navbar-menu is-light" :class="navbarSpan?'is-active':''" id="navMenu" @mousedown.prevent>
          <div class="navbar-end" @click="spanNavigation()">
            <div class="navbar-item">
              <div class="field is-grouped">
                <p class="control">
                  <router-link class="button is-blue-gradient is-rounded" tag="a" :to="'/privacy-policy'">
                    <span class="icon">
                      <i class="fas fa-book"></i>
                    </span>
                    <span>
                      privacy policy
                    </span>
                  </router-link>
                </p>
                <p class="control">
                  <router-link class="button is-blue-gradient is-rounded" tag="a" :to="'/daftar'">
                    <span class="icon">
                      <i class="fas fa-user-secret"></i>
                    </span>
                    <span>
                      {{isRegistered()?'profile':'daftar'}}
                    </span>
                  </router-link>
                </p>
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
      <keep-alive>
        <router-view/>
      </keep-alive>
    </transition>
    <!-- end of dynamic router view -->
    <!-- footer start -->
    <div class="navbar is-fixed-bottom is-light has-shadow">
      <div class="is-footer-content">
        <p class="control">
          <a href="https://github.com/iqbaladinur/project_example_vuejs.git" target="_blank" class="button is-small is-blue-gradient is-rounded">
            <span class="icon">
              <i class="fab fa-github"></i>
            </span>
            <span>
              &copy;ostryan studio
            </span>
          </a>
        </p>
      </div>
    </div>
    <!-- footer end -->
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
    }
  },
  created(){
      this.$Progress.start();
      this.$router.beforeEach((to, from, next) => {
        //  does the page we want to go to have a meta.progress object
        if (to.meta.progress !== undefined) {
          let meta = to.meta.progress
          // parse meta tags
          this.$Progress.parseMeta(meta)
        }
        //  start the progress bar
        this.$Progress.start()
        //  continue to next page
        next()
      })
      //  hook the progress bar to finish after we've finished moving router-view
      this.$router.afterEach((to, from) => {
        //  finish the progress bar
        this.$Progress.finish()
      })
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto:300');
#app {
  font-family: 'Roboto', sans-serif;
  margin-top: 50px;
  margin-bottom: 50px;
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
</style>
