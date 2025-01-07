import { useState } from 'react';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import { Form, DatePicker, Button, message, AutoComplete } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { debounce } from '@/utilities';
import { FormValues, LocationData } from '@/models';
import { createDisplaysSearchAdapter } from '@/adapters';

const { RangePicker } = DatePicker;

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  const [form] = Form.useForm();
  const router = useRouter();

  const [options, setOptions] = useState<{ value: string; label: string }[]>(
    []
  );

  const onFinish = async (values: FormValues) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(values.location)}`
      );
      const data: LocationData[] = await response.json();

      if (data.length === 0) {
        message.error(
          'Zona no encontrada. Por favor, intente con otra ubicación.'
        );
        return;
      }
      router.navigate({
        to: '/map',
        search: createDisplaysSearchAdapter(data[0], values),
      });
    } catch (error) {
      message.error('Error al buscar la ubicación');
      console.error(error);
    }
  };

  const handleSearch = debounce(async (value: string) => {
    if (value.length > 2) {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(value)}`
        );
        const data: LocationData[] = await response.json();
        const newOptions = data.map((item) => ({
          value: item.display_name,
          label: item.display_name,
        }));
        setOptions(newOptions);
      } catch (error) {
        console.error('Error buscando la ubicación:', error);
      }
    } else {
      setOptions([]);
    }
  }, 300);

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Busca tu campaña</h1>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          name="dateRange"
          label="Fecha de la campaña"
          rules={[
            {
              required: true,
              message: 'Por favor, selecciona un rango de fechas',
            },
          ]}
        >
          <RangePicker
            placeholder={['Fecha de inicio', 'Fecha de fin']}
            className="w-full"
          />
        </Form.Item>
        <Form.Item
          name="location"
          label="Ubicación"
          rules={[
            { required: true, message: 'Por favor, ingresa una ubicación' },
          ]}
        >
          <AutoComplete
            options={options}
            onSearch={handleSearch}
            placeholder="Ingresa una ubicación"
            className="w-full"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            icon={<SearchOutlined />}
            className="w-full"
          >
            Buscar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
