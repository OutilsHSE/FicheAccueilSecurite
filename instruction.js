renderChrome(5);

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
        } else if (input.tagName.toLowerCase() === 'textarea') {
            input.textContent = input.value;
        } else {
            input.setAttribute('value', input.value);
        }
    });
    localStorage.setItem('page5Content', document.querySelector('#page5').outerHTML);
}

function loadPageContent() {
    const savedContent = localStorage.getItem('page5Content');
    if (savedContent) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(savedContent, 'text/html');
        const newPage = doc.querySelector('#page5');
        if (newPage) document.querySelector('#page5').innerHTML = newPage.innerHTML;
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
