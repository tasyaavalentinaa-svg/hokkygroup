// ---------- Service selector (index.html) -> ke halaman Pilih Lokasi dulu ----------
function goOrder(type){
  if (type === 'pickup' || type === 'delivery') {
    window.location.href = 'lokasi-pesan.html?type=' + type;
  } else {
    window.location.href = 'order.html';
  }
}

// ---------- Filter outlet (outlet.html) ----------
const tabBtns = document.querySelectorAll('.tab-btn');
tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.outlet-card').forEach(card => {
      card.style.display = (filter === 'all' || card.dataset.brand === filter) ? '' : 'none';
    });
  });
});

// ---------- Form pesan direct -> WhatsApp (order.html) ----------
// GANTI nomor ini dengan nomor WhatsApp admin asli (format 62xxxxxxxxxx, tanpa + atau 0 di depan)
const ADMIN_WA_NUMBER = "6281200000000";

const menuOptions = {
  "Martabak Hokky": ["Martabak Manis Spesial Wisman & Keju Cokelat Nutella","Martabak Telur Daging Sapi Premium (4/6 Telur Bebek)","Martabak Tipker (Tipis Kering) Keju"],
  "Martabak Bryan": ["Martabak Manis 1/2 Keju 1/2 Kacang Cokelat","Martabak Telur Ayam/Bebek Jagoan Pedas","Martabak Black Forest Keju"]
};
const outletData = [
  // ---- CILEGON ----
  { brand: "Martabak Hokky", city: "Cilegon", name: "Hokky Ramayana", hours: "13:00 - 00:00", address: "Jl. Ahmad Yani, Jl. Pesut No.5", maps: "https://maps.app.goo.gl/jeLk6ss1uBCRG4hH7" },
  { brand: "Martabak Hokky", city: "Cilegon", name: "Hokky Simpang", hours: "13:00 - 00:00", address: "Jl. SA. Tirtayasa No.22", maps: "https://maps.app.goo.gl/zWmhv6GLoSESWMvX8" },
  { brand: "Martabak Hokky", city: "Cilegon", name: "Hokky Merak", hours: "15:00 - 23:00", address: "Jl. RE. Martadinata No.3", maps: "https://maps.app.goo.gl/FPWfPVU5ZTSTa6Z37" },
  { brand: "Martabak Hokky", city: "Cilegon", name: "Hokky Premium & Cafe", hours: "Weekday 14:00-22:00 · Weekend 14:00-23:00", address: "Kawasan PCI (Pondok Cilegon Indah)", maps: "https://share.google/kDNj4AugBDKwyRQCi" },
  { brand: "Martabak Bryan", city: "Cilegon", name: "Bryan PCI", hours: "15:00 - 23:00", address: "Jl. Pondok Cilegon Indah No.20 Blok C18", maps: "https://maps.app.goo.gl/MBb3zDcj1HdedeWh7" },
  { brand: "Martabak Bryan", city: "Cilegon", name: "Bryan Metro", hours: "15:00 - 23:00", address: null, maps: "https://maps.app.goo.gl/Uh4NkUks7TJTuDhq6" },
  { brand: "Martabak Bryan", city: "Cilegon", name: "Bryan Temu Putih", hours: "15:00 - 23:00", address: "Jl. Temu Putih, Ciwaduk", maps: "https://maps.app.goo.gl/mLqmSiojnBozqZRG9" },
  { brand: "Martabak Bryan", city: "Cilegon", name: "Bryan Grogol", hours: "15:00 - 23:00", address: "Perumahan Arga Baja Pura, Jl. Arga Raya No.15, Kotasari", maps: "https://maps.app.goo.gl/Pks8J62DVschRoCD6" },
  { brand: "Martabak Bryan", city: "Cilegon", name: "Bryan Warnasari", hours: "15:00 - 23:00", address: "Jl. Perum Warnasari, Warnasari, Kec. Citangkil", maps: "https://maps.app.goo.gl/t5u6PFaA6zbVJEk6A" },
  // ---- SERANG ----
  { brand: "Martabak Hokky", city: "Serang", name: "Hokky Anyer", hours: "14:00 - 23:00", address: "Jl. Raya Anyer-Sirih No.13", maps: "https://maps.app.goo.gl/2UQUqMYNgn2Ky8Xy7" },
  { brand: "Martabak Hokky", city: "Serang", name: "Hokky Sempu", hours: "15:00 - 23:00", address: "Cipare, Kec. Serang", maps: "https://maps.app.goo.gl/LKdeMmJ8aHJxjRaFA" },
  { brand: "Martabak Hokky", city: "Serang", name: "Hokky Cilaku", hours: "15:00 - 23:00", address: "Gg. Masjid, Sawah Luhur", maps: "https://maps.app.goo.gl/bWddnjkEETpF2rHGA" },
  { brand: "Martabak Hokky", city: "Serang", name: "Hokky Cimuncang", hours: "15:00 - 23:00", address: "Jl. Jenderal Ahmad Yani, Cimuncang", maps: "https://maps.app.goo.gl/o1xJC2GwF43pgGZGA" },
  { brand: "Martabak Bryan", city: "Serang", name: "Bryan Serdang", hours: "15:00 - 23:00", address: "Jl. Komp. Serdang, Metropolis", maps: "https://maps.app.goo.gl/yJbkqybdLTNg4aUi7" },
  { brand: "Martabak Bryan", city: "Serang", name: "Bryan Kramatwatu", hours: "15:00 - 23:00", address: "Jl. Waringin Kurung, Kramatwatu", maps: "https://maps.app.goo.gl/DyCMT7z9GLriL7nb7" },
  { brand: "Martabak Bryan", city: "Serang", name: "Bryan Cipocok", hours: "Weekday 15:00-22:30 · Weekend 15:30-23:00", address: "Jl. Bhayangkara, Cipocok Jaya", maps: "https://maps.app.goo.gl/nf1cdrTpHi5evpB2A" },
  { brand: "Martabak Bryan", city: "Serang", name: "Bryan Ciracas", hours: "15:00 - 23:00", address: "Jl. Kolonel Tubagus Suwandi", maps: "https://maps.app.goo.gl/FhNYAP8aZiZqJjQv8" },
  { brand: "Martabak Bryan", city: "Serang", name: "Bryan Taktakan", hours: "15:00 - 23:00", address: null, maps: "https://share.google/LduJaNxWZQsON26DN" },
  // ---- TANGERANG ----
  { brand: "Martabak Hokky", city: "Tangerang", name: "Hokky Palem Semi", hours: "14:00 - 22:00", address: "Jl. Palem Semi", maps: "https://maps.app.goo.gl/9bcg1ZRaWU7kH7d1" },
  { brand: "Martabak Hokky", city: "Tangerang", name: "Hokky Modernland", hours: "14:00 - 22:00", address: "Ruko The Modern Arcade, Jl. Hartono Raya No.7 Blk B", maps: "https://maps.app.goo.gl/pVevvmQU9fQgAUwG9" },
  { brand: "Martabak Hokky", city: "Tangerang", name: "Hokky Citra Raya", hours: "14:30 - 22:30", address: "Melia Street Market, Jl. Citra Raya", maps: "https://maps.app.goo.gl/TPiQ5FZJyQvDYbK17" },
  { brand: "Martabak Hokky", city: "Tangerang", name: "Hokky Gading Serpong", hours: "14:00 - 22:00", address: "Ruko 7, Jl. Klp. Lilin Raya, Gading Serpong Boulevard No.23", maps: "https://maps.app.goo.gl/iEofKQnrcxbYQFT6A" },
  { brand: "Martabak Hokky", city: "Tangerang", name: "Hokky BSD", hours: "14:00 - 22:00", address: "Jl. Anggrek Loka Blok AL No.16, Rawa Buntu, Serpong, BSD", maps: "https://maps.app.goo.gl/BL5dJEvcuV5HDXnj6" },
  { brand: "Martabak Bryan", city: "Tangerang", name: "Bryan BSD", hours: "15:00 - 23:00", address: "Jl. Raya Rawa Buntu No.20", maps: "https://maps.app.goo.gl/sJNwKwAmHs2DhNPA8" },
  // ---- BEKASI ----
  { brand: "Martabak Hokky", city: "Bekasi", name: "Hokky Cibubur", hours: "15:00 - 23:00", address: "Jatikarya, Kec. Jatisampurna", maps: "https://maps.app.goo.gl/sJhcs1wjKGwsahcV8" }
];
function outletsFor(brand){ return outletData.filter(o => o.brand === brand); }

// ---------- Render outlet cards grouped by city (outlet.html) ----------
const outletByCity = document.getElementById('outletByCity');
if (outletByCity) {
  const cities = ["Cilegon", "Serang", "Tangerang", "Bekasi"];
  outletByCity.innerHTML = cities.map(city => {
    const items = outletData.filter(o => o.city === city);
    const cards = items.map(o => {
      const addr = o.address ? o.address : '[Alamat lengkap — draft]';
      const mapsHref = o.maps ? o.maps : '#';
      const mapsLabel = o.maps ? '🗺️ Buka Google Maps' : '🗺️ Maps belum tersedia';
      return `
      <div class="outlet-card" data-brand="${o.brand}">
        <div class="obrand">${o.brand}</div>
        <h4>${o.name}</h4>
        <div class="meta">📍 ${addr}<br>⏰ ${o.hours}</div>
        <a class="maps" href="${mapsHref}" target="_blank" rel="noopener">${mapsLabel}</a>
      </div>
    `;
    }).join('');
    return `
      <div class="city-group">
        <h3 class="city-heading">${city}</h3>
        <div class="outlet-grid">${cards}</div>
      </div>
    `;
  }).join('');
}

const brandSelect = document.getElementById('brand');
const menuSelect = document.getElementById('menu');
const outletSelect = document.getElementById('outlet');
const orderForm = document.getElementById('orderForm');

if (brandSelect) {
  brandSelect.addEventListener('change', () => {
    const menus = menuOptions[brandSelect.value] || [];
    menuSelect.innerHTML = '<option value="" disabled selected>Pilih menu</option>' + menus.map(m => `<option value="${m}">${m}</option>`).join('');
    const outlets = outletsFor(brandSelect.value);
    outletSelect.innerHTML = '<option value="" disabled selected>Pilih outlet</option>' + outlets.map(o => `<option value="${o.name}">${o.name} — ${o.city} (${o.hours})</option>`).join('');
  });
}

const pickupField = document.getElementById('pickupField');
const deliveryField = document.getElementById('deliveryField');
const alamatInput = document.getElementById('alamat');

if (pickupField) {
  document.querySelectorAll('input[name="fulfill"]').forEach(radio => {
    radio.addEventListener('change', () => {
      const isPickup = document.querySelector('input[name="fulfill"]:checked').value === 'pickup';
      pickupField.style.display = isPickup ? '' : 'none';
      deliveryField.style.display = isPickup ? 'none' : '';
      outletSelect.required = isPickup;
      alamatInput.required = !isPickup;
    });
  });
  outletSelect.required = true;
}

if (orderForm) {
  orderForm.addEventListener('submit', function(e){
    e.preventDefault();
    const brand = brandSelect.value;
    const menu = menuSelect.value;
    const qty = document.getElementById('qty').value;
    const nama = document.getElementById('nama').value;
    const wa = document.getElementById('wa').value;
    const catatan = document.getElementById('catatan').value;
    const fulfill = document.querySelector('input[name="fulfill"]:checked').value;
    const fulfillLine = fulfill === 'pickup' ? `Metode: Ambil Sendiri di Outlet ${outletSelect.value}` : `Metode: Diantar Kurir/Ojol%0AAlamat: ${alamatInput.value}`;
    const pesan = `Halo Hokky Group, saya mau pesan direct:%0A%0A` + `Brand: ${brand}%0A` + `Menu: ${menu}%0A` + `Jumlah: ${qty}%0A` + `Nama: ${nama}%0A` + `No. WA: ${wa}%0A` + `${fulfillLine}%0A` + (catatan ? `Catatan: ${catatan}%0A` : '') + `%0ATerima kasih!`;
    window.open(`https://wa.me/${ADMIN_WA_NUMBER}?text=${pesan}`, '_blank');
  });

  // Preset dari query string (?brand=...&fulfill=...&alamat=...&outlet=...) waktu datang dari halaman lain
  window.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const brandParam = params.get('brand');
    const fulfillParam = params.get('fulfill');
    const alamatParam = params.get('alamat');
    const outletParam = params.get('outlet');
    if (brandParam && brandSelect) {
      brandSelect.value = brandParam;
      brandSelect.dispatchEvent(new Event('change'));
    }
    if (fulfillParam) {
      const radio = document.querySelector(`input[name="fulfill"][value="${fulfillParam}"]`);
      if (radio) { radio.checked = true; radio.dispatchEvent(new Event('change')); }
    }
    if (alamatParam && alamatInput) { alamatInput.value = decodeURIComponent(alamatParam); }
    if (outletParam && outletSelect) {
      // opsi outlet baru muncul setelah brand di-set; tunggu sebentar lalu coba pilih
      setTimeout(() => {
        const match = [...outletSelect.options].find(o => o.value === outletParam);
        if (match) outletSelect.value = outletParam;
      }, 50);
    }
  });
}

// ---------- Halaman Pilih Lokasi (lokasi-pesan.html) ----------
const locTitle = document.getElementById('locTitle');
const locTabs = document.querySelectorAll('.loc-tab');
if (locTabs.length) {
  const params = new URLSearchParams(window.location.search);
  const type = params.get('type') || 'delivery';
  if (locTitle) {
    locTitle.textContent = type === 'pickup' ? 'Pilih Outlet untuk Take Away' : 'Tujuan Pengantaran';
  }
  // default buka tab yang relevan sesuai asal klik (Delivery / Take Away)
  if (type === 'pickup') {
    document.querySelectorAll('.loc-tab').forEach(t => t.classList.remove('active'));
    document.querySelector('.loc-tab[data-tab="outlet"]').classList.add('active');
    document.getElementById('tab-address').style.display = 'none';
    document.getElementById('tab-outlet').style.display = '';
  }

  locTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      locTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById('tab-address').style.display = tab.dataset.tab === 'address' ? '' : 'none';
      document.getElementById('tab-outlet').style.display = tab.dataset.tab === 'outlet' ? '' : 'none';
    });
  });

  // isi daftar outlet (gabungan Hokky + Bryan, data asli)
  const allOutlets = outletData;
  const outletPickList = document.getElementById('outletPickList');
  let selectedOutlet = null;
  if (outletPickList) {
    outletPickList.innerHTML = allOutlets.map((o, i) =>
      `<div class="outlet-pick" data-brand="${o.brand}" data-outlet="${o.name}">
        <span><span class="op-brand">${o.brand} · ${o.city}</span>${o.name} <span style="opacity:.6;">(${o.hours})</span></span>
        <span>📍</span>
      </div>`
    ).join('');
    outletPickList.querySelectorAll('.outlet-pick').forEach(el => {
      el.addEventListener('click', () => {
        outletPickList.querySelectorAll('.outlet-pick').forEach(o => o.classList.remove('selected'));
        el.classList.add('selected');
        selectedOutlet = { brand: el.dataset.brand, outlet: el.dataset.outlet };
        document.getElementById('continueOutlet').disabled = false;
      });
    });
  }

  const coveredAreas = ["cilegon", "serang", "anyer", "tangerang", "bekasi", "cibubur", "bsd", "serpong"];
  const searchInput = document.getElementById('searchInput');
  const addressInput = document.getElementById('addressInput');
  const captionInput = document.getElementById('captionInput');
  const availAlert = document.getElementById('availAlert');
  const mapFrame = document.getElementById('mapFrame');

  function checkAvailability(text){
    if (!text.trim()) { availAlert.className = 'avail-alert'; return; }
    const covered = coveredAreas.some(area => text.toLowerCase().includes(area));
    if (covered) {
      availAlert.textContent = '✅ Outlet tersedia di sekitar lokasi Anda.';
      availAlert.className = 'avail-alert ok';
    } else {
      availAlert.textContent = '⚠️ Belum ada outlet tersedia di sekitar lokasi Anda. Coba area Cilegon, Serang, Tangerang, atau Bekasi.';
      availAlert.className = 'avail-alert warn';
    }
  }

  if (searchInput) {
    searchInput.addEventListener('change', () => {
      const val = searchInput.value.trim();
      if (!val) return;
      mapFrame.src = 'https://www.google.com/maps?q=' + encodeURIComponent(val + ', Banten') + '&output=embed';
      if (!addressInput.value.trim()) { addressInput.value = val; }
      checkAvailability(val);
    });
  }
  if (addressInput) {
    addressInput.addEventListener('input', () => checkAvailability(addressInput.value));
  }

  const continueAddress = document.getElementById('continueAddress');
  if (continueAddress) {
    continueAddress.addEventListener('click', () => {
      const alamat = addressInput.value.trim();
      if (!alamat) { addressInput.focus(); return; }
      const caption = captionInput.value.trim();
      const full = caption ? `${alamat} (Catatan: ${caption})` : alamat;
      window.location.href = 'order.html?fulfill=delivery&alamat=' + encodeURIComponent(full);
    });
  }

  const continueOutlet = document.getElementById('continueOutlet');
  if (continueOutlet) {
    continueOutlet.addEventListener('click', () => {
      if (!selectedOutlet) return;
      window.location.href = 'order.html?fulfill=pickup&brand=' + encodeURIComponent(selectedOutlet.brand) + '&outlet=' + encodeURIComponent(selectedOutlet.outlet);
    });
  }
}

// ---------- Halaman Partai Besar (partai-besar.html) ----------
const wizardSteps = document.querySelectorAll('.step');
if (wizardSteps.length) {
  const panels = document.querySelectorAll('.wizard-panel');
  const basket = []; // { menu, qty }

  function goToStep(n){
    wizardSteps.forEach(s => {
      const stepNum = parseInt(s.dataset.step, 10);
      s.classList.toggle('active', stepNum === n);
      s.classList.toggle('done', stepNum < n);
    });
    panels.forEach(p => p.classList.toggle('active', p.id === 'panel-' + n));
    if (n === 2) renderMenuPicker();
    if (n === 3) renderBasket();
    if (n === 4) renderSummary();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  document.querySelectorAll('[data-goto]').forEach(btn => {
    btn.addEventListener('click', () => goToStep(parseInt(btn.dataset.goto, 10)));
  });

  document.getElementById('addContact2').addEventListener('click', () => {
    document.getElementById('contact2Wrap').style.display = '';
    document.getElementById('addContact2').style.display = 'none';
  });

  const eventBrand = document.getElementById('eventBrand');
  const menuPickList = document.getElementById('menuPickList');

  function renderMenuPicker(){
    const menus = menuOptions[eventBrand.value] || [];
    menuPickList.innerHTML = menus.map((m, i) => {
      const inBasket = basket.find(b => b.menu === m);
      const qty = inBasket ? inBasket.qty : 1;
      return `<div class="menu-pick-card" data-menu="${m}">
        <span class="mp-name">${m}</span>
        <span class="mp-controls">
          <button type="button" class="qty-btn" data-action="dec">−</button>
          <span class="qty-val">${qty}</span>
          <button type="button" class="qty-btn" data-action="inc">+</button>
          <button type="button" class="add-basket-btn">${inBasket ? 'Update' : 'Tambah'}</button>
        </span>
      </div>`;
    }).join('');

    menuPickList.querySelectorAll('.menu-pick-card').forEach(card => {
      const menu = card.dataset.menu;
      const qtyEl = card.querySelector('.qty-val');
      card.querySelector('[data-action="dec"]').addEventListener('click', () => {
        qtyEl.textContent = Math.max(1, parseInt(qtyEl.textContent, 10) - 1);
      });
      card.querySelector('[data-action="inc"]').addEventListener('click', () => {
        qtyEl.textContent = parseInt(qtyEl.textContent, 10) + 1;
      });
      card.querySelector('.add-basket-btn').addEventListener('click', () => {
        const qty = parseInt(qtyEl.textContent, 10);
        const existing = basket.find(b => b.menu === menu);
        if (existing) { existing.qty = qty; } else { basket.push({ menu, qty }); }
        card.querySelector('.add-basket-btn').textContent = 'Update';
      });
    });
  }
  eventBrand.addEventListener('change', () => { basket.length = 0; renderMenuPicker(); });

  const basketList = document.getElementById('basketList');
  function renderBasket(){
    if (!basket.length) {
      basketList.innerHTML = '<div class="basket-empty">Belum ada menu dipilih. Kembali ke langkah "Pilih Menu" untuk menambahkan.</div>';
      return;
    }
    basketList.innerHTML = basket.map((b, i) => `
      <div class="basket-item">
        <div><div class="bi-name">${b.menu}</div><div class="bi-qty">Jumlah: ${b.qty}</div></div>
        <button type="button" class="remove-btn" data-idx="${i}">Hapus</button>
      </div>
    `).join('');
    basketList.querySelectorAll('.remove-btn').forEach(btn => {
      btn.addEventListener('click', () => { basket.splice(parseInt(btn.dataset.idx, 10), 1); renderBasket(); });
    });
  }

  function renderSummary(){
    const name = document.getElementById('eventName').value || '-';
    const date = document.getElementById('eventDate').value || '-';
    const time = document.getElementById('eventTime').value || '-';
    const place = document.getElementById('eventPlace').value || '-';
    document.getElementById('summaryEvent').innerHTML = `
      <h3>Detail Acara</h3>
      <p><b>${name}</b></p>
      <p>📅 ${date} · ⏰ ${time}</p>
      <p>📍 ${place}</p>
      <p>Brand: ${eventBrand.value}</p>
    `;
    const c1n = document.getElementById('c1name').value || '-';
    const c1p = document.getElementById('c1phone').value || '-';
    const c2n = document.getElementById('c2name').value;
    let contactHtml = `<h3>Contact Person</h3><p>${c1n} — ${c1p}</p>`;
    if (c2n) { contactHtml += `<p>${c2n} — ${document.getElementById('c2phone').value || '-'}</p>`; }
    document.getElementById('summaryContact').innerHTML = contactHtml;

    document.getElementById('summaryBasket').innerHTML = `<h3>Menu Dipesan</h3>` +
      (basket.length ? basket.map(b => `<p>${b.qty}x ${b.menu}</p>`).join('') : '<p>Belum ada menu dipilih.</p>');
  }

  document.getElementById('submitWizard').addEventListener('click', () => {
    const name = document.getElementById('eventName').value;
    const date = document.getElementById('eventDate').value;
    const time = document.getElementById('eventTime').value;
    const place = document.getElementById('eventPlace').value;
    const c1n = document.getElementById('c1name').value;
    const c1p = document.getElementById('c1phone').value;
    const menuLines = basket.map(b => `- ${b.qty}x ${b.menu}`).join('%0A');
    const pesan = `Halo Hokky Group, saya mau tanya untuk Partai Besar/Gathering:%0A%0A`
      + `Nama Acara: ${name}%0A`
      + `Tanggal: ${date}%0A`
      + `Waktu: ${time}%0A`
      + `Lokasi: ${place}%0A`
      + `Brand: ${eventBrand.value}%0A`
      + `Contact: ${c1n} (${c1p})%0A%0A`
      + `Menu yang diminati:%0A${menuLines || '- (belum dipilih)'}%0A%0A`
      + `Mohon info ketersediaan &amp; penawaran harganya ya. Terima kasih!`;
    window.open(`https://wa.me/${ADMIN_WA_NUMBER}?text=${pesan}`, '_blank');
  });

  renderMenuPicker();
}
