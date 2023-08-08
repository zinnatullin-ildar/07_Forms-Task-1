import PropTypes from "prop-types";

const Bookmark = ({ id, status, onToggle }) => {
    return (
        <button onClick={() => onToggle(id)}>
            <i className={"bi bi-bookmark" + (status ? "-heart-fill" : "")}></i>
        </button>
    );
};

Bookmark.propTypes = {
    id: PropTypes.string.isRequired,
    status: PropTypes.bool,
    onToggle: PropTypes.func.isRequired
};

export default Bookmark;
