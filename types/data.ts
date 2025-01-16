import { string } from "zod"

export type User = {
  id: string
  username: string
  nama: string
  role: "Ketua Yayasan" | "Bendahara" | "Administrator"
}

export type StudentInfo = {
  id: string
  nis: string
  nama: string
  kelas: string
  status: "Aktif" | "Non-Aktif"
  jenisKelamin: string
  tempatLahir: string
  tanggalLahir: string
  tahunMasuk: string
  alamatRumah: string
  namaWali: string
  hubungan: string
  jenisKelaminWali: string
  emailWali: string
  nomorTeleponWali: string
  foto: string
}

export type JenisBiayaPendidikan = {
  id: string
  namaTagihan: string
  waktuPembayaran: string
  statusCicilan: "Ya" | "Tidak"
  nominal: number
}

export type BankPenerimaTransfer = {
  id: string
  namaBank: string
  nomorRekening: string
  namaPemilikRekening: string
}

export type TagihanSiswa = {
  biodata: StudentInfo
  jenisBiayaPendidikan: JenisBiayaPendidikan[]
}

// COLUMNS TYPE
export type TagihanSiswaColumns = {
  id: string
  nis: string
  namaSiswa: string
  kelas: string
  daftarTagihan: string[]
  nominalDpp: number
  nominalProgram: number
  nominalBulanan: number
}

export type PenerimaanDanaColumns = {
  id: string
  tanggalTransaksi: Date
  nis: string
  namaSiswa: string
  kelas: string
  jenisPembayaran: string
  nominal: number
  metodePembayaran: string
}

export type StatusPembayaranColumns = {
  id: string
  nis: string
  namaSiswa: string
  kelas: string
  jenisPembayaran: string
  nominalTagihan: number
  statusPembayaran: "Belum Lunas" | "Lunas"
  nominalSudahDibayar: number
  sisaTagihan: number
}