document.addEventListener('DOMContentLoaded', function() {
    const textareaEntrada = document.querySelector('.contenido__input textarea');
    const botonEncriptar = document.getElementById('encriptar');
    const botonDesencriptar = document.getElementById('desencriptar');
    const botonCopiar = document.getElementById('copiar');
    const contenedorRespuesta = document.querySelector('.contenido__respuesta');
    const mensajeSinResultado = contenedorRespuesta.querySelector('h2');
    const mensajeResultado = contenedorRespuesta.querySelector('p');
    const imagenMuñeco = contenedorRespuesta.querySelector('.contenido__respuesta__muñeco');

    botonEncriptar.addEventListener('click', function() {
        const textoOriginal = obtenerTexto();
        if (esTextoValido(textoOriginal)) {
            const textoEncriptado = encriptarTexto(textoOriginal);
            actualizarResultado(textoEncriptado);
        }
    });

    botonDesencriptar.addEventListener('click', function() {
        const textoOriginal = obtenerTexto();
        if (esTextoValido(textoOriginal)) {
            const textoDesencriptado = desencriptarTexto(textoOriginal);
            const resultado = textoDesencriptado === textoOriginal
                ? 'No se encontró un patrón para desencriptar'
                : textoDesencriptado;
            actualizarResultado(resultado);
        }
    });

    botonCopiar.addEventListener('click', function() {
        copiarTextoAlPortapapeles();
    });

    function obtenerTexto() {
        return textareaEntrada.value.trim();
    }

    function esTextoValido(texto) {
        const esValido = texto !== '';
        if (!esValido) {
            alert('Por favor ingresa un texto válido');
        }
        return esValido;
    }

    function encriptarTexto(texto) {
        return texto.replace(/[aeiou]/g, reemplazarVocal);
    }

    function reemplazarVocal(vocal) {
        switch (vocal) {
            case 'a': return 'enter';
            case 'e': return 'imes';
            case 'i': return 'ai';
            case 'o': return 'ober';
            case 'u': return 'ufat';
            default: return vocal;
        }
    }

    function desencriptarTexto(texto) {
        return texto.replace(/enter|imes|ai|ober|ufat/g, reemplazarPatron);
    }

    function reemplazarPatron(patron) {
        switch (patron) {
            case 'enter': return 'a';
            case 'imes': return 'e';
            case 'ai': return 'i';
            case 'ober': return 'o';
            case 'ufat': return 'u';
            default: return patron;
        }
    }

    function actualizarResultado(resultado) {
        if (resultado === 'No se encontró un patrón para desencriptar') {
            mostrarMensajeSinResultado(resultado);
        } else {
            mostrarResultadoConTexto(resultado);
        }
    }

    function mostrarMensajeSinResultado(mensaje) {
        mensajeSinResultado.textContent = mensaje;
        mensajeResultado.textContent = '';
        imagenMuñeco.style.display = 'block';
        botonCopiar.style.display = 'none';
        mensajeSinResultado.style.display = 'block';
        mensajeResultado.style.display = 'none';
    }

    function mostrarResultadoConTexto(resultado) {
        mensajeSinResultado.textContent = '';
        mensajeResultado.textContent = resultado;
        imagenMuñeco.style.display = 'none';
        botonCopiar.style.display = 'block';
        mensajeSinResultado.style.display = 'none';
        mensajeResultado.style.display = 'block';
    }

    function copiarTextoAlPortapapeles() {
        const textoParaCopiar = mensajeResultado.textContent;
        if (textoParaCopiar !== '') {
            navigator.clipboard.writeText(textoParaCopiar)
                .then(() => {
                    actualizarBotonCopiar();
                })
                .catch(err => {
                    console.error('Error al copiar el texto: ', err);
                    alert('No se pudo copiar el texto. Inténtalo de nuevo.');
                });
        }
    }

    function actualizarBotonCopiar() {
        botonCopiar.textContent = 'Copiado';
        botonCopiar.style.backgroundColor = '#d8dfe8';
        botonCopiar.style.color = '#0a3871';
    }
});