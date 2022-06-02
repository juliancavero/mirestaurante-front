import { useEffect, useState } from "react";
import { genericFetch } from "../../utils/fetchData";
import { IncomeGraph } from "./incomeGraph";
import "./estilo.css";
import { OrderHistory } from "./orderHistory";

export function IncomeData() {
  const [graphProps, setGraphProps] = useState<IncomeGraph[]>([]);

  const [data1, setData1] = useState<number[]>([]);
  const [data1show, setData1Show] = useState(false);

  const [data2, setData2] = useState<number[]>([]);
  const [data2show, setData2Show] = useState(false);

  const [data3, setData3] = useState<number[]>([]);
  const [data3show, setData3Show] = useState(false);

  const [data4, setData4] = useState<number[]>([]);
  const [data4show, setData4Show] = useState(false);

  const { getDailyIncomeData } = genericFetch();

  useEffect(() => {
    getDailyIncomeData().then((response) => {
      let totalIncomeData = response.dailyData.map(
        (each) => each.totalIncome[0]
      );
      setData1(totalIncomeData);
      setData1Show(true);
    });
  }, []);

  useEffect(() => {
    let newProps: IncomeGraph[] = [];
    setData2([10, 14, 33, 4, 8]);
    setData3([30, 60, 90, 120, 150]);
    setData4([110, 33, 33, 0, 90]);
    if (data1show) {
      newProps = [
        ...newProps,
        {
          label: "Ingresos diarios",
          backgroundColor: "rgb(58, 219, 0)",
          borderColor: "rgb(0, 0, 0)",
          data: data1,
        },
      ];
    }
    if (data2show) {
      newProps = [
        ...newProps,
        {
          label: "Otro dato",
          backgroundColor: "rgb(158, 119, 0)",
          borderColor: "rgb(0, 0, 0)",
          data: data2,
        },
      ];
    }

    if (data3show) {
      newProps = [
        ...newProps,
        {
          label: "Tercer dato",
          backgroundColor: "rgb(255, 89, 54)",
          borderColor: "rgb(0, 0, 0)",
          data: data3,
        },
      ];
    }

    if (data4show) {
      newProps = [
        ...newProps,
        {
          label: "Cuarto dato",
          backgroundColor: "rgb(54, 255, 190)",
          borderColor: "rgb(0, 0, 0)",
          data: data4,
        },
      ];
    }

    setGraphProps(newProps);
  }, [data1show, data2show, data3show, data4show]);

  return (
    <div className="row mt-3 ms-3 str">
      <div className="col-6 d-flex align-content-center flex-wrap">
        <div className="row col-12 d-flex justify-content-center">
          <button onClick={() => setData1Show(!data1show)}>
            Mostrar ingresos diarios
          </button>
          <button onClick={() => setData2Show(!data2show)}>
            Mostrar otro dato (ejemplo)
          </button>
          <button onClick={() => setData3Show(!data3show)}>
            Mostrar otro dato (ejemplo)
          </button>
          <button onClick={() => setData4Show(!data4show)}>
            Mostrar otro dato (ejemplo)
          </button>
        </div>
        <div className="row col-12">
          <IncomeGraph props={graphProps} />
        </div>
      </div>

      <div className="col-6">
        <OrderHistory />
      </div>
    </div>
  );
}
