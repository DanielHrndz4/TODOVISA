import React from 'react';
import lang from '../../../../assets/data/lang.data';

const Englad = () => {
  const content = lang[0].englad;

  const Section = ({ titulo, descripcion, lista, isSingleColumn }) => (
    <div className="mb-6">
      <h2 className="text-4xl sm:text-5xl lg:text-3xl xl:text-5xl text-center text-TVBlue font-bold py-6">{titulo}</h2>
      {descripcion && (
        <p className="pb-4 text-justify lg:text-md xl:text-lg">{descripcion}</p>
      )}
      {lista && (
        <ul className={`grid ${isSingleColumn ? 'grid-cols-1' : 'grid-cols-2'} gap-2`}>
          {lista.map((item, index) => (
            <li key={index} className="text-justify lg:text-md xl:text-lg font-medium">
              <strong>-</strong> {item}
            </li>
          ))}
        </ul>
      )}
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

        <Section 
          titulo={content.second_section.titulo}
          lista={content.second_section.descripcion}
          isSingleColumn={true}
        />

        <Section 
          titulo={content.third_section.titulo}
          lista={content.third_section.descripcion}
          isSingleColumn={true}
        />

        <Section 
          titulo={content.fourth_section.titulo}
          lista={content.fourth_section.descripcion}
          isSingleColumn={true}
        />

        <footer className="py-4">
          <h2 className="text-2xl sm:text-3xl lg:text-2xl xl:text-3xl text-center text-TVBlue font-bold py-6">Fuentes</h2>
          <ul className="list-disc list-inside text-justify lg:text-md xl:text-lg">
            {content.footer.fuentes.map((fuente, index) => (
              <li key={index} className="pb-2">
                {fuente}
              </li>
            ))}
          </ul>
        </footer>
      </div>
    </main>
  );
};

export default Englad;
