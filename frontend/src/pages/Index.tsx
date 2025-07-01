
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Package, Clock, Search } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
           
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

            <nav className="flex gap-4">
              <Button asChild variant="outline">
                <Link to="/track">📦 Sifariş İzlə</Link>
              </Button>
              <Button asChild>
                <Link to="/order">Yeni Sifariş</Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Sürətli və Etibarlı Kuryer Xidməti
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Bağlamalarınızı və sənədlərinizi təhlükəsiz şəkildə çatdırırıq
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8">
              <Link to="/order">Sifariş Ver</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8">
              <Link to="/track">
                <Search className="w-5 h-5 mr-2" />
                Sifarişi İzlə
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Niyə Bizi Seçməlisiniz?
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle>Sürətli Çatdırılma</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Təcili sifarişlərinizi eyni gün ərzində çatdırırıq
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle>Təhlükəsiz Daşıma</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Bağlamalarınızı diqqətlə qorunaraq çatdırırıq
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-purple-600" />
                </div>
                <CardTitle>Geniş Əhatə</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Şəhərin hər yerinə çatdırılma xidməti
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Table */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Qiymət Cədvəli
          </h3>
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left font-semibold text-gray-900">Məsafə</th>
                      <th className="px-6 py-4 text-center font-semibold text-gray-900">Adi Qiymət</th>
                      <th className="px-6 py-4 text-center font-semibold text-gray-900">Təcili (+3 AZN)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="px-6 py-4 font-medium">0 - 2 km</td>
                      <td className="px-6 py-4 text-center text-green-600 font-bold">3 AZN</td>
                      <td className="px-6 py-4 text-center text-orange-600 font-bold">6 AZN</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-6 py-4 font-medium">2 - 5 km</td>
                      <td className="px-6 py-4 text-center text-green-600 font-bold">5 AZN</td>
                      <td className="px-6 py-4 text-center text-orange-600 font-bold">8 AZN</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-6 py-4 font-medium">5 - 10 km</td>
                      <td className="px-6 py-4 text-center text-green-600 font-bold">8 AZN</td>
                      <td className="px-6 py-4 text-center text-orange-600 font-bold">11 AZN</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-medium">10+ km</td>
                      <td className="px-6 py-4 text-center text-green-600 font-bold">12 AZN</td>
                      <td className="px-6 py-4 text-center text-orange-600 font-bold">15 AZN</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">
            © 2025 Seyyar Kuryer. Bütün hüquqlar qorunur.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
