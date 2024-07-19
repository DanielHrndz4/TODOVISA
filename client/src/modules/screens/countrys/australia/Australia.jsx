import React from 'react';
import lang from '../../../../assets/data/lang.data';

const Australia = () => {
  const content = lang[0].australia
  
  const Section = ({ titulo, descripcion, lista, isSingleColumn }) => (
    <div className="mb-6">
      <h2 className="text-4xl sm:text-5xl lg:text-3xl xl:text-5xl text-center text-TVBlue font-bold py-6">{titulo}</h2>
      <p className="pb-4 text-justify lg:text-md xl:text-lg">
        {descripcion}
      </p>
      <ul className={`grid ${isSingleColumn ? 'grid-cols-1' : 'grid-cols-2'} gap-2`}>
        {lista.map((item, index) => (
          <li key={index} className="text-justify lg:text-md xl:text-lg font-medium">
            <strong>-</strong> {item}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <main className="w-full h-full py-10 bg-TVgray">
      <div className="w-[95%] md:w-[85%] m-auto mb-10">
        <p className="text-justify lg:text-md xl:text-lg">
          {content.first_section.introduccion}
        </p>

        {content.first_section.secciones.map((section, index) => (
          <Section key={index} {...section} />
        ))}
        <p className="py-4 text-justify lg:text-md xl:text-lg">
        {content.first_section.resumen}
      </p>
      </div>
    </main>
  );

};


export default Australia;
