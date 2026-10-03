export const categories = [
  { id: 1, name: 'Groceries', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=150&h=150' },
  { id: 2, name: 'Vegetables', image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&q=80&w=150&h=150' },
  { id: 3, name: 'Electronics', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&q=80&w=150&h=150' },
  { id: 4, name: 'Electrical', image: 'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?auto=format&fit=crop&q=80&w=150&h=150' },
  { id: 5, name: 'Furniture', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=150&h=150' },
  { id: 6, name: 'Fashion', image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&q=80&w=150&h=150' },
  { id: 7, name: 'Footwear', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=150&h=150' },
  { id: 8, name: 'Home Essentials', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=150&h=150' },
  { id: 9, name: 'Personal Care', image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=150&h=150' },
];

export const shops = [
  {
    id: 's1',
    name: 'Sri Lakshmi Stores',
    rating: 4.6,
    reviews: 124,
    distance: 0.5,
    travelTime: 6, // minutes
    isOpen: true,
    category: 'Groceries',
    image: 'https://images.unsplash.com/photo-1534723452862-4c874018d66d?auto=format&fit=crop&q=80&w=400',
    lat: 11.0168,
    lng: 76.9558,
    address: '124 Main Street, Cross Cut Road'
  },
  {
    id: 's2',
    name: 'Murugan Super Market',
    rating: 4.3,
    reviews: 89,
    distance: 1.2,
    travelTime: 14,
    isOpen: true,
    category: 'Groceries',
    image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&q=80&w=400',
    lat: 11.0180,
    lng: 76.9600,
    address: '45 DB Road, RS Puram'
  },
  {
    id: 's3',
    name: 'Annapoorna Mart',
    rating: 4.8,
    reviews: 210,
    distance: 1.8,
    travelTime: 20,
    isOpen: true,
    category: 'Groceries',
    image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&q=80&w=400',
    lat: 11.0150,
    lng: 76.9500,
    address: '89 NSR Road'
  },
  {
    id: 's4',
    name: 'Raja Electronics',
    rating: 4.5,
    reviews: 67,
    distance: 2.1,
    travelTime: 25,
    isOpen: false,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&q=80&w=400',
    lat: 11.0200,
    lng: 76.9650,
    address: '100th Street'
  }
];

export const products = [
  {
    id: 'p1',
    name: 'Premium Basmati Rice 1kg',
    price: 60,
    rating: 4.6,
    inStock: true,
    shopId: 's1',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'p2',
    name: 'Premium Basmati Rice 1kg',
    price: 55,
    rating: 4.3,
    inStock: true,
    shopId: 's2',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'p3',
    name: 'Premium Basmati Rice 1kg',
    price: 68,
    rating: 4.8,
    inStock: true,
    shopId: 's3',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=200'
  }
];
