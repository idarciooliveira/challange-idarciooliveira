import { useState, useEffect } from 'react';
import { Lab } from '../services/lab';
import { getAll } from '../services/server';

const key = 'lab'

export const useData = (): [Lab[], (newData: Lab) => void, () => void, number, number, number] => {
  const [data, setData] = useState<Lab[]>([]);
  const totalFunctional = data.reduce((prev, next) => prev + Number(next.functional), 0)
  const totalNumber = data.reduce((prev, next) => prev + Number(next.totalNumber), 0)
  const totalNotFunction = data.reduce((prev, next) => prev + Number(next.notFunctionl), 0)


  useEffect(() => {
    getAll().then(res => {
      setData(res)
    }).catch(er => {
      alert('Ocorreu um erro')
    })
  }, []);

  const updateData = (newData: Lab) => {
    setData((prevData) => {
      const updatedData = [...prevData];
      const updatedItemIndex = updatedData.findIndex(
        (item) => item.designation === newData.designation
      );
      if (updatedItemIndex !== -1) {
        updatedData[updatedItemIndex] = {
          ...newData,
          totalNumber: Number(newData.functional) + Number(newData.notFunctionl)
        };
      }
      localStorage.setItem(key, JSON.stringify(updatedData));
      return updatedData;
    });
  };

  const saveData = () => {
    localStorage.setItem(key, JSON.stringify(data))
    setData(data)

  }
  return [data, updateData, saveData,
    totalFunctional,
    totalNotFunction,
    totalNumber];
};

