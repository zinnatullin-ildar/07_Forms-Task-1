import PropTypes from "prop-types";

const TableHeader = ({ onSort, selectedSort, columns }) => {
    const handleSort = (item) => {
        if (selectedSort.path === item) {
            onSort({
                ...selectedSort,
                order: selectedSort.order === "asc" ? "desc" : "asc"
            });
        } else {
            onSort({
                path: item,
                order: "asc"
            });
        } // логика сортировки при повторном нажатии и/или нажатии на другой заголовок
    };

    const renderSortArrow = (selectedSort, currentPath) => {
        if (selectedSort.path === currentPath) {
            if (selectedSort.order === "asc") {
                return <i className="bi bi-caret-down-fill"></i>;
            } else {
                return <i className="bi bi-caret-up-fill"></i>;
            }
        }
        return null;
    }; // стрелки направления сортировки

    return (
        <thead>
            <tr>
                {/* динамическое отображение колонок */}
                {Object.keys(columns).map((column) => (
                    <th
                        key={column}
                        onClick={
                            columns[column].path
                                ? () => handleSort(columns[column].path)
                                : undefined
                        } // возможность сортировать элементы в колонках только при наличии итератора
                        {...{
                            role: columns[column].path && "button"
                        }} // при наличии итератора добавляется поведение указателя мыши
                        scope="col"
                    >
                        {columns[column].name}
                        {renderSortArrow(selectedSort, columns[column].path)}
                    </th>
                ))}
            </tr>
        </thead>
    );
};

TableHeader.propTypes = {
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    columns: PropTypes.object.isRequired
};

export default TableHeader;
