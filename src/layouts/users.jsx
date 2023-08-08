import { useParams } from "react-router-dom";
import UsersList from "../components/usersList";
import UserPage from "../components/userPage";

const Users = () => {
    const params = useParams();
    const { userId } = params;

    return <>{userId ? <UserPage userId={userId} /> : <UsersList />}</>;
    // если выбран юзер по id, рендерим карточку юзера, если нет, то весь список юзеров
};

export default Users;
