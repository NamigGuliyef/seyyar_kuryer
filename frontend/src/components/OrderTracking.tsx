
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Search, Package, MapPin, Phone, User, Clock, CheckCircle, Truck, AlertCircle } from 'lucide-react';
import { Order } from '@/types/order';
import { toast } from '@/hooks/use-toast';

const OrderTracking = () => {
  const [orderId, setOrderId] = useState('');
  const [foundOrder, setFoundOrder] = useState<Order | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const searchOrder = () => {
    if (!orderId.trim()) {
      toast({
        title: "Xəta",
        description: "Zəhmət olmasa sifariş nömrəsini daxil edin",
        variant: "destructive"
      });
      return;
    }

    setIsSearching(true);
    
    // Simulate search delay
    setTimeout(() => {
      const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      const order = savedOrders.find((o: Order) => o.id.toLowerCase() === orderId.toLowerCase());
      
      if (order) {
        setFoundOrder(order);
        toast({
          title: "Sifariş tapıldı",
          description: `${orderId} nömrəli sifariş tapıldı`
        });
      } else {
        setFoundOrder(null);
        toast({
          title: "Sifariş tapılmadı",
          description: "Bu nömrə ilə sifariş mövcud deyil",
          variant: "destructive"
        });
      }
      setIsSearching(false);
    }, 1000);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">📦 Sifariş İzləmə</h1>
          <p className="text-gray-600">Sifariş nömrənizi daxil edərək statusunu yoxlayın</p>
        </div>

        {/* Search Section */}
        <Card className="shadow-lg mb-8">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              Sifariş Axtarışı
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="orderId" className="text-gray-700 font-semibold mb-2 block">
                  Sifariş Nömrəsi
                </Label>
                <Input
                  id="orderId"
                  type="text"
                  placeholder="Məsələn: ORD-001"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && searchOrder()}
                  className="text-lg"
                />
              </div>
              <div className="flex items-end">
                <Button 
                  onClick={searchOrder}
                  disabled={isSearching}
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-700"
                >
                  {isSearching ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Axtarılır...
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4 mr-2" />
                      Axtar
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Order Details */}
        {foundOrder && (
          <Card className="shadow-lg">
            <CardHeader className="bg-green-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                Sifariş Məlumatları
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                {/* Status and Order ID */}
                <div className="text-center pb-6 border-b">
                  <div className="text-3xl font-bold text-blue-600 mb-3">
                    {foundOrder.id}
                  </div>
                  <Badge className={`${getStatusColor(foundOrder.status)} text-white text-lg px-4 py-2`}>
                    <span className="flex items-center gap-2">
                      {getStatusIcon(foundOrder.status)}
                      {getStatusText(foundOrder.status)}
                    </span>
                  </Badge>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Customer Info */}
                  <div>
                    <h4 className="flex items-center gap-2 font-semibold text-gray-800 mb-3">
                      <User className="w-5 h-5 text-blue-600" />
                      Müştəri Məlumatları
                    </h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="font-semibold text-lg mb-2">
                        {foundOrder.customer.firstName} {foundOrder.customer.lastName}
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Phone className="w-4 h-4" />
                        {foundOrder.customer.phoneNumber}
                      </div>
                    </div>
                  </div>

                  {/* Package Info */}
                  <div>
                    <h4 className="flex items-center gap-2 font-semibold text-gray-800 mb-3">
                      <Package className="w-5 h-5 text-blue-600" />
                      Bağlama Məlumatları
                    </h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="font-semibold mb-2">{foundOrder.package.name}</div>
                      {foundOrder.package.code && (
                        <div className="text-gray-600 mb-1">Kod: {foundOrder.package.code}</div>
                      )}
                      {foundOrder.package.size && (
                        <div className="text-gray-600">Ölçü: {foundOrder.package.size}</div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Addresses */}
                <div>
                  <h4 className="flex items-center gap-2 font-semibold text-gray-800 mb-3">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    Ünvanlar
                  </h4>
                  <div className="space-y-3">
                    <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-400">
                      <div className="text-red-700 font-semibold text-sm mb-1">GÖTÜRÜLƏR:</div>
                      <div className="text-gray-700">{foundOrder.addresses.pickup}</div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
                      <div className="text-green-700 font-semibold text-sm mb-1">ÇATDIRILIR:</div>
                      <div className="text-gray-700">{foundOrder.addresses.delivery}</div>
                    </div>
                  </div>
                </div>

                {/* Price and Distance */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <div className="text-blue-600 font-semibold mb-1">Məsafə</div>
                    <div className="text-2xl font-bold">{foundOrder.distance} km</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <div className="text-green-600 font-semibold mb-1">Qiymət</div>
                    <div className="text-2xl font-bold">{foundOrder.price} AZN</div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg text-center">
                    <div className="text-purple-600 font-semibold mb-1">Tarix</div>
                    <div className="text-lg font-bold">
                      {new Date(foundOrder.createdAt).toLocaleDateString('az')}
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                {(foundOrder.deliveryTime || foundOrder.notes) && (
                  <div className="space-y-4">
                    {foundOrder.deliveryTime && (
                      <div>
                        <h4 className="flex items-center gap-2 font-semibold text-gray-800 mb-2">
                          <Clock className="w-4 h-4 text-blue-600" />
                          Çatdırılma Vaxtı
                        </h4>
                        <div className="bg-yellow-50 p-3 rounded-lg">
                          {foundOrder.deliveryTime}
                        </div>
                      </div>
                    )}

                    {foundOrder.notes && (
                      <div>
                        <h4 className="flex items-center gap-2 font-semibold text-gray-800 mb-2">
                          📝 Əlavə Qeydlər
                        </h4>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          {foundOrder.notes}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default OrderTracking;
