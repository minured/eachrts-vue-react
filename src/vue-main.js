import Vue from 'vue'
import vueApp from './app'

new Vue({
  render: h => h(vueApp)
}).$mount(document.getElementById('root'))

