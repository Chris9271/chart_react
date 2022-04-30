import React from 'react';
import Taipei from '../../image/taipeilogo.png';
import Selector from '../Selector/Selector';
import './Logo.css';


const Logo = ({setDist, dist}) => {
  const handleDist = (e) => {
    setDist(e.target.value)
  }
  return (
    <div className="col-lg-3 text-center py-3">
      <img src={Taipei} alt="logo" className="logo"/>
      <h5 className="mt-3">110年人口戶數及性別</h5>
      <div className="phone mt-3">
        <Selector handleDist={handleDist} dist={dist}/>
      </div>
    </div>
  )
}

export default Logo;