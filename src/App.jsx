import { useEffect, useState } from "react";
import "./App.css";

function generateEquation() {
  const type = Math.floor(Math.random() * 2);

  if (type === 1) {
    const sign = ["+", "-"][Math.floor(Math.random() * 2)];
    const n1 = Math.floor(Math.random() * 200) + 1,
      n2 = Math.floor(Math.random() * 200) + 1,
      n3 = sign === "+" ? n1 + n2 : n1 - n2;
    const result = [n1, n2, n3];
    const i = Math.floor(Math.random() * 3);
    const answer = result[i];
    result[i] = null;

    return { data: [result[0], sign, result[1], "=", result[2]], answer };
  } else {
    const sign = ["*", "/"][Math.floor(Math.random() * 2)];
    const n1 = Math.floor(Math.random() * 40) + 1,
      n2 = Math.floor(Math.random() * 40) + 1,
      n3 = n1 * n2;

    const result = sign === "*" ? [n1, n2, n3] : [n3, n1, n2];
    const i = Math.floor(Math.random() * 3);
    const answer = result[i];
    result[i] = null;

    return { data: [result[0], sign, result[1], "=", result[2]], answer };
  }
}

function App() {
  const [value, setValue] = useState("");

  const [{ data, answer }, setEquation] = useState(generateEquation);

  useEffect(() => {
    if (Number(value) === answer) {
      setEquation(generateEquation());
      setValue("");
    }
  }, [value, answer]);

  const renderItem = (item, idx) => {
    if (typeof item === "number")
      return (
        <div
          key={idx}
          className="text-3xl text-slate-700 font-bold p-4 rounded-lg bg-sky-200"
        >
          {item}
        </div>
      );
    if (typeof item === "string")
      return (
        <div key={idx} className="text-3xl text-slate-700 font-bold p-4">
          {item}
        </div>
      );
    return (
      <div key={idx}>
        <input
          autoFocus
          className="text-3xl text-teal-600 font-bold p-4 w-24 rounded-lg"
          type="number"
          value={value}
          onInput={(e) => setValue(e.currentTarget.value)}
        />
      </div>
    );
  };

  return (
    <div className="h-screen grid place-items-center bg-fuchsia-50">
      <div className="flex gap-4">{data.map(renderItem)}</div>
    </div>
  );
}

export default App;
