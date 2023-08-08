import PropTypes from "prop-types";

const GroupList = ({
    items,
    onItemSelect,
    selectedItem,
    valueProperty,
    contentProperty
}) => {
    const itemsIsArray = Array.isArray(items) ? items : Object.values(items); // если данные приходят разных типов преобразуем в массив

    return (
        <ul className="list-group">
            {itemsIsArray.map((item) => (
                <li
                    className={
                        "list-group-item" +
                        (item === selectedItem ? " active" : "")
                    }
                    role="button"
                    key={item[valueProperty]}
                    onClick={() => onItemSelect(item)}
                >
                    {item[contentProperty]}
                </li>
            ))}
        </ul>
    );
};

GroupList.defaultProps = {
    valueProperty: "_id",
    contentProperty: "name"
}; // параметры по умолчанию для лучшей переиспользоваемости компонента

GroupList.propTypes = {
    items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onItemSelect: PropTypes.func,
    selectedItem: PropTypes.object,
    valueProperty: PropTypes.string.isRequired,
    contentProperty: PropTypes.string.isRequired
};

export default GroupList;
