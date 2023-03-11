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

const EXAMPLES = JSON.parse(import.meta.env.VITE_EXAMPLES);
const ANSWERS = JSON.parse(import.meta.env.VITE_ANSWERS);

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
            let respuesta = ANSWERS[response.classifications[0].prediction];
            console.log(respuesta)
            mensajes.value.push({ id: Date.now(), tipo: 'bot', texto: respuesta });
            pregunta.value = '';
            nextTick(() => {
                let ventanaChat = document.getElementById('chat');
                ventanaChat.scrollTop = ventanaChat.scrollHeight;
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