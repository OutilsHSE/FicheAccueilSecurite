/*****************************************************
 *  UNIVERSAL SAVE & LOAD (Inputs + Textareas + Select + Canvas)
 *****************************************************/

// ⬇️ Sauvegarde générique de n'importe quelle page (#pageX)
function savePage(pageId) {
    const page = document.querySelector(`#${pageId}`);
    if (!page) return;

    const elements = page.querySelectorAll("input, textarea, select, canvas");

    elements.forEach(el => {
        const tag = el.tagName.toLowerCase();

        // Checkbox / Radio
        if (el.type === "checkbox" || el.type === "radio") {
            el.checked
                ? el.setAttribute("checked", "checked")
                : el.removeAttribute("checked");
        }

        // Textarea
        else if (tag === "textarea") {
            el.textContent = el.value;
        }

        // Select
        else if (tag === "select") {
            el.querySelectorAll("option").forEach(opt => {
                opt.selected = (opt.value === el.value);
            });
        }

        // Canvas → dataURL
        else if (tag === "canvas") {
            try {
                const dataURL = el.toDataURL("image/png");
                el.setAttribute("data-image", dataURL);
            } catch (e) {
                console.error("Canvas toDataURL error:", e);
            }
        }

        // Input normal
        else {
            el.setAttribute("value", el.value);
        }
    });

    localStorage.setItem(`${pageId}Content`, page.outerHTML);
}



// ⬇️ Restauration générique + redessin canvas
function loadPage(pageId) {
    const saved = localStorage.getItem(`${pageId}Content`);
    if (!saved) return;

    const page = document.querySelector(`#${pageId}`);
    if (!page) return;

    const parser = new DOMParser();
    const doc = parser.parseFromString(saved, "text/html");
    const newPage = doc.querySelector(`#${pageId}`);

    if (!newPage) return;

    // Remplacer l’intérieur
    page.innerHTML = newPage.innerHTML;

    // 🔄 Restaurer canvases depuis data-image
    page.querySelectorAll("canvas[data-image]").forEach(canvas => {
        const img = new Image();
        const url = canvas.getAttribute("data-image");

        if (!url) return;

        img.onload = () => {
            const ctx = canvas.getContext("2d");
            canvas.width = canvas.parentElement.clientWidth;
            canvas.height = canvas.parentElement.clientHeight;
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        };

        img.src = url;

        // Réactiver le dessin si ta fonction existe
        if (typeof setupCanvas === "function") {
            setupCanvas(canvas.id);
        }
    });
}
