import React from 'react';
import Swal from 'sweetalert2';

function App() {

    const showAlert = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
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
        <div className="container mt-5 text-center">
            <h1>Laravel 12 + React + SweetAlert2</h1>
            <button className="btn btn-success mt-3" onClick={showAlert}>
                Click Me
            </button>
        </div>
    );
}

export default App;
