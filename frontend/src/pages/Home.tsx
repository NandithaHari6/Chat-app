import { useEffect, useState } from "react";

const Home = () => {
  const [users, setUsers] = useState([]);
  const fetchUsers = async () => {
    const response = await fetch("http://localhost:4000/api/users",{credentials: "include"});
    const data = await response.json();
    console.log(data);
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return <div>
    {users.map((user: any) => (
      <div key={user.id}>{user.name}</div>
    ))}
  </div>;
};

export default Home;
