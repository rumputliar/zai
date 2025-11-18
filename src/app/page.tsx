'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  Search, 
  User, 
  Home, 
  MapPin, 
  Calendar,
  CreditCard,
  Heart,
  Briefcase,
  Car,
  Building,
  BookOpen,
  Users,
  Shield,
  AlertCircle,
  CheckCircle,
  Clock,
  Star,
  Filter,
  Grid,
  List
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Data 42 jenis surat desa
const suratList = [
  // Kependudukan
  { id: 1, nama: 'Surat Keterangan Kelahiran', kategori: 'Kependudukan', icon: User, warna: 'bg-blue-500', deskripsi: 'Pengurusan kelahiran bayi' },
  { id: 2, nama: 'Surat Keterangan Kematian', kategori: 'Kependudukan', icon: AlertCircle, warna: 'bg-gray-500', deskripsi: 'Pengurusan kematian warga' },
  { id: 3, nama: 'Surat Keterangan Pindah Datang', kategori: 'Kependudukan', icon: MapPin, warna: 'bg-green-500', deskripsi: 'Pindah domisili ke desa' },
  { id: 4, nama: 'Surat Keterangan Pindah Pergi', kategori: 'Kependudukan', icon: MapPin, warna: 'bg-orange-500', deskripsi: 'Pindah domisili dari desa' },
  { id: 5, nama: 'Surat Keterangan Datang dari Luar Negeri', kategori: 'Kependudukan', icon: User, warna: 'bg-purple-500', deskripsi: 'Kedatangan dari luar negeri' },
  { id: 6, nama: 'Surat Keterangan Perpindahan ke Luar Negeri', kategori: 'Kependudukan', icon: User, warna: 'bg-indigo-500', deskripsi: 'Pindah ke luar negeri' },
  
  // Administrasi
  { id: 7, nama: 'Surat Keterangan Domisili', kategori: 'Administrasi', icon: Home, warna: 'bg-red-500', deskripsi: 'Bukti tempat tinggal' },
  { id: 8, nama: 'Surat Keterangan Usaha', kategori: 'Administrasi', icon: Briefcase, warna: 'bg-yellow-500', deskripsi: 'Surat keterangan berusaha' },
  { id: 9, nama: 'Surat Keterangan Belum Menikah', kategori: 'Administrasi', icon: Heart, warna: 'bg-pink-500', deskripsi: 'Status belum menikah' },
  { id: 10, nama: 'Surat Keterangan Janda/Duda', kategori: 'Administrasi', icon: Heart, warna: 'bg-rose-500', deskripsi: 'Status janda/duda' },
  { id: 11, nama: 'Surat Keterangan Cerai', kategori: 'Administrasi', icon: AlertCircle, warna: 'bg-red-600', deskripsi: 'Status cerai' },
  { id: 12, nama: 'Surat Keterangan Penghasilan', kategori: 'Administrasi', icon: CreditCard, warna: 'bg-emerald-500', deskripsi: 'Bukti penghasilan' },
  { id: 13, nama: 'Surat Keterangan Tidak Mampu', kategori: 'Administrasi', icon: Shield, warna: 'bg-slate-500', deskripsi: 'Keterangan tidak mampu' },
  { id: 14, nama: 'Surat Keterangan Berkelakuan Baik', kategori: 'Administrasi', icon: CheckCircle, warna: 'bg-teal-500', deskripsi: 'Surat referensi baik' },
  
  // Kesehatan
  { id: 15, nama: 'Surat Keterangan Sehat', kategori: 'Kesehatan', icon: Heart, warna: 'bg-green-600', deskripsi: 'Keterangan sehat' },
  { id: 16, nama: 'Surat Keterangan Sakit', kategori: 'Kesehatan', icon: AlertCircle, warna: 'bg-red-500', deskripsi: 'Keterangan sakit' },
  { id: 17, nama: 'Surat Rujukan Kesehatan', kategori: 'Kesehatan', icon: Heart, warna: 'bg-cyan-500', deskripsi: 'Rujukan berobat' },
  
  // Pendidikan
  { id: 18, nama: 'Surat Keterangan Belajar', kategori: 'Pendidikan', icon: BookOpen, warna: 'bg-blue-600', deskripsi: 'Keterangan sedang belajar' },
  { id: 19, nama: 'Surat Keterangan Lulus', kategori: 'Pendidikan', icon: CheckCircle, warna: 'bg-green-500', deskripsi: 'Keterangan kelulusan' },
  { id: 20, nama: 'Surat Keterangan Beasiswa', kategori: 'Pendidikan', icon: Star, warna: 'bg-yellow-600', deskripsi: 'Rekomendasi beasiswa' },
  
  // Pertanian & Perkebunan
  { id: 21, nama: 'Surat Keterangan Pemilik Tanah', kategori: 'Pertanian', icon: MapPin, warna: 'bg-amber-600', deskripsi: 'Kepemilikan tanah' },
  { id: 22, nama: 'Surat Keterangan Garapan Tanah', kategori: 'Pertanian', icon: MapPin, warna: 'bg-lime-600', deskripsi: 'Penggarapan tanah' },
  { id: 23, nama: 'Surat Keterangan Hasil Pertanian', kategori: 'Pertanian', icon: BookOpen, warna: 'bg-green-700', deskripsi: 'Hasil panen' },
  
  // Perdagangan
  { id: 24, nama: 'Surat Izin Tempat Usaha', kategori: 'Perdagangan', icon: Building, warna: 'bg-orange-600', deskripsi: 'Izin tempat usaha' },
  { id: 25, nama: 'Surat Keterangan Pedagang Kecil', kategori: 'Perdagangan', icon: Briefcase, warna: 'bg-purple-600', deskripsi: 'Status pedagang kecil' },
  { id: 26, nama: 'Surat Keterangan Pasar', kategori: 'Perdagangan', icon: Building, warna: 'bg-indigo-600', deskripsi: 'Keterangan pasar' },
  
  // Transportasi
  { id: 27, nama: 'Surat Keterangan Kepemilikan Kendaraan', kategori: 'Transportasi', icon: Car, warna: 'bg-blue-700', deskripsi: 'Kepemilikan kendaraan' },
  { id: 28, nama: 'Surat Keterangan Penggunaan Kendaraan', kategori: 'Transportasi', icon: Car, warna: 'bg-cyan-600', deskripsi: 'Penggunaan kendaraan' },
  
  // Sosial
  { id: 29, nama: 'Surat Keterangan Sosial', kategori: 'Sosial', icon: Users, warna: 'bg-pink-600', deskripsi: 'Keterangan sosial' },
  { id: 30, nama: 'Surat Keterangan Kemiskinan', kategori: 'Sosial', icon: Shield, warna: 'bg-gray-600', deskripsi: 'Status kemiskinan' },
  { id: 31, nama: 'Surat Keterangan Anak Yatim', kategori: 'Sosial', icon: Heart, warna: 'bg-red-700', deskripsi: 'Status anak yatim' },
  { id: 32, nama: 'Surat Keterangan Lansia', kategori: 'Sosial', icon: User, warna: 'bg-slate-600', deskripsi: 'Status lanjut usia' },
  
  // Keamanan
  { id: 33, nama: 'Surat Keterangan Bebas Narkoba', kategori: 'Keamanan', icon: Shield, warna: 'bg-green-800', deskripsi: 'Bebas narkoba' },
  { id: 34, nama: 'Surat Keterangan Tidak Terlibat Kriminal', kategori: 'Keamanan', icon: CheckCircle, warna: 'bg-blue-800', deskripsi: 'Bebas kriminal' },
  { id: 35, nama: 'Surat Keterangan Keamanan', kategori: 'Keamanan', icon: Shield, warna: 'bg-emerald-600', deskripsi: 'Keamanan lingkungan' },
  
  // Legalitas
  { id: 36, nama: 'Surat Kuasa', kategori: 'Legalitas', icon: FileText, warna: 'bg-purple-700', deskripsi: 'Surat kuasa' },
  { id: 37, nama: 'Surat Pernyataan', kategori: 'Legalitas', icon: FileText, warna: 'bg-indigo-700', deskripsi: 'Surat pernyataan' },
  { id: 38, nama: 'Surat Perjanjian', kategori: 'Legalitas', icon: FileText, warna: 'bg-pink-700', deskripsi: 'Surat perjanjian' },
  
  // Lainnya
  { id: 39, nama: 'Surat Keterangan Aktif', kategori: 'Lainnya', icon: CheckCircle, warna: 'bg-teal-600', deskripsi: 'Status aktif' },
  { id: 40, nama: 'Surat Keterangan Non Aktif', kategori: 'Lainnya', icon: Clock, warna: 'bg-gray-700', deskripsi: 'Status non aktif' },
  { id: 41, nama: 'Surat Keterangan Referensi', kategori: 'Lainnya', icon: Star, warna: 'bg-yellow-700', deskripsi: 'Surat referensi' },
  { id: 42, nama: 'Surat Keterangan Khusus', kategori: 'Lainnya', icon: AlertCircle, warna: 'bg-red-800', deskripsi: 'Keperluan khusus' }
];

const kategoriList = Array.from(new Set(suratList.map(s => s.kategori)));

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedKategori, setSelectedKategori] = useState('Semua');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredSurat = useMemo(() => {
    return suratList.filter(surat => {
      const matchesSearch = surat.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           surat.deskripsi.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesKategori = selectedKategori === 'Semua' || surat.kategori === selectedKategori;
      return matchesSearch && matchesKategori;
    });
  }, [searchTerm, selectedKategori]);

  const SuratCard = ({ surat, index }: { surat: typeof suratList[0]; index: number }) => {
    const Icon = surat.icon;
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.05 }}
        whileHover={{ 
          scale: 1.05, 
          rotateY: 5,
          transition: { duration: 0.2 }
        }}
        whileTap={{ 
          scale: 0.95,
          transition: { duration: 0.1 }
        }}
        className="cursor-pointer"
      >
        <Card className="h-full hover:shadow-2xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm group">
          <CardHeader className="text-center pb-3">
            <motion.div 
              className={`mx-auto w-16 h-16 ${surat.warna} rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <Icon className="w-8 h-8 text-white" />
            </motion.div>
            <CardTitle className="text-sm font-semibold line-clamp-2 group-hover:text-primary transition-colors">
              {surat.nama}
            </CardTitle>
            <Badge variant="secondary" className="text-xs">
              {surat.kategori}
            </Badge>
          </CardHeader>
          <CardContent className="pt-0">
            <CardDescription className="text-xs text-center line-clamp-2">
              {surat.deskripsi}
            </CardDescription>
            <motion.div 
              className="mt-4 text-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="sm" 
                className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <FileText className="w-4 h-4 mr-2" />
                Ajukan Surat
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-cyan-50">
      {/* Header */}
      <motion.header 
        className="bg-gradient-to-r from-emerald-600 to-cyan-600 text-white shadow-2xl"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4 py-8">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 animate__animated animate__fadeInDown">
              Pelayanan Surat Desa Kemasantani
            </h1>
            <p className="text-lg md:text-xl opacity-90 animate__animated animate__fadeInUp">
              42 Jenis Layanan Surat Digital untuk Kemudahan Anda
            </p>
          </motion.div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Search and Filter Section */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-emerald-100">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Cari jenis surat..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="border-emerald-200"
                >
                  <Grid className="w-4 h-4 mr-2" />
                  Grid
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="border-emerald-200"
                >
                  <List className="w-4 h-4 mr-2" />
                  List
                </Button>
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mb-6">
              <Button
                variant={selectedKategori === 'Semua' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedKategori('Semua')}
                className="border-emerald-200"
              >
                Semua
              </Button>
              {kategoriList.map((kategori) => (
                <Button
                  key={kategori}
                  variant={selectedKategori === kategori ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedKategori(kategori)}
                  className="border-emerald-200 text-xs"
                >
                  {kategori}
                </Button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div 
          className="mb-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className="text-gray-600">
            Menampilkan <span className="font-semibold text-emerald-600">{filteredSurat.length}</span> dari{' '}
            <span className="font-semibold">{suratList.length}</span> jenis surat
          </p>
        </motion.div>

        {/* Surat Grid/List */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedKategori}-${searchTerm}-${viewMode}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={
              viewMode === 'grid' 
                ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'
                : 'space-y-4'
            }
          >
            {filteredSurat.map((surat, index) => (
              viewMode === 'grid' ? (
                <SuratCard key={surat.id} surat={surat} index={index} />
              ) : (
                <motion.div
                  key={surat.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <motion.div 
                          className={`w-12 h-12 ${surat.warna} rounded-xl flex items-center justify-center flex-shrink-0`}
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <surat.icon className="w-6 h-6 text-white" />
                        </motion.div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-sm mb-1">{surat.nama}</h3>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="secondary" className="text-xs">
                              {surat.kategori}
                            </Badge>
                            <span className="text-xs text-gray-500">{surat.deskripsi}</span>
                          </div>
                          <Button 
                            size="sm" 
                            className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white border-0"
                          >
                            <FileText className="w-4 h-4 mr-2" />
                            Ajukan
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            ))}
          </motion.div>
        </AnimatePresence>

        {/* No Results */}
        {filteredSurat.length === 0 && (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Tidak Ada Hasil</h3>
            <p className="text-gray-500">Coba ubah kata kunci pencarian atau filter kategori</p>
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <motion.footer 
        className="bg-gradient-to-r from-emerald-700 to-cyan-700 text-white mt-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="mb-2">© 2024 Pemerintah Desa Kemasantani</p>
            <p className="text-sm opacity-75">Pelayanan Surat Digital - Melayani dengan Hati</p>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}