-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 26, 2025 at 09:01 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `portofolio_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `contact_messages`
--

CREATE TABLE `contact_messages` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contact_messages`
--

INSERT INTO `contact_messages` (`id`, `name`, `email`, `subject`, `message`, `created_at`) VALUES
(1, 'Azza', 'mazza050901@gmail.com', 'afishdfjsh', 'asfgkjdbkfjdfkjaskffbkjd', '2025-06-25 13:56:54'),
(2, 'Zy1', 'Azza@gmail.com', 'CCI', 'jhvdjhjsdhbfjhd', '2025-06-25 14:06:43'),
(3, 'RISKI', 'RISKI@gmail.com', 'afishdfjsh', 'asfgkjdbkfjdfkjaskffbkjd', '2025-06-25 14:20:41');

-- --------------------------------------------------------

--
-- Table structure for table `sections`
--

CREATE TABLE `sections` (
  `id` int(11) NOT NULL,
  `section_name` varchar(50) NOT NULL,
  `section_content` longtext NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sections`
--

INSERT INTO `sections` (`id`, `section_name`, `section_content`, `created_at`, `updated_at`) VALUES
(1, 'hero', '{\"role\":\"Front-End and Back-End  Developer\",\"title\":\"I\'m Muhammad Azza Al Kausar\",\"subtitle\":\"Crafting Digital Experiences & Innovative Solutions\",\"description\":\"Informatics Engineering student passionate about developing practical software solutions that combine clean design with functional technology.\",\"cta_primary\":\"Contact Me\",\"cta_primary_link\":\"contact-me.php\",\"cta_secondary\":\"View Projects\",\"cta_secondary_link\":\"#projects\",\"profile_image\":\"uploads\\/img_685d47b0d389a.jpg\",\"social_links\":{\"github\":\"https:\\/\\/github.com\\/Zyzero1\",\"linkedin\":\"https:\\/\\/www.linkedin.com\\/in\\/muhammad-azza-al-kausar-176460197\\/\",\"twitter\":\"https:\\/\\/x.com\\/Al_kausarr\",\"instagram\":\"https:\\/\\/www.instagram.com\\/muhammad.azzaa_\\/\"}}', '2025-06-23 05:42:32', '2025-06-26 17:21:35'),
(2, 'about', '{\"title\":\"About Me\",\"content\":\"\",\"name\":\"Muhammad Azza Al Kausar\",\"age\":\"23\",\"email\":\"mazza050901@gmail.com\",\"phone\":\"081276076795\",\"location\":\"Tanjung Balai Karimun, Riau Island, Indonesia\",\"availability\":\"available\",\"profile_image\":\"\",\"social_links\":{\"github\":\"https:\\/\\/github.com\\/Zyzero1\",\"linkedin\":\"https:\\/\\/www.linkedin.com\\/in\\/muhammad-azza-al-kausar-176460197\\/\",\"twitter\":\"#\",\"instagram\":\"#\"}}', '2025-06-23 05:42:32', '2025-06-26 09:28:01'),
(3, 'skills', '{\"title\":\"Technical Proficiency\",\"description\":\"Showcasing my technical expertise and skills across various technologies\",\"categories\":{\"Development Skills\":[{\"name\":\"HTML\\/CSS\",\"proficiency\":\"90\"},{\"name\":\"JavaScript\",\"proficiency\":\"80\"},{\"name\":\"PHP\",\"proficiency\":\"80\"},{\"name\":\"Python\",\"proficiency\":\"67\"},{\"name\":\"Dart\",\"proficiency\":\"60\"}],\"Tools & Technologies\":[{\"name\":\"Git\",\"icon\":\"fab fa-git-alt\",\"color\":\"text-neon-blue\"},{\"name\":\"Docker\",\"icon\":\"fab fa-docker\",\"color\":\"text-neon-purple\"}],\"Soft Skills\":[{\"name\":\"Teamwork\",\"icon\":\"fa-solid fa-people-group\",\"color\":\"text-neon-blue\"}]}}', '2025-06-23 05:42:32', '2025-06-26 12:47:43'),
(4, 'projects', '{\"title\":\"Featured Projects\",\"description\":\"Showcasing my technical expertise and creative problem-solving...\",\"items\":[{\"title\":\"QIQO\",\"description\":\"\",\"technologies\":\"Dart, Flutter, Firebase\",\"image\":\"uploads\\/img_685d69b42ed04.png\",\"links\":{\"demo\":\"\",\"github\":\"https:\\/\\/github.com\\/Zyzero1\\/quiz-app-flutter\"},\"featured\":true},{\"title\":\"Platform Logistik Maritim\",\"description\":\"\",\"technologies\":\"Html, CSS, JavaScript\",\"image\":\"uploads\\/img_685d69b42eef9.png\",\"links\":{\"demo\":\"\",\"github\":\"https:\\/\\/github.com\\/Zyzero1\\/Platform-Logistik-Maritim\"},\"featured\":true},{\"title\":\"uyfhygf\",\"description\":\"ygfhgfh\",\"technologies\":\"hgfhg\",\"image\":\"\",\"links\":{\"demo\":\"\",\"github\":\"https:\\/\\/github.com\\/Zyzero1\\/Platform-Logistik-Maritim\"},\"featured\":true},{\"title\":\"jgfhjgh\",\"description\":\"jhujhgjjhg\",\"technologies\":\"gfhgh\",\"image\":\"\",\"links\":{\"demo\":\"\",\"github\":\"https:\\/\\/github.com\\/Zyzero1\\/Platform-Logistik-Maritim\"},\"featured\":false}]}', '2025-06-23 05:42:32', '2025-06-26 15:39:32'),
(5, 'experience', '{\"title\":\"\",\"description\":\"\",\"items\":[{\"position\":\"Class Representative Council Chair\",\"company\":\"SMAN 04 Karimun\",\"period\":\"2018 - 2019\",\"description\":\"The Class Representative Assembly (MPK) is an organization that has a level above the Student Council. Therefore, MPK is responsible for the Student Council.\"}]}', '2025-06-23 05:42:32', '2025-06-26 09:28:01'),
(6, 'education', '{\"title\":\"\",\"description\":\"\",\"items\":[{\"degree\":\"Informatics Engineering\",\"institution\":\"UMRAH\",\"period\":\"2022 - Present\",\"description\":\"Focusing on Software Engineering and Data Science\"},{\"degree\":\"Student\",\"institution\":\"SMAN 04 Karimun\",\"period\":\"2017 - 2020\",\"description\":\"gfdtrdgf\"}]}', '2025-06-23 05:42:32', '2025-06-23 10:21:49'),
(7, 'organizations', '{\"title\":\"Organizations & Activities\",\"items\":[{\"icon\":\"\",\"title\":\"vjhvhvhgh\",\"role\":\"bjbmnmmnm\",\"period\":\"2023\",\"description\":\"\"}],\"activities\":[{\"icon\":\"\",\"title\":\"Ngoding\",\"role\":\"student\",\"period\":\"2022-present\",\"description\":\"\"},{\"icon\":\"\",\"title\":\"Ngelaprak\",\"role\":\"student\",\"period\":\"2022-present\",\"description\":\"\"}]}', '2025-06-23 05:42:32', '2025-06-26 16:01:17'),
(8, 'hero-article', '{\"enabled\":true,\"title\":\"Articles & Insights\",\"subtitle\":\"Exploring the frontiers of technology, development, and digital innovation\",\"bg_blue\":\"top-20 left-10 w-32 h-32\",\"bg_purple\":\"bottom-20 right-10 w-40 h-40\"}', '2025-06-23 05:42:32', '2025-06-26 09:28:19'),
(9, 'featured-article', '{\"enabled\":true,\"title\":\"The Future of Quantum Computing in Web Development\",\"description\":\"Exploring how quantum computing will revolutionize the way we build and optimize web applications in the next decade.\\r\\n\",\"author\":\"Muhammad Azza Al Kausar\",\"date\":\"2025-06-23\",\"readtime\":\"5 min\",\"link\":\"#\",\"image\":\"uploads\\/img_685d8b078a4f7.png\"}', '2025-06-23 05:42:32', '2025-06-26 18:01:43'),
(10, 'articles-grid', '{\"enabled\":true,\"articles\":[{\"title\":\"Buat Website Portofolio Profesional: Panduan Lengkap\",\"description\":\"Membuat website portofolio profesional adalah langkah krusial bagi siapapun yang ingin menunjukkan keahlian serta pengalaman mereka kepada calon klien atau mungkin perusahaan. Di era digital ini, website portofolio bukan sekadar opsi, melainkan kebutuhan. Artikel ini akan memandu Anda melalui proses pembuatan website portofolio yang efektif, dari perencanaan hingga peluncuran, memberikan tips praktis serta contoh nyata untuk memberikan dukungan Anda menciptakan representasi diri yang menonjol.\\r\\n\\r\\nMengapa Website Portofolio Profesional utama?\\r\\nSebelum membahas cara membuat website portofolio profesional, utama untuk memahami mengapa keberadaannya begitu utama. Website portofolio adalah etalase digital yang memungkinkan Anda memamerkan karya terbaik Anda, riwayat pekerjaan, serta keterampilan unik. Ini berfungsi sebagai pusat fakta yang praktis diakses oleh siapapun yang tertarik dengan profil Anda.\\r\\n\\r\\nDibandingkan dengan resume statis, website portofolio menawarkan fleksibilitas serta peluang untuk menceritakan kisah Anda secara visual serta interaktif. Calon klien atau mungkin perekrut dapat melihat tanpa penundaan apa yang yang telah Anda capai, apa cara Anda bekerja, serta gaya artistik atau mungkin profesional Anda. Website portofolio profesional memperbesar kredibilitas, membangun kepercayaan, serta membuka pintu menuju peluang yang lebih besar.\\r\\n\\r\\nPerencanaan Website Portofolio yang Matang\\r\\nLangkah diawali dengan dalam membuat website portofolio adalah perencanaan yang matang. Hal ini melibatkan penentuan target audiens, identifikasi tujuan website, serta pemilihan konten yang relevan. Siapakah yang ingin Anda jangkau dengan website Anda? Sebagai tambahan, Apakah Anda seorang desainer grafis, penulis lepas, pengembang web, atau mungkin fotografer?\\r\\n\\r\\nMemahami target audiens akan memberikan dukungan Anda menyesuaikan desain, bahasa, serta konten website. Tentukan apa yang yang ingin Anda capai dengan website portofolio Anda. Sebagai tambahan, Apakah Anda ingin mendapatkan klien baru, mencari pekerjaan impian, atau mungkin membangun merek pribadi? Menetapkan tujuan yang jelas akan memandu Anda dalam membuat keputusan yang dengan cermat selama proses pembuatan.\\r\\n\\r\\nPilih karya terbaik serta paling relevan untuk ditampilkan di website Anda. Fokus pada kualitas daripada kuantitas. Setiap proyek harus mencerminkan keterampilan serta pengalaman Anda yang paling mutakhir. Pertimbangkan untuk menyertakan studi kasus yang mendalam untuk menjelaskan proses kerja Anda serta hasil yang Anda capai.\\r\\n\\r\\nDesain Website Portofolio yang Memukau\\r\\nDesain website portofolio profesional adalah kunci untuk menarik perhatian serta membuat kesan diawali dengan yang positif. Desain yang baik harus bersih, sederhana, serta praktis dinavigasi. Hindari desain yang terlalu ramai atau mungkin berlebihan yang dapat mengalihkan perhatian dari karya Anda. Gunakan tata letak yang terstruktur serta visual yang menarik.\\r\\n\\r\\nPilihlah warna yang sesuai dengan merek pribadi Anda serta gunakan tipografi yang praktis dibaca. Pastikan website Anda responsif serta dapat diakses di berbagai perangkat, termasuk desktop, tablet, serta smartphone. Pengalaman pengguna (UX) adalah aspek utama dalam desain website.\\r\\n\\r\\nPastikan pengunjung dapat dengan praktis menemukan fakta yang mereka cari. Gunakan navigasi yang intuitif, tombol ajakan bertindak (call-to-action) yang jelas, serta formulir kontak yang sederhana. Kecepatan website juga utama untuk UX. Optimalkan gambar serta kode untuk memastikan website Anda memuat dengan tanpa menunggu. Desain website portofolio profesional harus mencerminkan kepribadian serta gaya Anda. Jangan takut untuk berkreasi serta menambahkan sentuhan pribadi, tetapi tetaplah profesional serta fokus pada tujuan Anda.\\r\\n\\r\\nMemilih Platform Website Portofolio yang dengan cermat\\r\\nAda berbagai platform yang tersedia untuk membuat website portofolio, masing-masing dengan kelebihan serta kekurangannya sendiri. Beberapa opsi populer termasuk WordPress, Wix, Squarespace, serta Adobe Portfolio. WordPress adalah platform yang sangat fleksibel serta dapat disesuaikan, tetapi membutuhkan sedikit pengetahuan teknis. Wix serta Squarespace adalah platform yang lebih praktis digunakan dengan antarmuka drag-and-drop, tetapi kurang fleksibel daripada WordPress.\\r\\n\\r\\nAdobe Portfolio adalah pilihan yang baik bagi pengguna Adobe Creative Cloud, sebab terintegrasi dengan aplikasi seperti Photoshop serta Illustrator. Pertimbangkan kebutuhan serta keterampilan Anda saat memilih platform. Dalam hal Anda seorang pengembang web, Anda mungkin lebih suka WordPress sebab fleksibilitasnya.\\r\\n\\r\\nDalam hal Anda seorang pemula, Wix atau mungkin Squarespace mungkin lebih cocok. utama juga untuk mempertimbangkan biaya. Beberapa platform menawarkan paket gratis dengan fitur terbatas, sementara yang lain menawarkan paket berbayar dengan fitur yang lebih lengkap. Bandingkan harga serta fitur dari berbagai platform untuk menemukan yang terbaik untuk Anda.\",\"category\":\"Web Development\",\"author\":\"Wisnu Arto Subari\",\"date\":\"2025-05-19\",\"image\":\"https:\\/\\/mediaindonesia.gumlet.io\\/news\\/2025\\/05\\/19\\/1747647395_b53a65774bb1201766bb.jpg?w=700&dpr=1.3\"},{\"title\":\"Membangun Portofolio Digital yang Menarik, Strategi Fresh Graduate Curi Perhatian HRD\",\"description\":\"Di tengah persaingan pasar kerja yang semakin ketat, para fresh graduate kini dituntut untuk tampil lebih menonjol. \\r\\n\\r\\nSalah satu strategi yang kian populer dan efektif adalah membangun portofolio digital sebagai representasi kemampuan dan kreativitas mereka.\\r\\n\\r\\nMenurut sejumlah praktisi Human Resources Development (HRD), portofolio digital memiliki peran penting dalam proses rekrutmen. \\r\\n\\r\\n“Portofolio yang disusun dengan rapi dan relevan dapat menjadi faktor pembeda yang signifikan, bahkan mengalahkan kandidat dengan pengalaman kerja lebih banyak,” ujar Rina Kurniawati, HR Manager di sebuah perusahaan teknologi di Jakarta.\\r\\n\\r\\nPara lulusan baru disarankan untuk mengumpulkan karya yang pernah dikerjakan selama masa kuliah, baik dari tugas akademis, proyek organisasi, hingga magang. \\r\\n\\r\\nPlatform seperti LinkedIn, Behance, GitHub, atau bahkan Notion, kini menjadi pilihan utama untuk menampilkan hasil karya mereka secara profesional.\\r\\n\\r\\nSelain itu, HRD juga menekankan pentingnya menyertakan proses di balik pembuatan karya. \\r\\n\\r\\nDengan tampilan yang bersih, navigasi yang mudah, serta deskripsi diri yang jelas, portofolio digital tidak hanya menampilkan keahlian teknis, namun juga mencerminkan karakter dan potensi karier seorang fresh graduate.\\r\\n\\r\\nSeiring dengan perkembangan zaman, portofolio digital kini tak lagi menjadi pelengkap, melainkan kebutuhan utama bagi para pencari kerja muda. \\r\\n\\r\\nMaka dari itu, menyusun portofolio sejak dini adalah investasi penting menuju dunia profesional.\",\"category\":\"Web Development\",\"author\":\" Aditya Novrian\",\"date\":\"2025-06-23\",\"image\":\"https:\\/\\/static.promediateknologi.id\\/crop\\/0x0:0x0\\/0x0\\/webp\\/photo\\/p2\\/81\\/2025\\/06\\/23\\/Draft-foto-fis-2025-06-23T123545181-4033553776.png\"},{\"title\":\"BKP Kementan Luncurkan Website Logistik Pangan\",\"description\":\"Dalam upaya memperkokoh ketahanan pangan nasional, keberadaan website logistik pangan sangat penting untuk memudahkan dalam manajemen pengendalian stabilitas logistik pangan nasional.\\r\\n\\r\\nWebsite logistik pangan ini memuat data dan informasi yang selalu ter-update antara lain: (a) Prognosa Neraca Pangan, (b) Panel Harga Pangan, (c) Monitoring Stok Pangan, (d) Rekomendasi Stabilisasi Pasokan dan Harga Pangan, (e) Aplikasi Transaksi Online, dan (f) Info pendukung terkait logistik pangan.\\r\\n\\r\\n“Website logistik pangan ini akan sangat membantu para pengambil kebijakan di tingkat pusat dan daerah,” ujar Risfaheri, Kepala Pusat Distribusi dan Akses Pangan saat ditemui dikantornya, Rabu (27\\/10\\/2021).\\r\\n\\r\\nDitambahkan Risfaheri, website logistik pangan ini juga untuk mengetahui situasi pasokan dan harga pangan pokok strategis baik secara nasional maupun di level provinsi masing-masing, sehingga memudahkan dalam mengambil langkah-langkah antisipatif maupun solutif untuk menjaga stabilitas pasokan dan harga pangan di daerahnya.\\r\\n\\r\\nSelain itu, website ini juga sangat membantu para pelaku usaha pangan dalam memahami situasi pasokan dan harga pangan di tingkat nasional dan di berbagai wilayah, sehingga diharapkan dapat mempermudah dalam melakukan perdagangan antar wilayah.\\r\\n\\r\\nWebsite ini juga memuat data dan informasi pemasok\\/penyedia bahan pangan (poktan, gapoktan, peternak, pelaku pangan dan distributor), serta jasa transportasi logistik.\\r\\n\\r\\nHal yang tidak kalah menarik adalah, Website ini juga menyediakan aplikasi transaksi online melalui marketplace PasTani Grosir yang langsung link ke Android sebagai sarana bagi pemasok\\/penyedia bahan pangan bertransaksi langsung dengan pembeli\\/pedagang dalam skala besar (grosir) tanpa melalui pedagang perantara.\\r\\n\\r\\nDitempat terpisah, PLT Kepala BKP Sarwo Edhy menjelaskan, bahwa masalah stabilitas pasokan dan harga pangan pokok menjadi isu krusial dan harus terkendali secara optimal.\\r\\n\\r\\n“Masalah stabilitasi harga ini harus bisa kita kendalikan. Tentunya kita perlu koordinasi dengan pihak terkait,” ujar Sarwo.\\r\\n\\r\\nApa yang dikatakan Sarwo Edhy, sejalan dengan amanat UU No.18\\/2012 diamanatkan bahwa pemerintah berkewajiban menjaga stabilitas pasokan dan harga pangan pokok di tingkat produsen dan konsumen, serta mewujudkan keterjangkauan pangan bagi masyarakat, rumah tangga, dan perseorangan.\\r\\n\\r\\nStabilisasi pasokan dan harga pangan, dimaksudkan untuk melindungi pendapatan dan daya beli petani dan nelayan, serta menjaga keterjangkauan konsumen terhadap pangan.\\r\\n\\r\\nDiluncurkannya web logistik pangan yang bisa diakses di : https:\\/\\/logistikpangan.id, diharapkan akan sangat memudahkan dalam mengakses informasi harga pangan pokok strategis, kondisi stok pangan dan sebaran keberadaan stok pangan, serta kondisi pasokan pangan baik nasional maupun daerah dapat diakses oleh masyarakat dengan cepat dan mudah.\\r\\n\\r\\nMelalui upaya yang dilakukan BKP Kementan, diharapkan dapat dihindari terjadinya asimeteris informasi terkait situasi pangan tersebut, sehingga dapat mencegah spekulasi dan disparitas harga yang tinggi antara di konsumen dan produsen, serta antar wilayah.\\r\\n\\r\\nKemudahan akses informasi harga pangan dan stok pangan dalam sistem informasi sangat penting baik bagi produsen, pedagang, konsumen maupun pemerintah. Produsen dan pedagang dapat memanfaatkan informasi tersebut dalam bertransaksi, dan Pemerintah dapat memanfaatkan informasi tersebut sebagai dasar dalam merumuskan kebijakan stabilisasi pasokan dan harga pangan pokok, demikian harapannya.\\r\\n\\r\\nUpaya yang dilakukan ini juga sejalan dengan arah kebijakan Menteri Pertanian Syahrul Yasin Limpo, agar ketersediaan pangan dan stabilitasi harga pangan selalu stabil dan terkendali.\",\"category\":\"Web Development\",\"author\":\"Wenti Apsari\",\"date\":\"2021-10-27\",\"image\":\"https:\\/\\/monitor.co.id\\/wp-content\\/uploads\\/2021\\/10\\/20211027_100009-1024x516.jpg\"},{\"title\":\"hgvhgvhg\",\"description\":\"trdgcgfdfdxf\",\"category\":\"hgvhgh\",\"author\":\"gfgfgf\",\"date\":\"7566-06-05\",\"image\":\"\"},{\"title\":\"hgvhghghjgv\",\"description\":\"gfcgfgf\",\"category\":\"ghvhghgv\",\"author\":\"hkgvhgvhg\",\"date\":\"6767-06-07\",\"image\":\"\"},{\"title\":\"hgvfgfcgfc\",\"description\":\"\",\"category\":\"gfcghfhhgfcg\",\"author\":\"ghfcgfcghfcg\",\"date\":\"0066-06-06\",\"image\":\"\"},{\"title\":\"dfagadgarga\",\"description\":\"gadgsergrge\",\"category\":\"adfgaergdfg\",\"author\":\"agfsgdfgdf\",\"date\":\"\",\"image\":\"\"}]}', '2025-06-23 05:42:32', '2025-06-26 16:50:22'),
(42, 'contact-hero', '{\"title\":\"Get in Touch\",\"subtitle\":\"Let\'s collaborate on your next project and create something amazing together\",\"bg_blue\":\"top-20 left-10 w-32 h-32\",\"bg_purple\":\"bottom-20 right-10 w-40 h-40\"}', '2025-06-24 06:41:01', '2025-06-24 06:41:01'),
(43, 'contact-social', '{\"linkedin\":\"https:\\/\\/www.linkedin.com\\/in\\/muhammad-azza-al-kausar-176460197\\/\",\"github\":\"https:\\/\\/github.com\\/Zyzero1\",\"twitter\":\"#\",\"instagram\":\"#\"}', '2025-06-24 06:41:01', '2025-06-24 06:41:01'),
(44, 'contact-info', '{\"email\":\"mazza050901@gmail.com\",\"location\":\"TanjungPinang Kota\",\"hours\":\"Mon - Fri: 9:00 AM - 6:00 PM\"}', '2025-06-24 06:41:01', '2025-06-24 06:41:01'),
(45, 'contact-pricing', '{\"basic\":{\"price\":\"$499\",\"description\":\"Perfect for small business websites and simple applications\"},\"pro\":{\"price\":\"$1,499\",\"description\":\"Ideal for businesses requiring custom functionality\"},\"enterprise\":{\"price\":\"$3,999\",\"description\":\"Complete solution for large businesses with complex requirements\"}}', '2025-06-24 06:41:01', '2025-06-24 06:41:01'),
(46, 'contact-faq', '{\"items\":[]}', '2025-06-24 06:41:01', '2025-06-26 17:09:18');

-- --------------------------------------------------------

--
-- Table structure for table `uploads`
--

CREATE TABLE `uploads` (
  `id` int(11) NOT NULL,
  `file_name` varchar(255) NOT NULL,
  `file_path` varchar(255) NOT NULL,
  `file_type` varchar(50) NOT NULL,
  `uploaded_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `contact_messages`
--
ALTER TABLE `contact_messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sections`
--
ALTER TABLE `sections`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `section_name` (`section_name`);

--
-- Indexes for table `uploads`
--
ALTER TABLE `uploads`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `contact_messages`
--
ALTER TABLE `contact_messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `sections`
--
ALTER TABLE `sections`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=118;

--
-- AUTO_INCREMENT for table `uploads`
--
ALTER TABLE `uploads`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
