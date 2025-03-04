const util = require("util");
/** Melhora o log do terminal para que mostre os dados completos */
function betterLog(input) {
   console.log(util.inspect(input, { depth: null,  }));
}

module.exports = betterLog;
