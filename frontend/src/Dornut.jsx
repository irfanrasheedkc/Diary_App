import React, { useEffect } from 'react';
import './Dornut.css';

function Dornut(props) {
  const setGaugeValue = (gauge, value) => {
    if (value < 0 || value > 1) {
      return ;
    }
    gauge.querySelector(".gauge__fill").style.transform = `rotate(${
      value / 2
    }turn)`;
    gauge.querySelector(".gauge__cover").textContent = `${Math.round(
      value * 100
    )}%`;
  };
  
  useEffect(() => {
    const list = props.entries.map((entry) => entry.emotion);
    
    
    let pos = 0;
    let neg = 0;
    let neu = 0;
    for (let i = 0; i < list.length; i++) {
      if (list[i] === "POSITIVE") {
        pos++;
      } else if (list[i] === "NEGATIVE") {
        neg++;
      } else if (list[i] === "NEUTRAL") {
        neu++;
      }
    }
    let total = pos + neu + neg;
    neu=pos-neg
    
    let posper = (pos) / total;
    let negper = (neg) / total;
    let neuper = (neu) / total;
    const gaugePositiveElement = document.querySelector(".gauge.gauge-positive");
    const gaugeNegativeElement = document.querySelector(".gauge.gauge-negative");
    const gaugeNeutralElement = document.querySelector(".gauge.gauge-neutral");
    
    
    setGaugeValue(gaugePositiveElement, posper); // Positive emotion
    setGaugeValue(gaugeNegativeElement, negper); // Negative emotion
    setGaugeValue(gaugeNeutralElement, neuper); // Neutral emotion
  }, [props.entries]);

  return (
    <div className="gauge-container">
      <div className="gauge gauge-positive">
        <div className="gauge__body">
          <div className="gauge__fill"></div>
          <div className="gauge__cover"></div>
        </div>
        <h5>Happiness</h5>
      </div>

      <div className="gauge gauge-negative">
        <div className="gauge__body">
          <div className="gauge__fill"></div>
          <div className="gauge__cover"></div>
        </div>
        <h5>Heartbroken</h5>
      </div>

      <div className="gauge gauge-neutral">
        <div className="gauge__body">
          <div className="gauge__fill"></div>
          <div className="gauge__cover"></div>
        </div>
        <h5>Emotional Stability</h5>
      </div>
    </div>
  );
}

export default Dornut;
