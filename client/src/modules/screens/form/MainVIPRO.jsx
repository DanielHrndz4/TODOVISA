import React from "react";
import VIPROForm from "./Form";

export default function MainVIPRO(){
    return(
        <main className="w-full h-full bg-TVBlue">
            <div className="w-full lg:w-[60%] m-auto py-8">
                <VIPROForm></VIPROForm>
            </div>
        </main>
    );
}