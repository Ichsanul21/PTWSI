# Deploy PT Wall Street Indonesia (Laragon / Production)

## 1. Prasyarat
- PHP 8.3+ (Laragon), Node 22+ (untuk build asset + SSR)
- Extension PHP: pdo_sqlite atau pdo_mysql (tergantung DB). Production sebaiknya MySQL.
- Composer 2+

## 2. Setup di Laragon (staging/local)
```bash
cd D:\ICHSAN\Prototype\WSI\wsi-app
copy .env.example .env          # sesuaikan isinya
php artisan key:generate

# SQLite (default dev)
touch database/database.sqlite

# MySQL (opsional, production dianjurkan)
# .env: DB_CONNECTION=mysql, DB_DATABASE=wsi, DB_USERNAME=root, DB_PASSWORD=
# buat database "wsi" di phpMyAdmin/Laragon MySQL dulu

php artisan migrate --seed      # seed data awal + user admin
php artisan storage:link        # symlink upload
npm install
npm run build                   # client + SSR
```

Buat Vhost di Laragon (Menu → Apache → sites → Tambah) dengan document root `wsi-app/public`.

## 3. Konfigurasi .env produksi
```ini
APP_ENV=production
APP_DEBUG=false
APP_URL=https://domain-anda.com

MAIL_MAILER=smtp             # ganti dari 'log'
MAIL_HOST=...                # SMTP provider Anda
MAIL_PORT=587
MAIL_USERNAME=...
MAIL_PASSWORD=...
MAIL_FROM_NAME="Wall Street Indonesia"

SESSION_DRIVER=file          # cukup; gunakan redis jika trafik tinggi
CACHE_STORE=file
```

## 4. Build & cache produksi
```bash
npm ci
npm run build                # hasil: public/build (client) + bootstrap/ssr (SSR)
php artisan migrate --force
php artisan storage:link
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan optimize
```

## 5. SSR (optional, sudah terpasang; tanpa ini situs tetap jalan client-side)
Jalankan terus-menerus sebagai service:
```bash
# dev: jalankan di terminal
php artisan inertia:start-ssr

# production Linux: gunakan pm2 atau supervisor
pm2 start --name wsi-ssr "php artisan inertia:start-ssr"
pm2 save && pm2 startup
```
Port default: 13714. Pastikan firewall allows localhost traffic.

## 6. Login admin pertama
- URL: `/admin/login`
- User hasil seeder: `admin@wallstreetindonesia.com` / `password`
- **WAJIB GANTI** segera:
```bash
php artisan tinker --execute="App\Models\User::where('email','admin@wallstreetindonesia.com')->update(['password'=>bcrypt('PASSWORD_BARU')]);"
```

## 7. Checklist go-live
- [ ] `.env`: APP_ENV=production, APP_DEBUG=false, URL true
- [ ] SMTP dikonfigurasi; notifikasi enquiry dikirim ke `wallstreet.office@gmail.com` (dari Settings)
- [ ] `storage/app/public/*` dapat diakses via `/storage/*`
- [ ] Isi lewat admin: Layanan, Kategori, Metode Uji, Klien, Proyek, Galeri, Insight, Settings
- [ ] Verifikasi ke Google Search Console: submit `/sitemap.xml`, cek `/robots.txt`
- [ ] Uji `/` & `/en/` di ID/EN, form kontak terisi ke DB
- [ ] `php artisan test` hijau
- [ ] Cadangkan `database/*.sqlite` (dev) atau database MySQL (prod)

## 8. Alur update konten
Konten sampaikan lewat admin panel; gambar upload otomatis tersimpan di `storage/app/public/{clients,gallery,projects}` (jangan commit folder ini jika pakai git, cukup backup).