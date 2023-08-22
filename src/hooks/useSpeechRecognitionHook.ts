import { useEffect, useState } from 'react';

let recognition: any = null;

if ('webkitSpeechRecognition' in window) {
    recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.lang = 'ru';
}

const useSpeechRecognition = () => {
    const [text, setText] = useState('');
    const [isListening, setIsListening] = useState(false);

    useEffect(() => {
        if (!recognition) return;

        let lastIsFinal = false;
        recognition.onresult = (event: SpeechRecognitionEvent) => {
            let recognizedText = '';
            for (let i = event.resultIndex; i < event.results.length; i++) {
                if (event.results[i].isFinal) {
                    let recordedText =
                        event.results[i][0].transcript[0].toUpperCase() +
                        event.results[i][0].transcript.slice(1);
                    recognizedText += recordedText;
                    lastIsFinal = true;
                } else {
                    lastIsFinal = false;
                }
            }

            setText((prevText) => prevText + recognizedText);
            // recognition.stop();
            // setIsListening(false);
        };
    }, []);

    const startListening = () => {
        setText('');
        setIsListening(true);
        recognition.start();
    };

    const stopListening = () => {
        recognition.stop();
        setIsListening(false);
    };

    return {
        text,
        isListening,
        startListening,
        stopListening,
        hasRecognitionSupport: !!recognition,
    };
};

export default useSpeechRecognition;
