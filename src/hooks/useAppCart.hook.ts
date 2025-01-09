import { generateUUID } from '@/utilities';
import { useAppSelector, useAppDispatch } from '@/store/root/hooks';
import { useDisplays } from '@/hooks';
import {
  addItem,
  removeItem,
  clearCart,
  selectCartItems,
} from '@/store/cart/slice';

import { Display } from '@/models';

export const useAppCart = () => {
  const dispatch = useAppDispatch();
  const { displays, displayQuery } = useDisplays();
  const items = useAppSelector(selectCartItems);

  const addToCart = (displayId: Display['id']) => {
    const existingDisplay = displays.find((d) => d.id === displayId);
    if (existingDisplay) {
      dispatch(
        addItem({
          id: generateUUID(),
          display: existingDisplay,
          date_from: displayQuery.date_from,
          date_to: displayQuery.date_to,
        })
      );
    }
  };

  const removeFromCart = (id: string) => {
    dispatch(removeItem(id));
  };

  const clearCartItems = () => {
    dispatch(clearCart());
  };

  return {
    items,
    addToCart,
    removeFromCart,
    clearCartItems,
  };
};
