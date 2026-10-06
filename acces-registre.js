/* ═══════════════════════════════════════════════════════════════════════
   CDES — accès au registre HSE (V2 · 05/10/2026)
   Commun aux pages : autorisation de conduite, fiches de formation, portail
   des fiches, fiche d'accueil SSE. À charger AVANT les autres scripts.

   Ce dépôt public ne contient ni l'adresse du serveur, ni mot de passe, ni
   nom ou adresse de personne. Deux façons d'accéder au registre :
     · appareil BRANCHÉ : ouvert une fois depuis la tuile de l'intranet HSE
       (lien …#config=…) — l'adresse du serveur et le mot de passe restent
       sur cet appareil ;
     · LIEN DE SIGNATURE reçu par mail (…&j=…&r=…) : il ouvre et fait signer
       UNE autorisation, et rien d'autre.
   Les listes (signataires, adresses, téléphone du Responsable HSE) arrivent
   du serveur et sont gardées sur l'appareil.
   ═══════════════════════════════════════════════════════════════════════ */
(function () {
  var CLE = 'reg_conf_v2', CLE_L = 'reg_listes_v2';
  function lire(k, d) { try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } }
  function ecrire(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  function b64urlTexte(s) {
    var b = String(s).replace(/-/g, '+').replace(/_/g, '/');
    b += '='.repeat((4 - b.length % 4) % 4);
    return new TextDecoder().decode(Uint8Array.from(atob(b), function (c) { return c.charCodeAt(0); }));
  }

  var conf = lire(CLE, {}), message = '';
  /* 1. lien de branchement de l'intranet */
  var m = /[#&]config=([A-Za-z0-9_-]+)/.exec(location.hash || '');
  if (m) {
    try {
      var c = JSON.parse(b64urlTexte(m[1]));
      if (c && /\/exec$/.test(c.u || '') && c.s) {
        conf = { u: c.u, s: c.s }; ecrire(CLE, conf);
        history.replaceState(null, '', location.pathname + location.search);
        message = 'Appareil branché au serveur CDES ✓';
      } else message = 'Lien de branchement illisible : rouvre l’outil depuis l’intranet';
    } catch (e) { message = 'Lien de branchement illisible : rouvre l’outil depuis l’intranet'; }
  }
  /* 2. lien de signature reçu par mail */
  var q = new URLSearchParams(location.search), jeton = q.get('j') || '', urlJ = '';
  if (jeton && q.get('r')) { try { urlJ = b64urlTexte(q.get('r')); } catch (e) {} if (!/\/exec$/.test(urlJ)) { urlJ = ''; jeton = ''; } }

  var REG = window.REG = {
    url: urlJ || conf.u || '',
    secret: urlJ ? '' : (conf.s || ''),
    jeton: urlJ ? jeton : '',
    branche: !!(conf.u && conf.s),
    listes: lire(CLE_L, {}) || {},
    refus: false
  };
  REG.auth = function (o) { if (REG.secret) o.secret = REG.secret; if (REG.jeton) o.jeton = REG.jeton; return o; };
  REG.urlGet = function (u) {
    if (!REG.url || String(u).indexOf(REG.url) !== 0) return u;
    var s = String(u).indexOf('?') >= 0 ? '&' : '?';
    if (REG.secret) { u += s + 'secret=' + encodeURIComponent(REG.secret); s = '&'; }
    if (REG.jeton) u += s + 'jeton=' + encodeURIComponent(REG.jeton);
    return u;
  };
  /* Listes reçues : gardées sur l'appareil ; si elles ont changé, la page se
     recharge une fois (les menus sont construits au chargement). */
  REG.majListes = function (l) {
    if (!l || typeof l !== 'object') return;
    if (JSON.stringify(l) === JSON.stringify(REG.listes || {})) return;
    ecrire(CLE_L, l); REG.listes = l;
    try {
      if (!sessionStorage.getItem('reg_rel')) { sessionStorage.setItem('reg_rel', '1'); location.reload(); }
    } catch (e) {}
  };

  /* 3. toute requête vers le serveur du registre porte le mot de passe (ou le jeton) */
  var f0 = window.fetch.bind(window);
  window.fetch = function (input, init) {
    var u = typeof input === 'string' ? input : ((input && input.url) || '');
    if (!REG.url || u.indexOf(REG.url) !== 0) return f0(input, init);
    init = init || {};
    if (String(init.method || 'GET').toUpperCase() === 'POST' && typeof init.body === 'string') {
      try { var o = JSON.parse(init.body); REG.auth(o); init = Object.assign({}, init, { body: JSON.stringify(o) }); } catch (e) {}
    } else if (typeof input === 'string') input = REG.urlGet(input);
    return f0(input, init).then(function (rep) {
      return rep.clone().text().then(function (t) {
        try { var j = JSON.parse(t); if (j && j.refus) { REG.refus = true; bandeau(); } if (j && j.listes) REG.majListes(j.listes); } catch (e) {}
        return rep;
      }, function () { return rep; });
    });
  };

  /* 4. « Copier le lien » / « Depuis ma boîte mail » : le lien reçoit son jeton */
  window.regLienSigne = async function (lien) {
    if (!lien || !REG.url || !REG.secret) return lien;
    try {
      var p = new URL(lien, location.href).searchParams;
      var key = p.get('sign') || p.get('signt'), fid = p.get('f');
      if (!key || !fid) return lien;
      var r = await fetch(REG.url, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ action: 'jeton', ficheId: fid, key: key, lien: lien }) });
      var j = await r.json();
      return (j && j.ok && j.lien) ? j.lien : lien;
    } catch (e) { return lien; }
  };

  /* 5. bandeau d'état + valeurs servies par le serveur (téléphone du Responsable HSE…) */
  function bandeau() {
    var b = document.getElementById('reg-etat');
    if (!b) {
      if (!document.body) return;
      b = document.createElement('div'); b.id = 'reg-etat'; b.className = 'no-print';
      b.style.cssText = 'margin:0;padding:8px 14px;font:600 13px/1.4 system-ui,sans-serif;text-align:center;';
      document.body.insertBefore(b, document.body.firstChild);
    }
    var txt = '';
    if (REG.refus) { txt = REG.jeton ? '⛔ Ce lien de signature a expiré ou n’est plus valable : demande un nouveau lien au service HSE.' : '⛔ Accès refusé : rouvre l’outil depuis la tuile de l’intranet HSE.'; b.style.background = '#FDECEC'; b.style.color = '#8a1c1c'; }
    else if (!REG.url) { txt = '🔌 Appareil non branché : ouvre l’outil depuis la tuile de l’intranet HSE (la saisie et le PDF marchent ; l’enregistrement et les envois, non).'; b.style.background = '#FFF7E0'; b.style.color = '#5a4300'; }
    b.textContent = txt; b.style.display = txt ? '' : 'none';
  }
  function valeurs() {
    var l = REG.listes || {};
    document.querySelectorAll('[data-reg]').forEach(function (el) {
      var v = l[el.getAttribute('data-reg')];
      if (v) el.textContent = v;
    });
  }
  document.addEventListener('DOMContentLoaded', function () {
    bandeau(); valeurs();
    if (message) {
      var t = document.createElement('div');
      t.textContent = message; t.className = 'no-print';
      t.style.cssText = 'position:fixed;left:50%;bottom:24px;transform:translateX(-50%);background:#0D2B5E;color:#fff;padding:10px 16px;border-radius:8px;font:600 14px system-ui,sans-serif;z-index:99999';
      document.body.appendChild(t); setTimeout(function () { t.remove(); }, 3500);
    }
    /* appareil branché : les listes sont rafraîchies à chaque ouverture */
    if (REG.branche && !REG.jeton) {
      fetch(REG.url, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify({ action: 'ping' }) })
        .catch(function () {});
    }
  });
})();
