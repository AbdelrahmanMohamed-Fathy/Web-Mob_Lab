import React, { createContext, useState, useContext } from "react";

interface Item {
  id: number;
  name: string;
  description: string;
}

interface BasketContextType {
  basket: Item[];
  addToBasket: (item: Item) => void;
  removeFromBasket: (name: string) => void;
  clearBasket: () => void;
}

const BasketContext = createContext<BasketContextType | undefined>(undefined);

export const BasketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [basket, setBasket] = useState<Item[]>([]);

  const addToBasket = (item: Item) => setBasket((prev) => [...prev, item]);
  const removeFromBasket = (name: string) =>
    setBasket((prev) => prev.filter((item) => item.name !== name));
  const clearBasket = () => setBasket([]);

  return (
    <BasketContext.Provider
      value={{ basket, addToBasket, removeFromBasket, clearBasket }}
    >
      {children}
    </BasketContext.Provider>
  );
};

export const useBasket = (): BasketContextType => {
  const context = useContext(BasketContext);
  if (!context) {
    throw new Error("useBasket must be used within a BasketProvider");
  }
  return context;
};
