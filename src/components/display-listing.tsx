import { List } from 'antd';

import { DisplayItem } from '@/models';
import { DisplayListItem } from './display-list-item';

interface DisplayListingProps {
  displays: DisplayItem[];
  loading?: boolean;
}

// TODO: Implement Pagination on the request
export const DisplayListing = ({ displays, loading }: DisplayListingProps) => {
  return (
    <div className="max-w-xl mx-auto p-4">
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
    </div>
  );
};
