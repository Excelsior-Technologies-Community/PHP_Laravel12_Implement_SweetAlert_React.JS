import React from "react";
import Swal from "sweetalert2";

function App() {

    // Success Alert
    const successAlert = () => {
        Swal.fire({
            title: "Success!",
            text: "Data Saved Successfully.",
            icon: "success",
            confirmButtonColor: "#198754",
        });
    };

    // Delete Confirmation
    const deleteAlert = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to recover this data!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#dc3545",
            cancelButtonColor: "#6c757d",
            confirmButtonText: "Yes, Delete It!"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Deleted!",
                    text: "Your data has been deleted.",
                    icon: "success"
                });
            }
        });
    };

    // Input Alert
    const inputAlert = async () => {

        const { value: name } = await Swal.fire({
            title: "Enter Your Name",
            input: "text",
            inputPlaceholder: "Your Name",
            showCancelButton: true,
            confirmButtonText: "Submit"
        });

        if (name) {
            Swal.fire({
                title: `Welcome ${name}`,
                text: "Thank you for visiting.",
                icon: "success"
            });
        }
    };

    const loginAlert = async () => {

        const { value: formValues } = await Swal.fire({
            title: "Login",
            html: `
            <input id="email" class="swal2-input" placeholder="Email">
            <input id="password" type="password" class="swal2-input" placeholder="Password">
        `,
            focusConfirm: false,
            showCancelButton: true,
            preConfirm: () => {
                return {
                    email: document.getElementById("email").value,
                    password: document.getElementById("password").value,
                };
            }
        });

        if (formValues) {
            Swal.fire({
                icon: "success",
                title: "Login Successful",
                text: `Welcome ${formValues.email}`
            });
        }
    };

    const toastAlert = () => {

        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
        });

        Toast.fire({
            icon: "success",
            title: "Profile Updated Successfully"
        });

    };

    // Timer Alert
    const timerAlert = () => {
        Swal.fire({
            title: "Auto Closing Alert",
            text: "This message will close in 3 seconds.",
            timer: 3000,
            timerProgressBar: true,
            icon: "info",
            showConfirmButton: false
        });
    };

    // Multi Step Registration Wizard
    const wizardAlert = async () => {

        const steps = ['1', '2', '3'];

        const Queue = Swal.mixin({
            progressSteps: steps,
            confirmButtonText: 'Next →',
            showCancelButton: true,
            reverseButtons: true,
        });

        const values = [];

        const { value: fullName } = await Queue.fire({
            title: 'Step 1',
            text: 'Enter Full Name',
            input: 'text',
            currentProgressStep: 0,
            inputValidator: (value) => {
                if (!value) return 'Full Name is required!';
            }
        });

        if (!fullName) return;

        values.push(fullName);

        const { value: email } = await Queue.fire({
            title: 'Step 2',
            text: 'Enter Email',
            input: 'email',
            currentProgressStep: 1,
            inputValidator: (value) => {
                if (!value) return 'Email is required!';
            }
        });

        if (!email) return;

        values.push(email);

        const { value: department } = await Queue.fire({
            title: 'Step 3',
            text: 'Select Department',
            input: 'select',
            inputOptions: {
                Laravel: 'Laravel',
                React: 'React',
                PHP: 'PHP',
                Testing: 'Testing'
            },
            currentProgressStep: 2
        });

        if (!department) return;

        values.push(department);

        Swal.fire({
            icon: "success",
            title: "Registration Completed",
            html: `
            <b>Name:</b> ${values[0]} <br>
            <b>Email:</b> ${values[1]} <br>
            <b>Department:</b> ${values[2]}
        `,
            confirmButtonColor: "#198754"
        });

    };

    // Fake API Loading Demo
    const loadingAlert = () => {

        Swal.fire({
            title: "Fetching Data...",
            html: "Please wait while we process your request.",
            allowOutsideClick: false,
            allowEscapeKey: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        setTimeout(() => {

            Swal.fire({
                icon: "success",
                title: "Data Loaded",
                text: "Fake API request completed successfully.",
                confirmButtonColor: "#0d6efd"
            });

        }, 3000);

    };

    // Undo Delete Alert
    const undoDeleteAlert = () => {

        Swal.fire({
            title: "Delete Record?",
            text: "You can restore it within 5 seconds.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#dc3545",
            cancelButtonColor: "#6c757d",
            confirmButtonText: "Delete"
        }).then((result) => {

            if (!result.isConfirmed) return;

            let timerInterval;

            Swal.fire({
                title: "Record Deleted",
                html: `
                <b>This record will be permanently removed in
                <span id="count">5</span> seconds.</b><br><br>
                Click <b>Undo</b> to restore it.
            `,
                icon: "success",
                showCancelButton: true,
                confirmButtonText: "Undo",
                cancelButtonText: "Keep Deleted",
                timer: 5000,
                timerProgressBar: true,

                didOpen: () => {

                    const countdown = document.getElementById("count");
                    let seconds = 5;

                    timerInterval = setInterval(() => {
                        seconds--;
                        if (countdown) countdown.textContent = seconds;
                    }, 1000);

                },

                willClose: () => {
                    clearInterval(timerInterval);
                }

            }).then((undoResult) => {

                if (undoResult.isConfirmed) {

                    Swal.fire({
                        icon: "success",
                        title: "Restored!",
                        text: "Your record has been restored.",
                        confirmButtonColor: "#198754"
                    });

                } else {

                    Swal.fire({
                        icon: "error",
                        title: "Deleted Permanently",
                        text: "The record can no longer be recovered.",
                        confirmButtonColor: "#dc3545"
                    });

                }

            });

        });

    };

    return (
        <div
            className="min-vh-100 d-flex align-items-center"
            style={{
                background: "linear-gradient(135deg, #0f172a, #1e293b, #334155)"
            }}
        >
            <div className="container">

                <div className="row justify-content-center">

                    <div className="col-lg-8">

                        <div
                            className="card shadow-lg border-0 rounded-4"
                        >

                            <div className="card-body p-5">

                                <div className="text-center mb-5">

                                    <h1 className="fw-bold text-primary">
                                        Laravel 12 + React
                                    </h1>

                                    <h3 className="text-dark">
                                        SweetAlert2 Demo Dashboard
                                    </h3>

                                    <p className="text-muted">
                                        Interactive SweetAlert2 examples with React.js
                                    </p>

                                </div>

                                <div className="row g-4">

                                    <div className="col-md-6">
                                        <button
                                            className="btn btn-success btn-lg w-100 py-3"
                                            onClick={successAlert}
                                        >
                                            ✅ Success Alert
                                        </button>
                                    </div>

                                    <div className="col-md-6">
                                        <button
                                            className="btn btn-danger btn-lg w-100 py-3"
                                            onClick={deleteAlert}
                                        >
                                            🗑 Delete Confirmation
                                        </button>
                                    </div>

                                    <div className="col-md-6">
                                        <button
                                            className="btn btn-primary btn-lg w-100 py-3"
                                            onClick={inputAlert}
                                        >
                                            👤 Input Alert
                                        </button>
                                    </div>

                                    <div className="col-md-6">
                                        <button
                                            className="btn btn-warning btn-lg w-100 py-3"
                                            onClick={timerAlert}
                                        >
                                            ⏱ Timer Alert
                                        </button>
                                    </div>

                                    <div className="col-md-6">
                                        <button
                                            className="btn btn-dark btn-lg w-100 py-3"
                                            onClick={loginAlert}
                                        >
                                            🔐 Login Popup
                                        </button>
                                    </div>

                                    <div className="col-md-6">
                                        <button
                                            className="btn btn-info btn-lg w-100 py-3 text-white"
                                            onClick={toastAlert}
                                        >
                                            🔔 Toast Notification
                                        </button>
                                    </div>

                                    <div className="col-md-6">
                                        <button
                                            className="btn btn-secondary btn-lg w-100 py-3"
                                            onClick={wizardAlert}
                                        >
                                            📝 Registration Wizard
                                        </button>
                                    </div>

                                    <div className="col-md-6">
                                        <button
                                            className="btn btn-outline-primary btn-lg w-100 py-3"
                                            onClick={loadingAlert}
                                        >
                                            ⚡ Fake API Loading
                                        </button>
                                    </div>

                                    <div className="col-md-6">
                                        <button
                                            className="btn btn-outline-danger btn-lg w-100 py-3"
                                            onClick={undoDeleteAlert}
                                        >
                                            ↩️ Undo Delete Demo
                                        </button>
                                    </div>

                                </div>

                                <hr className="my-5" />

                                <div className="text-center text-muted">

                                    <h5>Features Included</h5>

                                    <span className="badge bg-success m-1">
                                        Success Alert
                                    </span>

                                    <span className="badge bg-danger m-1">
                                        Delete Confirmation
                                    </span>

                                    <span className="badge bg-primary m-1">
                                        Input Alert
                                    </span>

                                    <span className="badge bg-warning text-dark m-1">
                                        Timer Alert
                                    </span>

                                    <span className="badge bg-dark m-1">
                                        Login Popup
                                    </span>

                                    <span className="badge bg-info text-dark m-1">
                                        Toast
                                    </span>

                                    <span className="badge bg-secondary m-1">
                                        Registration Wizard
                                    </span>

                                    <span className="badge bg-primary m-1">
                                        Fake API Loading
                                    </span>

                                    <span className="badge bg-danger m-1">
                                        Undo Delete
                                    </span>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
}

export default App;