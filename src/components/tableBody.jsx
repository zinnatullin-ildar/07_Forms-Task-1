import PropTypes from "prop-types";
import _ from "lodash";

// Итерирование по таблице как по двумерному массиву

// const twoArray = [
//     ["[i][j]",   "[i][j+1]",   "...",   "[i][j+n]"],
//     ["[i+1][j]", "[i+1][j+1]", "...", "[i+1][j+n]"],
//     [    "...",     "...",     "...",     "..."   ],
//     ["[i+m][j]", "[i+m][j+1]", "...", "[i+m][j+n]"]
// ];

// for (let i = 0; i < twoArray.length; i++) {
//     for (let j = 0; i < twoArray[i].length; j++) {}
// } // итерация сначала по строкам, затем по столбцам

const TableBody = ({ data, columns }) => {
    const renderContent = (item, column) => {
        if (columns[column].component) {
            const component = columns[column].component;
            if (typeof component === "function") {
                return component(item);
            }
            return component; // проверка на тип данных: функция или строка
        }
        return _.get(item, columns[column].path);
        // для динамического получения вложенных данных
        // проверка наличия component, если есть, то отображаем статически
    };

    return (
        <tbody>
            {data.map((item) => (
                <tr key={item._id}>
                    {Object.keys(columns).map((column) => (
                        <td key={column}>{renderContent(item, column)}</td>
                    ))}
                </tr>
            ))}
        </tbody>
    );
}; // универсальная таблица под любой массив данных

TableBody.propTypes = {
    data: PropTypes.array.isRequired,
    columns: PropTypes.object.isRequired
};

export default TableBody;
