export function validator(data, config) {
    const errors = {};

    function validate(validateMethod, data, config) {
        let statusValidate;
        switch (validateMethod) {
            case "isRequired":
                statusValidate = data.trim() === "";
                break;
            case "isEmail": {
                const emailRegExp = /^\S+@\S+\.\S+$/g;
                statusValidate = !emailRegExp.test(data);
                break;
            }
            /* паттерн для валидации email, где
            ^, $ - знаки, обозначающие начало и конец строки,
            + - знак, показывающий, что проверяемых символов должно быть от 1 и больше,
            \ - знак экранирования,
            S - любой непробельный символ,
            g - флаг (global) который обозначает, что ищуться все совпадения, а не только первое */
            case "isCapitalLetter": {
                const capitalRegExp = /[A-Z]+/g;
                statusValidate = !capitalRegExp.test(data);
                break;
            }
            case "isContainDigit": {
                const digitRegExp = /\d+/g;
                statusValidate = !digitRegExp.test(data);
                break;
            }
            case "isMinChar": {
                statusValidate = data.length < config.value;
                break;
            }
            case "isMaxChar": {
                statusValidate = data.length > config.value;
                break;
            }
            /* паттерн для валидации пароля, где
            A-Z - диапазон проверки на наличие заглавной латинской буквы,
            d - диапазон проверки на наличие чисел,
            + - знак, показывающий, что проверяемых символов должно быть от 1 и больше,
            g - флаг (global) который обозначает, что ищуться все совпадения, а не только первое */
            default:
                break;
        }
        if (statusValidate) return config.message;
    }
    for (const fieldName in data) {
        for (const validateMethod in config[fieldName]) {
            const error = validate(
                validateMethod,
                data[fieldName],
                config[fieldName][validateMethod]
            );
            if (error && !errors[fieldName]) {
                errors[fieldName] = error;
            }
        }
    }
    return errors;
}

/* 1. Функция validator() принимает data (это значение email или пароля) и cofig (это validatorConfig).
2. Внешним циклом for перебираем названия полей email / password, внутренним циклом for перебираем названия валидаторов полей (пока это isRerquired).
3. Создаем error, значение которого будет равно вызову функции validate(), которая принимает аргументами: 
validateMethod - ключ-название валидатора для поля из validatorConfig (например isRerquired), 
data - значение поля, которое нужно проверить (например test@ya.ru),
config - объект с данными конкретного валидатора (например message: "Поле пароля обязательно для заполнения").
В самой функции ищем необходимый валидатор и применяем его к переданному полю. Если проверка не прошла возвращаем сообщение об ошибке. 
4. Делаем проверку: если для текущего поля ошибка существует, то она не будет перезаписываться на новую.
Таким образом будет возвращена и записана в объект всех ошибок errors первая найденная ошибка.
5. Возвращаем объект с найденными ошибками, где ключи - названия полей, а значения - сообщения ошибок. 
6. Добавляем переменную statusValidate, где будет содержаться результат проверки поля валидатором, если есть ошибка, то будет true? если нет - false. 
7. Создаем валидаторы для проверки на наличие заглавной латинской буквы, числа и минимально / максимальной длины пароля. */
