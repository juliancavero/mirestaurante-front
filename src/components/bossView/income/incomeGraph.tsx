import { Chart as ChartJS, registerables } from 'chart.js';
import { useEffect, useState } from 'react';
import { Chart } from 'react-chartjs-2';
import { genericFetch } from '../../utils/fetchData';
ChartJS.register(...registerables);

type IncomeGraphProps = {
    props: {
        label: string;
        backgroundColor: string;
        borderColor: string;
        data: number[];
    }[];
};

export type IncomeGraph = {
    label: string;
    backgroundColor: string;
    borderColor: string;
    data: number[];
}

export function IncomeGraph({props}: IncomeGraphProps){

    const [ days, setDays ] = useState<string[]>([]);

    const [ data, setData ] = useState<IncomeGraph[]>([]);

    const { getDailyIncomeData } = genericFetch();

    useEffect(() => {
        getDailyIncomeData().then((data) => {
            let dias: string[] = [];
            data.dailyData.map((each) => {
                dias = [...dias, each.date];
            })
            setDays(dias);
        })
    }, []);
    
    useEffect(() => {
        setData(props);
    }, [props])

    const graphData = {
        labels: days,
        datasets: data
    };
    
    return (
            <Chart
                type={'bar'}
                data={graphData}
            />
    )
}