import { List, Card, Tooltip, Typography, Button } from 'antd';
const { Title, Text } = Typography;
import { DisplayItemCarousel } from '@/components';
import { InfoCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { DisplayItem, SizeTypeText } from '@/models';
import { useBreakpoints } from '@/hooks';

interface DisplayListingProps {
  item: DisplayItem;
}

export const DisplayListItem = ({ item }: DisplayListingProps) => {
  const breakpoint = useBreakpoints();

  return (
    <List.Item>
      <Card
        className="w-full"
        styles={{ body: { padding: '0px' } }}
        actions={
          breakpoint === 'xs'
            ? [
                <Tooltip title="Más información">
                  <Button type="text" icon={<InfoCircleOutlined />} />
                </Tooltip>,
                <Tooltip title="Agregar">
                  <Button type="primary" icon={<PlusOutlined />} />
                </Tooltip>,
              ]
            : []
        }
      >
        <div className="flex sm:flex-col lg:flex-row gap-4 relative">
          <DisplayItemCarousel {...item} />
          <div className="flex-1 space-y-2 py-2 pr-2">
            <div className="flex flex-col justify-between items-start">
              <Title level={5} className="m-0 text-gray-800">
                {item.name}
              </Title>
              <div className="flex items-center gap-1">
                <Text className="text-sky-500 text-lg font-medium">
                  USD $
                  {item.price.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </Text>
                <Text type="secondary">/ Día</Text>
              </div>
            </div>

            <div className="space-y-1">
              <Text className="text-gray-300">
                Resolución {item.resolution}
              </Text>
              <br />
              <Text className="text-gray-400">
                Tamaño {SizeTypeText[item.size]}
              </Text>
              <br />
              <Text className="text-gray-400 italic">
                Duración Del Anuncio {item.duration} Segs
              </Text>
            </div>
          </div>

          <div className="flex-col gap-2 mt-2 mr-2 hidden md:flex">
            <Tooltip title="Agregar">
              <Button type="primary" icon={<PlusOutlined />} />
            </Tooltip>
            <Tooltip title="Más información">
              <Button type="text" icon={<InfoCircleOutlined />} />
            </Tooltip>
          </div>
        </div>
      </Card>
    </List.Item>
  );
};
