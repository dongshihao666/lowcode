import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueCodeMirror from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'

Vue.use(ElementUI);
Vue.use(VueCodeMirror)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
