   function savePageContent() {
        const page = document.querySelector('#page5');
        const inputs = page.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            if (input.type === 'checkbox' || input.type === 'radio') {
                if (input.checked) {
                    input.setAttribute('checked', 'checked');
                } else {
                    input.removeAttribute('checked');
                }
            } else {
                input.setAttribute('value', input.value);
            }
        });
        localStorage.setItem('page5Content', document.querySelector('#page5').outerHTML);
    }

    function loadPageContent() {
        // Restaurer le contenu HTML de la page avec les valeurs des champs
        const savedContent = localStorage.getItem('page5Content');
        if (savedContent) {
            document.querySelector('#page5').outerHTML = savedContent;
        }
    }

    function redirectToSignPage() {
        savePageContent();
        window.location.href = 'sign.html';
    }

    window.onload = function () {
        loadPageContent();
    }

    window.onbeforeunload = function () {
        savePageContent();
    }