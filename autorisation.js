    document.addEventListener("DOMContentLoaded", () => {
        const rowsLeft = document.querySelectorAll(".table-left tbody tr");
        const rowsRight = document.querySelectorAll(".table-right tbody tr");

        const nbRows = Math.min(rowsLeft.length, rowsRight.length);

        for (let i = 0; i < nbRows; i++) {
            // reset height first
            rowsLeft[i].style.height = "";
            rowsRight[i].style.height = "";

            const hLeft = rowsLeft[i].offsetHeight;
            const hRight = rowsRight[i].offsetHeight;
            const maxH = Math.max(hLeft, hRight);

            rowsLeft[i].style.height = maxH + "px";
            rowsRight[i].style.height = maxH + "px";
        }
    });

    function savePageContent() {
        const page = document.querySelector('#page2');
        const inputs = page.querySelectorAll('input, textarea, select, canvas');
        inputs.forEach(input => {
            if (input.type === 'checkbox' || input.type === 'radio') {
                if (input.checked) {
                    input.setAttribute('checked', 'checked');
                } else {
                    input.removeAttribute('checked');
                }
            } else if (input.tagName.toLowerCase() === 'textarea') {
                input.textContent = input.value; // ✅ valeur à l'intérieur du textarea

            } else if (input.tagName.toLowerCase() === 'canvas') {
                // ✅ Sauvegarde la signature sous forme d'image base64
                const dataURL = input.toDataURL("image/png");
                input.setAttribute('data-image', dataURL);
            } else {
                input.setAttribute('value', input.value);
            }
        });
        localStorage.setItem('page2Content', document.querySelector('#page2').outerHTML);
    }

    function loadPageContent() {
        // Restaurer le contenu HTML de la page avec les valeurs des champs
        const savedContent = localStorage.getItem('page2Content');
        if (savedContent) {
            document.querySelector('#page2').outerHTML = savedContent;
        }
    }

    function redirectToAutorisationPage() {
        savePageContent();
        window.location.href = 'security.html';
    }

    window.onload = function () {
        loadPageContent();
    }

    window.onbeforeunload = function () {
        savePageContent();
    }

    const photoInput = document.getElementById('photo-input');
    const photoContainer = document.getElementById('photo-container');

    photoInput.addEventListener('change', function () {

        Array.from(this.files).forEach((file, index) => {
            const reader = new FileReader();

            reader.onload = function (e) {
                // Crée un conteneur pour chaque image + bouton
                const imageWrapper = document.createElement('div');
                imageWrapper.style.position = 'relative';
                imageWrapper.style.display = 'inline-block';

                // Image preview
                const img = document.createElement('img');
                img.src = e.target.result;
                img.style.width = '360px';
                img.style.height = 'auto';
                img.style.border = '1px solid #ccc';
                img.style.borderRadius = '8px';

                // Bouton de suppression
                const btn = document.createElement('button');
                btn.textContent = '✕';
                btn.style.position = 'absolute';
                btn.style.top = '0';
                btn.style.right = '0';
                btn.style.background = 'rgba(0,0,0,0.6)';
                btn.style.color = 'white';
                btn.style.border = 'none';
                btn.style.borderRadius = '0 8px 0 8px';
                btn.style.cursor = 'pointer';

                btn.addEventListener('click', () => {
                    imageWrapper.remove();
                });

                imageWrapper.appendChild(img);
                imageWrapper.appendChild(btn);
                photoContainer.appendChild(imageWrapper);
            };

            reader.readAsDataURL(file);
        });
    });