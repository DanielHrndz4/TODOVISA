import React, { useEffect, useState } from "react";
import { PDFViewer, Document, Page, Image, StyleSheet } from "@react-pdf/renderer";
import { Button } from "@material-tailwind/react";
import fetchData from "../../../assets/data/validation/token.validation";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'
// Estilos para el documento PDF
const styles = StyleSheet.create({
    page: {
        flexDirection: "row",
        backgroundColor: "#E4E4E4",
    },
    image: {
        width: '100%',
        height: '100%',
        alignSelf: "center"
    }
});

// Componente Guide
const Guide = () => {
    const [isValidate, setIsValidate] = useState(false);
    const navigateTo = useNavigate()
    
    useEffect(() => {
        const validation = fetchData(Cookies.get('jwt'))
        if (validation) {
            setIsValidate(validation);
        }
    },[])
    
    return (
        <>
            {isValidate ? (
                <div className="relative">
                    <div className="absolute bottom-0 left-0 bg-TVBlue border-t-white border-t-2 text-black px-4 py-4 w-full text-center">
                        <p className="text-white pb-4 lg:text-md xl:text-lg text-center ">Compra el PDF completo y capacitate para lo que viene</p>
                        <Button className="py-4 px-6 rounded-md shadowbtn bg-TVred" onClick={() => window.open('https://checkout.baccredomatic.com//LjI0YTA0NjMyMjgwMTliMTY2ZjcxOTcxNzIwNjUwNDE5', '_black')}>
                            Comprar PDF
                        </Button>
                    </div>
                    <PDFViewer className="w-full h-screen z-10">
                        <Document>
                            <Page size="letter" style={styles.page}>
                                <Image
                                    style={styles.image}
                                    src="./img/pdf/portada.jpg"
                                />
                            </Page>
                            <Page size="letter" style={styles.page}>
                                <Image
                                    style={styles.image}
                                    src="./img/pdf/page.jpg"
                                />
                            </Page>
                        </Document>
                    </PDFViewer>
                </div>
            ) : navigateTo('/')}
        </>
    )
};

export default Guide;
