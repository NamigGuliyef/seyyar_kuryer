import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';
import { Order } from '@/types/order';
import { AlertCircle, CheckCircle, Clock, DollarSign, MapPin, Package, Phone, Truck, User } from 'lucide-react';
import { useEffect, useState } from 'react';

const API_URL = 'http://localhost:3000/order';

const AdminPanel = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadOrders();
  }, []);

  // Bütün sifarişləri backend-dən yüklə
  const loadOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/all`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      setOrders(data);
    } catch {
      toast({
        title: "Xəta",
        description: "Sifarişləri yükləmək mümkün olmadı",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // ID-yə görə sifariş detalları
  const loadOrderById = async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/track/${id}`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      setSelectedOrder(data);
    } catch {
      toast({
        title: "Xəta",
        description: "Sifariş detalları tapılmadı",
        variant: "destructive"
      });
    }
  };

  // Statusu backend-ə göndər və yenilə (orderId və status ilə)
  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      // Burada orderId MongoDB-də orderId kimi saxlanırsa, uyğun göndər
      const res = await fetch(`${API_URL}/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error();

      toast({
        title: "Status yeniləndi",
        description: `Sifariş ${orderId} statusu "${getStatusText(newStatus as Order['status'])}" olaraq dəyişdirildi`
      });

      // Sifarişləri yenilə
      loadOrders();
      // Seçilmiş sifarişi yenilə
      loadOrderById(orderId);
    } catch {
      toast({
        title: "Xəta",
        description: "Statusu yeniləmək mümkün olmadı",
        variant: "destructive"
      });
    }
  };

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'new': return 'Yeni';
      case 'accepted': return 'Qəbul edildi';
      case 'in_transit': return 'Yoldadır';
      case 'delivered': return 'Təhvil verildi';
      default: return status;
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'new': return 'bg-blue-500';
      case 'accepted': return 'bg-yellow-500';
      case 'in_transit': return 'bg-orange-500';
      case 'delivered': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'new': return <AlertCircle className="w-4 h-4" />;
      case 'accepted': return <CheckCircle className="w-4 h-4" />;
      case 'in_transit': return <Truck className="w-4 h-4" />;
      case 'delivered': return <CheckCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const newOrders = orders.filter(order => order.status === 'new');
  const activeOrders = orders.filter(order => order.status !== 'delivered');
  const deliveredOrders = orders.filter(order => order.status === 'delivered');
  const totalAmount = orders.reduce((sum, order) => sum + order.price, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">🚛 Kuryer Admin Panel</h1>
          <p className="text-gray-600">Sifarişləri idarə edin və statusları yeniləyin</p>
          <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            ⚠️ Bu panel yalnız admin istifadəsi üçündür
          </div>
        </div>

        {/* Statistika kartları */}
        <div className="grid md:grid-cols-5 gap-4 mb-8">
          <Card className="bg-blue-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Yeni Sifarişlər</p>
                  <p className="text-2xl font-bold">{newOrders.length}</p>
                </div>
                <AlertCircle className="w-8 h-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-orange-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100">Aktiv Sifarişlər</p>
                  <p className="text-2xl font-bold">{activeOrders.length}</p>
                </div>
                <Truck className="w-8 h-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-green-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Tamamlanan</p>
                  <p className="text-2xl font-bold">{deliveredOrders.length}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-200" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-purple-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Ümumi Sifarişlər</p>
                  <p className="text-2xl font-bold">{orders.length}</p>
                </div>
                <Package className="w-8 h-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-emerald-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100">Ümumi Məbləğ</p>
                  <p className="text-2xl font-bold">{totalAmount} AZN</p>
                </div>
                <DollarSign className="w-8 h-8 text-emerald-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Sifarişlər siyahısı */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg">
              <CardHeader className="bg-gray-800 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Bütün Sifarişlər
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {loading ? (
                  <div className="p-8 text-center text-gray-500">Yüklənir...</div>
                ) : orders.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Hələ heç bir sifariş yoxdur</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left font-semibold text-gray-700">Sifariş</th>
                          <th className="px-4 py-3 text-left font-semibold text-gray-700">Müştəri</th>
                          <th className="px-4 py-3 text-left font-semibold text-gray-700">Məsafə</th>
                          <th className="px-4 py-3 text-left font-semibold text-gray-700">Qiymət</th>
                          <th className="px-4 py-3 text-left font-semibold text-gray-700">Status</th>
                          <th className="px-4 py-3 text-left font-semibold text-gray-700">Tarix</th>
                          <th className="px-4 py-3 text-left font-semibold text-gray-700">Əməliyyat</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((order) => (
                          <tr 
                            key={order.orderId || order.id} 
                            className={`border-b hover:bg-gray-50 cursor-pointer ${
                              selectedOrder?.orderId === order.orderId ? 'bg-blue-50' : ''
                            }`}
                            onClick={() => loadOrderById(order.orderId || order.id)}
                          >
                            <td className="px-4 py-3">
                              <div className="font-mono text-sm font-semibold text-blue-600">
                                {order.orderId || order.id}
                              </div>
                              {order.isUrgent && (
                                <Badge variant="destructive" className="text-xs mt-1">
                                  Təcili
                                </Badge>
                              )}
                            </td>
                            <td className="px-4 py-3">
                              <div className="font-semibold">
                                {order.firstName} {order.lastName}
                              </div>
                              <div className="text-sm text-gray-600">
                                {order.phoneNumber}
                              </div>
                            </td>
                            <td className="px-4 py-3 text-center">
                              {order.distance} km
                            </td>
                            <td className="px-4 py-3">
                              <span className="font-bold text-green-600">
                                {order.price} AZN
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <Badge className={`${getStatusColor(order.status)} text-white`}>
                                <span className="flex items-center gap-1">
                                  {getStatusIcon(order.status)}
                                  {getStatusText(order.status)}
                                </span>
                              </Badge>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600">
                              {order.createdAt ? new Date(order.createdAt).toLocaleDateString('az') : ''}
                            </td>
                            <td className="px-4 py-3">
                              <Select
                                value={order.status}
                                onValueChange={(value) => updateOrderStatus(order.orderId || order.id, value)}
                              >
                                <SelectTrigger className="w-32">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="new">Yeni</SelectItem>
                                  <SelectItem value="accepted">Qəbul edildi</SelectItem>
                                  <SelectItem value="in_transit">Yoldadır</SelectItem>
                                  <SelectItem value="delivered">Təhvil verildi</SelectItem>
                                </SelectContent>
                              </Select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Seçilmiş sifarişin detalları */}
          <div>
            <Card className="shadow-lg">
              <CardHeader className="bg-blue-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Sifariş Detalları
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {selectedOrder ? (
                  <div className="space-y-4">
                    <div className="text-center pb-4 border-b">
                      <div className="text-2xl font-bold text-blue-600 mb-2">
                        {selectedOrder.orderId || selectedOrder.id}
                      </div>
                      <Badge className={`${getStatusColor(selectedOrder.status)} text-white`}>
                        <span className="flex items-center gap-1">
                          {getStatusIcon(selectedOrder.status)}
                          {getStatusText(selectedOrder.status)}
                        </span>
                      </Badge>
                    </div>

                    <div>
                      <h4 className="flex items-center gap-2 font-semibold text-gray-800 mb-2">
                        <User className="w-4 h-4 text-blue-600" />
                        Müştəri
                      </h4>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="font-semibold">
                          {selectedOrder.firstName} {selectedOrder.lastName}
                        </div>
                        <div className="flex items-center gap-1 text-gray-600">
                          <Phone className="w-4 h-4" />
                          {selectedOrder.phoneNumber}
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="flex items-center gap-2 font-semibold text-gray-800 mb-2">
                        <Package className="w-4 h-4 text-blue-600" />
                        Bağlama
                      </h4>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="font-semibold">{selectedOrder.packageName}</div>
                        {selectedOrder.packageCode && (
                          <div className="text-gray-600">Kod: {selectedOrder.packageCode}</div>
                        )}
                        {selectedOrder.packageSize && (
                          <div className="text-gray-600">Ölçü: {selectedOrder.packageSize}</div>
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 className="flex items-center gap-2 font-semibold text-gray-800 mb-2">
                        <MapPin className="w-4 h-4 text-blue-600" />
                        Ünvanlar
                      </h4>
                      <div className="space-y-2">
                        <div className="bg-red-50 p-3 rounded-lg border-l-4 border-red-400">
                          <div className="text-red-700 font-semibold text-sm mb-1">Götürüləcək ünvan:</div>
                          <div className="text-gray-700">{selectedOrder.pickupAddress}</div>
                        </div>
                        <div className="bg-green-50 p-3 rounded-lg border-l-4 border-green-400">
                          <div className="text-green-700 font-semibold text-sm mb-1">Təhvil veriləcək ünvan:</div>
                          <div className="text-gray-700">{selectedOrder.deliveryAddress}</div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50 p-3 rounded-lg text-center">
                        <div className="text-blue-600 font-semibold">Məsafə</div>
                        <div className="text-xl font-bold">{selectedOrder.distance} km</div>
                      </div>
                      <div className="bg-green-50 p-3 rounded-lg text-center">
                        <div className="text-green-600 font-semibold">Qiymət</div>
                        <div className="text-xl font-bold">{selectedOrder.price} AZN</div>
                      </div>
                    </div>

                    {selectedOrder.deliveryTime && (
                      <div>
                        <h4 className="flex items-center gap-2 font-semibold text-gray-800 mb-2">
                          <Clock className="w-4 h-4 text-blue-600" />
                          Çatdırılma vaxtı
                        </h4>
                        <div className="bg-yellow-50 p-3 rounded-lg">
                          {selectedOrder.deliveryTime}
                        </div>
                      </div>
                    )}

                    {selectedOrder.notes && (
                      <div>
                        <h4 className="flex items-center gap-2 font-semibold text-gray-800 mb-2">
                          📝 Qeydlər
                        </h4>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          {selectedOrder.notes}
                        </div>
                      </div>
                    )}

                    <Separator />

                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3">Status Dəyişdir</h4>
                      <Select
                        value={selectedOrder.status}
                        onValueChange={(value) => updateOrderStatus(selectedOrder.orderId || selectedOrder.id, value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">Yeni</SelectItem>
                          <SelectItem value="accepted">Qəbul edildi</SelectItem>
                          <SelectItem value="in_transit">Yoldadır</SelectItem>
                          <SelectItem value="delivered">Təhvil verildi</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Detallarını görmək üçün sifariş seçin</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;