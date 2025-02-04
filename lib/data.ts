import { 
  JenisBiayaPendidikan, 
  StudentInfo, 
  TagihanSiswaColumns,
  User
} from "@/types/data"

export const siswaData: StudentInfo[] = [
  {
    id: "1",
    nis: "12152089",
    nama: "Nadin Kumala",
    jenisKelamin: "Perempuan",
    kelas: "PG",
    status: "Aktif",
    tempatLahir: "Bandung",
    tanggalLahir: new Date(2009, 11, 9),
    alamatRumah: "Jl. Anggrek 1",
    namaWali: "Sugiono",
    hubungan: "Ayah Kandung",
    jenisKelaminWali: "Laki-laki",
    emailWali: "sugiono@gmail.com",
    nomorTeleponWali: "085123891735",
    foto: "",
    tahunMasuk: "2018",
    tahunKeluar: "2024"
  },
  {
    id: "2",
    nis: "12152012",
    nama: "Tara Prasetyo",
    jenisKelamin: "Laki-laki",
    kelas: "TK-B",
    status: "Aktif",
    tempatLahir: "Bandung",
    tanggalLahir: new Date(2009, 3, 28),
    alamatRumah: "Jl. Melati 89",
    namaWali: "Abraham",
    hubungan: "Ayah Kandung",
    jenisKelaminWali: "Laki-laki",
    emailWali: "braham@yahoo.com",
    nomorTeleponWali: "083128748194",
    foto: "",
    tahunMasuk: "2018",
    tahunKeluar: "2024"
  },
  {
    id: "3",
    nis: "13152029",
    nama: "Siti Andini",
    jenisKelamin: "Perempuan",
    kelas: "6A",
    status: "Lulus",
    tempatLahir: "Bandung",
    tanggalLahir: new Date(2010, 9, 19),
    alamatRumah: "Jl. Botani 320",
    namaWali: "Wijayanto",
    hubungan: "Ayah Kandung",
    jenisKelaminWali: "Laki-laki",
    emailWali: "wijaya@gmail.com",
    nomorTeleponWali: "082617391749",
    foto: "",
    tahunMasuk: "2021",
    tahunKeluar: ""
  },
  {
    id: "4",
    nis: "13152089",
    status: "Aktif",
    nama: "Rizki Anugrah",
    jenisKelamin: "Laki-laki",
    kelas: "3A",
    tempatLahir: "Jakarta",
    tanggalLahir: new Date(2010, 6, 7),
    alamatRumah: "Jl. Indah No 9",
    namaWali: "Dandi",
    hubungan: "Ayah Kandung",
    jenisKelaminWali: "Laki-laki",
    emailWali: "dandi71@gmail.com",
    nomorTeleponWali: "087261438139",
    foto: "",
    tahunMasuk: "2021",
    tahunKeluar: ""
  },
  {
    id: "5",
    nis: "14152089",
    nama: "Reza Hakim",
    jenisKelamin: "Laki-laki",
    kelas: "2A",
    status: "Mengundurkan Diri",
    tempatLahir: "Palembang",
    tanggalLahir: new Date(2011, 10, 30),
    alamatRumah: "Jl. Spora No 2",
    namaWali: "Toni",
    hubungan: "Ayah Kandung",
    jenisKelaminWali: "Laki-laki",
    emailWali: "toni30@yahoo.com",
    nomorTeleponWali: "085718351645",
    foto: "",
    tahunMasuk: "2022",
    tahunKeluar: ""
  },
  {
    id: "6",
    nis: "12158081",
    nama: "Dinda Kania",
    jenisKelamin: "Perempuan",
    kelas: "4A",
    status: "Aktif",
    tempatLahir: "Jakarta",
    tanggalLahir: new Date(2009, 11, 9),
    alamatRumah: "Jl. Kaktus No 3",
    namaWali: "SuKrisna",
    hubungan: "Ayah Kandung",
    jenisKelaminWali: "Laki-laki",
    emailWali: "krisna91@gmail.com",
    nomorTeleponWali: "089816194713",
    foto: "",
    tahunMasuk: "2020",
    tahunKeluar: ""
  },
  {
    id: "7",
    nis: "12152193",
    nama: "Roni Budiman",
    jenisKelamin: "Laki-laki",
    kelas: "4A",
    tempatLahir: "Bandung",
    status: "Aktif",
    tanggalLahir: new Date(2009, 3, 28),
    alamatRumah: "Jl. Mawar 99",
    namaWali: "Agus",
    hubungan: "Ayah Kandung",
    jenisKelaminWali: "Laki-laki",
    emailWali: "agus94@yahoo.com",
    nomorTeleponWali: "083173916491",
    foto: "",
    tahunMasuk: "2020",
    tahunKeluar: ""
  },
  {
    id: "8",
    nis: "13152017",
    nama: "Indah Amanda",
    jenisKelamin: "Perempuan",
    kelas: "3A",
    status: "Aktif",
    tempatLahir: "Bandung",
    tanggalLahir: new Date(2010, 9, 19),
    alamatRumah: "Jl. Rawa No 7",
    namaWali: "Ilham",
    hubungan: "Ayah Kandung",
    jenisKelaminWali: "Laki-laki",
    emailWali: "Ilham@yahoo.com ",
    nomorTeleponWali: "082748291164",
    foto: "",
    tahunMasuk: "2021",
    tahunKeluar: ""
  },
  {
    id: "9",
    nis: "13152038",
    nama: "Ahmad Ihsan",
    jenisKelamin: "Laki-laki",
    kelas: "3A",
    status: "Aktif",
    tempatLahir: "Jambi",
    tanggalLahir: new Date(2010, 6, 7),
    alamatRumah: "Jl. Padasuka 9",
    namaWali: "Arya",
    hubungan: "Ayah Kandung",
    jenisKelaminWali: "Laki-laki",
    emailWali: "aryaa@gmail.com",
    nomorTeleponWali: "085719371323",
    foto: "",
    tahunMasuk: "2021",
    tahunKeluar: ""
  },
  {
    id: "10",
    nis: "14152071",
    nama: "Alam Fajrin",
    jenisKelamin: "Laki-laki",
    kelas: "2A",
    tempatLahir: "Jakarta",
    tanggalLahir: new Date(2011, 10, 30),
    alamatRumah: "Jl. Pahlawan 5",
    namaWali: "Utomo",
    hubungan: "Ayah Kandung",
    jenisKelaminWali: "Laki-laki",
    emailWali: "utomo@gmail.com",
    status: "Mengundurkan Diri",
    nomorTeleponWali: "082618499113",
    foto: "",
    tahunMasuk: "2022",
    tahunKeluar: ""
  },
  {
    id: "11",
    nis: "12152089",
    nama: "John Doe",
    jenisKelamin: "Laki-laki",
    kelas: "4A",
    tempatLahir: "Bali",
    tanggalLahir: new Date(2009, 11, 9),
    alamatRumah: "Jl. Pahlawan 5",
    namaWali: "Vander",
    hubungan: "Ayah Angkat",
    jenisKelaminWali: "Laki-laki",
    status: "Aktif",
    emailWali: "vander@example.com",
    nomorTeleponWali: "085329371323",
    foto: "",
    tahunMasuk: "2020",
    tahunKeluar: ""
  },
  {
    id: "12",
    nis: "12347856",
    nama: "Jane Doe",
    jenisKelamin: "Perempuan",
    kelas: "4A",
    tempatLahir: "Bali",
    tanggalLahir: new Date(2009, 11, 9),
    alamatRumah: "Jl. Pahlawan 5",
    namaWali: "Felicia",
    hubungan: "Ayah Angkat",
    status: "Aktif",
    jenisKelaminWali: "Perempuan",
    emailWali: "felicia@example.com",
    nomorTeleponWali: "083173929491",
    foto: "",
    tahunMasuk: "2020",
    tahunKeluar: ""
  },
]

export const tagihanSiswaData: TagihanSiswaColumns[] = [
  {
    id: "1",
    nis: "12152089",
    namaSiswa: "Nadin Kumala",
    kelas: "6A",
    daftarTagihan: ["DPP", "SPP", "Makan Siang", "Jemputan", "Kamping"],
    nominalDpp: 15000000,
    nominalProgram: 1500000,
    nominalBulanan: 950000
  },
  {
    id: "2",
    nis: "12152012",
    namaSiswa: "Tara Prasetyo",
    kelas: "6A",
    daftarTagihan: ["DPP", "SPP", "Makan Siang", "Jemputan", "Kamping"],
    nominalDpp: 15000000,
    nominalProgram: 1500000,
    nominalBulanan: 950000
  },
  {
    id: "3",
    nis: "13152029",
    namaSiswa: "Siti Andini",
    kelas: "3A",
    daftarTagihan: ["DPP", "SPP", "Makan Siang", "Jemputan", "Kamping"],
    nominalDpp: 13000000,
    nominalProgram: 1500000,
    nominalBulanan: 850000
  },
  {
    id: "4",
    nis: "13152089",
    namaSiswa: "Rizki Anugrah",
    kelas: "3A",
    daftarTagihan: ["DPP", "SPP", "Makan Siang", "Jemputan", "Kamping"],
    nominalDpp: 12500000,
    nominalProgram: 1500000,
    nominalBulanan: 850000
  },
  {
    id: "5",
    nis: "14152089",
    namaSiswa: "Reza Hakim",
    kelas: "2A",
    daftarTagihan: ["DPP", "SPP", "Makan Siang", "Jemputan", "Kamping"],
    nominalDpp: 11000000,
    nominalProgram: 1500000,
    nominalBulanan: 850000
  },
  {
    id: "6",
    nis: "12158081",
    namaSiswa: "Dinda Kania",
    kelas: "4A",
    daftarTagihan: ["DPP", "SPP", "Makan Siang", "Jemputan", "Kamping"],
    nominalDpp: 11000000,
    nominalProgram: 1500000,
    nominalBulanan: 950000
  },
  {
    id: "7",
    nis: "12152193",
    namaSiswa: "Roni Budiman",
    kelas: "4A",
    daftarTagihan: ["DPP", "SPP", "Makan Siang", "Jemputan", "Kamping"],
    nominalDpp: 15000000,
    nominalProgram: 1500000,
    nominalBulanan: 950000
  },
  {
    id: "8",
    nis: "13152017",
    namaSiswa: "Indah Amanda",
    kelas: "3A",
    daftarTagihan: ["DPP", "SPP", "Makan Siang", "Jemputan", "Kamping"],
    nominalDpp: 15000000,
    nominalProgram: 1500000,
    nominalBulanan: 850000
  },
  {
    id: "9",
    nis: "13152038",
    namaSiswa: "Ahmad Ihsan",
    kelas: "3A",
    daftarTagihan: ["DPP", "SPP", "Makan Siang", "Jemputan", "Kamping"],
    nominalDpp: 13000000,
    nominalProgram: 1500000,
    nominalBulanan: 850000
  },
  {
    id: "10",
    nis: "14152071",
    namaSiswa: "Alam Fajrin",
    kelas: "2A",
    daftarTagihan: ["DPP", "SPP", "Makan Siang", "Jemputan", "Kamping"],
    nominalDpp: 11000000,
    nominalProgram: 1500000,
    nominalBulanan: 850000
  },
]

export const bankData = [
  {
    id: '1',
    namaBank: 'Bank Syariah Indonesia',
    nomorRekening: '7118404356',
    namaPemilikRekening: 'Yayasan Pendidikan Zaidan'
  },
  {
    id: '2',
    namaBank: 'Bank Mandiri',
    nomorRekening: '9000031873269',
    namaPemilikRekening: 'Yoga Suhara'
  },
  {
    id: '3',
    namaBank: 'Bank BJB',
    nomorRekening: '0139389018100',
    namaPemilikRekening: 'Miarti'
  },
]

export const jenisBiayaPendidikanData: JenisBiayaPendidikan[] = [
  {
    id: "1",
    namaTagihan: "SPP",
    waktuPembayaran: "Bulanan",
    statusCicilan: "Tidak",
    nominal: 500000
  }, 
  {
    id: "2",
    namaTagihan: "Makan Siang",
    waktuPembayaran: "Bulanan",
    statusCicilan: "Tidak",
    nominal: 1000000
  }, 
  {
    id: "3",
    namaTagihan: "Jemputan",
    waktuPembayaran: "Bulanan",
    statusCicilan: "Tidak",
    nominal: 5000000
  },
  {
    id: "4",
    namaTagihan: "Program Camping",
    waktuPembayaran: "Tahunan",
    statusCicilan: "Ya",
    nominal: 100000
  },
  {
    id: "5",
    namaTagihan: "DPP",
    waktuPembayaran: "1x",
    statusCicilan: "Ya",
    nominal: 500000
  }
]

export const penggunaAplikasiData: User[] = [
  {
    id: '1',
    username: 'ratna',
    nama: 'Ratna Puspita Sari',
    role: 'Ketua Yayasan'
  },
  {
    id: '2',
    username: 'endah',
    nama: 'Endah Yulia',
    role: 'Bendahara'
  },
  {
    id: '3',
    username: 'emir',
    nama: 'Emir Mahira',
    role: 'Administrator'
  }
]

export const statusPembayaranData = [
  {
    id: "1",
    nis: '202401001',
    namaSiswa: 'Andini Eka Putri',
    kelas: 'Kelas 1',
    jenisPembayaran: 'DPP',
    nominalTagihan: 15000000,
    statusPembayaran: 'Belum Lunas',
    nominalSudahDibayar: 0,
    sisaTagihan: 15000000
  },
  {
    id: "2",
    nis: '202401002',
    namaSiswa: 'Kalista Putri Firdaus',
    kelas: 'Kelas 1',
    jenisPembayaran: 'DPP',
    nominalTagihan: 15000000,
    statusPembayaran: 'Belum Lunas',
    nominalSudahDibayar: 5000000,
    sisaTagihan: 10000000
  },
  {
    id: "3",
    nis: '202301001',
    namaSiswa: 'Azka Zaidan Rahman',
    kelas: 'Kelas 2',
    jenisPembayaran: 'DPP',
    nominalTagihan: 13000000,
    statusPembayaran: 'Lunas',
    nominalSudahDibayar: 13000000,
    sisaTagihan: 0
  },
  {
    id: "4",
    nis: '202201001',
    namaSiswa: 'Muhammad El Raihan',
    kelas: 'Kelas 3',
    jenisPembayaran: 'DPP',
    nominalTagihan: 12500000,
    statusPembayaran: 'Belum Lunas',
    nominalSudahDibayar: 0,
    sisaTagihan: 12500000
  },
  {
    id: "5",
    nis: '202401001',
    namaSiswa: 'Nuha Hasna Syakira',
    kelas: 'Kelas 4',
    jenisPembayaran: 'DPP',
    nominalTagihan: 11000000,
    statusPembayaran: 'Lunas',
    nominalSudahDibayar: 11000000,
    sisaTagihan: 0
  },
]

export const rekapitulasiPenerimaanDanaData = [
  {
    id: '1',
    jenisPembayaran: 'DPP',
    uangTunai: 10000000,
    bsi: 5000000,
    bankMandiri: 2000000,
    bjb: 60000000
  },
  {
    id: '2',
    jenisPembayaran: 'Uang Gedung',
    uangTunai: 10000000,
    bsi: 5000000,
    bankMandiri: 2000000,
    bjb: 90000000
  },
  {
    id: '3',
    jenisPembayaran: 'Uang Pangkal',
    uangTunai: 10000000,
    bsi: 5000000,
    bankMandiri: 2000000,
    bjb: 4000000
  },
  {
    id: '4',
    jenisPembayaran: 'Uang Kegiatan',
    uangTunai: 10000000,
    bsi: 5000000,
    bankMandiri: 2000000,
    bjb: 3000000
  },
  {
    id: '5',
    jenisPembayaran: 'Uang Seragam',
    uangTunai: 10000000,
    bsi: 5000000,
    bankMandiri: 2000000,
    bjb: 70000000
  }
]

export const pesanNotifikasiPenagihan = {
    id: '1',
    label: 'Pesan Notifikasi Pembayaran',
    value: `Assalamu’alaikum Ayah Bunda Andini Eka Putri.

Izin mengingatkan agar dapat membayar SPP, Makan Siang, dan Jemputan untuk bulan Mei tahun 2025 dengan total tagihan Rp 950.000. Rincian pembayaran sebagai berikut:
1. SPP sebesar Rp 600.000
2. Makan Siang sebesar Rp 200.000
3. Jemputan sebesar Rp 150.000

Jangan lupa dibayarkan paling lambat tanggal 10 Mei 2025.

Selain itu, Ananda masih memiliki tagihan Rp 1.000.000 pembayaran program tahunan untuk kegiatan Kamping, Market Day, dan Pesantren Kilat untuk tahun 2025. Rincian pembayaran sebagai berikut:
1. Kamping sebesar Rp 500.000
2. Market Day sebesar Rp 200.000
3. Pesantren Kilat sebesar Rp 300.000

Terakhir, Ananda juga masih memiliki tagihan Rp 10.000.000 Dana Pengembangan Pendidikan (DPP) dengan total sisa tagihan Rp 5.000.000. Diharapkan dapat mengangsur selama 6 bulan dengan pembayaran paling lambat bulan Januari tahun 2025.

Note: Abaikan pesan ini, jika Anda sudah membayar.
Terima kasih.`,
  }

export const allPaymentData = [
  {
    jenis: "SPP",
    totalTransaksi: 116,
    detail: [
      { date: new Date("2025-01-01"), jumlah: 3 },
      { date: new Date("2025-01-02"), jumlah: 6 },
      { date: new Date("2025-01-03"), jumlah: 4 },
    ],
  },
  {
    jenis: "Makan Siang",
    totalTransaksi: 100,
    detail: [
      { date: new Date("2025-01-02"), jumlah: 2 },
      { date: new Date("2025-01-03"), jumlah: 5 },
    ],
  },
  {
    jenis: "Jemputan",
    totalTransaksi: 110,
    detail: [
      { date: new Date("2025-01-01"), jumlah: 10 },
    ],
  },
  {
    jenis: "Program",
    totalTransaksi: 75,
    detail: [
    ],
  },
  {
    jenis: "DPP",
    totalTransaksi: 65,
    detail: [
    ],
  },
];


// SELECT OPTIONS

export const kelasSelectOptions = [
  { value: 'all', label: 'Semua Kelas' },
  { value: 'PG', label: 'PG' },
  { value: 'TK-A', label: 'TK-A' },
  { value: 'TK-B', label: 'TK-B' },
  { value: '1A', label: '1A' },
  { value: '2A', label: '2A' },
  { value: '3A', label: '3A' },
  { value: '4A', label: '4A' },
  { value: '5A', label: '5A' },
  { value: '6A', label: '6A' },
]

export const penggunaAplikasiSelectOptions = [
  { value: 'all', label: 'Semua Role' },
  { value: 'ketua_yayasan', label: 'Ketua Yayasan' },
  { value: 'bendahara', label: 'Bendahara' },
  { value: 'administrator', label: 'Administrator' },
]

export const jenisPembayaranSelectOptions = [
  { value: 'all', label: 'Semua Jenis Pembayaran' },
  { value: 'dpp', label: 'DPP' },
  { value: 'spp', label: 'SPP' },
  { value: 'makan_siang', label: 'Makan Siang' },
  { value: 'jemputan', label: 'Jemputan' },
  { value: 'kamping', label: 'Kamping' },
]