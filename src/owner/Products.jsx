import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Edit2, Trash2, Package } from 'lucide-react';
import OwnerSidebar from './OwnerSidebar';
import { products } from '../data/dummyData';

const Products = () => {
  const navigate = useNavigate();
  // Filter for products that belong to the current owner (using 's1' as dummy)
  const [shopProducts, setShopProducts] = useState(products.filter(p => p.shopId === 's1'));

  const handleDelete = (id) => {
    if(window.confirm('Are you sure you want to delete this product?')) {
      setShopProducts(shopProducts.filter(p => p.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-nm-off-white flex">
      <OwnerSidebar />
      
      <div className="flex-1 md:ml-64 p-6 lg:p-10 pb-24 md:pb-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-nm-text-dark">Products</h1>
            <p className="text-gray-500 mt-1">Manage your shop inventory</p>
          </div>
          
          <button 
            onClick={() => navigate('/owner/products/add')}
            className="btn-primary flex items-center gap-2 py-3"
          >
            <Plus className="w-5 h-5" />
            Add New Product
          </button>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-50 overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="relative w-full sm:max-w-xs">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input 
                type="text" 
                className="input-field pl-11 bg-gray-50 border-transparent focus:bg-white"
                placeholder="Search products..."
              />
            </div>
            
            <div className="flex items-center gap-2 text-sm text-gray-500 w-full sm:w-auto">
              <span className="font-medium bg-gray-100 px-3 py-1.5 rounded-lg">{shopProducts.length} Items</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">Product</th>
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">Category</th>
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">Price</th>
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">Status</th>
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {shopProducts.map((product, index) => (
                  <motion.tr 
                    key={product.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-white border border-gray-100 overflow-hidden shrink-0 p-1">
                          <img src={product.image} alt={product.name} className="w-full h-full object-contain mix-blend-multiply" />
                        </div>
                        <span className="font-semibold text-nm-text-dark">{product.name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-gray-600">Groceries</td>
                    <td className="p-4 font-semibold text-nm-text-dark">₹{product.price}</td>
                    <td className="p-4">
                      {product.inStock ? (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          In Stock
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          Out of Stock
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => navigate(`/owner/products/edit/${product.id}`)}
                          className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(product.id)}
                          className="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}

                {shopProducts.length === 0 && (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-gray-500">
                      <Package className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                      <p>No products found.</p>
                      <button onClick={() => navigate('/owner/products/add')} className="text-nm-primary font-medium mt-2 hover:underline">Add your first product</button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
