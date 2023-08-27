import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../api";
import _ from "lodash";
import { paginate } from "../utils/paginate";
import Pagination from "./pagination";
import UserTable from "./usersTable";
import GroupList from "./groupList";
import SearchStatus from "./searchStatus";

const UsersList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfession] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });
    const [users, setUsers] = useState([]);
    const pageSize = 4; // количество отображаемых юзеров на странице

    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfession(data));
    }, []);

    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };

    const handleToggleBookmark = (id) => {
        const newArray = users.map((user) => {
            if (user._id === id) {
                return { ...user, bookmark: !user.bookmark };
            }
            return user;
        });
        // console.log(id);
        setUsers(newArray);
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf, search]);

    const handleProfessionSelect = (item) => {
        // console.log(item);
        if (search !== "") {
            setSearch("");
        }
        setSelectedProf(item);
    };
    const handleSearch = ({ target }) => {
        // console.log(target.value);
        setSelectedProf();
        setSearch(target.value);
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
        // console.log("page: ", pageIndex);
    };

    const handleSort = (item) => {
        // console.log(item);
        setSortBy(item);
    };

    useEffect(() => {
        if (users) {
            const filteredUsers = selectedProf
                ? users.filter(
                      (user) =>
                          JSON.stringify(user.profession) ===
                          JSON.stringify(selectedProf)
                  )
                : users;
            const usersCrop = paginate(filteredUsers, currentPage, pageSize);
            if (usersCrop.length === 0 && currentPage > 1) {
                setCurrentPage(currentPage - 1);
            }
        }
    }, [users]);

    if (users) {
        const filteredUsers = search
            ? users.filter((user) =>
                  user.name.toLowerCase().includes(search.toLowerCase())
              )
            : selectedProf
            ? users.filter(
                  (user) =>
                      JSON.stringify(user.profession) ===
                      JSON.stringify(selectedProf)
              )
            : users;

        const count = filteredUsers.length; // количество юзеров
        const sortedUsers = _.orderBy(
            filteredUsers,
            [sortBy.path],
            [sortBy.order]
        ); // выборка отсортированных юзеров (asc - по возрастанию, desс - по-убыванию)
        const usersCrop = paginate(sortedUsers, currentPage, pageSize); // выборка отфильтрованных юзеров
        // console.log(usersCrop);
        const clearFilter = () => {
            setSelectedProf();
        }; // для очистки ничего не принемаем, возвращает undefined

        return (
            <div className="d-flex">
                {professions && (
                    <div className="d-flex flex-column flex-shrink-0 p-3">
                        <GroupList
                            items={professions}
                            selectedItem={selectedProf}
                            onItemSelect={handleProfessionSelect}
                        />
                        <button
                            className="btn btn-secondary mt-2"
                            onClick={clearFilter}
                        >
                            Очистить
                        </button>
                    </div>
                )}
                <div className="d-flex flex-column">
                    <SearchStatus length={count} />
                    <input
                        type="text"
                        name="search"
                        placeholder="Search..."
                        value={search}
                        onChange={handleSearch}
                    />
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
