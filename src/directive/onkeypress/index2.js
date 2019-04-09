import VueOnkeypress from './onkeypress2.js'

const install = function(Vue) {
  Vue.directive('VueOnkeypress2', VueOnkeypress)
}

if (window.Vue) {
  window.VueOnkeypress = VueOnkeypress
  Vue.use(install);
}

VueOnkeypress.install = install
export default VueOnkeypress