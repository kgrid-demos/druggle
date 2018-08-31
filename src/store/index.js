import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'
import 'es6-promise/auto'
import VuexPersistence from 'vuex-persist'
Vue.use(Vuex)
const vuexLocal = new VuexPersistence ({
    key:"rxpattern",
    storage: window.localStorage,
    reducer: state => ({paths:state.paths
    })
})
export default new Vuex.Store({
  // strict: debug,
  plugins: [vuexLocal.plugin],
  state:{
    paths:{}
  },
  mutations: {
    setpaths(state, paths){
      state.paths=JSON.parse(JSON.stringify(paths))
    },
  },
  getters: {
    getactivatorurls:state=>{
      return state.paths.activator_urls
    },
  },
  actions: {
    copytoclipboard(context, text){
      if (window.clipboardData && window.clipboardData.setData) {
        // IE specific code path to prevent textarea being shown while dialog is visible.
        return clipboardData.setData("Text", text);
      } else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
        var textarea = document.createElement("textarea");
        textarea.textContent = text;
        textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in MS Edge.
        document.body.appendChild(textarea);
        textarea.select();
        try {
            return document.execCommand("copy");  // Security exception may be thrown by some browsers.
        } catch (ex) {
            console.warn("Copy to clipboard failed.", ex);
            return false;
        } finally {
            document.body.removeChild(textarea);
        }
    }
    }
  }
})
