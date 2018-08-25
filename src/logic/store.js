import Vue from 'vue';
import Vuex from "vuex";
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        formMessage: ''
    },
    mutations: {
        setFormMessage(state) {
            state.formMessage = !state.formMessage;
        }
    }
});

export default{
    store
}