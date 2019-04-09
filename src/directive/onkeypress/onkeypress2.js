import {checkNumber} from '../../../utils/util2'

export default {
  bind: function (el,binding) {
    el.onkeypress = function(e){
      return checkNumber(e)
    }
  }
}