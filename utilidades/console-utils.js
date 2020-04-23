//estos son placeholder para formatear datos
// %s --> string
// %d --> numero
// %j --> jason

//util.format
console.log("Un %s y un %s", "perrito", "gatito");

console.info("Icono informativo");
console.warn("Icono de warning");

//esto es util para comprobar si es igual o no (booleans)
console.assert(42 == "42");//== no es estricto asi q no pasa nada
console.assert(42 === "42"); //imp assertion failed

console.trace("Esto indica la linea en la q estoy");

//si ejecuto NODE DEBUG=foo node console-utils en consola
//aparecera info de donde aparece mi debuglog
const util = require("util");
const debuglog = util.debuglog("foo");
debuglog("hello from foo");

//con esto indico q hay alguna funcion q esta deprecada
const helloPluto = util.deprecate(()=>{
    console.log("hello pluto")
}, 'pluto no es un planeta ya.. estás obsoleto mi colega!');
//helloPluto();


//RETO:
//crear una consola a partir de la clase console y empepinarla

/*ejemplo

const consoleAux = newconsole.Console(process.stdout, process.stderr);
let fecha = new Date();
consoleAux.printInfo = (msg = "") => {
  console.info(
    "\x1b[36m%s\x1b[0m",
    "[Information] - " + fecha + ":: ",
    "\x1b[0m",
    "\n\t >> " + msg
  );
};

consoleAux.printWarn = (msg = "") => {
  console.warn(
    "\x1b[33m%s\x1b[0m",
    "[Warning] - " + fecha + ":: ",
    "\x1b[0m",
    "\n\t >> " + msg
  );
};

consoleAux.printErr = (msg = "") => {
  console.error(
    "\x1b[31m%s\x1b[0m",
    "[Error] - " + fecha + ":: ",
    "\x1b[0m",
    "\n\t >> " + msg
  );
};

consoleAux.printSuc = (msg = "") => {
  console.log(
    "\x1b[32m%s\x1b[0m",
    "[Success]  - " + fecha + ":: ",
    "\x1b[0m",
    "\n\t >> " + msg
  );
};

consoleAux.printInfo("Mensaje de información.");
consoleAux.printWarn("Mensaje de advertencia.");
consoleAux.printErr("Mensaje de error.");
consoleAux.printSuc("Mensaje de éxito.");

*/