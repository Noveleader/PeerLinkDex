// components/Stats.tsx

import React, { useEffect, useState } from "react";
import {
  fetchTotalTransactions,
  fetchCancelledTransactions,
  fetchCreatedTransactions,
  fetchCompletedTransactions,
} from "../services/statsService";
import "../styles/Stats.css";

const Stats: React.FC = () => {
  const [totalTransactions, setTotalTransactions] = useState<number>(0);
  const [cancelledTransactions, setCancelledTransactions] = useState<number>(0);
  const [createdTransactions, setCreatedTransactions] = useState<number>(0);
  const [completedTransactions, setCompletedTransactions] = useState<number>(0);

  // useEffect(() => {
  //   async function fetchData() {
  //     const total = await fetchTotalTransactions();
  //     const cancelled = await fetchCancelledTransactions();
  //     const created = await fetchCreatedTransactions();
  //     const completed = await fetchCompletedTransactions();

  //     setTotalTransactions(total);
  //     setCancelledTransactions(cancelled);
  //     setCreatedTransactions(created);
  //     setCompletedTransactions(completed);
  //   }

  //   fetchData();
  // }, []);

  return (
    <>
      <div className="TransactionCumulative">
        <div className="TotalTransactions">
          <p>Total Transactions</p>
        </div>
        <div className="Total Cancelled Transactions">
          <p>Total Cancelled Transactions</p>
        </div>
        <div className="Total Created Transactions">
          <p>Total Created Transactions</p>
        </div>
        <div className="Total Completed Transactions">
          <p>Total Completed Transactions</p>
        </div>
      </div>

      <div className="Table">
        <div className="S No."></div>
        <div className="TransactionHash"></div>
        <div className="Action"></div>
      </div>
    </>
  );
};

export default Stats;
