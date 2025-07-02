'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Package, MapPin, Phone, User, Clock } from 'lucide-react';
import { calculatePrice, priceRanges } from '@/utils/priceCalculator';
import { toast } from '@/hooks/use-toast';
import { API_URL } from './AdminPanel';

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.firstName || !formData.lastName || !formData.phoneNumber ||
      !formData.packageName || !formData.pickupAddress || !formData.deliveryAddress
    ) {
      toast({
        title: "Xəta",
        description: "Zəhmət olmasa bütün məcburi sahələri doldurun",
        variant: "destructive"
      });
      return;
    }

    try {
      const res = await fetch(`${API_URL}/order/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          price: calculatedPrice,
        }),
      });

      if (!res.ok) {
        throw new Error('Sifariş göndərilə bilmədi');
      }

      const data = await res.json();

      toast({
        title: "Uğurlu!",
        description: `Sifarişiniz qəbul edildi. Sifariş nömrəsi: ${data.orderId || data._id}`,
      });

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
    } catch (error) {
      console.error(error);
      toast({
        title: "Xəta",
        description: "Sifariş göndərilərkən problem yarandı",
        variant: "destructive"
      });
    }
  };

// ...existing code...
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
       <div className="text-center mb-4">
   
<h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-3">
  <span>
    <svg width="40" height="40" viewBox="0 0 32 32" fill="none">
      <rect x="2" y="18" width="8" height="6" rx="3" fill="#2563eb"/>
      <rect x="22" y="18" width="8" height="6" rx="3" fill="#2563eb"/>
      <rect x="8" y="10" width="16" height="12" rx="3" fill="#60a5fa"/>
      <rect x="12" y="5" width="8" height="6" rx="2" fill="#a5b4fc"/>
      <circle cx="8" cy="27" r="3" fill="#1e293b"/>
      <circle cx="24" cy="27" r="3" fill="#1e293b"/>
      <path d="M16 13v-4" stroke="#1e293b" strokeWidth="2" strokeLinecap="round"/>
      <path d="M30 24c-1.5-2-3-3-6-3H8c-3 0-4.5 1-6 3" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M20 8l2-3" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M12 8l-2-3" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  </span>
  <span className="flex flex-col leading-tight">
    <span>Səyyar</span>
    <span className="text-blue-600 font-extrabold tracking-wide -mt-1">Kuryer</span>
  </span>
</h1>
     {/* Navbar stilində butonlar */}
          <nav className="flex justify-center gap-4 mt-4 mb-2 w-full">
            <a
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-md bg-gray-100 text-blue-700 text-base font-medium shadow hover:bg-gray-200 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M3 12l9-9 9 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 21V9h6v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Ana səhifə
            </a>
            <a
              href="/track"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-md bg-blue-600 text-white text-base font-medium shadow hover:bg-green-700 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              Sifarişi izlə
            </a>
          </nav>
        </div>
         
    

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card className="shadow-lg">
              <CardHeader className="bg-blue-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Yeni Sifariş
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  {/* Müştəri məlumatları */}
                  <div>
                    <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-3 sm:mb-4">
                      <User className="w-5 h-5 text-blue-600" />
                      Müştəri Məlumatları
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
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
                      <div className="sm:col-span-2">
                        <Label htmlFor="phoneNumber">Əlaqə nömrəsi *</Label>
                        <Input
                          id="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                          placeholder="055 245 99 55"
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Bağlama məlumatları */}
                  <div>
                    <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-3 sm:mb-4">
                      <Package className="w-5 h-5 text-blue-600" />
                      Bağlama / Sənəd Məlumatları
                    </h3>
                    <div className="space-y-3 sm:space-y-4">
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
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
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
                    <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-3 sm:mb-4">
                      <MapPin className="w-5 h-5 text-blue-600" />
                      Ünvanlar
                    </h3>
                    <div className="space-y-3 sm:space-y-4">
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
                    <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-3 sm:mb-4">
                      <Clock className="w-5 h-5 text-blue-600" />
                      Əlavə Seçimlər
                    </h3>
                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="isUrgent"
                          checked={formData.isUrgent}
                          onCheckedChange={(checked) => handleInputChange('isUrgent', !!checked)}
                        />
                        <Label htmlFor="isUrgent" className="text-red-600 font-medium">
                          Təcili çatdırılma (+2 AZN)
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

          {/* Qiymət və Əlaqə hissəsi */}
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
                    <span className="font-semibold">+994 55 245 99 55</span>
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
// ...existing code...
};

export default OrderForm;
