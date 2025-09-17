"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { useProducts } from "@/hooks/useProducts";
import { apiClient } from "@/lib/api";
import { Shop } from "@/types";

export function ShopDetailsView() {
  const params = useParams();
  const shopId = params?.id as string;
  const [shop, setShop] = useState<Shop | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const s = await apiClient.getShop(shopId);
        if (mounted) setShop(s);
      } catch {}
    })();
    return () => {
      mounted = false;
    };
  }, [shopId]);

  const { data } = useProducts({ page: 1, limit: 12, category: "Букети" });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {shop?.name || "Магазин"}
        </h1>
        {shop?.address && (
          <p className="text-gray-600 mb-6">Адреса: {shop.address}</p>
        )}

        <h2 className="text-xl font-semibold text-gray-900 mb-4">Букети</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {data?.items?.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
