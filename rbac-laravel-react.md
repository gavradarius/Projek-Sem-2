# RBAC Rumah Sakit dengan Laravel + React

## 1. Struktur Database

### Tabel Utama

- `users`
  - `id`
  - `name`
  - `email`
  - `password`
  - `created_at`
  - `updated_at`

- `roles`
  - `id`
  - `name` (`admin`, `dokter`, `perawat`, `pasien`)
  - `display_name`
  - `created_at`
  - `updated_at`

- `permissions`
  - `id`
  - `name`
  - `display_name`
  - `created_at`
  - `updated_at`

- `role_user`
  - `id`
  - `role_id`
  - `user_id`

- `permission_role`
  - `id`
  - `permission_id`
  - `role_id`

### Domain Rumah Sakit

- `patients`
  - `id`
  - `user_id`
  - `nama`
  - `no_rm`
  - `no_hp`
  - `alamat`
  - `tanggal_lahir`
  - `created_at`
  - `updated_at`

- `doctors`
  - `id`
  - `user_id`
  - `nama`
  - `spesialisasi`
  - `jadwal_praktik`
  - `avg_duration`
  - `created_at`
  - `updated_at`

- `clinics`
  - `id`
  - `nama_poli`
  - `kuota_per_sesi`
  - `deskripsi`
  - `created_at`
  - `updated_at`

- `appointments`
  - `id`
  - `patient_id`
  - `doctor_id`
  - `clinic_id`
  - `tanggal`
  - `jam`
  - `keluhan`
  - `status` (`Menunggu`, `Dipanggil`, `Pemeriksaan`, `Selesai`, `Ditunda`)
  - `priority`
  - `qr_code`
  - `created_at`
  - `updated_at`

- `shifts`
  - `id`
  - `doctor_id`
  - `tanggal`
  - `jam_mulai`
  - `jam_selesai`
  - `type`
  - `status`
  - `created_at`
  - `updated_at`

- `facility_reservations`
  - `id`
  - `facility_id`
  - `tanggal`
  - `jam_mulai`
  - `jam_selesai`
  - `status`
  - `created_at`
  - `updated_at`

---

## 2. Laravel: RBAC dengan `spatie/laravel-permission`

### 2.1 Install dan publish

```bash
composer require spatie/laravel-permission
php artisan vendor:publish --provider="Spatie\Permission\PermissionServiceProvider"
php artisan migrate
```

### 2.2 `User` model

```php
// app/Models/User.php
namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasRoles;

    protected $fillable = ['name', 'email', 'password'];
    protected $hidden = ['password', 'remember_token'];
}
```

### 2.3 Seeder role + permission

```php
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolePermissionSeeder extends Seeder
{
    public function run()
    {
        $permissions = [
            'lihat rekam medis',
            'edit rekam medis',
            'booking dokter',
            'manajemen user',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        $admin = Role::firstOrCreate(['name' => 'admin']);
        $dokter = Role::firstOrCreate(['name' => 'dokter']);
        $perawat = Role::firstOrCreate(['name' => 'perawat']);
        $pasien = Role::firstOrCreate(['name' => 'pasien']);

        $admin->syncPermissions($permissions);
        $dokter->syncPermissions(['lihat rekam medis', 'edit rekam medis']);
        $perawat->syncPermissions(['lihat rekam medis', 'booking dokter']);
        $pasien->syncPermissions(['booking dokter']);
    }
}
```

### 2.4 Middleware `CheckPermission`

```php
// app/Http/Middleware/CheckPermission.php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class CheckPermission
{
    public function handle($request, Closure $next, $permission)
    {
        if (!Auth::check() || !Auth::user()->can($permission)) {
            return response()->json(['message' => 'Akses ditolak'], 403);
        }
        return $next($request);
    }
}
```

Daftarkan di `app/Http/Kernel.php`:

```php
protected $routeMiddleware = [
    'permission' => \App\Http\Middleware\CheckPermission::class,
];
```

### 2.5 Route API dengan middleware

```php
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/rekam-medis/{patient}', [MedicalRecordController::class, 'show'])
        ->middleware('permission:lihat rekam medis');

    Route::post('/rekam-medis/{patient}', [MedicalRecordController::class, 'update'])
        ->middleware('permission:edit rekam medis');

    Route::post('/booking', [AppointmentController::class, 'store'])
        ->middleware('permission:booking dokter');

    Route::get('/users', [UserController::class, 'index'])
        ->middleware('permission:manajemen user');
});
```

### 2.6 Policy contoh

```php
// app/Policies/PatientPolicy.php
namespace App\Policies;

use App\Models\Patient;
use App\Models\User;

class PatientPolicy
{
    public function view(User $user, Patient $patient)
    {
        if ($user->hasRole('admin')) {
            return true;
        }

        if ($user->hasRole('dokter') || $user->hasRole('perawat')) {
            return true;
        }

        if ($user->hasRole('pasien')) {
            return $user->id === $patient->user_id;
        }

        return false;
    }
}
```

Daftarkan di `AuthServiceProvider`:

```php
protected $policies = [
    Patient::class => PatientPolicy::class,
];
```

Dan gunakan di controller:

```php
public function show(Patient $patient)
{
    $this->authorize('view', $patient);
    return response()->json($patient);
}
```

---

## 3. Struktur Laravel API rekomendasi

### `routes/api.php`

```php
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\MedicalRecordController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DoctorController;
use App\Http\Controllers\ClinicController;

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::get('/dashboard', [DashboardController::class, 'index']);
    Route::get('/doctors', [DoctorController::class, 'index']);
    Route::get('/clinics', [ClinicController::class, 'index']);

    Route::post('/appointments', [AppointmentController::class, 'store'])
         ->middleware('permission:booking dokter');

    Route::put('/appointments/{appointment}/status', [AppointmentController::class, 'updateStatus'])
         ->middleware('permission:edit rekam medis');

    Route::get('/patients/{patient}/records', [MedicalRecordController::class, 'show'])
         ->middleware('permission:lihat rekam medis');

    Route::get('/users', [UserController::class, 'index'])
         ->middleware('permission:manajemen user');
});
```

---

## 4. Contoh Frontend Protection React

### 4.1 `AuthContext`

```js
// src/context/AuthContext.js
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const hasPermission = (perm) => user?.permissions?.includes(perm);
  const hasRole = (role) => user?.roles?.includes(role);

  return (
    <AuthContext.Provider value={{ user, setUser, hasPermission, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
```

### 4.2 `ProtectedRoute`

```js
// src/components/ProtectedRoute.js
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function ProtectedRoute({ children, permission, role }) {
  const { user, hasPermission, hasRole } = useAuth();

  if (!user) return <Navigate to="/login" />;
  if (permission && !hasPermission(permission)) return <Navigate to="/not-authorized" />;
  if (role && !hasRole(role)) return <Navigate to="/not-authorized" />;

  return children;
}
```

### 4.3 Sidebar menu guard

```js
const menuItems = [
  { path: '/dashboard', label: 'Dashboard' },
  { path: '/jadwal-pasien', label: 'Jadwal Pasien', permission: 'booking dokter' },
  { path: '/data-dokter', label: 'Data Dokter', role: 'admin' },
  { path: '/data-poli', label: 'Data Poli', role: 'admin' },
];

function Sidebar() {
  const { hasPermission, hasRole } = useAuth();

  return (
    <nav>
      {menuItems.map((item) => {
        if (item.permission && !hasPermission(item.permission)) return null;
        if (item.role && !hasRole(item.role)) return null;
        return <Link key={item.path} to={item.path}>{item.label}</Link>;
      })}
    </nav>
  );
}
```

### 4.4 Contoh form booking

```js
function BookingForm() {
  const { user } = useAuth();
  const [form, setForm] = useState({ patient_id: '', doctor_id: '', clinic_id: '', tanggal: '', jam: '', keluhan: '' });

  const submit = async () => {
    const response = await fetch('/api/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (!response.ok) {
      // handle error
    }
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); submit(); }}>
      {/* input fields... */}
    </form>
  );
}
```

---

## 5. Best Practice Security

- Selalu validasi di server
- Gunakan `auth:sanctum` atau JWT dengan refresh token
- Simpan password dengan `bcrypt` atau `argon2`
- Gunakan `HTTPS` penuh
- Batasi rate login / brute force
- Lindungi endpoint dengan middleware dan policy
- Audit log semua aksi sensitif
- Hindari `authorization` hanya di frontend
- Pastikan `CORS` terkonfigurasi dengan aman

---

## 6. Rekomendasi Arsitektur

- Frontend: React untuk UI interaktif
- Backend: Laravel API dengan Sanctum
- Real-time: WebSocket / Pusher / Laravel Echo untuk live update slot
- Kalender: FullCalendar untuk tampilan jadwal dokter & ruang

Jika kamu ingin, saya bisa lanjutkan dengan membuat:
1. struktur folder `laravel-backend/` dan `react-frontend/`
2. contoh migration lengkap untuk `appointments`, `patients`, `doctors`, `clinics`
3. sample `AuthController`, `AppointmentController`, dan `MedicalRecordController`
4. contoh `React Router` dan `login page`