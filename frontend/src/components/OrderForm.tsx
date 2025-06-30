
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Package, MapPin, Phone, User, Clock, FileText } from 'lucide-react';
import { calculatePrice, priceRanges } from '@/utils/priceCalculator';
import { Order } from '@/types/order';
import { toast } from '@/hooks/use-toast';

const OrderForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    packageName: '',
    packageCode: '',
    packageSize: '',
    pickupAddress: '',
    deliveryAddress: '',
    distance: 0,
    isUrgent: false,
    deliveryTime: '',
    notes: ''
  });

  const handleInputChange = (field: string, value: string | number | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculatedPrice = calculatePrice(formData.distance, formData.isUrgent);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName || !formData.phoneNumber || 
        !formData.packageName || !formData.pickupAddress || !formData.deliveryAddress) {
      toast({
        title: "Xəta",
        description: "Zəhmət olmasa bütün məcburi sahələri doldurun",
        variant: "destructive"
      });
      return;
    }

    const newOrder: Order = {
      id: `AZ${Date.now()}`,
      customer: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phoneNumber
      },
      package: {
        name: formData.packageName,
        code: formData.packageCode,
        size: formData.packageSize
      },
      addresses: {
        pickup: formData.pickupAddress,
        delivery: formData.deliveryAddress
      },
      distance: formData.distance,
      price: calculatedPrice,
      isUrgent: formData.isUrgent,
      deliveryTime: formData.deliveryTime,
      notes: formData.notes,
      status: 'new',
      createdAt: new Date()
    };

    // Sifarişi localStorage-da saxlayırıq (real layihədə API istifadə edilər)
    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    existingOrders.push(newOrder);
    localStorage.setItem('orders', JSON.stringify(existingOrders));

    toast({
      title: "Uğurlu!",
      description: `Sifarişiniz qəbul edildi. Sifariş nömrəsi: ${newOrder.id}`
    });

    // Formu təmizləyirik
    setFormData({
      firstName: '',
      lastName: '',
      phoneNumber: '',
      packageName: '',
      packageCode: '',
      packageSize: '',
      pickupAddress: '',
      deliveryAddress: '',
      distance: 0,
      isUrgent: false,
      deliveryTime: '',
      notes: ''
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-900 mb-2">🚀 Seyyar Kuryer</h1>
          <p className="text-blue-700">Sürətli və etibarlı çatdırılma xidməti</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Sifariş Formu */}
          <div className="md:col-span-2">
            <Card className="shadow-lg">
              <CardHeader className="bg-blue-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Yeni Sifariş
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Müştəri məlumatları */}
                  <div>
                    <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-4">
                      <User className="w-5 h-5 text-blue-600" />
                      Müştəri Məlumatları
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">Ad *</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          placeholder="Elçin"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Soyad *</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          placeholder="Əliyev"
                          className="mt-1"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="phoneNumber">Əlaqə nömrəsi *</Label>
                        <Input
                          id="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                          placeholder="055 xxx xx xx"
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Bağlama məlumatları */}
                  <div>
                    <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-4">
                      <Package className="w-5 h-5 text-blue-600" />
                      Bağlama / Sənəd Məlumatları
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="packageName">Bağlamanın adı *</Label>
                        <Input
                          id="packageName"
                          value={formData.packageName}
                          onChange={(e) => handleInputChange('packageName', e.target.value)}
                          placeholder="Notariat sənədi, Kiçik qutu və s."
                          className="mt-1"
                        />
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="packageCode">Nömrə / Kod</Label>
                          <Input
                            id="packageCode"
                            value={formData.packageCode}
                            onChange={(e) => handleInputChange('packageCode', e.target.value)}
                            placeholder="AZ123456"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="packageSize">Ölçü / Çəki</Label>
                          <Input
                            id="packageSize"
                            value={formData.packageSize}
                            onChange={(e) => handleInputChange('packageSize', e.target.value)}
                            placeholder="30x20 sm, 1.5 kq"
                            className="mt-1"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Ünvanlar */}
                  <div>
                    <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-4">
                      <MapPin className="w-5 h-5 text-blue-600" />
                      Ünvanlar
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="pickupAddress">Götürüləcək ünvan *</Label>
                        <Textarea
                          id="pickupAddress"
                          value={formData.pickupAddress}
                          onChange={(e) => handleInputChange('pickupAddress', e.target.value)}
                          placeholder="Küçə, bina, mənzil, rayon..."
                          className="mt-1"
                          rows={2}
                        />
                      </div>
                      <div>
                        <Label htmlFor="deliveryAddress">Təhvil veriləcək ünvan *</Label>
                        <Textarea
                          id="deliveryAddress"
                          value={formData.deliveryAddress}
                          onChange={(e) => handleInputChange('deliveryAddress', e.target.value)}
                          placeholder="Ofis, mağaza, ev ünvanı..."
                          className="mt-1"
                          rows={2}
                        />
                      </div>
                      <div>
                        <Label htmlFor="distance">Təxmini məsafə (km) *</Label>
                        <Input
                          id="distance"
                          type="number"
                          step="0.1"
                          value={formData.distance}
                          onChange={(e) => handleInputChange('distance', parseFloat(e.target.value) || 0)}
                          placeholder="5.2"
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Əlavə seçimlər */}
                  <div>
                    <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-4">
                      <Clock className="w-5 h-5 text-blue-600" />
                      Əlavə Seçimlər
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="isUrgent"
                          checked={formData.isUrgent}
                          onCheckedChange={(checked) => handleInputChange('isUrgent', checked)}
                        />
                        <Label htmlFor="isUrgent" className="text-red-600 font-medium">
                          Təcili çatdırılma (+3 AZN)
                        </Label>
                      </div>
                      <div>
                        <Label htmlFor="deliveryTime">Çatdırılma vaxtı</Label>
                        <Input
                          id="deliveryTime"
                          value={formData.deliveryTime}
                          onChange={(e) => handleInputChange('deliveryTime', e.target.value)}
                          placeholder="Sabah 14:00-da"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="notes">Əlavə qeydlər</Label>
                        <Textarea
                          id="notes"
                          value={formData.notes}
                          onChange={(e) => handleInputChange('notes', e.target.value)}
                          placeholder="Qapını döyməyin, əvvəlcədən zəng edin..."
                          className="mt-1"
                          rows={2}
                        />
                      </div>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold"
                  >
                    Sifariş Ver - {calculatedPrice > 0 ? `${calculatedPrice} AZN` : 'Qiymət hesablanır'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Qiymət cədvəli */}
          <div>
            <Card className="shadow-lg">
              <CardHeader className="bg-green-600 text-white rounded-t-lg">
                <CardTitle className="text-center">💰 Qiymət Cədvəli</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-3">
                  {priceRanges.map((range, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-lg">
                      <div className="font-semibold text-gray-800">
                        {range.min === 0 ? '0' : range.min} – {range.max === Infinity ? '10+' : range.max} km
                      </div>
                      <div className="text-green-600 font-bold">
                        {range.regular} AZN
                      </div>
                      <div className="text-red-500 text-sm">
                        Təcili: {range.urgent} AZN
                      </div>
                    </div>
                  ))}
                </div>
                
                {formData.distance > 0 && (
                  <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Sizin sifarişiniz:</h4>
                    <div className="text-blue-700">
                      <div>Məsafə: {formData.distance} km</div>
                      <div className="font-bold text-lg">
                        Qiymət: {calculatedPrice} AZN
                        {formData.isUrgent && <span className="text-red-500"> (Təcili)</span>}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="shadow-lg mt-4">
              <CardHeader className="bg-purple-600 text-white rounded-t-lg">
                <CardTitle className="text-center">📞 Əlaqə</CardTitle>
              </CardHeader>
              <CardContent className="p-4 text-center">
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2">
                    <Phone className="w-4 h-4 text-purple-600" />
                    <span className="font-semibold">+994 XX XXX XX XX</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    WhatsApp və ya zəng üçün
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;
