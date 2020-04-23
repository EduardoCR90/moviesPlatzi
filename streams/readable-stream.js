const {Readable} = require('stream');
const rs = new Readable();

//edicion de 0 sobre 0(NaN) y un espacio y lo uno a eso
rs.push(`${0/0} `.repeat(10).concat("Batman, Batman!"));
rs.push(null);//le dice a rs que dejo de recibir datos

//importante hacerle un pipe. stdout imprime
rs.pipe(process.stdout);

