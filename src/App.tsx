import React, { useState } from "react";
import { useHandleTasks } from "./useHandleTasks";
import "./App.css";

const App: React.FC = () => {
  const { tasks, addTask, removeTask, setTaskDone } = useHandleTasks();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [limitDate, setLimitDate] = useState("");
  const sortedTasks = [...tasks].sort((a, b) => {
    if (!a.limitDate) return 1;
    if (!b.limitDate) return -1;
    return new Date(a.limitDate).getTime() - new Date(b.limitDate).getTime();
  });
  const [isDisplayed, setIsDisplayed] = useState(false);

  return (
    <>
      <div className="form">
        <div>
          {/** 期限の設定を可能にする（設定しないことも可能） */}
          期限を設定<input type="checkbox"
            onClick={() => {
              setIsDisplayed(!isDisplayed);
            }} />
        </div>
        <div>
          カテゴリ：<select onChange={(e) => setCategory(e.target.value)}>
            <option value=""></option>
            <option value="生活">生活</option>
            <option value="仕事">仕事</option>
            <option value="学び">学び</option>
            <option value="その他">その他</option>
          </select>
        </div>
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="button"
            value="追加"
            onClick={() => {
              addTask({ title, done: false, limitDate, category});
              setTitle("");
              setLimitDate("");
              setCategory("");
            }}
          />
        </div>
        <input type="date" value={limitDate} className={isDisplayed ? "mt-2" : "mt-2 hidden"} onChange={(e) => setLimitDate(e.target.value)} />
      </div>
      <ul>
        {sortedTasks.map((task, i) => {
          const isPastDue = task.limitDate && new Date(task.limitDate) < new Date();
          const isOverdue = isPastDue && !task.done;
          return (
            <li key={i} className={isOverdue ? "time-over" : ""}>
              <label>
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={(e) => setTaskDone(task, e.target.checked)}
                />
                <span className="category">{task.category}</span>
                {task.title}
                {task.limitDate && <span className="limit-date"> (期限: {task.limitDate})</span>}
              </label>
              <button onClick={() => removeTask(task)}>×</button>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default App;
