import { useState } from "react";
import "./App.css";
import dataForm from "./../data.json";
function App() {
  
  const [dataList, setList] = useState()
  const [data, setData] = useState({
    date: new Date().toLocaleDateString(),
    traveled: 0,
  });
    console.log(data);
 
  const onSubmit = (event) => {
    event.preventDefault();

    const { target } = event;
    const formData = new FormData(target);

    const data2 = Object.fromEntries(formData);
        console.log(data2, dataForm);
        let dates = data2.date, traveled = data2.traveled;
          if (dates === dataForm.find((dat)=> dat.date == dates)?.date){
            dataForm.map((dat)=> {
            if (dat.date === dates) {dat.traveled += Number(traveled)}
            })}
          else {dataForm.push({ date: dates, traveled: Number(traveled)})
          }
          console.log(dataForm);
  };
  const onChange = (event) => {
    const { target } = event;
    console.log(target)
    const { value } = target;
    setData(value);
  };
  const handleClick = (i) => {
    dataForm.splice(i, 1);
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
              value={data.date}
              onChange={onChange}
            />
          </div>
          <div className="column">
            <label htmlFor="traveled">Пробег, км</label>
            <input
              type="text"
              name="traveled"
              value={data.traveled}
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
            {[...dataForm].map((record, i) => (
              <li key={i}>
                <span>{record.date}</span> <span>{record.traveled}</span> <button className="delete" onClick={handleClick(i)}>удалить</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
