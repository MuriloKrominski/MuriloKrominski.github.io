
// Função para inicializar o Google Translate
function googleTranslateElementInit() {
    new google.translate.TranslateElement({pageLanguage: 'en-US'}, 'google_translate_element');
}

// Função para mudar o idioma ao clicar em uma bandeira
function changeLanguage(language) {
    var translateElement = document.querySelector('.goog-te-combo');
    if (translateElement) {
        translateElement.value = language;
        translateElement.dispatchEvent(new Event('change'));
    }
}

// Função para ocultar a barra do Google Translate
function hideGoogleTranslateBar() {
    // Remove o iframe da barra de tradução
    var googleFrame = document.querySelector('.goog-te-banner-frame');
    if (googleFrame) {
        googleFrame.style.display = 'none';
        googleFrame.remove();
    }

    // Remove o div superior gerado pelo Google Translate
    var googleFrameDiv = document.querySelector('.goog-te-banner-frame');
    if (googleFrameDiv) {
        googleFrameDiv.remove();
    }
}

// Função para garantir que a barra seja removida após a tradução
function observeGoogleTranslate() {
    // Usa um MutationObserver para detectar mudanças no DOM e remover a barra do Google Translate quando aparecer
    const observer = new MutationObserver(hideGoogleTranslateBar);

    observer.observe(document.body, { childList: true, subtree: true });
}

// Função para aguardar o carregamento do elemento do tradutor antes de alterar o idioma
function waitForTranslateElement(callback) {
    const interval = setInterval(() => {
        const translateElement = document.querySelector('.goog-te-combo');
        if (translateElement) {
            clearInterval(interval);
            callback();
        }
    }, 100); // verifica a cada 100ms
}

// Função para mudar o idioma com um atraso para garantir o carregamento do elemento
function changeLanguageWithDelay(language) {
    waitForTranslateElement(() => changeLanguage(language));
}

// Verificação contínua após a página carregar
document.addEventListener('DOMContentLoaded', function() {
    googleTranslateElementInit();

    observeGoogleTranslate();

    // Redefine o evento onclick para usar a função com atraso
    document.querySelectorAll('.language-selector a').forEach(flag => {
        flag.onclick = function(event) {
            event.preventDefault();
            const language = event.currentTarget.getAttribute('onclick').match(/'(\w+)'/)[1];
            changeLanguageWithDelay(language);
        };
    });
});

// Função para redimensionar o iframe de forma dinâmica
function resizeIframe() {
    var iframe = document.getElementById('dynamic-iframe');
    if (iframe && iframe.contentWindow) {
        iframe.style.height = iframe.contentWindow.document.documentElement.scrollHeight + 'px';
    }
}

// Executa o redimensionamento do iframe quando ele carregar
window.addEventListener('load', function() {
    var dynamicIframe = document.getElementById('dynamic-iframe');
    if (dynamicIframe) {
        dynamicIframe.onload = resizeIframe;
    }
});
