
// Função para inicializar o Google Translate
function googleTranslateElementInit() {
    new google.translate.TranslateElement({pageLanguage: 'en-US'}, 'google_translate_element');
}

// Função para mudar o idioma ao clicar em uma bandeira
function changeLanguage(language) {
    console.log("Tentando mudar para o idioma:", language);
    var translateElement = document.querySelector('.goog-te-combo');
    if (translateElement) {
        translateElement.value = language;
        translateElement.dispatchEvent(new Event('change'));
        console.log("Idioma alterado para:", language);
    } else {
        console.error("Erro: Elemento de tradução não encontrado.");
    }
}

// Função para ocultar a barra do Google Translate
function hideGoogleTranslateBar() {
    // Comentado para evitar interferência com a tradução
    // var googleFrame = document.querySelector('.goog-te-banner-frame');
    // if (googleFrame) {
    //     googleFrame.style.display = 'none';
    //     googleFrame.remove();
    // }
}

// Função para garantir que a barra seja removida após a tradução
function observeGoogleTranslate() {
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
    }, 200); // verifica a cada 200ms
}

// Função para mudar o idioma com um atraso para garantir o carregamento do elemento
function changeLanguageWithDelay(language) {
    waitForTranslateElement(() => changeLanguage(language));
}

// Verificação contínua após a página carregar
window.addEventListener('load', function() {
    googleTranslateElementInit();
    observeGoogleTranslate();

    // Redefine o evento click para usar a função com atraso
    document.querySelectorAll('.language-selector a').forEach(flag => {
        flag.addEventListener('click', function(event) {
            event.preventDefault();
            const language = event.currentTarget.dataset.language;
            changeLanguageWithDelay(language);
        });
    });
});

// Adiciona o script do Google Translate com tratamento de erro
const googleTranslateScript = document.createElement('script');
googleTranslateScript.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
googleTranslateScript.async = true;

googleTranslateScript.onload = function() {
    console.log("Google Translate carregado com sucesso");
    googleTranslateElementInit();
};

googleTranslateScript.onerror = function() {
    console.error("Erro ao carregar Google Translate. Tentando novamente...");
    setTimeout(() => document.body.appendChild(googleTranslateScript), 3000);
};

document.body.appendChild(googleTranslateScript);

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