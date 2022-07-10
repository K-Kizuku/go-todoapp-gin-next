import axios from "axios";
import { useState } from "react";

const RegistName = () => {
  const [name, setName] = useState<{ Name: string }>({ Name: "" });
  const [uid, setUid] = useState<number>(0);

  const postName = () => {
    const postNamedata = async () => {
      setName({ Name: "T" });
      const res = await axios.post(`http://localhost:8080/name`, name);
      console.log("res:", res);
    };
    try {
      postNamedata();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <p>
        内容
        <input
          type="text"
          name="text"
          placeholder="入力してください"
          onChange={(e) => setName({ Name: e.target.value })}
        />
      </p>
      <a>
        <input type="submit" value="Send" onClick={postName} />
      </a>
    </div>
  );
};

export default RegistName;
