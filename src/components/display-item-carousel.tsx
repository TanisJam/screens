import { DisplayItem, LocationTypeText } from '@/models';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button, Carousel, Tag } from 'antd';
import { useRef } from 'react';

export const DisplayItemCarousel = ({
  images,
  name,
  type,
  id,
}: Pick<DisplayItem, 'images' | 'name' | 'type' | 'id'>) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const carouselRefs = useRef<{ [key: string]: any }>({});

  const handlePrev = (itemId: number) => {
    carouselRefs.current[itemId]?.prev();
  };
  const handleNext = (itemId: number) => {
    carouselRefs.current[itemId]?.next();
  };

  const onMouseEnter = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    const img = e.currentTarget;
    const rect = img.getBoundingClientRect();
    const containerWidth = rect.width;
    const scale = Math.min(1.5, window.innerWidth / containerWidth);
    img.style.transform = `scale(${scale})`;
  };

  const onMouseLeave = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    const img = e.currentTarget;
    img.style.transform = 'scale(1)';
  };

  const onMouseMove = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    const img = e.currentTarget;
    const rect = img.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    img.style.transformOrigin = `${x}% ${y}%`;
  };

  return (
    <div className="relative w-36 h-48 sm:w-52 sm:h-48 flex-shrink-0">
      <Carousel
        fade
        dots={false}
        ref={(ref) => (carouselRefs.current[id] = ref)}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="relative overflow-hidden w-36 h-48 sm:w-52 sm:h-48"
          >
            <img
              alt={`${name} - View ${index + 1}`}
              src={image}
              className="w-36 h-48 sm:w-52 sm:h-48 object-cover rounded-md"
              style={{
                transform: 'scale(1)',
                transformOrigin: '0% 0%',
                transition: 'transform 0.3s ease',
              }}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
              onMouseMove={onMouseMove}
            />
          </div>
        ))}
      </Carousel>
      {images.length > 1 && (
        <>
          <Button
            icon={<LeftOutlined />}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 !min-w-0 h-8 w-8 bg-transparent border-0 hover:!bg-gray-900/60"
            onClick={() => handlePrev(id)}
          />
          <Button
            icon={<RightOutlined />}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 !min-w-0 h-8 w-8 bg-transparent border-0 hover:!bg-gray-900/60"
            onClick={() => handleNext(id)}
          />
        </>
      )}
      <Tag
        className="absolute bottom-2 left-2"
        color={type === 'indoor' ? 'blue' : 'green'}
      >
        {LocationTypeText[type]}
      </Tag>
    </div>
  );
};
