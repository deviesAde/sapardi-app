import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp';
import axios from 'axios'; // Pastikan axios sudah terinstall
import { LoaderCircle } from 'lucide-react';
import { useState } from 'react';
import AuthLayout from '@/layouts/auth-layout';

 // Import layout yang sama seperti di reset-password.tsx

// Define the OTPVerificationPageProps interface
interface OTPVerificationPageProps {
    email: string;
}

export function OTPVerificationPage({ email }: OTPVerificationPageProps) {
    const [otp, setOtp] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleVerify = async () => {
        if (otp.length !== 6) {
            setError('Kode OTP harus 6 digit');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const response = await axios.post('/verify-otp', {
                email: email,
                otp: otp,
            });
            if (response.data.redirect_url) {
                window.location.href = response.data.redirect_url;
            } else {
                console.log(response.data.message);
            }
        } catch (err) {
            setError((err as any).response?.data?.message || 'Terjadi kesalahan');
        } finally {
            setIsLoading(false);
        }
    };

    const handleResend = async () => {
        setIsLoading(true);
        setError('');

        try {
            const response = await axios.post('/resend-otp', {
                email: email,
            });

            if (response.data.message) {
                console.log(response.data.message);
                alert('Kode OTP berhasil dikirim ulang ke email Anda.');
            }
        } catch (err) {
            setError((err as any).response?.data?.message || 'Gagal mengirim ulang kode OTP.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthLayout title="Verifikasi OTP" description="Masukkan 6 digit kode verifikasi yang dikirim ke email Anda">
            <div className="flex flex-col items-center justify-center">
                <Card className="w-full max-w-md">
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl">Verifikasi OTP</CardTitle>
                        <CardDescription>Masukkan 6 digit kode verifikasi yang dikirim ke email Anda</CardDescription>
                    </CardHeader>

                    <CardContent className="flex flex-col items-center gap-4">
                        <InputOTP maxLength={6} value={otp} onChange={(value) => setOtp(value)}>
                            <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                            </InputOTPGroup>
                            <InputOTPSeparator />
                            <InputOTPGroup>
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                            </InputOTPGroup>
                        </InputOTP>

                        {error && <p className="text-destructive text-sm font-medium">{error}</p>}

                        <Button onClick={handleVerify} disabled={isLoading || otp.length !== 6} className="w-full">
                            {isLoading ? (
                                <>
                                    <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                                    Memverifikasi...
                                </>
                            ) : (
                                'Verifikasi'
                            )}
                        </Button>
                    </CardContent>

                    <CardFooter className="flex justify-center">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Tidak menerima kode?{' '}
                            <button onClick={handleResend} className="text-primary font-medium hover:underline">
                                Kirim ulang
                            </button>
                        </p>
                    </CardFooter>
                </Card>
            </div>
        </AuthLayout>
    );
}

export default OTPVerificationPage;
