import { useEffect, useState } from 'react'
import './App.css'
import TrackingEvents from './components/TrackingEvents'

const API = 'http://localhost:8080/api'

function App() {
  // =========================
  // DATA
  // =========================

  const [orders, setOrders] = useState([])
  const [shipments, setShipments] = useState([])
  const [warehouses, setWarehouses] = useState([])
  const [deliveryPartners, setDeliveryPartners] = useState([])

  // =========================
  // EDITING IDS
  // =========================

  const [editingOrderId, setEditingOrderId] = useState(null)
  const [editingShipmentId, setEditingShipmentId] = useState(null)
  const [editingWarehouseId, setEditingWarehouseId] = useState(null)

  // =========================
  // ORDER FORM
  // =========================

  const [orderForm, setOrderForm] = useState({
    customerId: '',
    totalAmount: '',
    status: 'ORDER_CONFIRMED'
  })

  // =========================
  // SHIPMENT FORM
  // =========================

  const [shipmentForm, setShipmentForm] = useState({
    trackingNumber: '',
    orderId: '',
    status: 'SHIPPED',
    warehouse: '',
    deliveryPartnerId: '',
    estimatedDelivery: ''
  })

  // =========================
  // WAREHOUSE FORM
  // =========================

  const [warehouseForm, setWarehouseForm] = useState({
    name: '',
    location: '',
    capacity: '',
    currentStock: ''
  })

  // =========================
  // LOAD DATA
  // =========================

  useEffect(() => {
    loadOrders()
    loadShipments()
    loadWarehouses()
    loadDeliveryPartners()
  }, [])

  const loadOrders = async () => {
    try {
      const response = await fetch(`${API}/orders`)
      const data = await response.json()
      setOrders(data)
    } catch (error) {
      console.error('Error loading orders:', error)
    }
  }

  const loadShipments = async () => {
    try {
      const response = await fetch(`${API}/shipments`)
      const data = await response.json()
      setShipments(data)
    } catch (error) {
      console.error('Error loading shipments:', error)
    }
  }

  const loadWarehouses = async () => {
    try {
      const response = await fetch(`${API}/warehouses`)
      const data = await response.json()
      setWarehouses(data)
    } catch (error) {
      console.error('Error loading warehouses:', error)
    }
  }

  const loadDeliveryPartners = async () => {
    try {
      const response = await fetch(`${API}/delivery-partners`)
      const data = await response.json()
      setDeliveryPartners(data)
    } catch (error) {
      console.error('Error loading delivery partners:', error)
    }
  }

  // =========================
  // FORM HANDLERS
  // =========================

  const handleOrderChange = (e) => {
    setOrderForm({
      ...orderForm,
      [e.target.name]: e.target.value
    })
  }

  const handleShipmentChange = (e) => {
    setShipmentForm({
      ...shipmentForm,
      [e.target.name]: e.target.value
    })
  }

  const handleWarehouseChange = (e) => {
    setWarehouseForm({
      ...warehouseForm,
      [e.target.name]: e.target.value
    })
  }

  // =========================
  // ORDER CRUD
  // =========================

  const saveOrder = async (e) => {
    e.preventDefault()

    try {
      const url = editingOrderId
        ? `${API}/orders/${editingOrderId}`
        : `${API}/orders`

      const method = editingOrderId ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          customerId: Number(orderForm.customerId),
          totalAmount: Number(orderForm.totalAmount),
          status: orderForm.status
        })
      })

      if (response.ok) {
        clearOrderForm()
        loadOrders()
      } else {
        alert('Failed to save order')
      }
    } catch (error) {
      console.error('Error saving order:', error)
    }
  }

  const editOrder = (order) => {
    setEditingOrderId(order.id)

    setOrderForm({
      customerId: order.customerId,
      totalAmount: order.totalAmount,
      status: order.status
    })
  }

  const deleteOrder = async (id) => {
    try {
      const response = await fetch(`${API}/orders/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        loadOrders()
      }
    } catch (error) {
      console.error('Error deleting order:', error)
    }
  }

  const clearOrderForm = () => {
    setEditingOrderId(null)

    setOrderForm({
      customerId: '',
      totalAmount: '',
      status: 'ORDER_CONFIRMED'
    })
  }

  // =========================
  // SHIPMENT CRUD
  // =========================

  const saveShipment = async (e) => {
    e.preventDefault()

    try {
      const url = editingShipmentId
        ? `${API}/shipments/${editingShipmentId}`
        : `${API}/shipments`

      const method = editingShipmentId ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          trackingNumber: shipmentForm.trackingNumber,
          orderId: Number(shipmentForm.orderId),
          status: shipmentForm.status,
          warehouse: shipmentForm.warehouse,
          deliveryPartnerId: shipmentForm.deliveryPartnerId
            ? Number(shipmentForm.deliveryPartnerId)
            : null,
          estimatedDelivery: shipmentForm.estimatedDelivery
        })
      })

      if (response.ok) {
        clearShipmentForm()
        loadShipments()
      } else {
        alert('Failed to save shipment')
      }
    } catch (error) {
      console.error('Error saving shipment:', error)
    }
  }

  const editShipment = (shipment) => {
    setEditingShipmentId(shipment.id)

    setShipmentForm({
      trackingNumber: shipment.trackingNumber,
      orderId: shipment.orderId,
      status: shipment.status,
      warehouse: shipment.warehouse,
      deliveryPartnerId: shipment.deliveryPartnerId || '',
      estimatedDelivery: shipment.estimatedDelivery || ''
    })
  }

  const deleteShipment = async (id) => {
    try {
      const response = await fetch(`${API}/shipments/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        loadShipments()
      }
    } catch (error) {
      console.error('Error deleting shipment:', error)
    }
  }

  const clearShipmentForm = () => {
    setEditingShipmentId(null)

    setShipmentForm({
      trackingNumber: '',
      orderId: '',
      status: 'SHIPPED',
      warehouse: '',
      deliveryPartnerId: '',
      estimatedDelivery: ''
    })
  }

  // =========================
  // WAREHOUSE CRUD
  // =========================

  const saveWarehouse = async (e) => {
    e.preventDefault()

    try {
      const url = editingWarehouseId
        ? `${API}/warehouses/${editingWarehouseId}`
        : `${API}/warehouses`

      const method = editingWarehouseId ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: warehouseForm.name,
          location: warehouseForm.location,
          capacity: Number(warehouseForm.capacity),
          currentStock: Number(warehouseForm.currentStock)
        })
      })

      if (response.ok) {
        clearWarehouseForm()
        loadWarehouses()
      } else {
        alert('Failed to save warehouse')
      }
    } catch (error) {
      console.error('Error saving warehouse:', error)
    }
  }

  const editWarehouse = (warehouse) => {
    setEditingWarehouseId(warehouse.id)

    setWarehouseForm({
      name: warehouse.name,
      location: warehouse.location,
      capacity: warehouse.capacity,
      currentStock: warehouse.currentStock
    })
  }

  const deleteWarehouse = async (id) => {
    try {
      const response = await fetch(`${API}/warehouses/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        loadWarehouses()
      }
    } catch (error) {
      console.error('Error deleting warehouse:', error)
    }
  }

  const clearWarehouseForm = () => {
    setEditingWarehouseId(null)

    setWarehouseForm({
      name: '',
      location: '',
      capacity: '',
      currentStock: ''
    })
  }

  // =========================
  // DASHBOARD CALCULATIONS
  // =========================

 const activeShipments = shipments.filter(
  (shipment) =>
    shipment.status !== 'DELIVERED' &&
    shipment.status !== 'CANCELLED'
)
  // =========================
  // UI
  // =========================

  return (
    <div className="app">

      {/* =========================
          SIDEBAR
      ========================= */}

      <aside className="sidebar">

        <div className="logo">
          <h2>RouteFlow</h2>
          <p>Logistics Management</p>
        </div>

        <nav>
          <a href="#dashboard">Dashboard</a>
          <a href="#orders">Orders</a>
          <a href="#shipments">Shipments</a>
          <a href="#warehouses">Warehouses</a>
          <a href="#delivery-partners">Delivery Partners</a>
        </nav>

      </aside>

      {/* =========================
          MAIN CONTENT
      ========================= */}

      <main className="main-content">

        {/* HEADER */}

        <header className="top-header">
          <div>
            <h1>RouteFlow Dashboard</h1>
            <p>Manage orders, shipments, warehouses and delivery partners</p>
          </div>
        </header>

        {/* =========================
            DASHBOARD
        ========================= */}

        <section id="dashboard">

          <div className="stats">

            <div className="stat-card">
              <span>Total Orders</span>
              <strong>{orders.length}</strong>
              <small>All orders</small>
            </div>

            <div className="stat-card">
              <span>Active Shipments</span>
              <strong>{activeShipments.length}</strong>
              <small>Currently moving</small>
            </div>

            <div className="stat-card">
              <span>Warehouses</span>
              <strong>{warehouses.length}</strong>
              <small>Registered warehouses</small>
            </div>

            <div className="stat-card">
              <span>Delivery Partners</span>
              <strong>{deliveryPartners.length}</strong>
              <small>Live backend data</small>
            </div>

          </div>

        </section>

        {/* =========================
            ORDERS
        ========================= */}

        <section id="orders" className="panel">

          <div className="panel-header">
            <div>
              <h2>Orders</h2>
              <p>Create and manage customer orders</p>
            </div>
          </div>

          <form className="warehouse-form" onSubmit={saveOrder}>

            <input
              name="customerId"
              type="number"
              placeholder="Customer ID"
              value={orderForm.customerId}
              onChange={handleOrderChange}
              required
            />

            <input
              name="totalAmount"
              type="number"
              step="0.01"
              placeholder="Total Amount"
              value={orderForm.totalAmount}
              onChange={handleOrderChange}
              required
            />

            <select
              name="status"
              value={orderForm.status}
              onChange={handleOrderChange}
            >
              <option value="ORDER_CONFIRMED">
                ORDER_CONFIRMED
              </option>

              <option value="PROCESSING">
                PROCESSING
              </option>

              <option value="SHIPPED">
                SHIPPED
              </option>

              <option value="DELIVERED">
                DELIVERED
              </option>

              <option value="CANCELLED">
                CANCELLED
              </option>
            </select>

            <button type="submit">
              {editingOrderId ? 'Update Order' : 'Add Order'}
            </button>

            {editingOrderId && (
              <button
                type="button"
                className="cancel-btn"
                onClick={clearOrderForm}
              >
                Cancel
              </button>
            )}

          </form>

          <div className="table-container">

            <table>

              <thead>
                <tr>
                  <th>ID</th>
                  <th>Customer ID</th>
                  <th>Total Amount</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>

                {orders.map((order) => (

                  <tr key={order.id}>

                    <td>{order.id}</td>

                    <td>{order.customerId}</td>

                    <td>₹{order.totalAmount}</td>

                    <td>{order.status}</td>

                    <td>
                      <button
                        className="edit-btn"
                        onClick={() => editOrder(order)}
                      >
                        Edit
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() => deleteOrder(order.id)}
                      >
                        Delete
                      </button>
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </section>

        {/* =========================
            SHIPMENTS
        ========================= */}

        <section id="shipments" className="panel">

          <div className="panel-header">
            <div>
              <h2>Shipments</h2>
              <p>Track and manage shipments</p>
            </div>
          </div>


          <form className="warehouse-form" onSubmit={saveShipment}>

            <input
              name="trackingNumber"
              placeholder="Tracking Number"
              value={shipmentForm.trackingNumber}
              onChange={handleShipmentChange}
              required
            />

            <input
              name="orderId"
              type="number"
              placeholder="Order ID"
              value={shipmentForm.orderId}
              onChange={handleShipmentChange}
              required
            />

            <select
              name="status"
              value={shipmentForm.status}
              onChange={handleShipmentChange}
            >
              <option value="SHIPPED">
                SHIPPED
              </option>

              <option value="OUT_FOR_DELIVERY">
                OUT_FOR_DELIVERY
              </option>

              <option value="DELIVERED">
                DELIVERED
              </option>

              <option value="CANCELLED">
                CANCELLED
              </option>
            </select>

            <input
              name="warehouse"
              placeholder="Warehouse"
              value={shipmentForm.warehouse}
              onChange={handleShipmentChange}
              required
            />

            {/* DELIVERY PARTNER DROPDOWN */}

            <select
              name="deliveryPartnerId"
              value={shipmentForm.deliveryPartnerId}
              onChange={handleShipmentChange}
            >

              <option value="">
                Select Delivery Partner
              </option>

              {deliveryPartners.map((partner) => (

                <option
                  key={partner.id}
                  value={partner.id}
                >
                  {partner.name}
                </option>

              ))}

            </select>

            <input
              name="estimatedDelivery"
              type="date"
              value={shipmentForm.estimatedDelivery}
              onChange={handleShipmentChange}
            />

            <button type="submit">
              {editingShipmentId
                ? 'Update Shipment'
                : 'Add Shipment'}
            </button>

            {editingShipmentId && (
              <button
                type="button"
                className="cancel-btn"
                onClick={clearShipmentForm}
              >
                Cancel
              </button>
            )}

          </form>

          <div className="table-container">

            <table>

              <thead>

                <tr>
                  <th>ID</th>
                  <th>Tracking Number</th>
                  <th>Order ID</th>
                  <th>Status</th>
                  <th>Warehouse</th>
                  <th>Delivery Partner</th>
                  <th>Estimated Delivery</th>
                  <th>Actions</th>
                </tr>

              </thead>

              <tbody>

                {shipments.map((shipment) => {

                  const partner = deliveryPartners.find(
                    (item) =>
                      item.id === shipment.deliveryPartnerId
                  )

                  return (

                    <tr key={shipment.id}>

                      <td>{shipment.id}</td>

                      <td>{shipment.trackingNumber}</td>

                      <td>{shipment.orderId}</td>

                      <td>{shipment.status}</td>

                      <td>{shipment.warehouse}</td>

                      <td>
                        {partner
                          ? partner.name
                          : shipment.deliveryPartnerId
                            ? `Partner #${shipment.deliveryPartnerId}`
                            : 'Not Assigned'}
                      </td>

                      <td>
                        {shipment.estimatedDelivery || '-'}
                      </td>

                      <td>

                        <button
                          className="edit-btn"
                          onClick={() => editShipment(shipment)}
                        >
                          Edit
                        </button>

                        <button
                          className="delete-btn"
                          onClick={() =>
                            deleteShipment(shipment.id)
                          }
                        >
                          Delete
                        </button>

                      </td>

                    </tr>

                  )

                })}

              </tbody>

            </table>

          </div>

        </section>

                <TrackingEvents />


        {/* =========================
            WAREHOUSES
        ========================= */}

        <section id="warehouses" className="panel">

          <div className="panel-header">
            <div>
              <h2>Warehouses</h2>
              <p>Manage warehouse inventory</p>
            </div>
          </div>

          <form className="warehouse-form" onSubmit={saveWarehouse}>

            <input
              name="name"
              placeholder="Warehouse Name"
              value={warehouseForm.name}
              onChange={handleWarehouseChange}
              required
            />

            <input
              name="location"
              placeholder="Location"
              value={warehouseForm.location}
              onChange={handleWarehouseChange}
              required
            />

            <input
              name="capacity"
              type="number"
              placeholder="Capacity"
              value={warehouseForm.capacity}
              onChange={handleWarehouseChange}
              required
            />

            <input
              name="currentStock"
              type="number"
              placeholder="Current Stock"
              value={warehouseForm.currentStock}
              onChange={handleWarehouseChange}
              required
            />

            <button type="submit">
              {editingWarehouseId
                ? 'Update Warehouse'
                : 'Add Warehouse'}
            </button>

            {editingWarehouseId && (
              <button
                type="button"
                className="cancel-btn"
                onClick={clearWarehouseForm}
              >
                Cancel
              </button>
            )}

          </form>

          <div className="table-container">

            <table>

              <thead>

                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Location</th>
                  <th>Capacity</th>
                  <th>Current Stock</th>
                  <th>Actions</th>
                </tr>

              </thead>

              <tbody>

                {warehouses.map((warehouse) => (

                  <tr key={warehouse.id}>

                    <td>{warehouse.id}</td>

                    <td>{warehouse.name}</td>

                    <td>{warehouse.location}</td>

                    <td>{warehouse.capacity}</td>

                    <td>{warehouse.currentStock}</td>

                    <td>

                      <button
                        className="edit-btn"
                        onClick={() =>
                          editWarehouse(warehouse)
                        }
                      >
                        Edit
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() =>
                          deleteWarehouse(warehouse.id)
                        }
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </section>

        {/* =========================
            DELIVERY PARTNERS
        ========================= */}

        <section id="delivery-partners" className="panel">

          <div className="panel-header">

            <div>
              <h2>Delivery Partners</h2>
              <p>
                Delivery partners are managed from the
                Delivery Partners module.
              </p>
            </div>

          </div>

          <div className="table-container">

            <table>

              <thead>

                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Vehicle</th>
                  <th>Status</th>
                  <th>Location</th>
                </tr>

              </thead>

              <tbody>

                {deliveryPartners.map((partner) => (

                  <tr key={partner.id}>

                    <td>{partner.id}</td>

                    <td>{partner.name}</td>

                    <td>{partner.phone}</td>

                    <td>{partner.email}</td>

                    <td>{partner.vehicleNumber}</td>

                    <td>{partner.status}</td>

                    <td>
                      {partner.currentLocation || '-'}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </section>

      </main>

    </div>
  )
}

export default App