import React from 'react';

const Selector = ({handleDist, dist}) => {
  return (
    <>
        <h5 className="m-0 px-2 lh-lg">地區</h5>
        <select className="form-select w-75" onChange={handleDist} value={dist !== "" ? dist : "請選擇一個行政區"}>
            <option disabled>請選擇一個行政區</option>
            <option value="中正區">中正區</option>
            <option value="大同區">大同區</option>
            <option value="中山區">中山區</option>
            <option value="松山區">松山區</option>
            <option value="大安區">大安區</option>
            <option value="萬華區">萬華區</option>
            <option value="信義區">信義區</option>
            <option value="士林區">士林區</option>
            <option value="北投區">北投區</option>
            <option value="內湖區">內湖區</option>
            <option value="南港區">南港區</option>
            <option value="文山區">文山區</option>
        </select>
    </>
  )
}

export default Selector;