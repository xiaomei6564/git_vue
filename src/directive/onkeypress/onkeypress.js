import {checkNumber} from '../../../utils/util'

export default {
  bind: function (el,binding) {
    el.onkeypress = function(e){
      return checkNumber(e)
    }
  }
}