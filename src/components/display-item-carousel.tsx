import { DisplayItem, LocationTypeText } from '@/models';

import { Carousel, Tag } from 'antd';

export const DisplayItemCarousel = ({
  images,
  name,
  type,
}: Pick<DisplayItem, 'images' | 'name' | 'type' | 'id'>) => {
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
    <div className="relative w-36 h-48 sm:w-52 sm:h-48 flex-shrink-0 mx-auto">
      <Carousel fade dots={false} arrows>
        {images.map((image, index) => (
          <div
            key={index}
            className="relative overflow-hidden w-36 h-48 sm:w-52 sm:h-48"
          >
            <img
              alt={`${name} - View ${index + 1}`}
              src={image}
              onError={(e) => {
                e.currentTarget.src = '/fallback.png';
              }}
              
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
      <Tag
        className="absolute bottom-2 left-2"
        color={type === 'indoor' ? 'blue' : 'green'}
      >
        {LocationTypeText[type]}
      </Tag>
    </div>
  );
};
