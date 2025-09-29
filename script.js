// Datos para las actividades
const datosMapa = {
    1: {
        titulo: "Teatro de Epidauro (Grecia)",
        descripcion: "El Teatro de Epidauro es famoso por su excepcional acústica. Construido en el siglo IV a.C., permite que el sonido se escuche claramente en todas sus gradas, incluso desde el escenario hasta la última fila, a casi 60 metros de distancia.",
        pregunta: "¿Cómo crees que lograron que el sonido se escuche claramente en todas las gradas?",
        respuestaCorrecta: "arquitectura",
        justificacion: "La respuesta correcta es 'arquitectura' porque el diseño del teatro permite que el sonido se distribuya de manera uniforme, sin necesidad de amplificación."
    },
    2: {
        titulo: "Cueva o bosque",
        descripcion: "Las cuevas y los bosques son entornos naturales donde podemos experimentar fenómenos acústicos como el eco y la reverberación. El sonido rebota en las superficies duras como las paredes de roca o los troncos de los árboles.",
        pregunta: "Describe cómo rebota el sonido en este entorno.",
        respuestaCorrecta: "reverberación",
        justificacion: "La respuesta correcta es 'reverberación' porque es el fenómeno en el que el sonido se refleja varias veces antes de extinguirse, creando sensación de eco prolongado."
    },
    3: {
        titulo: "Estudio de grabación moderno",
        descripcion: "Los estudios de grabación modernos utilizan técnicas avanzadas de aislamiento acústico y tratamiento del sonido para crear espacios donde el sonido puede ser capturado con la mayor fidelidad posible.",
        pregunta: "¿Qué materiales ayudan a evitar que el sonido 'rebote' en las paredes?",
        respuestaCorrecta: "absorbentes",
        justificacion: "La respuesta correcta es 'absorbentes' porque estos materiales disminuyen la reflexión del sonido y evitan ecos no deseados en un espacio cerrado."
    },
    4: {
        titulo: "Hospital o clínica auditiva",
        descripcion: "En los centros de audiología, se estudia el oído y se ayuda a personas con pérdida auditiva mediante diversas tecnologías y tratamientos.",
        pregunta: "¿Qué tecnología usamos para ayudar a personas con pérdida auditiva?",
        respuestaCorrecta: "audífonos",
        justificacion: "La respuesta correcta es 'audífonos' porque amplifican el sonido y mejoran la capacidad auditiva de quienes tienen pérdida parcial de audición."
    },
    5: {
        titulo: "Estadio o sala de conciertos",
        descripcion: "Los espacios grandes como estadios y salas de conciertos presentan desafíos acústicos únicos. El sonido debe distribuirse uniformemente para que todos los asistentes tengan una experiencia auditiva óptima.",
        pregunta: "¿Cómo se ajusta el sonido en espacios grandes para que se escuche bien en todas partes?",
        respuestaCorrecta: "sistemas de amplificación",
        justificacion: "La respuesta correcta es 'sistemas de amplificación' porque distribuyen el sonido de forma uniforme y evitan que algunos lugares se escuchen más fuerte que otros."
    }
};

// Variables para puntuaciones
let puntuacionSonidos = 0;
let puntuacionMapa = 0;
let puntuacionArrastrar = 0;

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
    inicializarNavegacion();
    inicializarActividades();
    inicializarSonidos();
    inicializarMapa();
    inicializarArrastrar();
    inicializarEvaluacion();
    inicializarVideo();
});

// Navegación entre secciones
function inicializarNavegacion() {
    document.querySelectorAll('.menu a').forEach(enlace => {
        enlace.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = enlace.id.replace('link-', '');
            
            // Ocultar todas las secciones
            document.querySelectorAll('.seccion').forEach(seccion => {
                seccion.classList.remove('activa');
            });
            
            // Mostrar la sección objetivo
            document.getElementById(targetId).classList.add('activa');
            
            // Scroll suave al inicio de la sección
            document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
        });
    });
}

// Navegación entre actividades
function inicializarActividades() {
    document.querySelectorAll('.actividad-btn').forEach(boton => {
        boton.addEventListener('click', () => {
            const actividadId = boton.getAttribute('data-actividad');
            
            // Quitar clase activo de todos los botones
            document.querySelectorAll('.actividad-btn').forEach(btn => {
                btn.classList.remove('activo');
            });
            
            // Añadir clase activo al botón clickeado
            boton.classList.add('activo');
            
            // Ocultar todas las actividades
            document.querySelectorAll('.actividad').forEach(actividad => {
                actividad.classList.remove('activa');
            });
            
            // Mostrar la actividad seleccionada
            document.getElementById(actividadId).classList.add('activa');
        });
    });
}

// Funcionalidad de sonidos
function inicializarSonidos() {
    // Reproducir sonidos
    document.querySelectorAll('.play-sonido').forEach(boton => {
        boton.addEventListener('click', () => {
            const tipoSonido = boton.getAttribute('data-sonido');
            const audio = boton.nextElementSibling; // El elemento audio siguiente
            
            // Detener cualquier sonido previo
            document.querySelectorAll('audio').forEach(a => {
                if (a !== audio) {
                    a.pause();
                    a.currentTime = 0;
                }
            });
            
            // Reproducir el sonido
            audio.play().catch(e => console.log("Error al reproducir el sonido: ", e));
            
            // Guardar el tipo de sonido en el botón para verificación posterior
            boton.setAttribute('data-tipo-actual', tipoSonido);
        });
    });

    // Reproducir sonidos mini
    document.querySelectorAll('.play-mini').forEach(boton => {
        boton.addEventListener('click', (e) => {
            e.stopPropagation(); // Evitar que se active el arrastre
            const audio = boton.nextElementSibling; // El elemento audio siguiente
            
            // Detener cualquier sonido previo
            document.querySelectorAll('audio').forEach(a => {
                if (a !== audio) {
                    a.pause();
                    a.currentTime = 0;
                }
            });
            
            // Reproducir el sonido
            audio.play().catch(e => console.log("Error al reproducir el sonido: ", e));
        });
    });

    // Verificar respuestas de sonidos
    document.querySelectorAll('.verificar').forEach(boton => {
        boton.addEventListener('click', () => {
            const contenedorSonido = boton.closest('.sonido-card');
            const selector = contenedorSonido.querySelector('.selector-sonido');
            const resultado = contenedorSonido.querySelector('.resultado');
            const tipoSonido = contenedorSonido.querySelector('.play-sonido').getAttribute('data-tipo-actual');
            
            if (!tipoSonido) {
                resultado.textContent = "Primero reproduce un sonido";
                resultado.className = "resultado incorrecto";
                return;
            }
            
            if (!selector.value) {
                resultado.textContent = "Selecciona una opción";
                resultado.className = "resultado incorrecto";
                return;
            }
            
            const respuestaUsuario = selector.value;
            const respuestaCorrecta = tipoSonido;
            
            if (respuestaUsuario === respuestaCorrecta) {
                resultado.textContent = "¡Correcto!";
                resultado.className = "resultado correcto";
                puntuacionSonidos += 5; // 5 puntos por cada respuesta correcta (2 sonidos = 10 puntos)
                document.getElementById('puntuacion-sonidos').textContent = Math.round(puntuacionSonidos);
            } else {
                resultado.textContent = `Incorrecto. Intenta de nuevo`;
                resultado.className = "resultado incorrecto";
            }
        });
    });
}

// Mapa interactivo
function inicializarMapa() {
    document.querySelectorAll('.punto-mapa').forEach(punto => {
        punto.addEventListener('click', () => {
            const puntoId = punto.getAttribute('data-id');
            const datos = datosMapa[puntoId];
            
            if (datos) {
                const modal = document.getElementById('modal-mapa');
                const titulo = document.getElementById('modal-titulo');
                const descripcion = document.getElementById('modal-descripcion');
                const pregunta = document.getElementById('modal-pregunta');
                
                titulo.textContent = datos.titulo;
                descripcion.textContent = datos.descripcion;
                pregunta.textContent = datos.pregunta;
                
                modal.style.display = 'block';
                
                // Guardar el ID del punto para verificación posterior
                modal.setAttribute('data-punto-id', puntoId);
                
                // Limpiar resultados anteriores
                document.getElementById('modal-resultado').textContent = '';
                document.getElementById('modal-respuesta').value = '';
            }
        });
    });

    // Cerrar modal
    document.querySelector('.cerrar').addEventListener('click', () => {
        document.getElementById('modal-mapa').style.display = 'none';
    });

    // Verificar respuesta en el mapa
    document.getElementById('modal-verificar').addEventListener('click', () => {
        const modal = document.getElementById('modal-mapa');
        const puntoId = modal.getAttribute('data-punto-id');
        const respuestaUsuario = document.getElementById('modal-respuesta').value.toLowerCase();
        const resultado = document.getElementById('modal-resultado');
        
        if (puntoId && datosMapa[puntoId]) {
            if (respuestaUsuario.includes(datosMapa[puntoId].respuestaCorrecta)) {
                resultado.textContent = "¡Respuesta correcta! +2 puntos. " + datosMapa[puntoId].justificacion;
                resultado.className = "correcto";
                puntuacionMapa += 2; // 2 puntos por cada respuesta correcta (5 puntos = 10 puntos)
                document.getElementById('puntuacion-mapa').textContent = puntuacionMapa;
            } else {
                resultado.textContent = "Intenta de nuevo. " + datosMapa[puntoId].justificacion;
                resultado.className = "incorrecto";
            }
        }
    });

    // Cerrar modal al hacer clic fuera de él
    window.addEventListener('click', (e) => {
        const modal = document.getElementById('modal-mapa');
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Arrastrar y soltar
function inicializarArrastrar() {
    document.querySelectorAll('.sonido-item').forEach(elemento => {
        elemento.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', elemento.getAttribute('data-sonido'));
            elemento.style.opacity = '0.5';
        });
        
        elemento.addEventListener('dragend', () => {
            elemento.style.opacity = '1';
        });
    });

    document.querySelectorAll('.onda-destino').forEach(destino => {
        destino.addEventListener('dragover', (e) => {
            e.preventDefault();
            destino.style.background = '#e9ecef';
        });
        
        destino.addEventListener('dragleave', () => {
            destino.style.background = '';
        });
        
        destino.addEventListener('drop', (e) => {
            e.preventDefault();
            const sonidoId = e.dataTransfer.getData('text/plain');
            const tipoOnda = destino.getAttribute('data-onda');
            
            // Verificar si la combinación es correcta (RESPUESTAS CRUZADAS)
            let esCorrecto = false;
            
            // Sonido agudo va con longitud media
            if (sonidoId === "agudo" && tipoOnda === "corta") {
                esCorrecto = true;
            } 
            // Sonido grave va con longitud larga
            else if (sonidoId === "grave" && tipoOnda === "larga") {
                esCorrecto = true;
            }
            
            // Feedback visual
            if (esCorrecto) {
                destino.style.borderColor = "#28a745";
                destino.style.background = "#d4edda";
                
                // Sumar puntos
                puntuacionArrastrar += 5; // 5 puntos por cada respuesta correcta (2 elementos = 10 puntos)
                document.getElementById('puntuacion-arrastrar').textContent = Math.round(puntuacionArrastrar);
                
                // Deshabilitar este destino
                destino.style.pointerEvents = 'none';
            } else {
                destino.style.borderColor = "#dc3545";
                destino.style.background = "#f8d7da";
                
                // Revertir después de un momento
                setTimeout(() => {
                    destino.style.borderColor = "";
                    destino.style.background = "";
                }, 1000);
            }
        });
    });
}

// Evaluación
function inicializarEvaluacion() {
    document.getElementById('evaluacion-form').addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Respuestas correctas
        const respuestasCorrectas = {
            p1: "b",
            p2: "b",
            p3: "c",
            p4: "c",
            p5: "c"
        };
        
        // Calificar
        let puntaje = 0;
        for (let i = 1; i <= 5; i++) {
            const seleccionada = document.querySelector(`input[name="p${i}"]:checked`);
            if (seleccionada && seleccionada.value === respuestasCorrectas[`p${i}`]) {
                puntaje += 2; // 2 puntos por cada respuesta correcta (5 preguntas = 10 puntos)
            }
        }
        
        // Mostrar resultado
        document.getElementById('puntuacion-final').textContent = puntaje;
        const mensaje = document.getElementById('mensaje-evaluacion');
        
        if (puntaje >= 8) {
            mensaje.textContent = "¡Excelente! Demuestras un gran entendimiento de los conceptos acústicos.";
        } else if (puntaje >= 5) {
            mensaje.textContent = "Buen trabajo, pero hay algunos conceptos que necesitas repasar.";
        } else {
            mensaje.textContent = "Sería beneficioso revisar los conceptos acústicos nuevamente.";
        }
        
        document.querySelector('.resultado-evaluacion').style.display = 'block';
        document.querySelector('.resultado-evaluacion').scrollIntoView({ behavior: 'smooth' });
    });

    // Material de apoyo
    document.getElementById('verificar-video').addEventListener('click', () => {
        const resultado = document.querySelector('.resultado-video');
        resultado.textContent = "Esperamos que respondieras de forma correcta y reponsable y que esto te ayudara a reforzar tus conocimientos.";
        resultado.className = "resultado-video correcto";
    });
}

// Inicializar video
function inicializarVideo() {
    const video = document.getElementById('video-educativo');
    if (video) {
        // Asegurarse de que el video no se reproduzca automáticamente
        video.autoplay = false;
        video.preload = "metadata"; // Solo cargar metadatos, no el video completo
        
        // Pausar el video si por alguna razón está reproduciéndose
        video.pause();
        
        // Reiniciar el video al principio
        video.currentTime = 0;
    }
}
// Funcionalidad para expandir imágenes
function inicializarImagenes() {
    // Modal para imágenes expandidas
    const imageModal = document.getElementById('image-modal');
    const expandedImg = document.getElementById('expanded-image');
    const downloadLink = document.getElementById('download-expanded');
    const closeBtn = document.querySelector('.image-close');

    // Expandir imagen al hacer clic
    document.querySelectorAll('.expandable').forEach(img => {
        img.addEventListener('click', function() {
            expandedImg.src = this.src;
            downloadLink.href = this.src;
            downloadLink.download = this.alt + '.png';
            imageModal.style.display = 'block';
        });
    });

    // Cerrar modal
    closeBtn.addEventListener('click', function() {
        imageModal.style.display = 'none';
    });

    // Cerrar al hacer clic fuera de la imagen
    imageModal.addEventListener('click', function(e) {
        if (e.target === imageModal) {
            imageModal.style.display = 'none';
        }
    });

    // Cerrar con ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && imageModal.style.display === 'block') {
            imageModal.style.display = 'none';
        }
    });
}

// Llamar a la función cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    inicializarNavegacion();
    inicializarActividades();
    inicializarSonidos();
    inicializarMapa();
    inicializarArrastrar();
    inicializarEvaluacion();
    inicializarVideo();
    inicializarImagenes(); // Nueva función
});