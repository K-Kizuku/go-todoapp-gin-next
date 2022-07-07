import axios from "axios";
import { useEffect, useState } from "react";
import fetch from "isomorphic-unfetch";
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

// const Ak: React.FC<props[]> = (data) => {
//   return (
//     <div>
//       {data.map((val) => {
//         return (
//           <div key={val.id}>
//             <ul>
//               <li>
//                 {val.id}内容：{val.text}、状態：{val.status}
//                 <label>
//                   <a href="/detail/{{.ID}}">編集</a>
//                 </label>
//                 <label>
//                   <a href="/delete_check/{{.ID}}">削除</a>
//                 </label>
//               </li>
//             </ul>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

const Todo = () => {
  const defval: props[] = [{ ID: -1, Text: "", Status: "", message: "" }];
  //  [ { todos:{ id: -1, text: "", status: "", message: "" } }
  var check = false;
  //const def: Api = { data: defval, status: 0, statusText: "" };
  const [hello, setHello] = useState<props[]>(defval);
  const [status, setStatus] = useState<string>("");
  const [text, setText] = useState<string>("");
  useEffect(() => {
    const gethello = async () => {
      const res = await axios.get(`http://localhost:8080`);
      console.log(res);
      setHello(res.data.todos);
      // const tmp: Api = await res.data;
      // if (tmp.data === undefined) {
      //   return;
      // }
      // await setHello(tmp.data.todos);
      //console.log(hello);
      // const temp = JSON.parse(JSON.stringify(res.data));
      // console.log(temp);
      // const datas: data[] = temp.data ?? defval;
      // setHello(datas);
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
      // const res1 = await axios.post(`http://localhost:8080/new`, text);
      // console.log(res1);
    };
    try {
      postData();
      check = !check;
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
      {/* <Ak data={hello} /> */}
      <Mapdata props={hello} />
      {/* {hello.map((val) => {
        console.log("map", hello);
        return (
          <div key={val.id}>
            <ul>
              <li>
                {val.id}内容：{val.text}、状態：{val.status}
                <label>
                  <a href="/detail/{{.ID}}">編集</a>
                </label>
                <label>
                  <a href="/delete_check/{{.ID}}">削除</a>
                </label>
              </li>
            </ul>
          </div>
        );
      })} */}
    </div>
  );
};

// Todo.getInitialProps = async () => {
//   const defval: props[] = [{ id: -1, text: "", status: "", message: "" }];
//   const gethello = async () => {
//     const res = await axios.get(`http://localhost:8080`);
//     console.log(res);
//     const tmp: Api = res.data;
//     if (tmp.data === undefined) {
//       return { props: defval };
//     }
//     const data = tmp.data.todos;
//     return { props: data };
//     // setHello(tmp.data.todos);
//     // console.log(hello);
//     // const temp = JSON.parse(JSON.stringify(res.data));
//     // console.log(temp);
//     // const datas: data[] = temp.data ?? defval;
//     // setHello(datas);
//   };
//   try {
//     gethello();
//   } catch (err) {
//     console.error(err);
//     return { props: defval };
//   }
//   return { props: defval };
// };

export default Todo;
