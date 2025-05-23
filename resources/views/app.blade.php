<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        {{-- Inline script to detect system dark mode preference and apply it immediately --}}
        <script>
            (function() {
                const appearance = '{{ $appearance ?? "system" }}';

                if (appearance === 'system') {
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                    if (prefersDark) {
                        document.documentElement.classList.add('dark');
                    }
                }
            })();
        </script>

        {{-- Inline style to set the HTML background color based on our theme in app.css --}}
        <style>
            html {
                background-color: oklch(1 0 0);
            }

            html.dark {
                background-color: oklch(0.145 0 0);
            }

            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        </style>

        <title inertia>{{ config('app.name', 'Sapardi') }}</title>

        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

        @routes
        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        @inertiaHead

        <script>
            document.addEventListener('DOMContentLoaded', function () {
                const loadingElement = document.getElementById('loading');

                // Tampilkan loading saat Inertia memulai navigasi
                window.addEventListener('inertia:start', () => {
                    loadingElement.style.display = 'flex';
                });

                // Sembunyikan loading saat Inertia selesai memuat halaman
                window.addEventListener('inertia:finish', () => {
                    loadingElement.style.display = 'none';
                });
            });
        </script>
    </head>
    <body class="font-sans antialiased">
        <div id="loading" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: white; z-index: 9999; display: flex; align-items: center; justify-content: center; display: none;">
            <div class="spinner" style="border: 4px solid #f3f3f3; border-top: 4px solid #131e15; border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite;"></div>
        </div>

        @inertia
    </body>
</html>
