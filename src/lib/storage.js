import { supabase } from './supabase';

export async function uploadPortfolioFile(file, folder = 'documents') {
  if (!file) throw new Error('Pilih file yang valid.');

  const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
  const isImage = file.type.startsWith('image/');
  const isDoc = file.type.includes('document') || file.type.includes('word') || file.name.toLowerCase().endsWith('.doc') || file.name.toLowerCase().endsWith('.docx');

  if (!isPdf && !isImage && !isDoc) {
    throw new Error('Format file tidak didukung. Harap pilih file PDF atau gambar.');
  }

  const maxSize = (isPdf || isDoc) ? 10 * 1024 * 1024 : 5 * 1024 * 1024;
  if (file.size > maxSize) {
    throw new Error(`Ukuran file maksimal ${(isPdf || isDoc) ? '10 MB' : '5 MB'}.`);
  }

  if (supabase) {
    try {
      const extension = file.name.split('.').pop()?.toLowerCase() || (isPdf ? 'pdf' : 'jpg');
      const path = `${folder}/${crypto.randomUUID()}.${extension}`;
      const contentType = file.type || (isPdf ? 'application/pdf' : 'application/octet-stream');

      const { data, error } = await supabase.storage
        .from('portfolio-images')
        .upload(path, file, { upsert: true, contentType });

      if (!error && data) {
        return supabase.storage.from('portfolio-images').getPublicUrl(path).data.publicUrl;
      }
      if (error) {
        console.warn('Supabase storage upload error, using local Data URL fallback:', error.message);
      }
    } catch (storageErr) {
      console.warn('Storage upload exception:', storageErr);
    }
  }

  // Fallback: Convert to Data URL (base64) so it can still be saved and downloaded immediately
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('Gagal membaca file dari komputer Anda.'));
    reader.readAsDataURL(file);
  });
}

export async function uploadPortfolioImage(file, folder = 'profile') {
  return uploadPortfolioFile(file, folder);
}

