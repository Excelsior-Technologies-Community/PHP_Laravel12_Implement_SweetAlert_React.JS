## PHP_Laravel12_Implement_SweetAlert_React.JS
A clean, modern implementation of SweetAlert2 in a Laravel 12 application using React.js and Vite, demonstrating proper confirmation alerts without jQuery.

## Quick Start
Prerequisites
PHP 8.2+

Composer

Node.js 18+

NPM

Installation
Clone and setup

bash
git clone <your-repository-url>
cd laravel12-react-sweetalert
Install dependencies

bash
composer install
npm install
Environment setup

bash
cp .env.example .env
php artisan key:generate
Install SweetAlert2

bash
npm install sweetalert2
Start development servers

bash
# Terminal 1 - Frontend (Vite)
npm run dev

# Terminal 2 - Backend (Laravel)
php artisan serve
Open application
Visit http://127.0.0.1:8000

##  Project Structure
text
laravel12-react-sweetalert/
├── resources/
│   ├── js/
│   │   ├── app.jsx          # Main React entry point
│   │   └── components/
│   │       └── App.jsx      # Main React component
│   └── views/
│       └── welcome.blade.php # Main view with Vite integration
├── routes/
│   └── web.php              # Laravel routes
├── vite.config.js           # Vite configuration
└── package.json

## Features
Laravel 12 with modern Vite setup

React.js integration (no jQuery required)

SweetAlert2 confirmation popups

Clean, minimal project structure

Beginner-friendly implementation

Suitable for interviews and learning

Proper component-based architecture

## Key Implementation
React Component with SweetAlert2
File: resources/js/components/App.jsx

jsx
import React from 'react';
import Swal from 'sweetalert2';

function App() {
    const showAlert = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                );
            }
        });
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                    Laravel 12 + React + SweetAlert2
                </h1>
                <p className="text-gray-600 mb-8 text-center">
                    Click the button below to trigger a SweetAlert2 confirmation dialog
                </p>
                <button
                    onClick={showAlert}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
                >
                    Show SweetAlert Confirmation
                </button>
                <div className="mt-6 text-sm text-gray-500">
                    <p className="text-center">
                        This demonstrates proper integration of SweetAlert2 in a React component without jQuery
                    </p>
                </div>
            </div>
        </div>
    );
}

export default App;
Main JavaScript Entry
File: resources/js/app.jsx

jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App />);

Vite Configuration
File: vite.config.js

javascript
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/js/app.jsx'],
            refresh: true,
        }),
        react(),
    ],
});

Blade View
File: resources/views/welcome.blade.php

blade

<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Laravel 12 + React + SweetAlert2</title>
    @viteReactRefresh
    @vite(['resources/js/app.jsx'])
</head>
<body>
    <div id="app"></div>
</body>
</html>

Laravel Route
File: routes/web.php

php

<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

📦 Package.json Dependencies
json
{
    "private": true,
    "type": "module",
    "scripts": {
        "dev": "vite",
        "build": "vite build"
    },
    "devDependencies": {
        "@vitejs/plugin-react": "^4.0.0",
        "autoprefixer": "^10.4.0",
        "postcss": "^8.4.0",
        "tailwindcss": "^3.0.0",
        "vite": "^5.0.0"
    },
    "dependencies": {
        "react": "^18.2.0",
        "react-dom": "^18.2.0",
        "sweetalert2": "^11.0.0"
    }
}
