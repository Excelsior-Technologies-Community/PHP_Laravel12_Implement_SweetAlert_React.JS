PHP_Laravel12_Implement_SweetAlert_React.JS

A clean and modern implementation of SweetAlert2 in a Laravel 12 application using React.js and Vite.
This project demonstrates how to correctly use confirmation alerts in React without jQuery, following best practices and modern frontend standards.

Project Overview

This repository is a simple demonstration project designed to help developers understand:

How to integrate React.js into Laravel 12 using Vite

How to use SweetAlert2 inside React components

How to avoid jQuery and use proper component-based architecture

How Laravel and React work together in a clean setup

This project is suitable for:

Beginners learning Laravel + React

Interview preparation

Reference for SweetAlert2 integration

Small demos and learning projects

Tech Stack

Backend

Laravel 12

PHP 8.2+

Frontend

React.js 18

Vite

SweetAlert2

Package Management

Composer

NPM

Quick Start
Prerequisites

Make sure you have the following installed:

PHP 8.2 or higher

Composer

Node.js 18 or higher

NPM

Installation
Step 1: Clone the Repository
git clone <your-repository-url>
cd laravel12-react-sweetalert

Step 2: Install Backend and Frontend Dependencies
composer install
npm install

Step 3: Environment Setup
cp .env.example .env
php artisan key:generate


Update your .env file if database configuration is required.

Step 4: Install SweetAlert2
npm install sweetalert2

Step 5: Start Development Servers
# Terminal 1 - Frontend (Vite)
npm run dev

# Terminal 2 - Backend (Laravel)
php artisan serve

Step 6: Open the Application

Open your browser and visit:

http://127.0.0.1:8000

Project Structure
laravel12-react-sweetalert/
├── resources/
│   ├── js/
│   │   ├── app.jsx
│   │   └── components/
│   │       └── App.jsx
│   └── views/
│       └── welcome.blade.php
├── routes/
│   └── web.php
├── vite.config.js
├── package.json
└── README.md

Features

Laravel 12 with Vite integration

React.js setup without jQuery

SweetAlert2 confirmation dialogs

Clean and minimal folder structure

Beginner-friendly implementation

Proper React component usage

Modern frontend tooling

Easy to extend for CRUD projects

Key Implementation Details
React Component with SweetAlert2

File: resources/js/components/App.jsx

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
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold text-center mb-4">
                    Laravel 12 + React + SweetAlert2
                </h1>

                <p className="text-center text-gray-600 mb-6">
                    Click the button below to trigger a SweetAlert2 confirmation dialog
                </p>

                <button
                    onClick={showAlert}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
                >
                    Show SweetAlert Confirmation
                </button>
            </div>
        </div>
    );
}

export default App;

Main JavaScript Entry File

File: resources/js/app.jsx

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';

const container = document.getElementById('app');
const root = createRoot(container);

root.render(<App />);

Vite Configuration

File: vite.config.js

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

Blade View Integration

File: resources/views/welcome.blade.php

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

<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Package.json Dependencies
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
