import { useState, useEffect } from 'react';
import { Input, Button, Select, Space, Form } from 'antd';
import { SearchOutlined, FilterOutlined } from '@ant-design/icons';
import { SizeTypeText, LocationTypeText, GetDisplaysParams } from '@/models';

const { Option } = Select;

interface FilterProps {
  onApplyFilters: (filters: FilterState) => void;
  onSearch: (search: string) => void;
  resetFilters: () => void;
}

type FilterState = Pick<
  GetDisplaysParams,
  'search' | 'location_type' | 'size_type' | 'price_min' | 'price_max'
>;

export const DisplayFilters: React.FC<FilterProps> = ({
  onApplyFilters,
  onSearch,
  resetFilters,
}) => {
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<FilterState>({
    location_type: [],
    size_type: [],
    price_min: 0,
    price_max: 0,
  });

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    onSearch(e.target.value);
  };

  const handleApplyFilters = () => {
    onApplyFilters(filters);
  };

  const isFiltersEmpty = Object.values(filters).every((value) => {
    if (Array.isArray(value)) {
      return value.length === 0;
    }
    return value === 0;
  });

  const handleResetFilters = () => {
    setFilters({
      location_type: [],
      size_type: [],
      price_min: 0,
      price_max: 0,
    });
    resetFilters();
    setIsFiltersVisible(false);
  };

  useEffect(() => {
    if (!isFiltersVisible) {
      setFilters({
        location_type: [],
        size_type: [],
        price_min: 0,
        price_max: 0,
      });
      resetFilters();
    }
    // This effect should only run when isFiltersVisible changes to avoid infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFiltersVisible]);

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <div className="flex gap-2 mb-2">
        <Input
          placeholder="Buscar..."
          prefix={<SearchOutlined className="text-gray-400" />}
          value={search}
          onChange={handleNameChange}
          className="flex-grow"
        />
        {!isFiltersEmpty && (
          <Button onClick={handleResetFilters}>Limpiar filtros</Button>
        )}
        <Button
          icon={<FilterOutlined />}
          onClick={() => setIsFiltersVisible(!isFiltersVisible)}
          type={isFiltersVisible ? 'primary' : 'default'}
          className="flex items-center gap-2"
        >
          {isFiltersVisible ? 'Ocultar filtros' : 'Mostrar filtros'}
        </Button>
      </div>

      {isFiltersVisible && (
        <div className="mt-4 p-4 border rounded-lg shadow-sm">
          <Form layout="vertical">
            <Space
              direction="vertical"
              size="middle"
              style={{ display: 'flex' }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Form.Item label="Tipo">
                  <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="Selecionar tipo"
                    value={filters.location_type}
                    onChange={(value) =>
                      setFilters({ ...filters, location_type: value })
                    }
                  >
                    {Object.keys(LocationTypeText).map((key) => (
                      <Option key={key} value={key}>
                        {LocationTypeText[key as keyof typeof LocationTypeText]}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item label="Tamaño">
                  <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="Selecionar tamaño"
                    value={filters.size_type}
                    onChange={(value) =>
                      setFilters({ ...filters, size_type: value })
                    }
                  >
                    {Object.keys(SizeTypeText).map((key) => (
                      <Option key={key} value={key}>
                        {SizeTypeText[key as keyof typeof SizeTypeText]}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>

              <Form.Item label="Rango de precio">
                <Space>
                  <Form.Item label="Mínimo" className="mb-0">
                    <Input
                      type="number"
                      min={0}
                      max={filters.price_max}
                      value={filters.price_min}
                      onChange={(e) =>
                        setFilters({
                          ...filters,
                          price_min: Number(e.target.value),
                        })
                      }
                      prefix="$"
                    />
                  </Form.Item>
                  <span className="text-gray-500">-</span>
                  <Form.Item label="Máximo" className="mb-0">
                    <Input
                      type="number"
                      min={filters.price_min}
                      max={1000}
                      value={filters.price_max}
                      onChange={(e) =>
                        setFilters({
                          ...filters,
                          price_max: Number(e.target.value),
                        })
                      }
                      prefix="$"
                    />
                  </Form.Item>
                </Space>
              </Form.Item>

              <Form.Item>
                <Button type="primary" onClick={handleApplyFilters} block>
                  Filtrar
                </Button>
              </Form.Item>
            </Space>
          </Form>
        </div>
      )}
    </div>
  );
};
