import React from "react";
import { cards } from "../Card";
import lang from "../../../../assets/data/lang.data";

const Mexico = () => {
  const content = lang[0].mexico;
  const firstSection = lang[0].mexico.first_section;
  const Section = ({ title, paragraphs, subsections }) => (
    <div className="mb-6">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      {paragraphs &&
        paragraphs.map((paragraph, index) => (
          <p key={index} className="mb-4">
            {paragraph}
          </p>
        ))}
      {subsections &&
        subsections.map((subsection, subIndex) => (
          <div key={subIndex} className="ml-4 mt-4">
            <h3 className="text-xl font-semibold mb-2">{subsection.title}</h3>
            {subsection.items && (
              <ul className="list-disc ml-6">
                {subsection.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="mb-1">
                    {item.text}
                    {item.link && (
                      <a
                        href={item.link}
                        className="text-TVBlue hover:cursor-pointer hover:underline ml-2"
                      >
                        Formulario TODOVISA
                      </a>
                    )}
                    {item.subitems &&
                      item.subitems.map((subitem, subIndex) => (
                        <div key={subIndex} className="ml-4 mt-2">
                          <h4 className="font-semibold">{subitem.title}</h4>
                          {subitem.options && (
                            <ul className="list-decimal ml-6">
                              {subitem.options.map((option, optIndex) => (
                                <li key={optIndex} className="mb-1">
                                  {option.title && (
                                    <span className="font-semibold">
                                      {option.title}:{" "}
                                    </span>
                                  )}
                                  {option.text}
                                  {option.details && (
                                    <ul className="list-disc ml-6">
                                      {option.details.map(
                                        (detail, detIndex) => (
                                          <li key={detIndex}>{detail}</li>
                                        )
                                      )}
                                    </ul>
                                  )}
                                  {option.note && (
                                    <p className="italic text-gray-600 mt-1">
                                      {option.note}
                                    </p>
                                  )}
                                </li>
                              ))}
                            </ul>
                          )}
                          {subitem.details && (
                            <ul className="list-disc ml-6">
                              {subitem.details.map((detail, detIndex) => (
                                <li key={detIndex}>{detail}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
    </div>
  );

  const flag = "";
  return (
    <main className="w-full h-full py-10 bg-TVgray">
      <div className="w-[95%] md:w-[85%] m-auto mb-10">
        <p className="text-justify lg:text-md xl:text-lg">
          {firstSection.introduccion}
        </p>

        {/* Sección Riqueza Cultural */}
        <h1 className="text-4xl sm:text-5xl lg:text-3xl xl:text-5xl text-center text-TVBlue font-bold pt-8 pb-4">
          {firstSection.secciones[0].titulo}
        </h1>
        <p className="py-4 text-center lg:text-md xl:text-lg">
          {firstSection.secciones[0].descripcion}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 lg:gap-4">
          {firstSection.secciones[0].tarjetas.map((card, index) =>
            cards(flag, card.imagen, card.titulo, card.descripcion)
          )}
        </div>

        {/* Sección Lugares de Interés Histórico */}
        <h1 className="text-4xl sm:text-5xl lg:text-3xl xl:text-5xl text-center text-TVBlue font-bold pt-8 pb-4">
          {firstSection.secciones[1].titulo}
        </h1>
        <p className="py-4 text-center lg:text-md xl:text-lg">
          {firstSection.secciones[1].descripcion}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 lg:gap-4">
          {firstSection.secciones[1].tarjetas.map((card, index) =>
            cards(flag, card.imagen, card.titulo, card.descripcion)
          )}
        </div>

        {/* Sección Lugares Turísticos Populares */}
        <h1 className="text-4xl sm:text-5xl lg:text-3xl xl:text-5xl text-center text-TVBlue font-bold pt-8 pb-4">
          {firstSection.secciones[2].titulo}
        </h1>
        <p className="py-4 text-center lg:text-md xl:text-lg">
          {firstSection.secciones[2].descripcion}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 lg:gap-4">
          {firstSection.secciones[2].tarjetas.map((card, index) =>
            cards(flag, card.imagen, card.titulo, card.descripcion)
          )}
        </div>

        {/* Sección Diversidad Natural */}
        <h1 className="text-4xl sm:text-5xl lg:text-3xl xl:text-5xl text-center text-TVBlue font-bold pt-8 pb-4">
          {firstSection.secciones[3].titulo}
        </h1>
        <p className="py-4 text-center lg:text-md xl:text-lg">
          {firstSection.secciones[3].descripcion}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 lg:gap-4">
          {firstSection.secciones[3].tarjetas.map((card, index) =>
            cards(flag, card.imagen, card.titulo, card.descripcion)
          )}
        </div>

        {/* Sección Hospitalidad y Accesibilidad */}
        <h1 className="text-4xl sm:text-5xl lg:text-3xl xl:text-5xl text-center text-TVBlue font-bold pt-8 pb-4">
          {firstSection.secciones[4].titulo}
        </h1>
        {firstSection.secciones[4].descripcion.map((parrafo, index) => (
          <p key={index} className="pt-4 text-justify lg:text-md xl:text-lg">
            {parrafo}
          </p>
        ))}

        {/* Sección Requisitos de Visa 2024 */}
        <h1 className="text-4xl sm:text-5xl lg:text-3xl xl:text-5xl text-center text-TVBlue font-bold py-8">
          {firstSection.secciones[5].titulo}
        </h1>
        <p className="pb-4 text-justify lg:text-md xl:text-lg">
          {firstSection.secciones[5].descripcion}
        </p>
        <ul className="grid grid-flow-row gråid-cols-2 gap-2">
          {firstSection.secciones[5].lista.map((pais, index) => (
            <li
              key={index}
              className="text-justify lg:text-md xl:text-lg font-medium"
            >
              <strong>-</strong> {pais}
            </li>
          ))}
        </ul>
      </div>

      <div className="w-full lg:w-[85%] bg-TVgray my-10 rounded-md shadowbtn px-0 lg:m-auto lg:px-10 pb-12 text-justify">
        <div className="w-[95%] md:w-[85%] lg:w-full mx-auto">
          <h1 className="text-4xl lg:text-3xl xl:text-5xl text-center text-TVBlue font-bold py-10">
            {content.title}
          </h1>
          {content.sections.map((section, index) => (
            <Section key={index} {...section} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Mexico;
