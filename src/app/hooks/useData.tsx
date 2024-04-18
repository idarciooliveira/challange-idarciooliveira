import { useState, useEffect } from 'react';
import { Lab } from '../services/lab';
import { getAll } from '../services/server';

const key = 'lab'

export const useData = (): [Lab[], (newData: Lab) => void] => {
  const [data, setData] = useState<Lab[]>([]);

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
        updatedData[updatedItemIndex] = newData;
      }
      localStorage.setItem(key, JSON.stringify(updatedData));
      return updatedData;
    });

    console.log(newData)
  };

  return [data, updateData];
};

