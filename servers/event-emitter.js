const EventEmmiter = require('events');

class Logger extends EventEmmiter{
    execute(cb){
        console.log('Before!');
        this.emit('start');//emito un evento(anteriormente registrado)
        cb();
        this.emit('finish');//emito otro evento
        console.log('After!')
    }

}

const logger = new Logger();

//Traduccion: cada vez que se emita el evento 'start' o 'finish, ejecuta esto
logger.on('start', ()=> console.log('Starting'));
logger.on('finish', ()=> console.log('Finishing..'));
logger.on('finish', ()=> console.log('Segundo finish y listo'));


//para que se ejecute despues hay q añadirle asincronia(settimeout)
//logger.execute(()=> console.log('Hello world')); 
logger.execute(()=> setTimeout(()=> console.log('Hello world'), 500));