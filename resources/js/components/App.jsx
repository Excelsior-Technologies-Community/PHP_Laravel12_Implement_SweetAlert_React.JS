import React, { useState } from "react";
import Swal from "sweetalert2";

function App() {
    // Product List State
    const [products, setProducts] = useState([
        { id: 101, name: "Wireless Gaming Mouse", category: "Electronics", price: 49.99, stock: 15 },
        { id: 102, name: "Mechanical RGB Keyboard", category: "Electronics", price: 89.99, stock: 8 },
        { id: 103, name: "Ergonomic Office Chair", category: "Furniture", price: 199.99, stock: 4 },
        { id: 104, name: "UltraWide 34\" Monitor", category: "Electronics", price: 449.00, stock: 12 },
        { id: 105, name: "Noise Cancelling Headphones", category: "Audio", price: 129.50, stock: 20 },
    ]);

    // Selected product IDs for Bulk Operations
    const [selectedIds, setSelectedIds] = useState([]);

    // Recently deleted items for Undo Vault
    const [deletedBackup, setDeletedBackup] = useState(null);

    // Active Navigation Tab
    const [activeTab, setActiveTab] = useState("crud"); // 'crud', 'security', 'export_vault'

    // Toast Mixin Helper
    const showToast = (icon, title) => {
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
        });
        Toast.fire({ icon, title });
    };

    // ==========================================
    // MODULE 1: CRUD STUDIO WITH SWEETALERT MODALS
    // ==========================================

    // Add Product Modal
    const handleAddProduct = async () => {
        const { value: formValues } = await Swal.fire({
            title: "➕ Add New Product",
            html: `
                <div class="text-start fs-6 p-1">
                    <div class="mb-3">
                        <label class="form-label font-monospace fw-bold text-dark">Product Name</label>
                        <input id="swal-name" class="form-control" placeholder="e.g. Smart Watch Series 7">
                    </div>
                    <div class="mb-3">
                        <label class="form-label font-monospace fw-bold text-dark">Category</label>
                        <select id="swal-category" class="form-select">
                            <option value="">Select Category</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Furniture">Furniture</option>
                            <option value="Audio">Audio</option>
                            <option value="Accessories">Accessories</option>
                        </select>
                    </div>
                    <div class="row g-2">
                        <div class="col-6 mb-3">
                            <label class="form-label font-monospace fw-bold text-dark">Price ($)</label>
                            <input id="swal-price" type="number" step="0.01" class="form-control" placeholder="0.00">
                        </div>
                        <div class="col-6 mb-3">
                            <label class="form-label font-monospace fw-bold text-dark">Stock Qty</label>
                            <input id="swal-stock" type="number" class="form-control" placeholder="0">
                        </div>
                    </div>
                </div>
            `,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: "💾 Save Product",
            confirmButtonColor: "#0d6efd",
            cancelButtonColor: "#6c757d",
            preConfirm: () => {
                const name = document.getElementById("swal-name").value.trim();
                const category = document.getElementById("swal-category").value;
                const price = parseFloat(document.getElementById("swal-price").value);
                const stock = parseInt(document.getElementById("swal-stock").value, 10);

                // Smart Dynamic Validation Feedback
                if (!name) {
                    Swal.showValidationMessage("❌ Product name is required!");
                    return false;
                }
                if (!category) {
                    Swal.showValidationMessage("❌ Please select a category!");
                    return false;
                }
                if (isNaN(price) || price <= 0) {
                    Swal.showValidationMessage("❌ Price must be a positive number!");
                    return false;
                }
                if (isNaN(stock) || stock < 0) {
                    Swal.showValidationMessage("❌ Stock quantity cannot be negative!");
                    return false;
                }

                return { name, category, price, stock };
            }
        });

        if (formValues) {
            const newProd = {
                id: Date.now(),
                ...formValues
            };
            setProducts((prev) => [newProd, ...prev]);
            showToast("success", "Product Created Successfully! 🚀");
        }
    };

    // Edit Product Modal
    const handleEditProduct = async (product) => {
        const { value: formValues } = await Swal.fire({
            title: `✏️ Edit Product #${product.id}`,
            html: `
                <div class="text-start fs-6 p-1">
                    <div class="mb-3">
                        <label class="form-label font-monospace fw-bold text-dark">Product Name</label>
                        <input id="swal-edit-name" class="form-control" value="${product.name}">
                    </div>
                    <div class="mb-3">
                        <label class="form-label font-monospace fw-bold text-dark">Category</label>
                        <select id="swal-edit-category" class="form-select">
                            <option value="Electronics" ${product.category === 'Electronics' ? 'selected' : ''}>Electronics</option>
                            <option value="Furniture" ${product.category === 'Furniture' ? 'selected' : ''}>Furniture</option>
                            <option value="Audio" ${product.category === 'Audio' ? 'selected' : ''}>Audio</option>
                            <option value="Accessories" ${product.category === 'Accessories' ? 'selected' : ''}>Accessories</option>
                        </select>
                    </div>
                    <div class="row g-2">
                        <div class="col-6 mb-3">
                            <label class="form-label font-monospace fw-bold text-dark">Price ($)</label>
                            <input id="swal-edit-price" type="number" step="0.01" class="form-control" value="${product.price}">
                        </div>
                        <div class="col-6 mb-3">
                            <label class="form-label font-monospace fw-bold text-dark">Stock Qty</label>
                            <input id="swal-edit-stock" type="number" class="form-control" value="${product.stock}">
                        </div>
                    </div>
                </div>
            `,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: "🔄 Update Product",
            confirmButtonColor: "#198754",
            cancelButtonColor: "#6c757d",
            preConfirm: () => {
                const name = document.getElementById("swal-edit-name").value.trim();
                const category = document.getElementById("swal-edit-category").value;
                const price = parseFloat(document.getElementById("swal-edit-price").value);
                const stock = parseInt(document.getElementById("swal-edit-stock").value, 10);

                if (!name) {
                    Swal.showValidationMessage("❌ Product name cannot be empty!");
                    return false;
                }
                if (isNaN(price) || price <= 0) {
                    Swal.showValidationMessage("❌ Valid price is required!");
                    return false;
                }
                if (isNaN(stock) || stock < 0) {
                    Swal.showValidationMessage("❌ Valid stock quantity is required!");
                    return false;
                }

                return { name, category, price, stock };
            }
        });

        if (formValues) {
            setProducts((prev) =>
                prev.map((p) => (p.id === product.id ? { ...p, ...formValues } : p))
            );
            showToast("success", "Item Updated Successfully! 🚀");
        }
    };

    // Single Product Delete with Undo Vault
    const handleDeleteSingle = (product) => {
        Swal.fire({
            title: `Delete "${product.name}"?`,
            text: "You can restore this item within 5 seconds!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#dc3545",
            cancelButtonColor: "#6c757d",
            confirmButtonText: "Yes, Delete Item"
        }).then((result) => {
            if (!result.isConfirmed) return;

            setProducts((prev) => prev.filter((p) => p.id !== product.id));
            setDeletedBackup([product]);

            triggerUndoVaultAlert([product]);
        });
    };

    // ==========================================
    // MODULE 2: OTP / 2FA SECURITY WIZARD & AUTH FLOW
    // ==========================================

    // Live OTP Verification Modal with Countdown Timer
    const handleOtpVerification = () => {
        let timerInterval;
        let timeLeft = 60;

        Swal.fire({
            title: "🔐 2FA Live OTP Verification",
            html: `
                <p class="text-muted small mb-3">Enter the 6-digit verification code sent to your registered device (Mock Code: <b class="text-primary">123456</b>)</p>
                <div class="mb-3">
                    <input id="otp-input" type="text" maxlength="6" class="form-control form-control-lg text-center fw-bold" placeholder="1 2 3 4 5 6" style="letter-spacing: 6px; font-size: 1.5rem;">
                </div>
                <div class="alert alert-secondary py-2 small mb-0">
                    ⏱️ Code expires in: <b id="otp-timer" class="text-danger">60</b>s
                </div>
            `,
            showCancelButton: true,
            confirmButtonText: "Verify & Authorize",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#0d6efd",
            didOpen: () => {
                const timerEl = document.getElementById("otp-timer");
                const otpInput = document.getElementById("otp-input");
                if (otpInput) otpInput.focus();

                timerInterval = setInterval(() => {
                    timeLeft--;
                    if (timerEl) timerEl.textContent = timeLeft;
                    if (timeLeft <= 0) {
                        clearInterval(timerInterval);
                        Swal.showValidationMessage("⌛ OTP Code Expired! Please request a new code.");
                    }
                }, 1000);
            },
            willClose: () => {
                clearInterval(timerInterval);
            },
            preConfirm: () => {
                const code = document.getElementById("otp-input").value.trim();
                if (code.length !== 6) {
                    Swal.showValidationMessage("❌ Please enter a complete 6-digit OTP code!");
                    return false;
                }
                if (code !== "123456") {
                    Swal.showValidationMessage("❌ Invalid OTP code! Try 123456");
                    return false;
                }
                return true;
            }
        }).then((result) => {
            if (result.isConfirmed) {
                // Show Animated Loading State
                Swal.fire({
                    title: "Authenticating Device...",
                    html: `
                        <div class="my-3">
                            <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                            <p class="mt-3 text-muted">Establishing secure SSL session & registering token...</p>
                        </div>
                    `,
                    allowOutsideClick: false,
                    showConfirmButton: false,
                    timer: 2000
                }).then(() => {
                    Swal.fire({
                        icon: "success",
                        title: "2FA Authorized!",
                        text: "Your session has been securely verified with 256-bit encryption.",
                        confirmButtonColor: "#198754"
                    });
                });
            }
        });
    };

    // Step-by-step Multi-Step Security Wizard
    const handleSecurityWizard = async () => {
        const steps = ['1', '2', '3'];
        const Queue = Swal.mixin({
            progressSteps: steps,
            confirmButtonText: 'Next →',
            showCancelButton: true,
            reverseButtons: true,
        });

        // Step 1: Account Confirmation
        const { value: currentPassword } = await Queue.fire({
            title: '🔐 Step 1: Security Check',
            text: 'Enter your current account password to initiate security scan.',
            input: 'password',
            inputPlaceholder: 'Current Password',
            currentProgressStep: 0,
            inputValidator: (val) => {
                if (!val) return 'Password is required to proceed!';
            }
        });

        if (!currentPassword) return;

        // Step 2: 2FA Method Choice
        const { value: authMethod } = await Queue.fire({
            title: '📱 Step 2: 2FA Method Select',
            text: 'Choose your preferred multi-factor authentication method',
            input: 'select',
            inputOptions: {
                authenticator: 'Google Authenticator / Authy App',
                sms: 'SMS Text Message (+1-XXX-XXX)',
                email: 'Encrypted Email OTP Notice'
            },
            currentProgressStep: 1
        });

        if (!authMethod) return;

        // Step 3: Authorization Confirmation
        const { value: confirmChoice } = await Queue.fire({
            title: '🛡️ Step 3: Revoke Other Sessions',
            text: 'Would you like to automatically logout all other connected active sessions?',
            input: 'radio',
            inputOptions: {
                yes: 'Yes, terminate all other active devices',
                no: 'No, keep existing active sessions logged in'
            },
            inputValue: 'yes',
            currentProgressStep: 2
        });

        if (!confirmChoice) return;

        // Final Animated Status
        Swal.fire({
            title: "Updating Security Profile...",
            html: "Saving preferences to Vault & refreshing security keys.",
            didOpen: () => {
                Swal.showLoading();
            },
            timer: 1800,
            showConfirmButton: false
        }).then(() => {
            Swal.fire({
                icon: "success",
                title: "Security Profile Updated!",
                html: `
                    <div class="text-start bg-light p-3 rounded text-dark">
                        <div><b>Auth Method:</b> ${authMethod.toUpperCase()}</div>
                        <div><b>Session Revocation:</b> ${confirmChoice === 'yes' ? 'Activated ✅' : 'Skipped ⚠️'}</div>
                    </div>
                `,
                confirmButtonColor: "#198754"
            });
        });
    };

    // ==========================================
    // MODULE 3: BULK WARNING MATRIX, EXPORTER & UNDO VAULT
    // ==========================================

    // Handle Selection Checkboxes
    const toggleSelectProduct = (id) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    const toggleSelectAll = () => {
        if (selectedIds.length === products.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(products.map((p) => p.id));
        }
    };

    // Bulk Delete Action Matrix with Confirmation Password/Text
    const handleBulkDelete = () => {
        if (selectedIds.length === 0) return;

        const count = selectedIds.length;

        Swal.fire({
            title: `⚠️ Dangerous Action Confirmation`,
            html: `
                <div class="alert alert-danger text-start small">
                    <b>Warning:</b> You are about to permanently delete <b>${count} selected items</b> from the database.
                </div>
                <p class="text-muted small">Please type <b>DELETE</b> in the box below to authorize this bulk operation.</p>
            `,
            icon: "warning",
            input: "text",
            inputPlaceholder: 'Type "DELETE" here',
            showCancelButton: true,
            confirmButtonText: `🗑️ Delete ${count} Items`,
            confirmButtonColor: "#dc3545",
            cancelButtonColor: "#6c757d",
            preConfirm: (val) => {
                if (val !== "DELETE") {
                    Swal.showValidationMessage('❌ Type "DELETE" in capital letters to confirm!');
                    return false;
                }
                return true;
            }
        }).then((result) => {
            if (!result.isConfirmed) return;

            const itemsToDelete = products.filter((p) => selectedIds.includes(p.id));
            setProducts((prev) => prev.filter((p) => !selectedIds.includes(p.id)));
            setDeletedBackup(itemsToDelete);
            setSelectedIds([]);

            triggerUndoVaultAlert(itemsToDelete);
        });
    };

    // Trigger Undo Vault Notification
    const triggerUndoVaultAlert = (deletedItems) => {
        let timerInterval;
        let secondsLeft = 5;

        Swal.fire({
            title: "🗑️ Items Deleted!",
            html: `
                <div class="my-2">
                    <b>${deletedItems.length} item(s) moved to trash vault.</b><br>
                    Permanent removal in <span id="undo-count" class="badge bg-danger fs-6">${secondsLeft}</span> seconds.
                </div>
            `,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "↩️ Undo Delete",
            cancelButtonText: "Dismiss",
            confirmButtonColor: "#198754",
            cancelButtonColor: "#6c757d",
            timer: 5000,
            timerProgressBar: true,
            didOpen: () => {
                const countSpan = document.getElementById("undo-count");
                timerInterval = setInterval(() => {
                    secondsLeft--;
                    if (countSpan) countSpan.textContent = secondsLeft;
                }, 1000);
            },
            willClose: () => {
                clearInterval(timerInterval);
            }
        }).then((res) => {
            if (res.isConfirmed) {
                // Restore items
                setProducts((prev) => [...deletedItems, ...prev]);
                setDeletedBackup(null);
                showToast("success", "Restored deleted item(s) to list! ↩️");
            }
        });
    };

    // Multi-Format Export Progress Alert
    const handleExportData = (format) => {
        let progress = 0;

        Swal.fire({
            title: `📥 Exporting Data to ${format.toUpperCase()}...`,
            html: `
                <div class="my-3 text-start">
                    <div class="d-flex justify-content-between mb-1">
                        <span class="small fw-bold text-muted">Compiling ${products.length} records...</span>
                        <span id="export-pct" class="small fw-bold text-primary">0%</span>
                    </div>
                    <div class="progress" style="height: 12px;">
                        <div id="export-bar" class="progress-bar progress-bar-striped progress-bar-animated bg-success" style="width: 0%"></div>
                    </div>
                </div>
            `,
            allowOutsideClick: false,
            showConfirmButton: false,
            didOpen: () => {
                const bar = document.getElementById("export-bar");
                const pct = document.getElementById("export-pct");

                const interval = setInterval(() => {
                    progress += 10;
                    if (bar) bar.style.width = `${progress}%`;
                    if (pct) pct.textContent = `${progress}%`;

                    if (progress >= 100) {
                        clearInterval(interval);
                        setTimeout(() => {
                            Swal.close();
                            showToast("success", `File ${format.toUpperCase()} Downloaded Successfully! 📄`);
                        }, 400);
                    }
                }, 150);
            }
        });
    };

    return (
        <div
            className="min-vh-100 py-5"
            style={{
                background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
                color: "#e2e8f0"
            }}
        >
            <div className="container">

                {/* Header Banner */}
                <div className="text-center mb-4">
                    <h1 className="fw-extrabold display-5 text-warning mb-2">
                        ⚡ Laravel 12 + React SweetAlert2 Studio
                    </h1>
                    <p className="text-light opacity-75 lead">
                        Enterprise SweetAlert2 Modals, Live OTP Security Wizard & Bulk Operations Matrix
                    </p>
                </div>

                {/* Navigation Bar / Tabs */}
                <div className="d-flex justify-content-center mb-4">
                    <div className="btn-group shadow-lg rounded-pill p-1 bg-dark border border-secondary">
                        <button
                            className={`btn rounded-pill px-4 py-2 ${activeTab === 'crud' ? 'btn-primary fw-bold' : 'btn-outline-light border-0'}`}
                            onClick={() => setActiveTab('crud')}
                        >
                            📝 Live CRUD Studio
                        </button>
                        <button
                            className={`btn rounded-pill px-4 py-2 ${activeTab === 'security' ? 'btn-warning fw-bold text-dark' : 'btn-outline-light border-0'}`}
                            onClick={() => setActiveTab('security')}
                        >
                            🔐 OTP & 2FA Wizard
                        </button>
                        <button
                            className={`btn rounded-pill px-4 py-2 ${activeTab === 'export_vault' ? 'btn-success fw-bold' : 'btn-outline-light border-0'}`}
                            onClick={() => setActiveTab('export_vault')}
                        >
                            🗑️ Bulk Matrix & Export
                        </button>
                    </div>
                </div>

                {/* TAB 1: CRUD STUDIO */}
                {activeTab === 'crud' && (
                    <div className="card bg-dark text-white border-secondary shadow-lg rounded-4 overflow-hidden mb-4">
                        <div className="card-header bg-secondary bg-opacity-25 border-secondary p-4 d-flex justify-content-between align-items-center">
                            <div>
                                <h4 className="mb-0 text-info fw-bold">📦 Product Inventory Studio</h4>
                                <small className="text-muted">Interactive SweetAlert Modal Form with Validation & Instant Toast Alerts</small>
                            </div>
                            <button className="btn btn-primary btn-lg shadow-sm" onClick={handleAddProduct}>
                                ➕ Add Product Modal
                            </button>
                        </div>
                        <div className="card-body p-0">
                            <div className="table-responsive">
                                <table className="table table-dark table-hover align-middle mb-0 border-secondary">
                                    <thead className="table-secondary text-uppercase small">
                                        <tr>
                                            <th className="ps-4">ID</th>
                                            <th>Product Name</th>
                                            <th>Category</th>
                                            <th>Price</th>
                                            <th>Stock</th>
                                            <th className="text-end pe-4">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.map((prod) => (
                                            <tr key={prod.id}>
                                                <td className="ps-4 fw-monospace text-muted">#{prod.id}</td>
                                                <td className="fw-bold text-white">{prod.name}</td>
                                                <td>
                                                    <span className="badge bg-primary bg-opacity-75">{prod.category}</span>
                                                </td>
                                                <td className="fw-bold text-success">${prod.price.toFixed(2)}</td>
                                                <td>
                                                    <span className={`badge ${prod.stock < 10 ? 'bg-danger' : 'bg-success'}`}>
                                                        {prod.stock} left
                                                    </span>
                                                </td>
                                                <td className="text-end pe-4">
                                                    <button
                                                        className="btn btn-sm btn-outline-info me-2"
                                                        onClick={() => handleEditProduct(prod)}
                                                    >
                                                        ✏️ Edit Modal
                                                    </button>
                                                    <button
                                                        className="btn btn-sm btn-outline-danger"
                                                        onClick={() => handleDeleteSingle(prod)}
                                                    >
                                                        🗑️ Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                        {products.length === 0 && (
                                            <tr>
                                                <td colSpan="6" className="text-center py-4 text-muted">
                                                    No products available. Click "Add Product Modal" to insert new items.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* TAB 2: OTP & 2FA WIZARD */}
                {activeTab === 'security' && (
                    <div className="card bg-dark text-white border-secondary shadow-lg rounded-4 p-4 mb-4">
                        <div className="text-center mb-4">
                            <h3 className="text-warning fw-bold">🔐 SweetAlert 2FA & Multi-Step Security Wizard</h3>
                            <p className="text-muted">Live OTP timer countdown, step-by-step auth flow & animated loading states</p>
                        </div>
                        <div className="row g-4 justify-content-center">
                            <div className="col-md-5">
                                <div className="card bg-secondary bg-opacity-10 border-warning h-100 p-4 text-center rounded-3">
                                    <div className="display-4 mb-3">🔢</div>
                                    <h5 className="fw-bold text-warning">Live OTP 6-Digit Modal</h5>
                                    <p className="text-muted small">
                                        Features a 60-second real-time countdown timer, validation check (Try: 123456), and animated verification.
                                    </p>
                                    <button className="btn btn-warning w-100 mt-auto py-2 fw-bold text-dark" onClick={handleOtpVerification}>
                                        Launch OTP Verification ⏱️
                                    </button>
                                </div>
                            </div>
                            <div className="col-md-5">
                                <div className="card bg-secondary bg-opacity-10 border-info h-100 p-4 text-center rounded-3">
                                    <div className="display-4 mb-3">🛡️</div>
                                    <h5 className="fw-bold text-info">3-Step Auth Wizard</h5>
                                    <p className="text-muted small">
                                        Sequential progress steps (Password ➔ Auth Method ➔ Session Revoke) in a single SweetAlert popup.
                                    </p>
                                    <button className="btn btn-info w-100 mt-auto py-2 fw-bold text-white" onClick={handleSecurityWizard}>
                                        Launch Security Wizard 🧙‍♂️
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* TAB 3: BULK MATRIX & EXPORT & UNDO */}
                {activeTab === 'export_vault' && (
                    <div className="card bg-dark text-white border-secondary shadow-lg rounded-4 p-4 mb-4">
                        <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 pb-3 border-bottom border-secondary gap-3">
                            <div>
                                <h4 className="text-success fw-bold mb-0">🗑️ Bulk Operations & Export Studio</h4>
                                <small className="text-muted">Select multiple records to delete with password verification or export in CSV/Excel/PDF formats</small>
                            </div>
                            <div className="d-flex flex-wrap gap-2">
                                <button
                                    className="btn btn-danger"
                                    disabled={selectedIds.length === 0}
                                    onClick={handleBulkDelete}
                                >
                                    🗑️ Delete Selected ({selectedIds.length})
                                </button>
                                <div className="btn-group">
                                    <button className="btn btn-success" onClick={() => handleExportData('csv')}>
                                        📄 CSV
                                    </button>
                                    <button className="btn btn-outline-success" onClick={() => handleExportData('excel')}>
                                        📊 Excel
                                    </button>
                                    <button className="btn btn-outline-success" onClick={() => handleExportData('pdf')}>
                                        📕 PDF
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Bulk Select Table */}
                        <div className="table-responsive">
                            <table className="table table-dark table-hover align-middle border-secondary">
                                <thead className="table-secondary text-uppercase small">
                                    <tr>
                                        <th style={{ width: "40px" }} className="ps-3">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                checked={selectedIds.length === products.length && products.length > 0}
                                                onChange={toggleSelectAll}
                                            />
                                        </th>
                                        <th>ID</th>
                                        <th>Product Name</th>
                                        <th>Category</th>
                                        <th>Price</th>
                                        <th>Stock</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((prod) => (
                                        <tr key={prod.id} className={selectedIds.includes(prod.id) ? 'table-active' : ''}>
                                            <td className="ps-3">
                                                <input
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    checked={selectedIds.includes(prod.id)}
                                                    onChange={() => toggleSelectProduct(prod.id)}
                                                />
                                            </td>
                                            <td className="fw-monospace text-muted">#{prod.id}</td>
                                            <td className="fw-bold">{prod.name}</td>
                                            <td><span className="badge bg-primary bg-opacity-75">{prod.category}</span></td>
                                            <td className="fw-bold text-success">${prod.price.toFixed(2)}</td>
                                            <td><span className="badge bg-secondary">{prod.stock}</span></td>
                                        </tr>
                                    ))}
                                    {products.length === 0 && (
                                        <tr>
                                            <td colSpan="6" className="text-center py-4 text-muted">
                                                No items available to manage.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Footer Info */}
                <div className="text-center text-muted mt-4">
                    <small>Built with Laravel 12 + React.js + SweetAlert2 • Enterprise Interactive Alerts</small>
                </div>

            </div>
        </div>
    );
}

export default App;