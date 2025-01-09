import { List } from 'antd';

import { DisplayItem } from '@/models';
import { DisplayListItem } from './display-list-item';

interface DisplayListingProps {
  displays: DisplayItem[];
  loading?: boolean;
}

export const DisplayListing = ({ displays, loading }: DisplayListingProps) => {
  return (
    <List
      itemLayout="horizontal"
      loading={loading}
      grid={{ gutter: 16, column: 1 }}
      dataSource={displays}
      renderItem={(item) => <DisplayListItem key={item.id} item={item} />}
      pagination={{
        pageSize: 10,
      }}
    />
  );
};
