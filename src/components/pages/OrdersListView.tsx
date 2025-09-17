"use client";

import Link from "next/link";
import { Header } from "@/components/Header";
import { useOrders } from "@/hooks/useOrders";
import { Loader2, AlertCircle, Search, Calendar, MapPin } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { uk } from "date-fns/locale";

export function OrdersListView() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const { data, isLoading, error } = useOrders(page, 10);

  const formatDate = (d: string) =>
    format(new Date(d), "dd MMM yyyy, HH:mm", { locale: uk });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-pink-500" />
            <span className="ml-2 text-gray-600">
              Завантаження замовлень...
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Помилка завантаження
            </h2>
            <p className="text-gray-600">
              Не вдалося завантажити список замовлень.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const filtered = data?.items.filter((o) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      o.id.toLowerCase().includes(q) ||
      o.deliveryAddr.toLowerCase().includes(q) ||
      o.shop.name.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Мої замовлення
          </h1>
          <p className="text-gray-600">Переглядайте історію ваших замовлень</p>
        </div>

        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="Пошук за ID, адресою або магазином..."
            />
          </div>
        </div>

        {!filtered || filtered.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Замовлень не знайдено
            </h2>
            <p className="text-gray-600">
              {searchQuery
                ? "Спробуйте змінити пошуковий запит"
                : "У вас поки немає замовлень"}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((order) => (
              <Link
                key={order.id}
                href={`/orders/${order.id}`}
                className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Замовлення #{order.id}
                      </h3>
                      <span className="text-xl font-bold text-pink-600">
                        {order.totalPrice} ₴
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{order.shop.name}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>{formatDate(order.createdAt)}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      Доставка: {order.deliveryAddr}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {data && data.totalPages > 1 && (
          <div className="flex justify-center mt-8 space-x-2">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="px-3 py-2 text-sm font-medium rounded-md text-gray-500 bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Попередня
            </button>
            {Array.from({ length: data.totalPages }, (_, i) => i + 1).map(
              (p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`px-3 py-2 text-sm font-medium rounded-md ${
                    p === page
                      ? "bg-pink-500 text-white"
                      : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {p}
                </button>
              )
            )}
            <button
              onClick={() => setPage(page + 1)}
              disabled={page === data.totalPages}
              className="px-3 py-2 text-sm font-medium rounded-md text-gray-500 bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Наступна
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
