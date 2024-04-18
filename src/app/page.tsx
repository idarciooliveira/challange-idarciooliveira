'use client'
import { Lab } from "./services/lab";
import { useData } from "./hooks/useData";

export default function Home() {

  const [data, updateData] = useData()

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, item: Lab) => {
    const newData = { ...item, };
    //@ts-ignore
    newData[event.target.name] = event.target.value;
    updateData(newData);
  };

  return (
    <div className="min-h-screen w-full grid grid-cols-[1fr,4fr]">
      <aside className="bg-[#999999]" />
      <main className="bg-[#F4F4F4] p-8">
        <h2 className="text-neutral-950 font-semibold text-2xl">
          Editar Escola 68
        </h2>

        <table className="w-full bg-red-500 mt-4 p-2">
          <thead className="bg-[#999999] h-[62px]">
            <tr>
              <th>Designação</th>
              <th>Funcionais</th>
              <th>Não Funcionais</th>
              <th>Número total</th>
            </tr>
          </thead>
          <tbody className="text-center bg-[#EAEAEA] h-[64px]  py-4">
            {data.length > 0 && data.map(lab => (
              <tr key={lab.designation} className="border border-solid border-[#999999]" >
                <td>{lab.designation}</td>
                <td>
                  <input disabled={lab.designation == 'Salas de Aula Teóricas'}
                    value={lab.functional}
                    name="functional"
                    className="w-14 text-center p-1" type="number" min={0}
                    onChange={(event) => handleInputChange(event, lab)} />
                </td>
                <td>
                  <input disabled={lab.designation == 'Salas de Aula Teóricas'}
                    value={lab.notFunctionl} className="w-14 text-center p-1" type="number" min={0}
                    onChange={(event) => handleInputChange(event, lab)}
                    name="notFunctionl" />
                </td>

                <td> <input
                  value={lab.totalNumber} className="w-14 text-center p-1" type="number" min={0}
                  onChange={(event) => handleInputChange(event, lab)}
                  name="totalNumber"
                />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex flex-row items-center justify-end">
          <button className="bg-[#2B6AB5] h-[58px] w-[263px] text-white border-4 mt-4 place-self-center">
            Actualizar
          </button>

        </div>
      </main>
    </div>
  );
}
