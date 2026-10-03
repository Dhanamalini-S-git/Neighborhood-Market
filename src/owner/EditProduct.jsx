import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, UploadCloud } from 'lucide-react';
import OwnerSidebar from './OwnerSidebar';
import { products } from '../data/dummyData';

const EditProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [inStock, setInStock] = useState(true);

  useEffect(() => {
    const p = products.find(prod => prod.id === id);
    if(p) {
      setProduct(p);
      setInStock(p.inStock);
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/owner/products');
  };

  if (!product) return <div className="p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-nm-off-white flex">
      <OwnerSidebar />
      
      <div className="flex-1 md:ml-64 p-6 lg:p-10 pb-24 md:pb-10">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => navigate(-1)} className="btn-icon bg-white shadow-sm border border-gray-100">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-nm-text-dark">Edit Product</h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="max-w-4xl bg-white rounded-3xl shadow-sm border border-gray-50 overflow-hidden">
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              <div className="md:col-span-1 space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-nm-text-dark mb-2">Product Image</label>
                  <div className="border-2 border-dashed border-gray-200 rounded-2xl h-48 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer group relative overflow-hidden">
                    <img src={product.image} alt="Preview" className="absolute inset-0 w-full h-full object-contain mix-blend-multiply opacity-50 group-hover:opacity-30 transition-opacity" />
                    <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform relative z-10">
                      <UploadCloud className="w-6 h-6 text-nm-primary" />
                    </div>
                    <span className="text-sm font-medium text-gray-700 relative z-10">Change image</span>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-nm-text-dark mb-1">Product Name</label>
                    <input type="text" required className="input-field" defaultValue={product.name} />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-nm-text-dark mb-1">Category</label>
                    <select required className="input-field bg-white" defaultValue="groceries">
                      <option value="groceries">Groceries</option>
                      <option value="vegetables">Vegetables</option>
                      <option value="electronics">Electronics</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-nm-text-dark mb-1">Price (₹)</label>
                    <input type="number" required min="0" className="input-field" defaultValue={product.price} />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-nm-text-dark mb-1">Stock Quantity</label>
                    <input type="number" required min="0" className="input-field" defaultValue="50" />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-nm-text-dark mb-2">Availability</label>
                    <div className="flex items-center gap-4 mt-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="radio" 
                          name="availability" 
                          checked={inStock} 
                          onChange={() => setInStock(true)}
                          className="w-4 h-4 text-nm-primary focus:ring-nm-primary"
                        />
                        <span className="text-sm font-medium text-gray-700">In Stock</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="radio" 
                          name="availability" 
                          checked={!inStock} 
                          onChange={() => setInStock(false)}
                          className="w-4 h-4 text-red-500 focus:ring-red-500"
                        />
                        <span className="text-sm font-medium text-gray-700">Out of Stock</span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-nm-text-dark mb-1">Description</label>
                    <textarea className="input-field py-3 h-24 resize-none" defaultValue="High quality premium product."></textarea>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
          
          <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-end gap-4">
            <button type="button" onClick={() => navigate(-1)} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary px-8">
              Update Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
