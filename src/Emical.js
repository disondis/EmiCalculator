import './Emi.css';
import { useState } from "react";
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function EmiCalculator() {
  const [emiData, setEmiData] = useState({});
  const intr = emiData.interest / 1200;
  const TenureYear = emiData.tenureMonth ? emiData.tenureMonth / 12 : null;

  const emiValue = emiData.tenureMonth && emiData.interest
    ? Math.round(
        (emiData.loanAmount * intr) /
          (1 - Math.pow(1 / (1 + intr), emiData.tenureMonth))
      )
    : null;

  const totalAmt = emiValue ? emiData.tenureMonth * emiValue : null;

  const TotalInterest = emiValue ? totalAmt - emiData.loanAmount : null;

  const handleChange = (ele) => {
    setEmiData({ ...emiData, [ele.target.name]: ele.target.value });
  };

  return (
    <div className="emi-calculator-container">
        <h1>EmiCalculator</h1>
      <div className="card">
        <h3 className="card-title">Loan Details</h3>
        <form className="card-form">
          <div className="form-group">
            <label>Loan Amount ₹</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter loan amount"
              name="loanAmount"
              value={emiData.loanAmount || ""}
              onChange={handleChange}
              min="99999"
            />
          </div>

          <div className="form-group">
            <label>Interest Rate %</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter interest rate"
              name="interest"
              value={emiData.interest || ""}
              onChange={handleChange}
              min="5"
              max="25"
            />
          </div>

          <div className="form-group">
            <label>Tenure (Months)</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter tenure in months"
              name="tenureMonth"
              value={emiData.tenureMonth || ""}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Tenure (Years)</label>
            <input
              type="number"
              className="form-control"
              placeholder="Tenure in years"
              value={TenureYear || ""}
              disabled
            />
          </div>
        </form>
      </div>

      <div className="card">
        <h3 className="card-title">EMI Details</h3>
        <div className="card-content">
          <h4>Loan EMI: ₹{emiValue}</h4>
          <h4>Total Interest Payable: ₹{TotalInterest}</h4>
          <h4>Total Payment: ₹{totalAmt}</h4>
        </div>
      </div>

      <div className="card">
        <h3 className="card-title">Breakdown</h3>
        <div className="card-content doughnutchart">
          <Doughnut
            data={{
              labels: ["Total Interest", "Total Amount"],
              datasets: [
                {
                  data: [TotalInterest, totalAmt],
                  backgroundColor: ["#4e54c8", "#8f94fb"],
                },
              ],
            }}
          />
        </div>
      </div>
      <p>Designed By: <a href="https://www.linkedin.com/in/dison-t-20241a315/" target="_blank">Dison dys</a></p>
      </div>
  );
}
