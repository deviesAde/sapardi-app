import Header from '@/components/Auth/HeaderAuth';
import { Button } from '@/components/ui/button';
import { router } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { Camera, FolderInput, RotateCcw, MessageCircle } from 'lucide-react';
import { use, useEffect, useRef, useState } from 'react';
import GrowingLoader from '@/components/GrowingLoader';

const AnimatedButton = motion(Button);


export default function ScanPenyakit() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showTips, setShowTips] = useState(true);

    const handleUseImage = async () => {
        if (!capturedImage) return;

        setIsLoading(true);

        try {
            const formData = new FormData();
            const blob = await (await fetch(capturedImage)).blob();
            formData.append('image', blob, 'scan.png');

            const response = await fetch('http://localhost:5000/predict', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (data.success) {
                const results = JSON.parse(data.results);
                const label = results[0]?.name || 'Tidak dikenali';
                const imagePath = data.image;

                router.post('/hasil-scan-penyakit', {
                    image: imagePath,
                    label: label,
                });
            }
        } catch (error) {
            console.error('Gagal mengirim gambar ke Flask:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const openCamera = async () => {
        setIsCameraOpen(true);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: 'environment',
                    width: { ideal: 1920 },
                    height: { ideal: 1080 },
                },
            });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.play();
            }
        } catch (error) {
            console.error('Error accessing camera:', error);
        }
    };

    const captureImage = () => {
        if (videoRef.current && canvasRef.current) {
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');
            if (context) {
                canvas.width = videoRef.current.videoWidth;
                canvas.height = videoRef.current.videoHeight;
                context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
                const imageData = canvas.toDataURL('image/png');
                setCapturedImage(imageData);
                closeCamera();
            }
        }
    };

    const closeCamera = () => {
        setIsCameraOpen(false);
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach((track) => track.stop());
            videoRef.current.srcObject = null;
        }
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setCapturedImage(e.target?.result as string);
                closeCamera();
            };
            reader.readAsDataURL(file);
        }
    };

    const resetToInitialState = () => {
        setCapturedImage(null);
        openCamera();
    };


  useEffect(() => {
      // Fungsi yang sudah ada
      openCamera();

      // Fungsi loading
      const timer = setTimeout(() => {
          setIsLoading(false); // Setelah 3 detik, loading selesai
      }, 3000);

      // Cleanup
      return () => {
          clearTimeout(timer); // Bersihkan timer loading
          closeCamera(); // Bersihkan kamera
      };
  }, []);

  if (isLoading) return <GrowingLoader />;




    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
            <Header />

            <main className="mx-auto w-full max-w-full rounded p-6">
                <div className="relative mb-8 flex items-center justify-center">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl font-bold text-green-600"
                    >
                        Scan Penyakit Tanaman
                    </motion.h1>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="absolute right-0"
                    >
                        <AnimatedButton
                            className="bg-[#67AE6E] text-white hover:bg-green-500"
                            onClick={() => router.get('/riwayat-scan')}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Riwayat Scan
                        </AnimatedButton>
                    </motion.div>
                </div>

                <div className="flex flex-col items-center lg:flex-row lg:items-start lg:justify-center lg:space-x-8">
                    <AnimatePresence mode="wait">
                        {isCameraOpen && !capturedImage && (
                            <motion.div
                                key="camera"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                className="flex w-full flex-col items-center lg:w-2/3"
                            >
                                <div className="relative w-full overflow-hidden rounded-2xl shadow-2xl">
                                    <video ref={videoRef} className="h-[300px] w-full rounded-lg object-cover lg:h-[500px]" />
                                    <div className="absolute inset-0 rounded-lg ring-2 ring-green-400 ring-offset-4"></div>
                                </div>

                                <motion.div
                                    className="mt-6 flex space-x-4"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <AnimatedButton
                                        onClick={captureImage}
                                        className="rounded-full bg-[#67AE6E] px-6 py-3 font-semibold text-white shadow-lg hover:bg-green-500"
                                        whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(103, 174, 110, 0.3)' }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Camera className="mr-2 h-5 w-5" />
                                        Ambil Gambar
                                    </AnimatedButton>

                                    <label>
                                        <AnimatedButton
                                            asChild
                                            className="rounded-full bg-[#4a8cff] px-6 py-3 font-semibold text-white shadow-lg hover:bg-blue-500"
                                            whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(74, 140, 255, 0.3)' }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <div>
                                                <FolderInput className="mr-2 h-5 w-5" />
                                                Upload Gambar
                                            </div>
                                        </AnimatedButton>
                                        <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
                                    </label>
                                </motion.div>
                            </motion.div>
                        )}

                        {capturedImage && (
                            <motion.div
                                key="preview"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className="mt-6 w-full text-center lg:w-2/3"
                            >
                                <h2 className="mb-4 text-2xl font-bold text-green-600">Pratinjau Gambar</h2>
                                <div className="relative mx-auto w-full max-w-2xl overflow-hidden rounded-2xl shadow-xl">
                                    <img src={capturedImage} alt="Captured" className="h-auto w-full rounded-lg object-contain" />
                                    <div className="absolute inset-0 rounded-lg ring-2 ring-green-400 ring-offset-4"></div>
                                </div>

                                <motion.div
                                    className="mt-8 flex justify-center space-x-4"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <AnimatedButton
                                        onClick={resetToInitialState}
                                        className="rounded-full bg-red-500 px-6 py-3 font-semibold text-white shadow-lg hover:bg-red-600"
                                        whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(239, 68, 68, 0.3)' }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <RotateCcw className="mr-2 h-5 w-5" />
                                        Ambil Ulang
                                    </AnimatedButton>
                                    <AnimatedButton
                                        onClick={handleUseImage}
                                        className="rounded-full bg-[#67AE6E] px-6 py-3 font-semibold text-white shadow-lg hover:bg-green-600"
                                        whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(103, 174, 110, 0.3)' }}
                                        whileTap={{ scale: 0.95 }}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <span className="flex items-center">
                                                <svg className="mr-2 h-5 w-5 animate-spin" viewBox="0 0 24 24">
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                    ></circle>
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                    ></path>
                                                </svg>
                                                Memproses...
                                            </span>
                                        ) : (
                                            'Analisis Gambar Ini'
                                        )}
                                    </AnimatedButton>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className={`mt-10 w-full max-w-4xl rounded-2xl bg-white p-6 shadow-xl transition-all duration-300 lg:mt-0 lg:w-1/3 ${showTips ? 'border-l-4 border-green-500' : ''}`}
                    >
                        <div className="flex cursor-pointer items-center justify-between" onClick={() => setShowTips(!showTips)}>
                            <h3 className="text-xl font-bold text-green-700">Tips & Trik untuk Hasil Optimal</h3>
                            <motion.div animate={{ rotate: showTips ? 180 : 0 }} transition={{ duration: 0.3 }}>
                                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </motion.div>
                        </div>

                        {showTips && (
                            <motion.ul
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="mt-4 space-y-3 overflow-hidden pl-5"
                            >
                                {[
                                    'Gunakan pencahayaan yang cukup dan merata',
                                    'Fokuskan kamera pada daun atau area yang terkena penyakit',
                                    'Jaga jarak sekitar 30-50 cm dari tanaman',
                                    'Hindari bayangan yang mengganggu',
                                    'Gunakan background polos untuk kontras lebih baik',
                                    'Pastikan gambar tidak blur dengan menahan kamera tetap',
                                ].map((tip, index) => (
                                    <motion.li
                                        key={index}
                                        className="relative text-gray-700 before:absolute before:top-2 before:-left-5 before:h-2 before:w-2 before:rounded-full before:bg-green-500"
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 * index }}
                                    >
                                        {tip}
                                    </motion.li>
                                ))}
                            </motion.ul>
                        )}
                    </motion.div>
                </div>

                <motion.div
                    className="fixed right-6 bottom-6 z-50"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <AnimatedButton
                        className="flex items-center gap-2 rounded-full bg-green-600 px-6 py-4 text-base font-semibold text-white shadow-lg hover:bg-green-700"
                        whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(34, 197, 94, 0.3)' }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => router.get('/chatbot')}
                    >
                        <MessageCircle className="h-6 w-6 text-white" />
                        <span>Pergi ke Chat Bot</span>
                    </AnimatedButton>
                </motion.div>

                <canvas ref={canvasRef} className="hidden"></canvas>
            </main>
        </div>
    );
}
