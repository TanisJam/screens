import { Badge, Dropdown, Button } from 'antd';
import { ShoppingCartOutlined, DeleteOutlined, DownloadOutlined } from '@ant-design/icons';
import { CartItem } from '@/store/cart/slice';
import { useAppState } from '@/hooks';
import { generatePDF } from '@/utilities';


interface CartDropdownProps {
  items: CartItem[];
  onRemoveItem: (id: string) => void;
}

export const CartDropdown: React.FC<CartDropdownProps> = ({
  items,
  onRemoveItem,
}) => {
  const { addDisplay, toggleModal } = useAppState();
  const handleDisplayInfo = (id: number) => {
    addDisplay(id);
    toggleModal();
  };

  const getTotalDays = (item: CartItem) =>
    Math.ceil(
      (new Date(item.date_to).getTime() - new Date(item.date_from).getTime()) /
        (1000 * 60 * 60 * 24)
    );

  const calculateItemTotal = (item: CartItem) => {
    return (item.display.price_per_day * getTotalDays(item)).toFixed(2);
  };

  const calculateTotal = () =>
    items
      .reduce((acc, item) => acc + Number(calculateItemTotal(item)), 0)
      .toFixed(2);

  const cartContent = (
    <div className="bg-gray-800 rounded-lg shadow-lg w-[400px] max-w-[90vw] max-h-[80vh] overflow-auto">
      <div className="p-4">
        <h2 className="text-lg font-bold mb-4">Presupuesto</h2>

        {items.length === 0 ? (
          <p className="text-gray-400 text-center py-4">No hay elementos</p>
        ) : (
          <>
            <div className="space-y-4 divide-y">
              {items.map((item) => (
                <div key={item.id} className="pt-4 first:pt-0">
                  <div className="flex items-start gap-3">
                    <img
                      src={item.display.pictures[0].url}
                      alt={item.display.name}
                      className="w-16 h-16 object-cover rounded-md"
                      onError={(e) => {
                        e.currentTarget.src = '/fallback.png';
                      }}
                    />

                    <div className="flex flex-col min-w-0">
                      <Button
                        type="text"
                        className="font-semibold text-sm truncate p-0 h-auto text-left"
                        onClick={() => handleDisplayInfo(item.display.id)}
                      >
                        <span className="truncate text-ellipsis overflow-hidden">
                          {item.display.name}
                        </span>
                      </Button>
                      <p className="text-gray-400 text-sm">
                        ${item.display.price_per_day.toFixed(2)} × ~
                        {getTotalDays(item)} días
                      </p>
                    </div>

                    <div className="flex items-start gap-2">
                      <span className="font-semibold whitespace-nowrap text-sm">
                        ${calculateItemTotal(item)}
                      </span>

                      <Button
                        type="text"
                        size="small"
                        icon={<DeleteOutlined className="text-red-500" />}
                        onClick={() => onRemoveItem(item.id)}
                        className="flex items-center justify-center"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center mt-4 pt-4 border-t">
              <span className="font-bold">Total</span>
              <span className="font-bold">${calculateTotal()}</span>
            </div>

            <div className="flex gap-2 mt-4">
              <Button
                onClick={() => generatePDF(items, getTotalDays, calculateItemTotal, calculateTotal())}
                icon={<DownloadOutlined />}
                className="bg-green-500 hover:bg-green-600 text-white"
              >
                PDF
              </Button>
              <Button
                type="primary"
                className="flex-1 bg-blue-500 hover:bg-blue-600"
              >
                Checkout
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );

  return (
    <Badge count={items.length} offset={[0, 10]} size="small">
      <Dropdown
        dropdownRender={() => cartContent}
        trigger={['click']}
        placement="bottomRight"
        arrow={{ pointAtCenter: true }}
      >
        <Button
          icon={<ShoppingCartOutlined />}
          shape="circle"
          size="large"
          className="flex items-center justify-center"
        />
      </Dropdown>
    </Badge>
  );
};

