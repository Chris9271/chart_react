import React, {useState, useEffect} from 'react';
import Charts from '../Chart/Chart';
import axios from 'axios';
import Spinner from '../Spinner/Spinner';
import Selector from '../Selector/Selector';
import {API_URL} from '../utils/config';
import './Display.css';

const Display = ({dist, setDist}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [targetData, setTargetData] = useState();
  const [distData, setDistData] = useState({
    city_household_ordinary_m: 0,
    city_household_ordinary_f: 0,
    city_household_single_m: 0,
    city_household_single_f: 0,
    dist_household_ordinary_m: 0,
    dist_household_ordinary_f: 0,
    dist_household_single_m: 0,
    dist_household_single_f: 0,
})

  const sourceData = async() => {
    const source = await axios.get(API_URL, {withCredentials: true});
    const result = source.data.result.records.filter((res) => res.district_code.substring(0, 5) === "63000");
    setTargetData(result);
    caculateCityTotal(result);
    setIsLoading(true);
}

// 計算全行政區總和
const caculateCityTotal = (result) => {
    const cityOrdinaryM = result.reduce((acc, obj) => acc + Number(obj.household_ordinary_m), 0);
    const cityOrdinaryF = result.reduce((acc, obj) => acc + Number(obj.household_ordinary_f), 0);
    const citySingleM = result.reduce((acc, obj) => acc + Number(obj.household_single_m), 0);
    const citySingleF = result.reduce((acc, obj) => acc + Number(obj.household_single_f), 0);
    setDistData({
      ...distData,
      city_household_ordinary_m: cityOrdinaryM,
      city_household_ordinary_f: cityOrdinaryF,
      city_household_single_m: citySingleM,
      city_household_single_f: citySingleF,
    })  
}
  
  const handleDist = (e) => {
    setDist(e.target.value)
  }

  useEffect(() => {
    sourceData();
  }, [dist])

  return (
    <div className="col-lg-9 py-3 bg-color content">
      <div className="laptop">
        <Selector handleDist={handleDist} dist={dist}/>
      </div>
      {
        !isLoading 
        ? 
        <Spinner/> 
        : 
        dist === ""
        ? 
        <h2 className="text-center mt-5">請選擇一個行政區以顯示資料</h2> : dist !== ""
        ?
        <Charts dist={dist} distData={distData} targetData={targetData} setDistData={setDistData}/>
        :
        null
      }
    </div>
  )
}

export default Display;