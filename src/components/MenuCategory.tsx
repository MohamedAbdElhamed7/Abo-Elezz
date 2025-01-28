import React from 'react';
import { MenuItem } from '../types';

interface MenuCategoryProps {
  items: MenuItem[];
  showCategories?: boolean;
}

export function MenuCategory({ items, showCategories = false }: MenuCategoryProps) {
  // Group items by category when showing all items
  const groupedItems = showCategories
    ? items.reduce((acc, item) => {
        const category = item.category;
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(item);
        return acc;
      }, {} as Record<string, MenuItem[]>)
    : { '': items };

  return (
    <div className="space-y-8">
      {Object.entries(groupedItems).map(([category, categoryItems]) => (
        <div key={category} className="space-y-6">
          {showCategories && category && (
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20"></div>
              </div>
              <div className="relative flex justify-center">
                <h2 className="px-4 text-xl font-semibold text-white bg-black/40 rounded-full">
                  {category}
                </h2>
              </div>
            </div>
          )}
          <div className="grid gap-6 px-4 md:grid-cols-2 lg:grid-cols-3">
            {categoryItems.map((item, index) => (
              <div
                key={index}
                className="bg-white/95 backdrop-blur-sm rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
              >
                {/* Reverse the flex direction for RTL support */}
                <div className="flex flex-row-reverse justify-between items-start">
                  {/* Item name and description (aligned to the right) */}
                  <div className="flex-1 text-right">
                    <h3 className="text-xl font-semibold text-gray-900">{item.name}</h3>
                    <p className="mt-2 text-gray-600">{item.description}</p>
                  </div>

                  {/* Prices (aligned to the left) */}
                  <div className="ml-4 text-left">
                    {item.small_price && (
                      <div className="text-gray-900">
                        <span className="text-sm font-medium">سورى</span>
                        <span className="ml-2"> {item.small_price}</span>
                      </div>
                    )}
                    {item.medium_price && (
                      <div className="text-gray-900 mt-1">
                        <span className="text-sm font-medium">لبنانى</span>
                        <span className="ml-2"> {item.medium_price}</span>
                      </div>
                    )}
                    {item.large_price && (
                      <div className="text-gray-900 mt-1">
                        <span className="text-sm font-medium">فينو</span>
                        <span className="ml-2"> {item.large_price}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}