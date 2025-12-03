import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  role: 'customer' | 'admin';
  createdAt: string;
}

interface Order {
  id: string;
  orderNumber: number;
  userId: string;
  items: any[];
  total: number;
  status: 'pending' | 'preparing' | 'ready' | 'delivering' | 'delivered' | 'cancelled';
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    zipCode: string;
  };
  paymentMethod: string;
  createdAt: string;
  estimatedTime?: number;
}

interface AuthContextType {
  user: User | null;
  orders: Order[];
  allOrders: Order[];
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, phone: string) => Promise<boolean>;
  logout: () => void;
  addOrder: (order: Omit<Order, 'id' | 'userId' | 'createdAt'>) => void;
  updateOrderStatus: (orderId: string, status: Order['status'], estimatedTime?: number) => void;
  getUserOrders: () => Order[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users database
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@sorrentopizza.dk',
    phone: '12345678',
    role: 'admin',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '87654321',
    address: 'Hadsundvej 11, 9000 Aalborg',
    role: 'customer',
    createdAt: new Date().toISOString(),
  },
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  // Load user from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  // Save orders to localStorage
  useEffect(() => {
    if (orders.length > 0) {
      localStorage.setItem('orders', JSON.stringify(orders));
    }
  }, [orders]);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication
    const foundUser = mockUsers.find((u) => u.email === email);
    
    if (foundUser && password === 'password') {
      setUser(foundUser);
      localStorage.setItem('user', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const register = async (
    name: string,
    email: string,
    _password: string, // Prefix with underscore to indicate it's intentionally unused
    phone: string
  ): Promise<boolean> => {
    // Check if user exists
    if (mockUsers.find((u) => u.email === email)) {
      return false;
    }

    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      phone,
      role: 'customer',
      createdAt: new Date().toISOString(),
    };

    mockUsers.push(newUser);
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const addOrder = (orderData: Omit<Order, 'id' | 'userId' | 'createdAt'>) => {
    const newOrder: Order = {
      ...orderData,
      id: Date.now().toString(),
      userId: user?.id || 'guest',
      createdAt: new Date().toISOString(),
      status: 'pending',
    };

    setOrders((prev) => [newOrder, ...prev]);
  };

  const updateOrderStatus = (
    orderId: string,
    status: Order['status'],
    estimatedTime?: number
  ) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId
          ? { ...order, status, estimatedTime }
          : order
      )
    );
  };

  const getUserOrders = () => {
    if (!user) return [];
    if (user.role === 'admin') return orders;
    return orders.filter((order) => order.userId === user.id);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        orders,
        allOrders: orders,
        login,
        register,
        logout,
        addOrder,
        updateOrderStatus,
        getUserOrders,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
