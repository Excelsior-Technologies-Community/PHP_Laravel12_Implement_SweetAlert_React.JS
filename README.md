PHP_Laravel12_Implement_SweetAlert_React.JS

A simple demonstration of integrating SweetAlert2 into a Laravel 12 application using React.js and Vite.
This project shows how to implement confirmation alerts correctly in React without using jQuery.

Project Overview

This project is built using modern Laravel and frontend tooling.

Backend: Laravel 12

Frontend: React.js

Build Tool: Vite

Alert Library: SweetAlert2

Package Manager: NPM

The application contains a simple button that triggers a SweetAlert2 confirmation popup.

Features

Laravel 12 with Vite setup

React.js integration

SweetAlert2 confirmation popup

No jQuery usage

Clean and minimal project structure

Beginner-friendly example

Suitable for interviews and learning

Requirements

Make sure your system has the following installed:

PHP 8.2 or higher

Composer

Node.js 18+

NPM

MySQL (optional, not required for this demo)

Installation Steps
1. Clone the Repository
git clone https://github.com/your-username/laravel12-react-sweetalert.git
cd laravel12-react-sweetalert

2. Install Dependencies
composer install
npm install

3. Environment Setup
cp .env.example .env
php artisan key:generate

4. Install SweetAlert2
npm install sweetalert2

5. Run Development Servers

Frontend (Vite):

npm run dev


Backend (Laravel):

php artisan serve

6. Open in Browser
http://127.0.0.1:8000

Project Structure
resources/
 └── js/
     ├── app.jsx
     └── components/
         └── App.jsx

resources/
 └── views/
     └── welcome.blade.php

vite.config.js
routes/web.php

SweetAlert2 Implementation

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
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
            }
        });
    };

    return (
        <div>
            <h1>Laravel 12 + React + SweetAlert2</h1>
            <button onClick={showAlert}>Click Me</button>
        </div>
    );
}

export default App;

Important Notes

React components use .jsx extension

@vitejs/plugin-react is required for React support

@viteReactRefresh must be included in the Blade file

SweetAlert2 is installed via NPM (recommended approach)

jQuery is not required for React projects
