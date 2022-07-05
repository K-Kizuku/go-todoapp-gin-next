import axios from "axios";
import { useEffect, useState } from "react";

interface data {
  message: string;
}

interface Api {
  data: data;
  status: number;
  statusText: string;
  headers: any;
  config: any;
}

const Todo: React.FC = () => {
  const [hello, setHello] = useState<Api>();
  useEffect(() => {
    const gethello = async () => {
      const datas: Api = await axios.get(`http://localhost:8080`);
      setHello(datas);
    };
    try {
      gethello();
    } catch (err) {
      console.error(err);
    }
  }, []);
  console.log(hello);
  return <div>{hello?.data.message}</div>;
};

export default Todo;
