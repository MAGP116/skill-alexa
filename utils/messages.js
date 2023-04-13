module.exports = language => messages[language] ? messages[language] : messages['en-US'];

const messages = {
    'es-MX': {
        wait: {
            wait30s: `Hola, vamos a esperar 30 segundos
            <break time="10s"/>
            Ya van 10 segundos
            <break time="10s"/>
            Ya han pasado 20 segundos.
            <break time="10s"/>
            Han pasado 30 segundos
            `
        },
        welcome: {
            launch: 'Hola, bienvenido al cuenta cuentos, ¿Cómo puedo ayudarte?'
        },
        error: {
            error: 'Lo siento, tuve problemas para realizar lo que me pediste.',
            notFound: 'Lo siento, no pude entenderte, ¿podrias repetirlo?'
        },
        help: `Saludos, puedo ayudarte a crear cuentos, solo necesito que me entreges un concepto.
        Por ejemplo, prueba a decir: creame un cuento sobre tortugas.`,
        cancel: 'Adios, recuerda cuantos cuentos cuento.'
    },
    'en-US': {
        wait: {
            wait30s: `Hi, lets wait 30 seconds
            <break time="10s"/>
            there are 10 seconds
            20 seconds
            <break time="10s"/>
            we have waited 30 seconds
            `
        },
        welcome: {
            launch: 'Hi, welcome to tale teller, How can I help you?'
        },
        error: {
            error: 'I\'m sorry, I had problems doing what your asked me',
            notFound: 'Sorry, I didn\' get it, can you repeat it? please'
        },
        help: `Welcome, I can help you to create a new tale, just give me a topic.
        For example, try saying: create a story about turtles.`,
        cancel: 'Bye, have a nice day'
    }
}