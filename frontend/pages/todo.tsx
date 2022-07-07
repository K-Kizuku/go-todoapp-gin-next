import axios from "axios";
import { useEffect, useState } from "react";
import Mapdata from "../compornent/Mapdata";

interface props {
  ID: number;
  Text: string;
  Status: string;
  message: string;
}

interface data {
  todos: props[];
}

interface Api {
  data: data;
  status: number;
  statusText: string;
  headers?: any;
  config?: any;
}

const Todo = () => {
  const defval: props[] = [{ ID: -1, Text: "", Status: "", message: "" }];
  const [hello, setHello] = useState<props[]>(defval);
  const [status, setStatus] = useState<string>("");
  const [text, setText] = useState<string>("");

  useEffect(() => {
    const gethello = async () => {
      const res = await axios.get(`http://localhost:8080`);
      console.log(res);
      setHello(res.data.todos);
    };
    try {
      gethello();
    } catch (err) {
      console.error(err);
    }
  }, []);

  const postTodo = () => {
    const postData = async () => {
      const postdata = { Status: status, Text: text };
      const res = await axios.post(`http://localhost:8080/new`, postdata);
      console.log(res);
    };
    try {
      postData();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>追加</h2>
      <form method="post">
        <p>
          内容
          <input
            type="text"
            name="text"
            placeholder="入力してください"
            onChange={(e) => setText(e.target.value)}
          />
        </p>
        <p>
          状態
          <select name="status" onChange={(e) => setStatus(e.target.value)}>
            <option value="未実行">未実行</option>
            <option value="実行中">実行中</option>
            <option value="終了">終了</option>
          </select>
        </p>
        <p>
          <input type="submit" value="Send" onClick={postTodo} />
        </p>
      </form>
      <Mapdata props={hello} />
    </div>
  );
};

export default Todo;
