# Setup React + Vercel + Supabase

## 1. Buat project Supabase

1. Buka https://supabase.com/dashboard.
2. Pilih `New project`.
3. Isi nama project dan password database. Simpan password itu di password manager.
4. Pilih region yang dekat dengan pengunjung.
5. Tunggu project selesai dibuat.

## 2. Buat tabel

1. Buka menu `SQL Editor` di project Supabase.
2. Buka file `supabase/schema.sql` dari project ini.
3. Copy seluruh isinya ke SQL Editor.
4. Tekan `Run`.

Schema membuat tabel `profiles`, `projects`, dan `articles`, termasuk Row Level Security.

## 3. Buat akun admin

1. Buka `Authentication` > `Users`.
2. Pilih `Add user` > `Create new user`.
3. Isi email admin dan password yang kuat.
4. Jangan menaruh password tersebut di source code atau `.env` frontend.

## 4. Isi environment lokal

1. Buka `Project Settings` > `API`.
2. Salin `Project URL` dan `Publishable key`/anon key.
3. Buat file `.env.local` di root project berdasarkan `.env.example`:

```env
VITE_SUPABASE_URL=https://project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-publishable-key
```

Gunakan hanya publishable/anon key pada frontend. Jangan pernah menggunakan `service_role` key di React.

## 5. Jalankan lokal

```powershell
npm install
npm run dev
```

Perubahan data lokal saat ini masih memakai `localStorage` sebagai fallback. Setelah Supabase dikonfigurasi, layer data React dapat dipindahkan ke query Supabase tanpa mengubah komponen UI.

## 6. Deploy ke Vercel

1. Push project ke GitHub.
2. Buka https://vercel.com/new.
3. Import repository.
4. Framework preset: `Vite`.
5. Build command: `npm run build`.
6. Output directory: `dist`.
7. Tambahkan environment variables `VITE_SUPABASE_URL` dan `VITE_SUPABASE_ANON_KEY` pada Environment `Production`, `Preview`, dan `Development`.
8. Deploy.

`vercel.json` sudah mengatur fallback SPA agar route `/articles`, `/contact`, dan `/admin` tidak 404 ketika direfresh.

## Catatan keamanan

- Publishable/anon key boleh berada di frontend karena RLS yang melindungi tabel.
- Service role key tidak boleh berada di frontend, GitHub, atau Vercel client environment.
- Sebelum website dipakai publik, ganti policy admin sederhana pada `supabase/schema.sql` dengan pengecekan role admin yang lebih ketat jika project memiliki banyak user.
