renderChrome(2);

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
            input.textContent = input.value;
        } else if (input.tagName.toLowerCase() === 'canvas') {
            const dataURL = input.toDataURL("image/png");
            input.setAttribute('data-image', dataURL);
        } else {
            input.setAttribute('value', input.value);
        }
    });
    localStorage.setItem('page2Content', document.querySelector('#page2').outerHTML);
}

function loadPageContent() {
    const savedContent = localStorage.getItem('page2Content');
    if (savedContent) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(savedContent, 'text/html');
        const newPage = doc.querySelector('#page2');
        if (newPage) document.querySelector('#page2').innerHTML = newPage.innerHTML;
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

/* ===== Pièces jointes (CACES / attestations) ===== */
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

            imageWrapper.appendChild(img);
            imageWrapper.appendChild(btn);
            photoContainer.appendChild(imageWrapper);
        };

        reader.readAsDataURL(file);
    });
    this.value = "";
});

/* Délégation : suppression et zoom des pièces jointes */
document.addEventListener('click', (e) => {
    if (e.target.classList && e.target.classList.contains('del-photo')) {
        e.target.closest('.photo-thumb').remove();
    } else if (e.target.tagName === 'IMG' && e.target.closest('.photo-thumb')) {
        const w = window.open('', '_blank');
        if (w) w.document.write('<img src="' + e.target.src + '" style="max-width:100%">');
    }
});
