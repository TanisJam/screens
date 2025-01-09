import { CartItem } from '@/store/cart/slice';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

declare module 'jspdf' {
  interface jsPDF {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    autoTable: (options: any) => void;
  }
}

const generateFileName = () => {
  const date = new Date();
  const formattedDate = date.toISOString().split('T')[0];
  const formattedTime = date.toTimeString().split(' ')[0].replace(/:/g, '-');
  return `presupuesto-latinad_${formattedDate}_${formattedTime}.pdf`;
};

export const generatePDF = (
  items: CartItem[],
  getTotalDays: (item: CartItem) => number,
  calculateItemTotal: (item: CartItem) => string,
  total: string
) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;
  const margin = 20;
  let yPosition = margin;

  const primaryColor = [41, 128, 185];
  const secondaryColor = [128, 128, 128];

  doc.addImage('/logo.png', 'PNG', margin, yPosition, 39, 36);
  yPosition += 25;

  // Título
  doc.setFontSize(24);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text('PRESUPUESTO', pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 20;

  // Información de la empresa
  doc.setFontSize(10);
  doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
  doc.text('Latinad Digital Outdoor', margin, yPosition);
  doc.text(
    'Fecha: ' + new Date().toLocaleDateString(),
    pageWidth - margin,
    yPosition,
    { align: 'right' }
  );
  yPosition += 15;

  // Tabla de items
  const headers = [['Pantalla', 'Precio/día', 'Días', 'Subtotal']];
  const data = items.map((item) => [
    item.display.name,
    `$${item.display.price_per_day.toFixed(2)}`,
    getTotalDays(item),
    `$${calculateItemTotal(item)}`,
  ]);

  doc.autoTable({
    head: headers,
    body: data,
    startY: yPosition,
    theme: 'grid',
    styles: {
      fontSize: 10,
      cellPadding: 6,
      lineColor: [220, 220, 220],
      lineWidth: 0.1,
    },
    headStyles: {
      fillColor: primaryColor,
      textColor: 255,
      fontStyle: 'bold',
      halign: 'center',
    },
    columnStyles: {
      0: { cellWidth: 'auto' },
      1: { halign: 'center' },
      2: { halign: 'center' },
      3: { halign: 'right' },
    },
    alternateRowStyles: {
      fillColor: [249, 249, 249],
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  yPosition = (doc as any).lastAutoTable.finalY + 20;

  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.setFont('helvetica', 'bold');
  doc.text(`Total: $${total}`, pageWidth - margin, yPosition, {
    align: 'right',
  });

  // Pie de página
  const footerText = 'Gracias por confiar en Latinad Digital Outdoor';
  const validityText = 'Este presupuesto tiene una validez de 30 días.';
  doc.setFontSize(9);
  doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
  doc.text(footerText, pageWidth / 2, doc.internal.pageSize.height - 15, {
    align: 'center',
  });
  doc.text(validityText, pageWidth / 2, doc.internal.pageSize.height - 10, {
    align: 'center',
  });

  doc.save(generateFileName());
};
