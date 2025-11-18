import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { suratId, nama, nik, alamat, keperluan } = body;

    // Validasi input
    if (!suratId || !nama || !nik || !alamat) {
      return NextResponse.json(
        { error: 'Data tidak lengkap. Silakan lengkapi semua field yang wajib diisi.' },
        { status: 400 }
      );
    }

    // Simulasi proses pembuatan surat
    // Dalam implementasi nyata, ini akan menyimpan ke database
    const pengajuan = {
      id: Date.now().toString(),
      suratId,
      nama,
      nik,
      alamat,
      keperluan,
      status: 'pending',
      createdAt: new Date().toISOString(),
      estimatedTime: '2-3 hari kerja'
    };

    // Simulasi delay proses
    await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json({
      success: true,
      message: 'Pengajuan surat berhasil diajukan. Silakan tunggu proses verifikasi.',
      data: pengajuan
    });

  } catch (error) {
    console.error('Error processing surat pengajuan:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan server. Silakan coba lagi nanti.' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    // Simulasi data pengajuan surat
    // Dalam implementasi nyata, ini akan mengambil dari database
    const pengajuanList = [
      {
        id: '1',
        suratNama: 'Surat Keterangan Domisili',
        nama: 'Ahmad Wijaya',
        nik: '3201011234567890',
        status: 'completed',
        createdAt: '2024-01-15T10:30:00Z',
        completedAt: '2024-01-17T14:20:00Z'
      },
      {
        id: '2',
        suratNama: 'Surat Keterangan Usaha',
        nama: 'Siti Nurhaliza',
        nik: '3201012345678901',
        status: 'pending',
        createdAt: '2024-01-16T09:15:00Z'
      },
      {
        id: '3',
        suratNama: 'Surat Keterangan Kelahiran',
        nama: 'Budi Santoso',
        nik: '3201013456789012',
        status: 'processing',
        createdAt: '2024-01-16T13:45:00Z'
      }
    ];

    // Filter berdasarkan status jika ada
    const filteredPengajuan = status 
      ? pengajuanList.filter(p => p.status === status)
      : pengajuanList;

    return NextResponse.json({
      success: true,
      data: filteredPengajuan
    });

  } catch (error) {
    console.error('Error fetching pengajuan list:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan server. Silakan coba lagi nanti.' },
      { status: 500 }
    );
  }
}