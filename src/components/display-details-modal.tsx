import { Modal, Carousel, Button, message } from 'antd';
import { Display, LocationTypeText, SizeTypeText } from '@/models';
import {
  EnvironmentOutlined,
  GlobalOutlined,
  ClockCircleOutlined,
  FullscreenOutlined,
  DollarOutlined,
} from '@ant-design/icons';
import { useAppCart } from '@/hooks';

interface DisplayDetailsModalProps {
  visible: boolean;
  onClose: () => void;
  item: Display;
}

export const DisplayDetailsModal: React.FC<DisplayDetailsModalProps> = ({
  visible,
  onClose,
  item,
}) => {
  const { addToCart } = useAppCart();
  const [messageApi, contextHolder] = message.useMessage();

  const handleAddToCart = () => {
    addToCart(item.id);
    messageApi.success('Elemento agregado al carrito');
    onClose();
  };
  return (
    <>
      {contextHolder}
      <Modal
        title={item.name}
        open={visible}
        onCancel={onClose}
        footer={[
          <Button
            key="agregar"
            type="primary"
            className="bg-blue-500"
            onClick={handleAddToCart}
          >
            Agregar
          </Button>,
        ]}
        width={1200}
        className="top-4"
      >
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-1/2">
            <Carousel
              autoplay
              className="bg-black rounded-lg overflow-hidden group"
              arrows
            >
              {item.pictures.map((picture, index) => (
                <div key={index} className="aspect-square">
                  <img
                    src={picture.url}
                    alt={`Vista ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/fallback.png';
                    }}
                  />
                </div>
              ))}
            </Carousel>
            <div className="pt-2">
              <p className="flex items-center justify-center gap-2">
                <EnvironmentOutlined />
                {item.formatted_address}
              </p>
            </div>
          </div>

          <div className="lg:w-1/2 space-y-6">
            {item.description && (
              <div className="border rounded-lg p-4">
                <h3 className="font-medium  mb-2">Descripción</h3>
                <p className="text-sm ">{item.description}</p>
              </div>
            )}
            <div className="grid grid-cols-2 gap-4">
              <InfoCard
                icon={<FullscreenOutlined className="text-blue-500" />}
                title="Tipo"
                value={`${LocationTypeText[item.location_type]} - ${SizeTypeText[item.size_type]}`}
                subtitle={`${item.size_width.toFixed(2)}m x ${item.size_height.toFixed(2)}m`}
              />
              <InfoCard
                icon={<ClockCircleOutlined className="text-green-500" />}
                title="Tiempo de anuncios"
                value={`${item.slot_length / 1000}s`}
                subtitle={`${item.shows_per_hour} shows/hora`}
              />
              <InfoCard
                icon={<GlobalOutlined className="text-purple-500" />}
                title="Resolución"
                value={`${item.resolution_width} x ${item.resolution_height}`}
                subtitle="Calidad HD"
              />
              <InfoCard
                icon={<DollarOutlined className="text-yellow-500" />}
                title="Precio por día"
                value={`${item.price_currency} ${item.price_per_day.toFixed(2)}`}
                subtitle={`CPMI: ${item.cpmi}`}
              />
            </div>

            <div className="border rounded-lg p-4 space-y-2">
              <h3 className="font-medium ">Ubicación detallada</h3>
              <p className="text-sm ">
                {item.administrative_area_level_1},{' '}
                {item.administrative_area_level_2}
              </p>
              <p className="text-sm ">
                {item.country} ({item.country_iso})
              </p>
              <p className="text-sm ">CP: {item.zip_code}</p>
              <div className="flex gap-4 text-sm ">
                <span>Lat: {item.latitude}</span>
                <span>Long: {item.longitude}</span>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  subtitle: string;
}

const InfoCard: React.FC<InfoCardProps> = ({
  icon,
  title,
  value,
  subtitle,
}) => (
  <div className="border rounded-lg p-4 space-y-1">
    <div className="flex items-center gap-2">
      {icon}
      <span className="text-sm ">{title}</span>
    </div>
    <div className="font-semibold">{value}</div>
    <div className="text-sm text-gray-500">{subtitle}</div>
  </div>
);
