
const blocks = [
"Hola, Corina.",
"Antes que nada, gracias por tu carta. Gracias por abrir tu corazón de una forma tan sincera y tan valiente.",
"No voy a mentirte, leer cada una de tus palabras me sorprendió y me dolió profundamente. Hubo momentos en los que sentí que todo se derrumbaba dentro de mí. Aun así, agradezco haberlas leído, porque en cada línea pude sentir el cariño tan grande que alguna vez compartimos.",
"Fueron pocos los momentos que pasé a tu lado, pero fueron únicos. Me enseñaste algo que muchas veces escuché decir y que nunca había vivido realmente: que el amor no entiende de edades, ni de tiempos, ni de explicaciones. Tú me lo enseñaste con cada abrazo, con cada sonrisa, con cada beso tuyo sobre todo con cada momento que compartimos.",
"También imaginé una vida contigo. Con miedo, sí, porque no te voy a negar que lo tenía, pero la imaginé. Y aunque hoy las cosas sean distintas, sigo creyendo que una de las formas más puras de amar es querer tanto a alguien que seas capaz de dejarla ir cuando sabes que merece encontrar paz.",
"Por eso hoy me toca soltarte.",
"Perdóname por haber llegado tarde a tu vida. Perdóname si el tiempo no nos alcanzó para vivir todo aquello que alguna vez imaginamos. Nunca te vi como un segundo lugar. Nunca. Fuiste importante para mí desde el primer momento y creo que, dentro de mis posibilidades y mis errores, intenté demostrártelo.",
"Mi vida también es incierta en este momento. No sé qué pasará mañana. Pero tampoco quiero ser egoísta y pedirte que te quedes en una situación que te hace daño. Siempre te dije que eras una mujer increíble, hermosa por dentro y por fuera. Recuerdo cuando te veía dormir y pensaba: ¿De verdad tengo la suerte de estar con ella?. Y todavía me cuesta creerlo.",
"Me quedo con tus besos, con tus abrazos, con tu risa, con tu forma de decirme atrevido. Me quedo con esos pequeños momentos que parecen simples, pero que terminan convirtiéndose en los recuerdos más valiosos.",
"Quiero que sepas que nunca te recordaré con tristeza. Te recordaré con cariño, porque eso es lo que trajiste a mi vida. Alegría. Paz. Ilusión. Cosas que creía perdidas hace mucho tiempo.",
"Serás siempre esa estrella fugaz que apareció cuando menos lo esperaba. Mi deseo fuiste tú. Y ahora mi último deseo es que seas feliz, aunque quizás ya no pueda formar parte de esa felicidad.",
"No importa cuánto tiempo pase, cuántos kilómetros nos separen o cuántas vueltas dé la tierra. Siempre guardaré un rincón de mi corazón para recordarte con una sonrisa. Cuando sienta el viento, pensaré que quizá también te está abrazando a ti. Y cuando el tiempo intente borrar recuerdos, espero que conserve algunos de los nuestros.",
"Gracias por todo. Gracias por enseñarme otra forma de ver la vida. Gracias por demostrarme un amor que jamás había conocido. Gracias por cada momento que me regalaste.",
"Y si alguna vez la vida nos concede una última oportunidad de vernos, aunque sea por unos minutos, me gustaría poder despedirme mirándote a los ojos y guardarlo ese recuerdo para siempre.",
"Cuídate mucho, cosita linda.",
"Y si la noche es buena conmigo, espero soñarte una vez más, para darte ese beso que se quedó pendiente.",
"Talvez esta carta llegue tarde a la tuya, pero quería pensarlo y leerlo mucho para encontrar las palabras correctas, así como tú, correcta. Termino aquí porque si sigo escribiendo nunca termino. Adiós Corina, Adiós amor de mi vida.",
"Con cariño el Atrevido",
"P.D. No debería contarte más sobre mi vida, pero este domingo estaré por Ayacucho. Quizás el destino quiera regalarnos una última conversación."
];

const lyrics=document.getElementById('lyrics');

document.getElementById('startBtn').onclick=()=>{
 intro.style.display='none';
 music.play().catch(()=>{});
 run();
};

let index=0;

function run(){
 if(index>=blocks.length)return;

 const div=document.createElement('div');
 div.className='line current';
 div.innerText=blocks[index];
 lyrics.appendChild(div);

 const all=[...document.querySelectorAll('.line')];
 all.forEach(e=>e.classList.remove('current'));
 div.classList.add('current');

 if(all.length>5){
   all[0].remove();
 }

 const txt=blocks[index];

 if(txt.includes('Fueron pocos los momentos')){
   p1.style.opacity=1;
   p2.style.opacity=1;
 }

 if(txt.includes('También imaginé una vida contigo')){
   house.style.opacity=1;
 }

 if(txt.includes('Por eso hoy me toca soltarte')){
   p1.style.transform='translateX(-150px)';
   p2.style.transform='translateX(150px)';
 }

 if(txt.includes('estrella fugaz')){
   shooting.style.opacity=1;
   shooting.animate(
    [{transform:'translateX(0)'},{transform:'translateX(1600px) translateY(300px)'}],
    {duration:2500}
   );
 }

 index++;
 const delay = 3000 + (txt.length * 50);
 setTimeout(run, delay);
}
