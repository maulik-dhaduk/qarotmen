import React, { useState, useEffect } from 'react';
import Api from '../Services/Api';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [formData, setFormData] = useState({ name: '', sku: '', price: '', category: '', description: '', images: '' });

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) return navigate('/');
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'products') {
        const res = await Api.get('/products');
        setProducts(res.data);
      } else if (activeTab === 'users') {
        const res = await Api.get('/admin/users', { headers: { Authorization: `Bearer ${token}` } });
        setUsers(res.data);
      } else if (activeTab === 'orders') {
        const res = await Api.get('/admin/orders', { headers: { Authorization: `Bearer ${token}` } });
        setOrders(res.data);
      }
    } catch (error) {
      if (error.response?.status === 403) {
        alert("Access denied. Admin only.");
        navigate('/');
      }
      console.error(error);
    }
    setLoading(false);
  };

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...formData, images: formData.images.split(',').map(i => i.trim()), price: Number(formData.price) };
      if (editMode) {
        await Api.put(`/admin/product/${currentId}`, payload, { headers: { Authorization: `Bearer ${token}` } });
      } else {
        await Api.post('/admin/product', payload, { headers: { Authorization: `Bearer ${token}` } });
      }
      setShowModal(false);
      fetchData();
    } catch (err) {
      console.error(err);
      alert("Error saving product");
    }
  };

  const editProduct = (p) => {
    setFormData({ name: p.name, sku: p.sku, price: p.price, category: p.category, description: p.description, images: p.images.join(', ') });
    setCurrentId(p._id);
    setEditMode(true);
    setShowModal(true);
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await Api.delete(`/admin/product/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      fetchData();
    } catch (err) {
      console.error(err);
      alert("Error deleting product");
    }
  };

  const uniqueCategories = [...new Set(products.map(p => p.category))].filter(Boolean);

  return (
    <div className="container-fluid py-4 bg-light min-vh-100">
      <div className="row mb-4 px-3">
        <div className="col d-flex justify-content-between align-items-center bg-white p-3 shadow-sm rounded">
          <h3 className="m-0 text-dark fw-bold"><i className="bi bi-speedometer2 me-2"></i> Admin Dashboard</h3>
          <button className="btn btn-outline-dark" onClick={() => navigate('/')}>Back to Website</button>
        </div>
      </div>

      <div className="row px-3">
        <div className="col-md-3 mb-4">
          <div className="list-group shadow-sm">
            <button className={`list-group-item list-group-item-action ${activeTab === 'products' ? 'active bg-dark border-dark' : ''}`} onClick={() => setActiveTab('products')}><i className="bi bi-box-seam me-2"></i> Manage Products</button>
            <button className={`list-group-item list-group-item-action ${activeTab === 'users' ? 'active bg-dark border-dark' : ''}`} onClick={() => setActiveTab('users')}><i className="bi bi-people me-2"></i> View Users</button>
            <button className={`list-group-item list-group-item-action ${activeTab === 'orders' ? 'active bg-dark border-dark' : ''}`} onClick={() => setActiveTab('orders')}><i className="bi bi-receipt me-2"></i> View Orders</button>
          </div>
        </div>
        <div className="col-md-9">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              {loading && (
                <div className="text-center py-5">
                  <div className="spinner-border text-dark" role="status"><span className="visually-hidden">Loading...</span></div>
                </div>
              )}
              
              {!loading && activeTab === 'products' && (
                <>
                  <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3 mb-4">
                    <h4 className="fw-bold m-0 text-dark text-center text-sm-start">Products Directory</h4>
                    <button className="btn btn-dark" onClick={() => { setFormData({ name: '', sku: '', price: '', category: '', description: '', images: '' }); setEditMode(false); setShowModal(true); }}><i className="bi bi-plus-lg me-1"></i> Add Product</button>
                  </div>
                  <div className="table-responsive">
                    <table className="table table-hover align-middle">
                      <thead className="table-light"><tr><th>Name</th><th>SKU</th><th>Price</th><th>Category</th><th className="text-center">Actions</th></tr></thead>
                      <tbody>
                        {products.map(p => (
                          <tr key={p._id}>
                            <td className="fw-semibold">{p.name}</td><td>{p.sku}</td><td>₹{p.price}</td><td>{p.category}</td>
                            <td>
                              <div className="d-flex justify-content-center gap-2">
                                <button className="btn btn-sm btn-outline-primary" onClick={() => editProduct(p)} title="Edit"><i className="bi bi-pencil"></i></button>
                                <button className="btn btn-sm btn-outline-danger" onClick={() => deleteProduct(p._id)} title="Delete"><i className="bi bi-trash"></i></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}

              {!loading && activeTab === 'users' && (
                <>
                  <h4 className="fw-bold mb-4 text-dark">Registered Users</h4>
                  <div className="table-responsive">
                    <table className="table table-hover align-middle">
                      <thead className="table-light"><tr><th>Name</th><th>Email</th><th>Role</th></tr></thead>
                      <tbody>
                        {users.map(u => (
                          <tr key={u._id}><td>{u.firstname} {u.lastname}</td><td>{u.email}</td><td><span className={`badge ${u.role==='admin' ? 'bg-danger' : 'bg-dark'}`}>{u.role.toUpperCase()}</span></td></tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}

              {!loading && activeTab === 'orders' && (
                <>
                  <h4 className="fw-bold mb-4 text-dark">All Orders</h4>
                  <div className="table-responsive">
                    <table className="table table-hover align-middle">
                      <thead className="table-light"><tr><th>Order No</th><th>Customer</th><th>Total</th><th>Payment</th><th>Date</th></tr></thead>
                      <tbody>
                        {orders.map(o => (
                          <tr key={o._id}>
                            <td className="fw-bold">{o.orderNo}</td>
                            <td><div>{o.userId?.firstname} {o.userId?.lastname}</div><small className="text-muted">{o.userId?.email}</small></td>
                            <td className="fw-semibold text-success">₹{o.totalAmount}</td>
                            <td><span className="badge bg-secondary">{o.paymentMethod}</span></td>
                            <td>{new Date(o.orderDate).toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal fade show d-block" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg">
              <div className="modal-header bg-light">
                <h5 className="modal-title fw-bold text-dark">{editMode ? 'Edit Product' : 'Add New Product'}</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSaveProduct}>
                  <div className="row mb-3">
                    <div className="col-md-6"><label className="form-label fw-semibold">Name</label><input required className="form-control border-dark shadow-none" name="name" value={formData.name} onChange={handleInputChange} /></div>
                    <div className="col-md-6"><label className="form-label fw-semibold">SKU</label><input required className="form-control border-dark shadow-none" name="sku" value={formData.sku} onChange={handleInputChange} /></div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-6"><label className="form-label fw-semibold">Price (₹)</label><input required type="number" className="form-control border-dark shadow-none" name="price" value={formData.price} onChange={handleInputChange} /></div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Category</label>
                      <select required className="form-select border-dark shadow-none" name="category" value={formData.category} onChange={handleInputChange}>
                        <option value="" disabled>Select a Category</option>
                        {uniqueCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="mb-3"><label className="form-label fw-semibold">Images (comma separated filenames/URLs)</label><input required className="form-control border-dark shadow-none" name="images" value={formData.images} onChange={handleInputChange} placeholder="e.g. img1.jpg, img2.jpg" /></div>
                  <div className="mb-4"><label className="form-label fw-semibold">Description</label><textarea required className="form-control border-dark shadow-none" name="description" value={formData.description} onChange={handleInputChange} rows="3"></textarea></div>
                  <button type="submit" className="btn btn-dark w-100 py-2 fw-bold">{editMode ? 'Update Product' : 'Save Product'}</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

