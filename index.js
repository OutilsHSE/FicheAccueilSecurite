
        function savePageContent() {
            localStorage.setItem("Nom", document.querySelector("#prenom").value + ' ' + document.querySelector("#nom").value);

            const page = document.querySelector('#page1');
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
            localStorage.setItem('page1Content', document.querySelector('#page1').outerHTML);
        }

        function loadPageContent() {
            // Efface tout le localStorage
            localStorage.clear();

            // Efface tout le sessionStorage
            sessionStorage.clear();

        }

        function redirectToAutorisationPage() {
            savePageContent();
            window.location.href = 'autorisation.html';
        }

        window.onload = function () {
            localStorage.clear();

            // Efface tout le sessionStorage
            sessionStorage.clear();

            window.addEventListener("load", () => {

                // Si tu veux aussi vider tous les inputs et textarea
                document.querySelectorAll("input, textarea").forEach(el => {
                el.value = "";
                });
            });
            document.getElementById('visite-date').valueAsDate = new Date();
            document.getElementById('date-medicale').valueAsDate = new Date();
            loadPageContent();
        }

        window.onbeforeunload = function () {
            savePageContent();
        }
        function openModal() {
            const modal = document.getElementById('imageModal');
            modal.style.display = 'block';
        }

        function closeModal() {
            const modal = document.getElementById('imageModal');
            modal.style.display = 'none';
        }

        document.getElementById('openModalBtn').onclick = openModal;
        document.getElementsByClassName('close')[0].onclick = closeModal;


        window.onclick = function (event) {
            const modal = document.getElementById('imageModal');
            if (event.target === modal) {
                closeModal();
            }
        };

        const photoInput = document.getElementById('photo-input');
        const photoContainer = document.getElementById('photo-container');

        photoInput.addEventListener('change', function () {


            Array.from(this.files).forEach((file, index) => {
                const reader = new FileReader();

                reader.onload = function (e) {
                    // Conteneur image + bouton + commentaire
                    const imageWrapper = document.createElement('div');
                    imageWrapper.style.position = 'relative';
                    imageWrapper.style.display = 'inline-block';
                    imageWrapper.style.margin = '10px';
                    imageWrapper.style.textAlign = 'center';

                    // Image
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    img.style.width = '1000px';
                    img.style.height = 'auto';
                    img.style.border = '1px solid #ccc';
                    img.style.borderRadius = '8px';

                    // Bouton supprimer
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

                    // Zone de commentaire
                    const textarea = document.createElement('textarea');
                    textarea.placeholder = 'Ajouter un commentaire...';
                    textarea.style.width = '120px';
                    textarea.style.marginTop = '5px';
                    textarea.style.borderRadius = '4px';
                    textarea.style.resize = 'none';
                    textarea.rows = 2;

                    // Ajout au DOM
                    imageWrapper.appendChild(img);
                    imageWrapper.appendChild(btn);
                    imageWrapper.appendChild(textarea);
                    photoContainer.appendChild(imageWrapper);
                };

                reader.readAsDataURL(file);
            });
        });

        document.addEventListener('DOMContentLoaded', function () {

        });