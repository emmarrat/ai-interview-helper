import React from 'react';
import useSpeechRecognition from '../../hooks/useSpeechRecognitionHook';

const Main = () => {
    const {
        text,
        startListening,
        stopListening,
        isListening,
        hasRecognitionSupport,
    } = useSpeechRecognition();

    return (
        <div className="main">
            {hasRecognitionSupport ? (
                <div>
                    <div className="container">
                        <button onClick={startListening} className="button">
                            Start listening
                        </button>
                        <button onClick={stopListening} className="button">
                            Stop listening
                        </button>
                    </div>

                    {isListening ? (
                        <div className="loading-animation">
                            <div className="circle" />
                            <div className="circle" />
                            <div className="circle" />
                        </div>
                    ) : null}
                    <div>{text}</div>
                </div>
            ) : (
                <div>Your browser has no speech recognition support</div>
            )}
        </div>
    );
};

export default Main;
