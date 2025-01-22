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
    kelas: "3A",
    status: "Aktif",
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
    nis: "123456",
    namaSiswa: "John Doe",
    kelas: "Kelas 1",
    daftarTagihan: ["DPP", "Buku Paket"],
    nominalDpp: 1000000,
    nominalProgram: 500000,
    nominalBulanan: 200000
  },
  {
    id: "2",
    nis: "123457",
    namaSiswa: "Jane Doe",
    kelas: "Kelas 2",
    daftarTagihan: ["DPP", "Buku Paket"],
    nominalDpp: 1000000,
    nominalProgram: 500000,
    nominalBulanan: 200000
  },
  {
    id: "3",
    nis: "123458",
    namaSiswa: "John Smith",
    kelas: "Kelas 3",
    daftarTagihan: ["DPP", "Buku Paket"],
    nominalDpp: 1000000,
    nominalProgram: 500000,
    nominalBulanan: 200000
  },
  {
    id: "4",
    nis: "123459",
    namaSiswa: "Jane Smith",
    kelas: "Kelas 4",
    daftarTagihan: ["DPP", "Buku Paket"],
    nominalDpp: 1000000,
    nominalProgram: 500000,
    nominalBulanan: 200000
  },
  {
    id: "5",
    nis: "123460",
    namaSiswa: "John Doe Jr.",
    kelas: "Kelas 5",
    daftarTagihan: ["DPP", "Buku Paket"],
    nominalDpp: 1000000,
    nominalProgram: 500000,
    nominalBulanan: 200000
  }
]

export const bankData = [
  {
    id: '1',
    namaBank: 'Bank BCA',
    nomorRekening: '1234567890',
    namaPemilikRekening: 'John Doe'
  },
  {
    id: '2',
    namaBank: 'Bank Mandiri',
    nomorRekening: '0987654321',
    namaPemilikRekening: 'Jane Doe'
  },
  {
    id: '3',
    namaBank: 'Bank BNI',
    nomorRekening: '1234567890',
    namaPemilikRekening: 'John Doe'
  },
  {
    id: '4',
    namaBank: 'Bank BRI',
    nomorRekening: '0987654321',
    namaPemilikRekening: 'Jane Doe'
  }
]

export const jenisBiayaPendidikanData: JenisBiayaPendidikan[] = [
  {
    id: "1",
    namaTagihan: "SPP",
    waktuPembayaran: "Bulanan",
    statusCicilan: "Ya",
    nominal: 500000
  }, 
  {
    id: "2",
    namaTagihan: "Uang Gedung",
    waktuPembayaran: "Tahunan",
    statusCicilan: "Tidak",
    nominal: 1000000
  }, 
  {
    id: "3",
    namaTagihan: "Uang Pangkal",
    waktuPembayaran: "1x",
    statusCicilan: "Tidak",
    nominal: 5000000
  },
  {
    id: "4",
    namaTagihan: "Uang Kegiatan",
    waktuPembayaran: "Bulanan",
    statusCicilan: "Ya",
    nominal: 100000
  },
  {
    id: "5",
    namaTagihan: "Uang Seragam",
    waktuPembayaran: "1x",
    statusCicilan: "Tidak",
    nominal: 500000
  }
]

export const penggunaAplikasiData: User[] = [
  {
    id: '1',
    username: 'johndoe',
    nama: 'John Doe',
    role: 'Ketua Yayasan'
  },
  {
    id: '2',
    username: 'janedoe',
    nama: 'Jane Doe',
    role: 'Bendahara'
  },
  {
    id: '3',
    username: 'johndoejr',
    nama: 'John Doe Jr.',
    role: 'Administrator'
  }
]

export const statusPembayaranData = [
  {
    nis: '123456',
    namaSiswa: 'John Doe',
    kelas: 'Kelas 1',
    jenisPembayaran: 'DPP',
    nominalTagihan: 10000000,
    statusPembayaran: 'Belum Lunas',
    nominalSudahDibayar: 5000000,
    sisaTagihan: 5000000
  }
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

export const pesanNotifikasiPenagihan = [
  {
    id: '1',
    label: 'Pesan Notifikasi Pembayaran Bulanan',
    value: `Assalamu’alaikum Ayah Bunda Andini Eka Putri.

Izin mengingatkan agar dapat membayar SPP, Makan Siang, dan Jemputan untuk bulan Mei tahun 2025 dengan total Tagihan Rp 950.000. Rincian pembayaran sebagai berikut:
1. SPP sebesar Rp 600.000
2. Makan Siang sebesar Rp 200.000
3. Jemputan sebesar Rp 150.000

Jangan lupa dibayarkan paling lambat tanggal 10 Mei 2025. Terima kasih.`,
  },
  {
    id: '2',
    label: 'Pesan Notifikasi Pembayaran Tahunan',
    value: `Assalamu’alaikum Ayah Bunda Andini Eka Putri.

Izin mengingatkan agar dapat membayar program Kamping, Market Day, dan Pesantren Kilat untuk tahun 2025 dengan total Tagihan Rp 1.000.000. Rincian pembayaran sebagai berikut:
1. Kamping sebesar Rp 500.000
2. Market Day sebesar Rp 200.000
3. Pesantren Kilat sebesar Rp 300.000

Terima kasih.`
  },
  {
    id: '3',
    label: 'Pesan Notifikasi Pembayaran DPP',
    value: `Assalamu’alaikum Ayah Bunda Andini Eka Putri.

Izin mengingatkan agar dapat membayar Dana Pengembangan Pendidikan (DPP) dengan total sisa tagihan Rp 5.000.000 dari total tagihan Rp 10.000.000.

Diharapkan dapat mengangsur selama 6 bulan dengan pembayaran paling lambat bulan Januari tahun 2025.
Terima kasih.`
  }
]

// SELECT OPTIONS

export const kelasSelectOptions = [
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
  { value: 'ketua_yayasan', label: 'Ketua Yayasan' },
  { value: 'bendahara', label: 'Bendahara' },
  { value: 'administrator', label: 'Administrator' },
]

export const jenisPembayaranSelectOptions = [
  { value: 'dpp', label: 'DPP' },
  { value: 'makan_siang', label: 'Makan Siang' },
  { value: 'uang_gedung', label: 'Uang Gedung' },
  { value: 'uang_kegiatan', label: 'Uang Kegiatan' },
  { value: 'uang_seragam', label: 'Uang Seragam' },
  { value: 'jemputan', label: 'Jemputan' },
]