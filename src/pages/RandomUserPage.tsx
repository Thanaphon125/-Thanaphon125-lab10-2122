import { useEffect, useState } from "react";
import UserCard from "../components/UserCard";
import { cleanUser } from "../libs/CleanUser";
import axios from "axios";

export default function RandomUserPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [genAmount, setGenAmount] = useState(1);

  useEffect(() => {
    const stored = localStorage.getItem("genAmount");
    if (stored) {
      setGenAmount(Number(stored));
    }
  }, []);

  const generateBtnOnClick = async () => {
    setIsLoading(true);
    localStorage.setItem("genAmount", genAmount.toString());

    const resp = await axios.get(
      `https://randomuser.me/api/?results=${genAmount}`
    );

    const rawUsers = resp.data.results;
    const cleanedUsers = rawUsers.map(cleanUser);

    setUsers(cleanedUsers);
    setIsLoading(false);
  };

  return (
    <div style={{ maxWidth: "700px" }} className="mx-auto">
      <p className="display-4 text-center fst-italic m-4">Users Generator</p>

      <div className="d-flex justify-content-center align-items-center fs-5 gap-2">
        Number of User(s)
        <input
          className="form-control text-center"
          style={{ maxWidth: "100px" }}
          type="number"
          value={genAmount}
          onChange={(event: any) => setGenAmount(Number(event.target.value))}
        />
        <button className="btn btn-dark" onClick={generateBtnOnClick}>
          Generate
        </button>
      </div>

      {isLoading && (
        <p className="display-6 text-center fst-italic my-4">Loading ...</p>
      )}

      {!isLoading &&
        users.map((user) => (
          <UserCard key={user.email} {...user} />
        ))}
    </div>
  );
}
