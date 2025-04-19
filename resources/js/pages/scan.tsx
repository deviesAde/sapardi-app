import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Camera, FolderInput, RotateCcw } from 'lucide-react';


export default function ScanPenyakit() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);

    const openCamera = async () => {
        setIsCameraOpen(true);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
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
        openCamera();
        return () => closeCamera();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="sticky top-0 z-10 mb-6 w-full bg-green-900 px-6 py-4 text-white shadow">
                <div className="mx-auto flex max-w-4xl items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <img src="/images/landing/Logo.png" alt="Logo" className="h-10" />
                        <span className="text-xl font-bold">SAPARDI</span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <span className="font-semibold text-white">User</span>
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-green-800">
                            <i className="fas fa-user"></i>
                        </div>
                    </div>
                </div>
            </header>

            <main className="mx-auto w-full max-w-full rounded bg-white p-6 shadow">
                <div className="mb-6 text-center">
                    <h1 className="text-2xl font-bold text-green-600">Scan Penyakit</h1>
                </div>

                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-center lg:space-x-8">
                    {isCameraOpen && (
                        <div className="flex flex-col items-center lg:w-2/3">
                            <video ref={videoRef} className="h-[300px] w-full rounded-lg object-cover shadow-lg lg:h-[500px]"></video>

                            <div className="mt-4 flex space-x-4">
                                <Button onClick={captureImage} className="rounded bg-[#67AE6E] px-4 py-2 font-semibold text-white hover:bg-green-500">
                                    <Camera className="mr-2 h-4 w-4" />
                                    Ambil Gambar
                                </Button>

                                <label>
                                    <Button asChild className="rounded bg-[#67AE6E] px-4 py-2 font-semibold text-white hover:bg-green-500">
                                        <div>
                                            <FolderInput className="mr-2 h-4 w-4" />
                                            Upload Gambar
                                        </div>
                                    </Button>
                                    <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
                                </label>
                            </div>

                            {/* Tips and Tricks */}
                            <div className="mt-10 w-full max-w-3xl rounded-lg border border-gray-200 bg-gray-50 p-4 shadow-sm lg:mt-0 lg:w-1/3">
                                <h3 className="mb-2 text-lg font-semibold text-green-700">Tips & Trik untuk Hasil Scan yang Optimal</h3>
                                <ul className="list-disc space-y-1 pl-5 text-gray-700">
                                    <li>Pastikan gambar tanaman terlihat jelas dan fokus.</li>
                                    <li>Pencahayaan yang cukup sangat membantu pendeteksian.</li>
                                    <li>Jangan ada tangan atau objek lain yang menutupi bagian tanaman.</li>
                                    <li>Foto dari jarak sedang, tidak terlalu dekat atau jauh.</li>
                                    <li>Usahakan background sederhana agar sistem lebih mudah mendeteksi penyakit.</li>
                                </ul>
                            </div>
                        </div>
                    )}

                    {capturedImage && (
                        <div className="mt-6 text-center">
                            <h2 className="text-lg font-bold text-green-600">Captured Image</h2>
                            <img src={capturedImage} alt="Captured" className="mx-auto mt-4 h-96 w-auto rounded-lg" />
                            <div className="mt-4 flex space-x-4">
                                <Button
                                    onClick={resetToInitialState}
                                    className="rounded bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-500"
                                >
                                    <RotateCcw className="mr-2 h-4 w-4" />
                                    Ulangi
                                </Button>
                                <button className="rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-500">
                                    Gunakan gambar ini
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <canvas ref={canvasRef} className="hidden"></canvas>
            </main>
        </div>
    );
}
