import PropTypes from "prop-types";

const SearchStatus = ({ length }) => {
    const renderPhrase = () => {
        if (length === 1) return `${length} человек тусанет с тобой сегодня`;
        if (length === 2 || length === 3 || length === 4) {
            return `${length} человека тусанет с тобой сегодня`;
        }
        if (length === 0) {
            return `Никто не тусанет с тобой сегодня`;
        }
        return `${length} человек тусанет с тобой сегодня`;
    };

    return (
        <>
            <h2>
                <span
                    className={
                        "badge m-2 p-3 bg-" +
                        (length > 0 ? "primary" : "danger")
                    }
                >
                    {renderPhrase(length)}
                </span>
            </h2>
        </>
    );
};

SearchStatus.propTypes = {
    length: PropTypes.number
};

export default SearchStatus;
