const users = {
  'ADMIN': {
    pass:'admin',
    name:'Yusuf Akbar',
    role:'Admin',
    department:'Manajemen RS Ummat',
    title:'Administrator',
    email:'admin@rsummat.id',
    avatar:'YA',
    color:'#0f766e'
  },
  'DR001': {
    pass:'dr123',
    name:'dr. Sinta Aulia',
    role:'Dokter',
    department:'Poli Umum',
    title:'Dokter Umum',
    email:'sinta@rsummat.id',
    avatar:'DS',
    color:'#0ea5b8'
  },
  'PT001': {
    pass:'pt123',
    name:'Ayu Prameswari',
    role:'Pasien',
    department:'Pasien Terdaftar',
    title:'Pasien',
    email:'ayu.prameswari@gmail.com',
    avatar:'AP',
    color:'#22c55e'
  }
};

let currentUser = null;
const rolePages = {
  Admin:['dashboard','profil','admin','laporan','chat'],
  Dokter:['dashboard','profil','dokter','antrian','chat'],
  Pasien:['dashboard','profil','pasien','riwayat','chat']
};

console.log('RS Ummat script loaded');

function doLogin() {
  const id = document.getElementById('loginId').value.trim().toUpperCase();
  const pass = document.getElementById('loginPass').value;
  const err = document.getElementById('loginErr');

  if (users[id] && users[id].pass === pass) {
    currentUser = { id, ...users[id] };
    err.style.display = 'none';
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('app').style.display = 'flex';
    document.getElementById('sidebarName').textContent = currentUser.name;
    document.getElementById('sidebarRole').textContent = currentUser.role;
    document.getElementById('sideAv').textContent = currentUser.avatar;
    document.getElementById('sideAv').style.background = currentUser.color;
    document.getElementById('topAv').textContent = currentUser.avatar;
    document.getElementById('topAv').style.background = currentUser.color;
    setRolePages();
    updateProfile();
    updateDate();
    showPage('dashboard', document.querySelector('.nav-item[data-page="dashboard"]'));
  } else {
    err.style.display = 'block';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('loginPass').addEventListener('keypress', e => { if (e.key === 'Enter') doLogin(); });
});

function setRolePages() {
  document.querySelectorAll('.nav-item').forEach(item => {
    const page = item.dataset.page;
    if (!currentUser) {
      item.style.display = 'none';
      return;
    }
    if (['dashboard','profil','chat'].includes(page)) {
      item.style.display = '';
      return;
    }
    if (item.classList.contains('role-admin')) {
      item.style.display = currentUser.role === 'Admin' ? '' : 'none';
      return;
    }
    if (item.classList.contains('role-dokter')) {
      item.style.display = currentUser.role === 'Dokter' ? '' : 'none';
      return;
    }
    if (item.classList.contains('role-pasien')) {
      item.style.display = currentUser.role === 'Pasien' ? '' : 'none';
      return;
    }
    item.style.display = 'none';
  });
}

function showPage(id) {
  if (currentUser && !rolePages[currentUser.role].includes(id)) return;
  document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
  const target = document.getElementById('page-' + id);
  if (target) target.classList.add('active');
  document.querySelectorAll('.nav-item').forEach(item => item.classList.toggle('active', item.dataset.page === id));
  const titles = {
    dashboard: 'Dashboard', profil: 'Profil Saya', pasien: 'Pendaftaran Pasien', riwayat: 'Riwayat Kunjungan', dokter: 'Jadwal Dokter', antrian: 'Antrian Pasien', admin: 'Manajemen RS', laporan: 'Laporan', chat: 'Chat RS Ummat'
  };
  const subtitles = {
    dashboard: 'Ringkasan operasional rumah sakit', profil: 'Informasi profil Anda', pasien: 'Buat dan kelola janji temu', riwayat: 'Lihat riwayat kunjungan Anda', dokter: 'Jadwal konsultasi dan status', antrian: 'Pasien yang menunggu', admin: 'Pengaturan tim dan pelayanan', laporan: 'Statistik dan kinerja', chat: 'Dukungan layanan'
  };
  document.getElementById('pageTitle').textContent = titles[id] || 'RS Ummat';
  document.getElementById('pageSubtitle').textContent = subtitles[id] || '';
}

function updateProfile() {
  const u = currentUser;
  document.getElementById('profAv').textContent = u.avatar;
  document.getElementById('profAv').style.background = u.color;
  document.getElementById('profName').textContent = u.name;
  document.getElementById('profRole').textContent = `${u.title} • ${u.role}`;
  document.getElementById('profId').textContent = u.id;
  document.getElementById('profEmail').textContent = u.email;
  document.getElementById('profDiv').textContent = u.department;
  document.getElementById('profPos').textContent = u.title;
}

function doLogout() {
  document.getElementById('loginPage').style.display = 'flex';
  document.getElementById('app').style.display = 'none';
  document.getElementById('loginId').value = '';
  document.getElementById('loginPass').value = '';
  document.getElementById('loginErr').style.display = 'none';
}

function updateDate() {
  const d = new Date();
  const opts = { weekday:'long', year:'numeric', month:'long', day:'numeric' };
  document.getElementById('todayDate').textContent = d.toLocaleDateString('id-ID', opts);
}

function bookAppointment() {
  const name = document.getElementById('bookName').value.trim();
  const poli = document.getElementById('bookPoli').value;
  const dokter = document.getElementById('bookDoctor').value;
  const tanggal = document.getElementById('bookDate').value;
  const jam = document.getElementById('bookTime').value;
  if (!name || !tanggal) { showToast('Lengkapi nama dan tanggal janji temu.'); return; }
  const appointmentDate = new Date(tanggal).toLocaleDateString('id-ID', { day:'2-digit', month:'short', year:'numeric' });
  const tbody = document.getElementById('appointmentsBody');
  const row = document.createElement('tr');
  row.innerHTML = `<td>${poli}</td><td>${dokter}</td><td>${appointmentDate}</td><td>${jam}</td><td><span class="badge yellow">Menunggu</span></td>`;
  tbody.appendChild(row);
  showToast('Janji temu berhasil dibuat.');
  document.getElementById('bookNote').value = '';
}

function markNextPatient() { showToast('Pasien berikutnya diproses. Silakan periksa detail antrian.'); }
function showToast(message) { const t = document.getElementById('toast'); t.textContent = message; t.classList.add('show'); setTimeout(() => t.classList.remove('show'), 3000); }
function sendChat() {
  const input = document.getElementById('chatInput'); const message = input.value.trim(); if (!message) return;
  const messages = document.getElementById('chatMessages');
  const msgItem = document.createElement('div'); msgItem.className = 'chat-bubble mine'; msgItem.innerHTML = `<p>${message}</p><span>Anda • ${new Date().toLocaleTimeString('id-ID',{hour:'2-digit',minute:'2-digit'})}</span>`;
  messages.appendChild(msgItem); input.value = ''; messages.scrollTop = messages.scrollHeight;
  setTimeout(() => {
    const reply = document.createElement('div'); reply.className = 'chat-bubble theirs'; reply.innerHTML = `<p>Terima kasih. Tim RS Ummat akan segera menindaklanjuti permintaan Anda.</p><span>Tim RS • ${new Date().toLocaleTimeString('id-ID',{hour:'2-digit',minute:'2-digit'})}</span>`;
    messages.appendChild(reply); messages.scrollTop = messages.scrollHeight;
  }, 1000);
}

function toggleSidebar() {
  const sidebar = document.querySelector('.sidebar'); const hamburger = document.getElementById('hamburgerMenu'); const open = sidebar.classList.toggle('open'); hamburger.classList.toggle('open', open); document.body.style.overflow = open ? 'hidden' : '';
}

window.doLogin = doLogin;
window.showPage = showPage;
window.toggleSidebar = toggleSidebar;
window.sendChat = sendChat;
window.bookAppointment = bookAppointment;
window.doLogout = doLogout;

window.addEventListener('resize', () => {
  const sidebar = document.querySelector('.sidebar'); const hamburger = document.getElementById('hamburgerMenu');
  if (window.innerWidth > 767) { sidebar.classList.remove('open'); hamburger.classList.remove('open'); document.body.style.overflow = ''; }
});

updateDate();
