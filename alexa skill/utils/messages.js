module.exports = language => messages[language] ? messages[language] : messages['en-US'];

const messages = {
    'es-MX': {
        language: "spanish",
        chatgptpromt: "cuentame una cuento sobre",
        list: {
            countStories: (count, names) =>`${count > 1 ? `Encontre ${count} cuentos guardados, los nombres son: ${names}` : `Encontre un cuento guardado, el nombre es: ${names}`}, ¿Cuál quieres que te cuente?`,
            noStories: "No cuenta con ninguna historia guardada"
        },
        wait: {
            wait30s: `Hola, vamos a esperar 30 segundos
            <break time="10s"/>
            Ya van 10 segundos
            <break time="10s"/>
            Ya han pasado 20 segundos.
            <break time="10s"/>
            Han pasado 30 segundos
            `,
            wait10s: `Hola, vamos a esperar 10 segundos
            <break time="10s"/>
            Ya pasaron 10 segundos`
        },
        test: {
            tale: `Había una vez un grupo de piratas que navegaban por los mares en busca de tesoros y riquezas. Eran conocidos por ser los más temidos y malvados de todos los mares, y siempre estaban buscando una oportunidad para hacer alguna travesura. Un día, mientras navegaban cerca de una pequeña isla, vieron a una tortuga solitaria nadando en el agua. Los piratas se burlaron de ella y comenzaron a perseguirla. La tortuga intentó escapar, pero los piratas eran más rápidos y lograron acercarse cada vez más. Finalmente, uno de los piratas logró atraparla y la llevó de regreso al barco, donde comenzaron a jugar con ella y a hacerle trucos. La pobre tortuga se sentía triste y asustada, y no sabía qué hacer. Pero entonces, uno de los piratas más sabios y experimentados del grupo, se acercó a la tortuga y le explicó que lo que ellos estaban haciendo estaba mal y que debían liberarla. Los demás piratas protestaron, pero finalmente, todos acordaron dejar ir a la tortuga. A partir de ese momento, los piratas aprendieron a ser más considerados con los demás seres vivos y se dieron cuenta de que la maldad no era la única forma de vida. Descubrieron que podían encontrar riquezas y aventuras sin tener que lastimar a nadie en el camino. Y así, los piratas se convirtieron en un grupo de amigos aventureros, siempre en la búsqueda de tesoros pero ahora con un corazón más noble y una mayor compasión por los demás seres vivos. La tortuga, por su parte, encontró su camino de regreso al océano donde podía nadar libre y segura. La moraleja de la historia es que siempre es importante ser conscientes de nuestras acciones y tratar a los demás seres vivos con amabilidad y respeto.`,
            answer: `Había una vez un grupo de piratas que navegaban por los mares en busca de tesoros y riquezas. Eran conocidos por ser los más temidos y malvados de todos los mares,
            <audio src="soundbank://soundlibrary/nature/amzn_sfx_ocean_wave_1x_01"/>
             y siempre estaban buscando una oportunidad para hacer alguna travesura. Un día,
            <audio src="soundbank://soundlibrary/animals/amzn_sfx_bird_forest_01"/>
             mientras navegaban cerca de una pequeña isla, vieron a una tortuga solitaria nadando en el agua.
            <audio src="soundbank://soundlibrary/water/nature/nature_03"/>
             Los piratas se burlaron de ella y comenzaron a perseguirla. La tortuga intentó escapar, pero los piratas eran más rápidos y lograron acercarse cada vez más. Finalmente, uno de los piratas logró atraparla y la llevó de regreso al barco, donde comenzaron a jugar con ella y a hacerle trucos. La pobre tortuga se sentía triste y asustada, y no sabía qué hacer. Pero entonces, uno de los piratas más sabios y experimentados del grupo, se acercó a la tortuga y le explicó que lo que ellos estaban haciendo estaba mal y que debían liberarla. Los demás piratas protestaron, pero finalmente, todos acordaron dejar ir a la tortuga. A partir de ese momento, los piratas aprendieron a ser más considerados con los demás seres vivos y se dieron cuenta de que la maldad no era la única forma de vida. Descubrieron que podían encontrar riquezas 
            <audio src="soundbank://soundlibrary/cloth_leather_paper/money_coins/money_coins_03"/>
            y aventuras sin tener que lastimar a nadie en el camino. Y así, los piratas se convirtieron en un grupo de amigos aventureros, siempre en la búsqueda de tesoros 
            <audio src="soundbank://soundlibrary/cloth_leather_paper/money_coins/money_coins_03"/>
            pero ahora con un corazón más noble y una mayor compasión por los demás seres vivos. La tortuga, por su parte, encontró su camino de regreso al océano donde podía nadar libre y segura. La moraleja de la historia es que siempre es importante ser conscientes de nuestras acciones y tratar a los demás seres vivos con amabilidad y respeto.`
        },
        welcome: {
            launch: 'Hola, bienvenido al cuentacuentos, ¿Cómo puedo ayudarte?'
        },
        error: {
            error: 'Lo siento, tuve problemas para realizar lo que me pediste.',
            notFound: 'Lo siento, no pude entenderte, ¿podrias repetirlo?',
            noLogged: "Lo siento, no puedo ayudarlo en eso si no inicias sesion",
            notFoundList: 'Lo siento, no fui capas de encontrar ese cuento, ¿Podrías repetirlo?'
        },
        question:{
            answerNo: "Entendido, no lo voy a hacer",
            answerYes: "Perfecto, dame un momento para hacerlo"
        },
        help: `Saludos, puedo ayudarte a crear cuentos, solo necesito que me entregues un concepto.
        Por ejemplo, prueba a decir: créame un cuento sobre tortugas.`,
        cancel: 'Adios, recuerda cuantos cuentos cuento.'
    },
    'en-US': {
        language: "english",
        chatgptpromt: "tell me a tale about",
        list: {
            countStories: (count, names) => `I found ${count} saved tales, their titles are: ${names}`
        },
        wait: {
            wait30s: `Hi, lets wait 30 seconds
            <break time="10s"/>
            there are 10 seconds
            20 seconds
            <break time="10s"/>
            we have waited 30 seconds
            `,
            wait10s: `Hi, lets wait 30 seconds
            <break time="10s"/>
            there are 10 seconds`
        },
        test: { answer: "hi" },
        welcome: {
            launch: 'Hi, welcome to tale teller, How can I help you?'
        },
        error: {
            error: 'I\'m sorry, I had problems doing what your asked me',
            notFound: 'Sorry, I didn\' get it, can you repeat it? please',
            noLogged: "Sorry, I can't help you with that if you are not logged in."
        },
        help: `Welcome, I can help you to create a new tale, just give me a topic.
        For example, try saying: create a story about turtles.`,
        cancel: 'Bye, have a nice day'
    }
}