import React from 'react';
import { Modal, Button, Row, Col, Typography } from 'antd';
import { Display } from '@/models';

const { Title, Text } = Typography;

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

  console.log('DisplayDetailsModalProps', item);

  return (
    <Modal
      title="Detalles del Item"
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose} type="primary">
          Cerrar
        </Button>,
      ]}
    >
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Title level={5}>ID</Title>
          <Text>{item.id}</Text>
        </Col>
        <Col span={12}>
          <Title level={5}>Nombre</Title>
          <Text>{item.name}</Text>
        </Col>
        <Col span={12}>
          <Title level={5}>Resolución</Title>
          <Text>{item.resolution_width} x {item.resolution_height}</Text>
        </Col>
        <Col span={12}>
          <Title level={5}>Latitud</Title>
          <Text>{item.latitude}</Text>
        </Col>
        <Col span={12}>
          <Title level={5}>Longitud</Title>
          <Text>{item.longitude}</Text>
        </Col>
        <Col span={12}>
          <Title level={5}>Área administrativa nivel 1</Title>
          <Text>{item.administrative_area_level_1}</Text>
        </Col>
        <Col span={12}>
          <Title level={5}>Área administrativa nivel 2</Title>
          <Text>{item.administrative_area_level_2}</Text>
        </Col>
        <Col span={12}>
          <Title level={5}>Dirección formateada</Title>
          <Text>{item.formatted_address}</Text>
        </Col>
        <Col span={12}>
          <Title level={5}>Código postal</Title>
          <Text>{item.zip_code}</Text>
        </Col>
        <Col span={12}>
          <Title level={5}>País</Title>
          <Text>{item.country}</Text>
        </Col>
        <Col span={12}>
          <Title level={5}>Slots</Title>
          <Text>{item.slots}</Text>
        </Col>
        <Col span={12}>
          <Title level={5}>Duración del slot</Title>
          <Text>{item.slot_length}</Text>
        </Col>
        <Col span={12}>
          <Title level={5}>Shows por hora</Title>
          <Text>{item.shows_per_hour}</Text>
        </Col>
        <Col span={12}>
          <Title level={5}>Precio por día</Title>
          <Text>{item.price_per_day}</Text>
        </Col>
        <Col span={12}>
          <Title level={5}>Tipo de ubicación</Title>
          <Text>{item.location_type}</Text>
        </Col>
        <Col span={12}>
          <Title level={5}>Tamaño del tipo</Title>
          <Text>{item.size_type}</Text>
        </Col>
        <Col span={12}>
          <Title level={5}>Ancho del tamaño</Title>
          <Text>{item.size_width}</Text>
        </Col>
        <Col span={12}>
          <Title level={5}>Altura del tamaño</Title>
          <Text>{item.size_height}</Text>
        </Col>
        <Col span={24}>
          <Title level={5}>Descripción</Title>
          <Text>{item.description}</Text>
        </Col>
        <Col span={12}>
          <Title level={5}>ISO del país</Title>
          <Text>{item.country_iso}</Text>
        </Col>
        <Col span={12}>
          <Title level={5}>CPM programático externo</Title>
          <Text>{item.external_programmatic_cpm}</Text>
        </Col>
        <Col span={12}>
          <Title level={5}>Moneda del precio</Title>
          <Text>{item.price_currency}</Text>
        </Col>
        <Col span={12}>
          <Title level={5}>CPMI</Title>
          <Text>{item.cpmi}</Text>
        </Col>
        <Col span={12}>
          <Title level={5}>Está en línea</Title>
          <Text>{item.is_online ? 'Sí' : 'No'}</Text>
        </Col>
        <Col span={24}>
          <Title level={5}>Fotos</Title>
          <div>
            {item.pictures.map((picture, index) => (
              <img key={index} src={picture.url} alt={`Imagen ${index + 1}`} style={{ width: '100px', marginRight: '10px', marginBottom: '10px' }} />
            ))}
          </div>
        </Col>
      </Row>
    </Modal>
  );
};
