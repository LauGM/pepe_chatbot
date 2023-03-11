<script setup>
import { nextTick, ref } from 'vue';
const pregunta = ref('');
const mensajes = ref([
    {
        id: '1',
        tipo: 'bot',
        texto: 'Hola soy Pepe, el bot de Lau. Estoy preparado para responder algunas preguntas sobre ella, la programacion y javascript 🤓'
    }
]);
const EXAMPLES = [
    { text: 'Que es javascript ?', label: 'bases' },
    { text: 'javascript', label: 'bases' },
    { text: 'Como puedo aprender a programar ?', label: 'hardware' },
    { text: 'Que necesito para empezar a programar ?', label: 'hardware' },
    { text: 'Cuantas horas tengo que dedicarle a la programacion ?', label: 'capacitacion' },
    { text: 'Para que me sirve javascript ? ', label: 'bases' },
    { text: 'Quien programo este chat ?', label: 'creadora' },
    { text: 'Quien dicta javascript ? ', label: 'creadora' },
    { text: 'Como lidiar con la frustracion ?', label: 'capacitacion' },
    { text: 'Que necesito saber antes que javascript ?', label: 'bases' },
    { text: 'Quien es Lau ?', label: 'creadora' },
    { text: 'Que software me permite codear en javascript ?', label: 'bases' },
    { text: 'Es posible programar con un celular ?', label: 'hardware' },
    { text: 'Tengo que saber matematicas para programar ?', label: 'capacitacion' },
    { text: 'Se puede programar sin computadora ? ', label: 'hardware' },
    { text: 'Como salio river ? ', label: 'otro' },
    { text: 'Hace calor ? ', label: 'otro' },
    { text: 'Que auto te gusta ? ', label: 'otro' },
    { text: 'Quien es Messi ? ', label: 'otro' },
    { text: 'Hola ', label: 'saludo' },
    { text: 'como estas ? ', label: 'saludo' },
    { text: 'Buenas ', label: 'saludo' },
    { text: 'contame algo sobre lau ', label: 'creadora' },
    { text: 'quien es Laura ? ', label: 'creadora' },
];

const ANSWERS = {
    saludo: '👋 Hola, que te gustaria preguntarme? Se respuestas basicas sobre Javascript, programacion y sobre mi creadora',
    bases: 'JavaScript es un lenguaje de programación o de secuencias de comandos que te permite implementar funciones complejas en páginas web, cada vez que una página web hace algo más que sentarse allí y mostrar información estática para que la veas, muestra oportunas actualizaciones de contenido, mapas interactivos, animación de Gráficos 2D/3D, interactividad en general, etc., puedes apostar que probablemente JavaScript está involucrado. ✅',
    hardware: 'Esta pregunta es un poco relativa, ya que para empezar a programar casi cualquier computadora 💻 moderna cumple con las especificaciones mínimas para iniciar en este hermoso mundo. Pero si queremos dedicarnos de lleno y estar tranquilos, necesitamos tener la seguridad de saber qué tanto nos va a servir la herramienta que estamos utilizando.  Pc con Windows o Linux o Mac te vendrá bien, celulares y tablet no son recomendados',
    capacitacion: '💡 Te recomiendo practicar al menos una hora por día durante un año y conocerás bastante de éste hermoso mundo, deberás lidiar con la frustración entendiendo que todos hemos pasado por eso y que hay que seguir adelante.  No es necesario que sepas matemáticas pero sería bueno!',
    creadora: '👩‍💻 Lau es analista de sistemas y profe de programación desde hace más de 15 años.  Ella programó este chat y dicta curso de javascript y vue.js',
    otro: 'No estoy preparado para responder a eso 🤷🏻'
}

function evaluarFrase() {
    console.log('evaluando frase...')
    mensajes.value.push({ id: Date.now(), tipo: 'usuario', texto: pregunta.value });
    const options = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            authorization: 'Bearer pJcFfnz0f0uTFMVRjM7zA6QdCgRlosi4ERjib3zA'
        },
        body: JSON.stringify({
            inputs: [pregunta.value],
            examples: EXAMPLES
        })
    };

    fetch('https://api.cohere.ai/v1/classify', options)
        .then(response => response.json())
        .then(response => {
            console.log(response.classifications[0].prediction)
            /* let respuesta = eval(`ANSWERS.${response.classifications[0].prediction}`); */
            let respuesta = ANSWERS[response.classifications[0].prediction];
            console.log(respuesta)
            mensajes.value.push({ id: Date.now(), tipo: 'bot', texto: respuesta });
            pregunta.value = '';
            nextTick(() => {
                let ventanaChat = document.getElementById('chat');
                ventanaChat.scrollTop = ventanaChat.scrollHeight;
                console.log(ventanaChat.scrollTop)
            });
        })
        .catch(err => console.error(err));
}
</script>

<template>
    <main class="container text-white text-lg">
        <h1 class="m-auto max-w-lg p-4">ChatBot de programacion JavaScript hecho por Lau - 2023</h1>
        <div class="m-auto max-w-lg border border-gray-400 p-4 rounded-md bg-gradient-to-r from-sky-500 to-indigo-500">
            <div id='chat' class="flex flex-col gap-4 h-[450px] overflow-y-auto">
                <div v-for="mensaje of mensajes" :key="mensaje.id" class="p-4 max-w-[80%] rounded-3xl text-white" :class="(mensaje.tipo == 'bot')
                    ? 'bg-botColor text-left self-start rounded-bl-none'
                    : 'bg-userColor text-right self-end rounded-br-none'">
                    {{ mensaje.texto }}
                </div>
            </div>
            <form @submit.prevent='evaluarFrase()' class="flex items-center">
                <input v-model="pregunta" type="text" placeholder="Que es JavaScript?"
                    class="p-1 m-1 bg-primary rounded rounded-r-none flex-1 border border-b-4">
                <button type='submit' class="px-4 py-2 bg-userColor rounded-lg rounded-l-none">Enviar</button>
            </form>
        </div>
    </main>
</template>

<style scoped></style>