import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/data/products";

export interface CartItem {
  id: string; // unique item id including variant key
  product: Product;
  quantity: number;
  selectedWood?: string;
  selectedFabric?: string;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (
    product: Product,
    quantity?: number,
    options?: { wood?: string; fabric?: string; openDrawer?: boolean }
  ) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      addItem: (product, quantity = 1, options) => {
        const wood = options?.wood || "Jati Solid Natural";
        const fabric = options?.fabric || "Linen Alami Oatmeal";
        const itemKey = `${product.id}-${wood}-${fabric}`;

        set((state) => {
          const existingIndex = state.items.findIndex((item) => item.id === itemKey);
          let newItems = [...state.items];

          if (existingIndex > -1) {
            newItems[existingIndex] = {
              ...newItems[existingIndex],
              quantity: newItems[existingIndex].quantity + quantity,
            };
          } else {
            newItems.push({
              id: itemKey,
              product,
              quantity,
              selectedWood: wood,
              selectedFabric: fabric,
            });
          }

          return {
            items: newItems,
            isOpen: options?.openDrawer !== false ? true : state.isOpen,
          };
        });
      },

      removeItem: (itemId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== itemId),
        }));
      },

      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.id === itemId ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        );
      },
    }),
    {
      name: "karyaruang-cart-v2",
    }
  )
);
