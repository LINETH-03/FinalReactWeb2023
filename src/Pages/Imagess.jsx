import React from 'react';
import { Gallery } from './Pages/Gallery';

const Images = () => {
  const images = [
    'https://cdn-icons-png.flaticon.com/512/10106/10106041.png',
    'https://img.freepik.com/vector-gratis/concepto-bancarrota-diseno-dibujado-mano_23-2148500971.jpg?w=360',
    'https://img.freepik.com/vector-premium/dibujos-animados-informe-investigacion-auditoria_430232-68.jpg',
  ];

  return (
    <Gallery images={images} />
  );
};

export default Images;

