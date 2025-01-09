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
import { message } from 'antd';

export const useAppCart = () => {
  const [messageApi] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'This is a success message',
    });
  };
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
    success();
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
