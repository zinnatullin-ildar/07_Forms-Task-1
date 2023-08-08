import _ from "lodash";
import { v4 as uuid } from "uuid";
import PropTypes from "prop-types"; // сниппет impt

const Pagination = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
    const pageCount = Math.ceil(itemsCount / pageSize); // количество страниц, округляем в большую сторону
    if (pageCount === 1) return null; // если pageSize больше количества user в хранилище, то ничего не выводим

    const pages = _.range(1, pageCount + 1); // получение начального массива
    // console.log(pages);

    return (
        <nav>
            <ul className="pagination">
                {pages.map((page) => (
                    <li
                        className={
                            "page-item" +
                            (page === currentPage ? " active" : "")
                        }
                        key={uuid()}
                    >
                        <button
                            className="page-link"
                            onClick={() => onPageChange(page)}
                        >
                            {page}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

Pagination.propTypes = {
    itemsCount: PropTypes.number,
    pageSize: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired
};

export default Pagination;
