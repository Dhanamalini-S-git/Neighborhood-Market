import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Register from './pages/Register';
import ChooseLocation from './pages/ChooseLocation';
import CustomerHome from './pages/CustomerHome';
import NearbyShops from './pages/NearbyShops';
import ProductSearch from './pages/ProductSearch';
import ShopDetails from './pages/ShopDetails';
import Compare from './pages/Compare';
import MapView from './pages/Map';
import RoutePage from './pages/Route';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import Chat from './pages/Chat';

// Owner pages
import OwnerLogin from './owner/OwnerLogin';
import OwnerRegister from './owner/OwnerRegister';
import OwnerDashboard from './owner/OwnerDashboard';
import ShopLocation from './owner/ShopLocation';
import Products from './owner/Products';
import AddProduct from './owner/AddProduct';
import EditProduct from './owner/EditProduct';
import Analytics from './owner/Analytics';
import MyShop from './owner/MyShop';
import OwnerChat from './owner/OwnerChat';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        
        {/* Customer Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/location" element={<ChooseLocation />} />
        <Route path="/home" element={<CustomerHome />} />
        <Route path="/shops" element={<NearbyShops />} />
        <Route path="/search" element={<ProductSearch />} />
        <Route path="/shop/:id" element={<ShopDetails />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/map" element={<MapView />} />
        <Route path="/route/:id" element={<RoutePage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/chat/:shopId" element={<Chat />} />

        {/* Owner Routes */}
        <Route path="/owner/login" element={<OwnerLogin />} />
        <Route path="/owner/register" element={<OwnerRegister />} />
        <Route path="/owner/dashboard" element={<OwnerDashboard />} />
        <Route path="/owner/location" element={<ShopLocation />} />
        <Route path="/owner/shop" element={<MyShop />} />
        <Route path="/owner/products" element={<Products />} />
        <Route path="/owner/products/add" element={<AddProduct />} />
        <Route path="/owner/products/edit/:id" element={<EditProduct />} />
        <Route path="/owner/analytics" element={<Analytics />} />
        <Route path="/owner/chat/:customerId" element={<OwnerChat />} />
        <Route path="/owner/messages" element={<OwnerChat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
