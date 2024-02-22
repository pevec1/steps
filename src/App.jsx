import { useState } from "react";
import "./App.css";
import dataForm from "./../data.json";
function App() {
  
  const [dataList, setList] = useState()
  const [data, setData] = useState({0:{
    date: new Date().toLocaleDateString(),
    traveled: 2,
  }});
    console.log(data);
 
  const onSubmit = (event) => {
    event.preventDefault();

    const { target } = event;
    const formData = new FormData(target);

    const data2 = Object.fromEntries(formData);
        console.log(data2, data);
        let dates = data2.date, traveled = data2.traveled;
          if (dates === Array.from(data).find((dat)=> dat.date == dates)?.date){
            Array.from(data).map((dat)=> {
            if (dat.date === dates) {dat.traveled += Number(traveled)}
            })}
          else {Array.from(data).push({ date: dates, traveled: Number(traveled)})
          }
          console.log(data);
  };
  const onChange = (event) => {
    console.log(event);
    if (event.target.name === "date") {
           setData({0:{[event.target.name]:event.target.value,["traveled"]:0}});
    }
    if (event.target.name === "traveled") {
           setData({0:{["date"]:"22.02.2024",[event.target.name]:event.target.value}});
    }
        }
  const handleClick = (i) => {
    Array.from(data).splice(i, 1);
  }

  return (
    <div className="wrapper">
      <form onSubmit={onSubmit}>
        <div className="row">
          <div className="column">
            <label htmlFor="date">Дата (ДД.ММ.ГГГГ)</label>
            <input
              type="text"
              name="date"
              value={data[0].date}
              onChange={onChange}
            />
          </div>
          <div className="column">
            <label htmlFor="traveled">Пробег, км</label>
            <input
              type="text"
              name="traveled"
              value={data[0].traveled}
              onChange={onChange}
            />
          </div>
          <div className="column">
            <button type="submit">OK</button>
          </div>
        </div>
      </form>
      <div className="row">
        <div className="answer">
          <ul>
            {Array.from(data).map((record, i) => (
              <li key={i}>
                <span>{record.date}</span> <span>{record.traveled}</span>{" "}
                <button className="delete" onClick={handleClick(i)}>
                  удалить
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
