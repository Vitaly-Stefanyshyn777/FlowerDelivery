"use client";

import Link from "next/link";
import { Header } from "@/components/Header";

const DEMO_SHOPS = [
  {
    id: "761ed028-1003-43cd-aa26-26370908ab1d",
    name: "Квітковий рай",
    address: "Київ",
  },
  {
    id: "ee2cdbe6-5e6c-4222-bde3-d1fc754d6007",
    name: "Ромашкове поле",
    address: "Київ",
  },
  {
    id: "15507b63-c0ab-4ae8-ba35-bb5bc9f834d1",
    name: "Трояндовий сад",
    address: "Львів",
  },
];

export function ShopsListView() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Магазини</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {DEMO_SHOPS.map((s) => (
            <Link
              key={s.id}
              href={`/shops/${s.id}`}
              className="block p-5 bg-white border rounded-lg hover:shadow-md transition"
            >
              <div className="text-lg font-semibold text-gray-900">
                {s.name}
              </div>
              <div className="text-sm text-gray-600">{s.address}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
