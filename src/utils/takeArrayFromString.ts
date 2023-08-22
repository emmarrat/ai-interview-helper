export default function extractArrayFromString(inputString: string) {
    const regex = /\{[^{}]*\}/g; // Регулярное выражение для поиска объектов

    const matches = inputString.match(regex); // Находим все объекты в строке

    if (matches) {
        const extractedArray = matches.map((match) => {
            try {
                return eval('(' + match + ')'); // Используем eval для преобразования строки объекта в объект
            } catch (error) {
                console.error('Error parsing object:', error);
                return null;
            }
        });

        return extractedArray.filter((obj) => obj !== null); // Удаляем возможные нулевые значения из массива
    } else {
        console.error('No objects found in the input string.');
        return null;
    }
}
