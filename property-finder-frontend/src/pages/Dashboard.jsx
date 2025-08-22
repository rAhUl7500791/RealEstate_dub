import { useEffect, useState } from "react"
import { listProperties, createProperty, uploadPropertyImages } from "../api/properties"

export default function Dashboard() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [form, setForm] = useState({
    title: "",
    price: "",
    location: "",
    description: "",
    images: []
  })

  // 🔥 State for modal image
  const [selectedImage, setSelectedImage] = useState(null)

  // Load properties
  useEffect(() => {
    (async () => {
      try {
        const data = await listProperties()
        setItems(data)
      } catch (err) {
        setError(err.response?.data ? JSON.stringify(err.response.data) : err.message)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  // Form change handler
  const onChange = (e) => {
    const { name, value, files } = e.target
    if (name === "images") {
      setForm(prev => ({ ...prev, images: Array.from(files) }))
    } else {
      setForm(prev => ({ ...prev, [name]: value }))
    }
  }

  // Create property + upload images
  const onCreate = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData()
      formData.append("title", form.title)
      formData.append("price", form.price)
      formData.append("location", form.location)
      formData.append("description", form.description)

      const created = await createProperty(formData)

      if (form.images.length > 0) {
        await uploadPropertyImages(created.id, form.images)
      }

      const updated = await listProperties()
      setItems(updated)

      setForm({ title: "", price: "", location: "", description: "", images: [] })
    } catch (err) {
      alert(err.response?.data ? JSON.stringify(err.response.data) : err.message)
    }
  }

  return (
    <div className="grid gap-6">
      {/* Create Property Form */}
      <div className="card p-6 shadow-lg rounded-2xl bg-white">
        <h2 className="text-xl font-semibold mb-4">Create Property</h2>
        <form onSubmit={onCreate} className="grid md:grid-cols-2 gap-4">
          <input type="text" name="title" placeholder="Title"
            value={form.title} onChange={onChange}
            className="border p-2 rounded" required />

          <input type="number" name="price" placeholder="Price"
            value={form.price} onChange={onChange}
            className="border p-2 rounded" required />

          <input type="text" name="location" placeholder="Location"
            value={form.location} onChange={onChange}
            className="border p-2 rounded md:col-span-2" />

          <textarea name="description" placeholder="Description"
            value={form.description} onChange={onChange}
            className="border p-2 rounded md:col-span-2" rows="3" />

          <input type="file" name="images" accept="image/*" multiple
            onChange={onChange} className="border p-2 rounded md:col-span-2" />

          <div className="md:col-span-2">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700">
              Add Property
            </button>
          </div>
        </form>
      </div>

      {/* Properties List */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Your Properties</h2>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="text-red-600">{error}</div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((p, idx) => (
              <div key={p.id || idx} className="p-4 border rounded-xl shadow bg-white">
                
                {/* 🔥 Multiple Images Gallery with click */}
                {p.images && p.images.length > 0 ? (
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {p.images.map((img, i) => (
                      <div
                        key={i}
                        className="w-32 h-24 overflow-hidden rounded-lg cursor-pointer"
                        onClick={() => setSelectedImage(img.image)} // 👈 click to open modal
                      >
                        <img
                          src={img.image}
                          alt={p.title}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="w-full h-40 bg-slate-200 flex items-center justify-center text-slate-500">
                    No Image
                  </div>
                )}

                {/* Property Info */}
                <div className="font-medium text-lg mt-2">{p.title}</div>
                <div className="text-sm text-slate-600">{p.location}</div>
                <div className="mt-1 font-semibold text-green-700">₹{p.price}</div>
                {p.description && <p className="text-sm mt-2">{p.description}</p>}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 🔥 Modal for fullscreen image */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)} // close on background click
        >
          <img 
            src={selectedImage} 
            alt="Selected" 
            className="max-w-3xl max-h-[90%] rounded-lg shadow-lg"
          />
        </div>
      )}
    </div>
  )
}
