import VueOnkeypress from './onkeypress.js'

const install = function(Vue) {
  Vue.directive('VueOnkeypress', VueOnkeypress)
}

if (window.Vue) {
  window.VueOnkeypress = VueOnkeypress
  Vue.use(install);
}

VueOnkeypress.install = install
export default VueOnkeypress