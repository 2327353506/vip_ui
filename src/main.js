import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import Vuex from 'vuex'
import { Loading } from 'element-ui';


Vue.use(ElementUI)
Vue.use(axios)
Vue.use(Vuex)

Vue.prototype.$get = function(url,params,fnc,err){
    let loadingInstance1 = Loading.service({ fullscreen: true });
    axios.get(url,{
      params:params
    }).then(function(response){
        fnc(response.data);
        loadingInstance1.close();
    }).catch(function (error) {
      if(err){
          err(error);
      }
      loadingInstance1.close();
    });
}

Vue.prototype.$post = function(url,params,fnc,err){
    let loadingInstance1 = Loading.service({ fullscreen: true });
    var urlParam = new URLSearchParams();
    for(var key in params){
        urlParam.append(key,params[key])
    }
    params
    axios.post(url,urlParam).then(function(response){
        fnc(response.data);
        loadingInstance1.close();
    }).catch(function (error) {
        if(err){
            err(error);
        }
        loadingInstance1.close();
    });
}

const store = new Vuex.Store({
    state: {
        root: ""
    }

})


new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
