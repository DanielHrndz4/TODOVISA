import React from "react";

export default function Payment() {
    const iframeStyles = {
        width: '100%',
        border: 'none',
        height: '325px'
    };

    const containerStyles = {
        width: '40%',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh' // para centrar verticalmente el iframe
    };

    return (
        <div style={containerStyles}>
            <div>
                <iframe
                    style={iframeStyles}
                    title="Pagar ahora"
                    src="https://checkout.baccredomatic.com/payment_button?token=LjI0YTA0NjMyMjgwMTliMTY2ZjcxOTcxNzIwNjUwNDE5&color=%23ffffff&background=%23e4002b&text=Pagar ahora&hasimage=true">
                    <p>Your browser does not support iframes.</p>
                </iframe>
            </div>
        </div>
    );
}
