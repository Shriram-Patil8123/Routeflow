import { useEffect, useState } from 'react'

const API = 'http://localhost:8080/api'

function TrackingEvents() {
  const [events, setEvents] = useState([])
  const [shipments, setShipments] = useState([])
  const [editingId, setEditingId] = useState(null)

  const [form, setForm] = useState({
    shipmentId: '',
    status: 'SHIPPED',
    location: '',
    description: '',
    eventTime: ''
  })

  useEffect(() => {
    loadEvents()
    loadShipments()
  }, [])

  const loadEvents = async () => {
    try {
      const response = await fetch(`${API}/tracking-events`)
      const data = await response.json()
      setEvents(data)
    } catch (error) {
      console.error('Error loading tracking events:', error)
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

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const saveEvent = async (e) => {
    e.preventDefault()

    try {
      const url = editingId
        ? `${API}/tracking-events/${editingId}`
        : `${API}/tracking-events`

      const method = editingId ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          shipmentId: Number(form.shipmentId),
          status: form.status,
          location: form.location,
          description: form.description,
          eventTime: form.eventTime
        })
      })

      if (response.ok) {
        clearForm()
        loadEvents()
      } else {
        alert('Failed to save tracking event')
      }
    } catch (error) {
      console.error('Error saving tracking event:', error)
    }
  }

  const editEvent = (event) => {
    setEditingId(event.id)

    setForm({
      shipmentId: event.shipmentId,
      status: event.status,
      location: event.location,
      description: event.description || '',
      eventTime: event.eventTime
    })
  }

  const deleteEvent = async (id) => {
    try {
      const response = await fetch(`${API}/tracking-events/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        loadEvents()
      }
    } catch (error) {
      console.error('Error deleting tracking event:', error)
    }
  }

  const clearForm = () => {
    setEditingId(null)

    setForm({
      shipmentId: '',
      status: 'SHIPPED',
      location: '',
      description: '',
      eventTime: ''
    })
  }

  return (
    <section id="tracking-events" className="panel">
      <div className="panel-header">
        <div>
          <h2>Tracking Events</h2>
          <p>Track shipment movement and status updates</p>
        </div>
      </div>

      <form className="warehouse-form" onSubmit={saveEvent}>

        <div>
          <label>Shipment</label>

          <select
            name="shipmentId"
            value={form.shipmentId}
            onChange={handleChange}
            required
          >
            <option value="">Select Shipment</option>

            {shipments.map((shipment) => (
              <option key={shipment.id} value={shipment.id}>
                {shipment.trackingNumber}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Status</label>

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            required
          >
            <option value="SHIPPED">SHIPPED</option>
            <option value="OUT_FOR_DELIVERY">OUT_FOR_DELIVERY</option>
            <option value="DELIVERED">DELIVERED</option>
            <option value="CANCELLED">CANCELLED</option>
          </select>
        </div>

        <div>
          <label>Location</label>

          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Enter location"
            required
          />
        </div>

        <div>
          <label>Description</label>

          <input
            type="text"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Enter description"
          />
        </div>

        <div>
          <label>Event Time</label>

          <input
            type="text"
            name="eventTime"
            value={form.eventTime}
            onChange={handleChange}
            placeholder="2026-10-07 10:30"
            required
          />
        </div>

        <div className="form-buttons">
          <button type="submit">
            {editingId ? 'Update Event' : 'Add Event'}
          </button>

          {editingId && (
            <button
              type="button"
              className="cancel-btn"
              onClick={clearForm}
            >
              Cancel
            </button>
          )}
        </div>

      </form>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Shipment</th>
              <th>Status</th>
              <th>Location</th>
              <th>Description</th>
              <th>Event Time</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {events.length === 0 ? (
              <tr>
                <td colSpan="7">
                  No tracking events found
                </td>
              </tr>
            ) : (
              events.map((event) => {
                const shipment = shipments.find(
                  (item) => item.id === event.shipmentId
                )

                return (
                  <tr key={event.id}>
                    <td>{event.id}</td>

                    <td>
                      {shipment
                        ? shipment.trackingNumber
                        : `Shipment #${event.shipmentId}`}
                    </td>

                    <td>{event.status}</td>

                    <td>{event.location}</td>

                    <td>{event.description}</td>

                    <td>{event.eventTime}</td>

                    <td>
                      <button
                        className="edit-btn"
                        onClick={() => editEvent(event)}
                      >
                        Edit
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() => deleteEvent(event.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default TrackingEvents