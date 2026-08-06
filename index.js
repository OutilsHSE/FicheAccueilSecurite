renderChrome(1);

function savePageContent() {
    localStorage.setItem("Nom", document.querySelector("#nom").value + ' ' + document.querySelector("#prenom").value);

    const page = document.querySelector('#page1');
    const inputs = page.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        if (input.type === 'checkbox' || input.type === 'radio') {
            if (input.checked) {
                input.setAttribute('checked', 'checked');
            } else {
                input.removeAttribute('checked');
            }
        } else if (input.tagName.toLowerCase() === 'textarea') {
            input.textContent = input.value;
        } else {
            input.setAttribute('value', input.value);
        }
    });
    localStorage.setItem('page1Content', document.querySelector('#page1').outerHTML);
}

function redirectToAutorisationPage() {
    savePageContent();
    window.location.href = 'autorisation.html';
}

/* Réinitialise entièrement le parcours pour un nouvel accueil */
function nouvelleFiche() {
    if (!confirm("Commencer une nouvelle fiche d'accueil ? Les données saisies seront effacées.")) return;
    window.onbeforeunload = null;
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
}

window.onload = function () {
    const saved = localStorage.getItem('page1Content');
    if (saved) {
        // Parcours en cours : on restaure la saisie (retour via le fil d'étapes)
        const parser = new DOMParser();
        const doc = parser.parseFromString(saved, 'text/html');
        const newPage = doc.querySelector('#page1');
        if (newPage) document.querySelector('#page1').innerHTML = newPage.innerHTML;
    } else {
        document.getElementById('visite-date').valueAsDate = new Date();
        document.getElementById('date-medicale').valueAsDate = new Date();
    }
}

window.onbeforeunload = function () {
    savePageContent();
}

/* ===== Modale ===== */
function openModal() {
    document.getElementById('imageModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('imageModal').style.display = 'none';
}

document.getElementById('openModalBtn').onclick = openModal;
document.getElementsByClassName('close')[0].onclick = closeModal;

window.onclick = function (event) {
    const modal = document.getElementById('imageModal');
    if (event.target === modal) {
        closeModal();
    }
};

/* ===== Pièces jointes (attestation médicale) ===== */
const photoInput = document.getElementById('photo-input');

photoInput.addEventListener('change', function () {
    const photoContainer = document.getElementById('photo-container');
    Array.from(this.files).forEach((file) => {
        const reader = new FileReader();

        reader.onload = function (e) {
            const imageWrapper = document.createElement('div');
            imageWrapper.className = 'photo-thumb';

            const img = document.createElement('img');
            img.src = e.target.result;
            img.alt = 'Pièce jointe';

            const btn = document.createElement('button');
            btn.textContent = '✕';
            btn.className = 'del-photo no-print';
            btn.type = 'button';

            const textarea = document.createElement('textarea');
            textarea.placeholder = 'Ajouter un commentaire…';
            textarea.rows = 2;

            imageWrapper.appendChild(img);
            imageWrapper.appendChild(btn);
            imageWrapper.appendChild(textarea);
            photoContainer.appendChild(imageWrapper);
        };

        reader.readAsDataURL(file);
    });
    this.value = "";
});

/* Délégation : suppression et zoom des pièces jointes
   (fonctionne aussi après restauration du brouillon) */
document.addEventListener('click', (e) => {
    if (e.target.classList && e.target.classList.contains('del-photo')) {
        e.target.closest('.photo-thumb').remove();
    } else if (e.target.tagName === 'IMG' && e.target.closest('.photo-thumb')) {
        const w = window.open('', '_blank');
        if (w) w.document.write('<img src="' + e.target.src + '" style="max-width:100%">');
    }
});
