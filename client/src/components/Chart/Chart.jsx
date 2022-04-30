import React, {useState, useEffect} from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Bar } from 'react-chartjs-2';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  
const Charts = ({dist, distData, setDistData, targetData}) => {
    const [men, setMen] = useState({
      men_ordinary: 0,
      men_single: 0,
    })

    const [female, setFemale] = useState({
      female_ordinary: 0,
      female_single: 0,
    })

    const labels = ['共同生活戶', '獨立生活戶'];

    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
        },
      },
    };
    
    const data = {
      labels,
      datasets: [
        {
          label: '男',
          data: Object.values((men)),
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
        {
          label: '女',
          data: Object.values((female)),
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ],
    };

    const caculateDistTotal = (dist, targetData) => {
        const distOrdinaryM = targetData.filter((res) => res.site_id.substring(3,6) === dist).reduce((acc, obj) => acc + Number(obj.household_ordinary_m), 0);
        const distOrdinaryF = targetData.filter((res) => res.site_id.substring(3,6) === dist).reduce((acc, obj) => acc + Number(obj.household_ordinary_f), 0);
        const distSingleM = targetData.filter((res) => res.site_id.substring(3,6) === dist).reduce((acc, obj) => acc + Number(obj.household_single_m), 0);
        const distSingleF = targetData.filter((res) => res.site_id.substring(3,6) === dist).reduce((acc, obj) => acc + Number(obj.household_single_f), 0);
        
        setDistData({
          ...distData,
          dist_household_ordinary_m: distOrdinaryM,
          dist_household_ordinary_f: distOrdinaryF,
          dist_household_single_m: distSingleM,
          dist_household_single_f: distSingleF,
        }) 
    }

    const caculatePercentage = (distData) => {
      setMen({
        ...men,
        men_ordinary: (distData.dist_household_ordinary_m / distData.city_household_ordinary_m * 100).toFixed(2),
        men_single: (distData.dist_household_single_m / distData.city_household_single_m * 100).toFixed(2),
      }) 

      setFemale({
        ...female,
        female_ordinary: (distData.dist_household_ordinary_f / distData.city_household_ordinary_f * 100).toFixed(2),
        female_single: (distData.dist_household_single_f / distData.city_household_single_f * 100).toFixed(2),
      }) 
    }

    useEffect(() => {
      if(dist !== "" && targetData !== undefined){
        caculateDistTotal(dist, targetData)
      }
    }, [dist])

    useEffect(() => {
      if(dist !== "" && distData.dist_household_ordinary_m !== 0){
        caculatePercentage(distData)
      }
    }, [distData.dist_household_ordinary_m])

    return (
        <Bar options={options} data={data} className="mt-5" width={350} height={300}/>
    )
}

export default Charts;