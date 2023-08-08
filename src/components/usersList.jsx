import { useState, useEffect } from "react";
import Pagination from "./pagination";
import UserTable from "./usersTable";
import GroupList from "./groupList";
import SearchStatus from "./searchStatus";
import { paginate } from "../utils/paginate";
import api from "../api";
import PropTypes from "prop-types";
import _ from "lodash";

const UsersList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfession] = useState([]);
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });
    const pageSize = 8; // количество отображаемых юзеров на странице
    const [users, setUsers] = useState([]);

    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);

    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };

    const handleToggleBookmark = (id) => {
        setUsers(
            users.map((user) => {
                if (user._id === id) {
                    return {
                        ...user,
                        bookmark: !user.bookmark
                    };
                }
                return user;
            })
        );
        // console.log(id);
    };

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfession(data));
    }, []);

    const handleProfessionSelect = (item) => {
        // console.log(item);
        setSelectedProf(item);
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
        // console.log("page: ", pageIndex);
    };

    const handleSort = (item) => {
        // console.log(item);
        setSortBy(item);
    };

    if (users) {
        const filteredUsers = selectedProf
            ? users.filter(
                  (user) =>
                      JSON.stringify(user.profession) ===
                      JSON.stringify(selectedProf) // данные приводим к строке и сравниваем строки
              )
            : users;

        const count = filteredUsers.length; // количество юзеров
        const sortedUsers = _.orderBy(
            filteredUsers,
            [sortBy.path],
            [sortBy.order]
        ); // выборка отсортированных юзеров (asc - по возрастанию, desс - по-убыванию)
        const usersCrop = paginate(sortedUsers, currentPage, pageSize); // выборка отфильтрованных юзеров
        // console.log(userCrop);

        const clearFilter = () => {
            setSelectedProf(); // для очистки ничего не устанавливаем (undefined)
        };

        useEffect(() => {
            if (
                currentPage > Math.ceil(users.length / pageSize) &&
                currentPage > 1
            ) {
                setCurrentPage(currentPage - 1);
            }
        }, [users]);

        useEffect(() => {
            setCurrentPage(1);
        }, [selectedProf]);

        return (
            <div className="d-flex">
                {professions && (
                    <div className="d-flex flex-column flex-shrink p-3">
                        <GroupList
                            items={professions}
                            selectedItem={selectedProf}
                            onItemSelect={handleProfessionSelect}
                        />
                        <button
                            className="btn btn-secondary m-2"
                            onClick={clearFilter}
                        >
                            Очистить
                        </button>
                    </div>
                )}

                <div className="d-flex flex-column">
                    <SearchStatus length={count} />
                    {count > 0 && (
                        <UserTable
                            users={usersCrop}
                            onSort={handleSort}
                            selectedSort={sortBy}
                            onDelete={handleDelete}
                            onToggleBookmark={handleToggleBookmark}
                        />
                    )}

                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemsCount={count}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        );
    }
    return "Loading...";
};

UsersList.propTypes = {
    users: PropTypes.array
};

export default UsersList;
