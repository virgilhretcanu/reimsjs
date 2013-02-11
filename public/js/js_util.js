function paddy(n, p, c) {
    var pad_char = typeof c !== 'undefined' ? c : '0';
    var pad = new Array(1 + p).join(pad_char);
    return (pad + n).slice(-pad.length);
}
        
function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}        