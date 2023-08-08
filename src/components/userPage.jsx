import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import api from "../api";
import QualitiesList from "../components/qualitiesList";

const UserPage = ({ userId }) => {
    const [user, setUser] = useState();
    const history = useHistory();

    const handleClick = () => {
        history.push("/users");
    };

    useEffect(() => {
        api.users.getById(userId).then((user) => {
            // console.log(user);
            setUser(user);
        });
    }, []);

    if (!user) return <h2>Loader...</h2>;

    return (
        <div>
            <h2>Имя: {user.name}</h2>
            <p>Профессия: {user.profession.name}</p>
            <QualitiesList qualities={user.qualities} />
            <p>Встретился раз: {user.completedMeetings}</p>
            <p>Рейтинг: {user.rate}</p>
            <button
                type="button"
                className="btn btn-light"
                onClick={handleClick}
            >
                Все пользователи
            </button>
        </div>
    );
};

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserPage;
