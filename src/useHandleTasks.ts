import { useState, useEffect } from "react";

export type Task = {
  category: string;
  title: string;
  done: boolean;
  limitDate?: string; // 期限を追加（オプショナル）
};

export const useHandleTasks = () => {

  const [tasks, setTasks] = useState<Task[]>(() => {
    // localStorage から "tasks" というキーでデータを取得
    const savedTasks = localStorage.getItem("tasks");

    // データがあれば JSON としてパース、なければ初期配列を返す
    return savedTasks ? JSON.parse(savedTasks) : [
      { category: "生活", title: "買い物", done: true, limitDate: "2023-12-31" },
      { category: "仕事", title: "メール返信", done: false },
      { category: "学び", title: "レポート提出", done: false },
    ];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task: Task) => {
    setTasks([...tasks, task]);
  };

  const addLimitDate = (date: string, done: boolean) => {
    setTasks(
      tasks.map((_) => ({
        ..._,
        limitDate: date,
        done,
      }))
    );
  };


  const removeTask = (task: Task) => {
    setTasks(tasks.filter((_) => _ !== task));
    localStorage.setItem("tasks", JSON.stringify(tasks.filter((_) => _ !== task)));
  };

  const setTaskDone = (task: Task, done: boolean) => {
    setTasks(
      tasks.map((_) =>
        _ !== task
          ? _
          : {
            ...task,
            done,
          }
      )
    );
  };

  const setTaskLimitDate = (task: Task, limitDate: string) => {
    setTasks(
      tasks.map((_) =>
        _ !== task
          ? _
          : {
            ...task,
            limitDate,
          }
      )
    );
  };

  const setCategory = (task: Task, category: string) => {
    setTasks(
      tasks.map((_) =>
        _ !== task
          ? _
          : {
            ...task,
            category,
          }
      )
    );
  };


  return {
    tasks,
    addTask,
    removeTask,
    setTaskDone,
    addLimitDate,
    setTaskLimitDate,
    setCategory,
  };
};
