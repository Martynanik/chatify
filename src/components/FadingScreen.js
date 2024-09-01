import React, {useState} from "react";
import {animated, useSpring} from "@react-spring/web";

const FadingScreen = ({ onFinish }) =>{
    const props = useSpring({
        to: {opacity: 0},
        from: {opacity: 1},
        delay: 1000,
        onRest: () => onFinish()
    });

    return(
        <div className="flex items-center justify-center h-screen">
            <animated.div style={props}>
                <section className="wrapper">
                    <div className="top">Chatify</div>
                    <div className="bottom" aria-hidden="true">Chatify</div>
                </section>
            </animated.div>
        </div>

    )
}

export default FadingScreen