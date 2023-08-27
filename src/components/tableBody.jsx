import PropTypes from "prop-types";
import _ from "lodash";

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
}; // универсальная таблица под любой массив данных + поиск по имени

TableBody.propTypes = {
    data: PropTypes.array.isRequired,
    columns: PropTypes.object.isRequired
};

export default TableBody;
