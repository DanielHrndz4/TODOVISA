import React from "react";
import { cards } from "../Card";

const Mexico = () => {
    const flag = 'flag_mexico.png'
    return (
        <main className="w-full h-full my-10">
            <div className="w-[95%] lg:w-[85%] m-auto">
                <p className="text-justify lg:text-md xl:text-lg">Viajar a México es una experiencia enriquecedora y atractiva por diversas razones que incluyen su riqueza cultural, sus impresionantes sitios turísticos y su hospitalidad. Aquí se detallan algunos de los principales motivos por los que las personas eligen México como destino de viaje:</p>
                <h1 className="text-4xl sm:text-5xl lg:text-3xl xl:text-5xl text-center text-TVBlue font-bold pt-8 pb-4">Riqueza Cultural</h1>
                <p className="py-4 text-center lg:text-md xl:text-lg">México es conocido por su rica herencia cultural, la cual se refleja en sus festivales, tradiciones, gastronomía y arte.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 lg:gap-4">
                    {cards(flag, 'artes_mexico.jpg', 'Artes y Artesanías', 'Celebraciones como el Día de los Muertos, que ha sido reconocido por la UNESCO como Patrimonio Cultural Inmaterial de la Humanidad, ofrecen a los visitantes una visión profunda de las tradiciones mexicanas.')}
                    {cards(flag, 'festividad_mexico.jpg', 'Festividades', 'La comida mexicana, también declarada Patrimonio Cultural Inmaterial de la Humanidad por la UNESCO, es famosa en todo el mundo. Platillos como los tacos, el mole y el pozole son solo algunos ejemplos de la diversidad culinaria del país.')}
                    {cards(flag, 'gastronomia_mexico.jpg', 'Gastronomía', 'México cuenta con una rica tradición artesanal, incluyendo textiles, cerámica, y joyería. Las obras de artistas como Frida Kahlo y Diego Rivera también son un gran atractivo cultural.')}
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-3xl xl:text-5xl text-center text-TVBlue font-bold pt-8 pb-4">Lugares de Interés Histórico</h1>
                <p className="py-4 text-center lg:text-md xl:text-lg">México es hogar de numerosos sitios arqueológicos que atraen a turistas de todo el mundo.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 lg:gap-4">
                    {cards(flag, 'itza_mexico.jpg', 'Chichén Itzá', 'Una de las Nuevas Siete Maravillas del Mundo, esta antigua ciudad maya en Yucatán es famosa por su pirámide de Kukulkán.')}
                    {cards(flag, 'teotihuacan_mexico.jpg', 'Teotihuacán', 'Ubicada cerca de la Ciudad de México, esta antigua ciudad prehispánica es conocida por sus enormes pirámides del Sol y de la Luna.')}
                    {cards(flag, 'tulum_mexico.jpg', 'Tulum', 'Este sitio maya en la Riviera Maya combina ruinas históricas con impresionantes vistas del mar Caribe.')}
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-3xl xl:text-5xl text-center text-TVBlue font-bold pt-8 pb-4">Hospitalidad y Accesibilidad</h1>
                <p className="py-4 text-justify lg:text-md xl:text-lg">México es conocido por la calidez y hospitalidad de su gente, lo que hace que los turistas se sientan bienvenidos y cómodos. Además, su proximidad a países como Estados Unidos y Canadá y una buena infraestructura turística hacen que viajar a México sea accesible y conveniente.</p>
                <p className="pb-4 text-justify lg:text-md xl:text-lg">En resumen, la combinación de una rica herencia cultural, impresionantes sitios históricos, destinos turísticos variados, diversidad natural y hospitalidad hacen de México un destino turístico de primer nivel, atractivo para viajeros de todo el mundo</p>
                <p className="pb-6 text-justify lg:text-md xl:text-lg">A partir de 2024, los ciudadanos de los siguientes países de América Latina necesitan una visa para ingresar a México:</p>
                <ul className="grid grid-flow-row grid-cols-2 gap-2">
                    <li className="text-justify lg:text-md xl:text-lg font-medium"><strong>-</strong> Antigua y Barbuda</li>
                    <li className="text-justify lg:text-md xl:text-lg font-medium"><strong>-</strong> Brasil</li>
                    <li className="text-justify lg:text-md xl:text-lg font-medium"><strong>-</strong> Cuba</li>
                    <li className="text-justify lg:text-md xl:text-lg font-medium"><strong>-</strong> Ecuador</li>
                    <li className="text-justify lg:text-md xl:text-lg font-medium"><strong>-</strong> El Salvador</li>
                    <li className="text-justify lg:text-md xl:text-lg font-medium"><strong>-</strong> Guatemala</li>
                    <li className="text-justify lg:text-md xl:text-lg font-medium"><strong>-</strong> Guyana</li>
                    <li className="text-justify lg:text-md xl:text-lg font-medium"><strong>-</strong> Haití</li>
                    <li className="text-justify lg:text-md xl:text-lg font-medium"><strong>-</strong> Honduras</li>
                    <li className="text-justify lg:text-md xl:text-lg font-medium"><strong>-</strong> Nicaragua</li>
                    <li className="text-justify lg:text-md xl:text-lg font-medium"><strong>-</strong> República Dominicana</li>
                    <li className="text-justify lg:text-md xl:text-lg font-medium"><strong>-</strong> San Cristóbal y Nieves</li>
                    <li className="text-justify lg:text-md xl:text-lg font-medium"><strong>-</strong> Santa Lucía</li>
                    <li className="text-justify lg:text-md xl:text-lg font-medium"><strong>-</strong> Surinam</li>
                    <li className="text-justify lg:text-md xl:text-lg font-medium"><strong>-</strong> Venezuela</li>
                </ul>

            </div>
        </main>
    )
}

export default Mexico