export function checkNumber(e) {
    let ev = e || event;
  //   return (/[\d]/.test(String.fromCharCode(ev.keyCode || ev.which))) || ev.which === 8
  return ( /[\d|\-]/.test(String.fromCharCode(event.keyCode) ) )
  }