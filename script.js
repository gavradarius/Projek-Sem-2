const users = {
  'ADM001': { pass:'admin123', name:'Admin LogiCorp', role:'Administrator', div:'Manajemen', pos:'Administrator', email:'admin@logicorp.id', salary:'Rp 8.500.000', av:'AD', color:'#f97316' },
  'EMP001': { pass:'emp123', name:'Agus Santoso', role:'Karyawan', div:'Pengemudi', pos:'Driver Senior', email:'agus@logicorp.id', salary:'Rp 5.500.000', av:'AS', color:'#3b82f6' },
  'HRD001': { pass:'hrd123', name:'Hani Pertiwi', role:'HRD Manager', div:'HRD', pos:'HRD Manager', email:'hani@logicorp.id', salary:'Rp 9.000.000', av:'HP', color:'#10b981' }
};

let currentUser = null;

function doLogin() {
  const id = document.getElementById('loginId').value.trim().toUpperCase();
  const pass = document.getElementById('loginPass').value;
  const err = document.getElementById('loginErr');
  if(users[id] && users[id].pass === pass) {
    currentUser = { id, ...users[id] };
    err.style.display = 'none';
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('app').style.display = 'block';
    document.getElementById('sidebarName').textContent = currentUser.name;
    document.getElementById('sidebarRole').textContent = currentUser.role;
    document.getElementById('sideAv').textContent = currentUser.av;
    document.getElementById('sideAv').style.background = currentUser.color;
    document.getElementById('topAv').textContent = currentUser.av;
    document.getElementById('topAv').style.background = currentUser.color;
    updateProfile();
    updateDate();
  } else {
    err.style.display = 'block';
  }
}
document.getElementById('loginPass').addEventListener('keypress', e => { if(e.key==='Enter') doLogin(); });

function updateProfile() {
  const u = currentUser;
  document.getElementById('profAv').textContent = u.av;
  document.getElementById('profAv').style.background = u.color;
  document.getElementById('profName').textContent = u.name;
  document.getElementById('profRole').textContent = u.pos;
  document.getElementById('profFullName').textContent = u.name;
  document.getElementById('profId').textContent = u.id;
  document.getElementById('profEmail').textContent = u.email;
  document.getElementById('profDiv').textContent = u.div;
  document.getElementById('profPos').textContent = u.pos;
  document.getElementById('profSalary').textContent = u.salary;
}

function doLogout() {
  document.getElementById('loginPage').style.display = 'flex';
  document.getElementById('app').style.display = 'none';
  document.getElementById('loginId').value = '';
  document.getElementById('loginPass').value = '';
}

function showPage(id, el) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + id).classList.add('active');
  document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
  if(el) el.classList.add('active');
  const titles = { dashboard:'Dashboard', profil:'Profil Saya', karyawan:'Data Karyawan',
    absensi:'Absensi', gaji:'Penggajian', shift:'Jadwal Shift', sp:'Surat Pelanggaran',
    chat:'Chat HRD', laporan:'Laporan & Analitik' };
  document.getElementById('pageTitle').textContent = titles[id] || id;
}

function updateDate() {
  const d = new Date();
  const opts = { weekday:'long', year:'numeric', month:'long', day:'numeric' };
  document.getElementById('todayDate').textContent = d.toLocaleDateString('id-ID', opts);
}

function openModal(id) { document.getElementById(id).classList.add('open'); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }

document.querySelectorAll('.modal-overlay').forEach(m => {
  m.addEventListener('click', e => { if(e.target===m) m.classList.remove('open'); });
});

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = '✅ ' + msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

function filterTable(input, tableId) {
  const q = input.value.toLowerCase();
  document.querySelectorAll('#' + tableId + ' tbody tr').forEach(row => {
    row.style.display = row.textContent.toLowerCase().includes(q) ? '' : 'none';
  });
}

function viewEmp(name) { showToast('Membuka detail karyawan: ' + name); }

function showSlip(name) {
  document.getElementById('slipContent').innerHTML = `
    <div class="info-row"><span class="key">Nama</span><span class="val">${name}</span></div>
    <div class="info-row"><span class="key">Jabatan</span><span class="val">Driver Senior</span></div>
    <div class="info-row" style="padding-top:14px"><span class="key">Gaji Pokok</span><span class="val">Rp 5.500.000</span></div>
    <div class="info-row"><span class="key">Tunjangan Transport</span><span class="val">Rp 500.000</span></div>
    <div class="info-row"><span class="key">Tunjangan Makan</span><span class="val">Rp 250.000</span></div>
    <div class="info-row"><span class="key">Lembur (12 jam)</span><span class="val">Rp 300.000</span></div>
    <div class="info-row" style="color:var(--danger)"><span class="key">Potongan BPJS Kes.</span><span class="val">- Rp 110.000</span></div>
    <div class="info-row" style="color:var(--danger)"><span class="key">Potongan BPJS TK</span><span class="val">- Rp 110.000</span></div>
    <div class="info-row" style="border-top:2px solid var(--accent);padding-top:12px;margin-top:4px">
      <span class="key" style="font-weight:700;color:var(--white)">TOTAL DITERIMA</span>
      <span class="val" style="color:var(--accent3);font-family:'Syne',sans-serif;font-size:18px;font-weight:800">Rp 6.330.000</span>
    </div>`;
  openModal('slipModal');
}

function sendChat() {
  const input = document.getElementById('chatInput');
  const msg = input.value.trim();
  if(!msg) return;
  const msgs = document.getElementById('chatMessages');
  const div = document.createElement('div');
  div.className = 'chat-msg mine';
  div.innerHTML = `<div class="bubble">${msg}</div><div class="meta">Anda • ${new Date().toLocaleTimeString('id-ID',{hour:'2-digit',minute:'2-digit'})}</div>`;
  msgs.appendChild(div);
  input.value = '';
  msgs.scrollTop = msgs.scrollHeight;
  setTimeout(() => {
    const rep = document.createElement('div');
    rep.className = 'chat-msg theirs';
    rep.innerHTML = `<div class="bubble">Pesan Anda sudah kami terima. Tim HRD akan segera menindaklanjuti. Terima kasih 🙏</div><div class="meta">Tim HRD • ${new Date().toLocaleTimeString('id-ID',{hour:'2-digit',minute:'2-digit'})}</div>`;
    msgs.appendChild(rep);
    msgs.scrollTop = msgs.scrollHeight;
  }, 1200);
}

function switchChat(type) {
  document.querySelectorAll('.chat-item').forEach(i => i.classList.remove('active'));
  event.currentTarget.classList.add('active');
}

function filterByDivisi(sel) {
  const val = sel.value.toLowerCase();
  document.querySelectorAll('#empTable tbody tr').forEach(row => {
    row.style.display = (!val || row.textContent.toLowerCase().includes(val)) ? '' : 'none';
  });
}

updateDate();
