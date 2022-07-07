interface props {
  ID: number;
  Text: string;
  Status: string;
  message: string;
}

const Mapdata: React.FC<{ props: props[] }> = ({ props }) => {
  return (
    <div>
      {props.map((val) => {
        console.log("map", props);
        return (
          <div key={val.ID}>
            <ul>
              <li>
                {val.ID}内容：{val.Text}、状態：{val.Status}
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
      })}
    </div>
  );
};

export default Mapdata;
