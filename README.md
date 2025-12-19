## PHP_Laravel12_Implement_SweetAlert_React.JS

This project demonstrates how to integrate SweetAlert2 into a Laravel 12 application using React.js and Vite. It shows a simple confirmation alert implemented the correct way using React without jQuery.

## Project Overview

Backend: Laravel 12

Frontend: React.js

Build Tool: Vite

Alert Library: SweetAlert2

Package Manager: NPM

The application contains a simple button that triggers a SweetAlert2 confirmation popup.

## Features

Laravel 12 with Vite

React.js integration

SweetAlert2 popup

No jQuery usage

Clean project structure

Beginner friendly

Suitable for interviews and learning

## Requirements

PHP 8.2 or higher

Composer

Node.js 18+

NPM

MySQL (optional)

## Installation Steps

## Clone Repository

git clone https://github.com/your-username/laravel12-react-sweetalert.git
cd laravel12-react-sweetalert

## Install Dependencies
composer install
npm install

## Environment Setup
cp .env.example .env
php artisan key:generate

## Install SweetAlert2
npm install sweetalert2
Run Development Servers

Frontend:

npm run dev

Backend:

php artisan serve

Application URL:

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

@vitejs/plugin-react is required

@viteReactRefresh must be included in Blade file

SweetAlert2 is installed via NPM

jQuery is not required

Common Error Fix

Error:

@vitejs/plugin-react can't detect preamble

Fix:

Ensure file extension is .jsx

Add @viteReactRefresh in Blade file

Enable react() plugin in vite.config.js

Clear Vite cache and restart dev server
