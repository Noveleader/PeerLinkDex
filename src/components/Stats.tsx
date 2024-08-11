import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import {
  fetchCancelledTransactions,
  fetchCreatedTransactions,
  fetchCompletedTransactions,
  fetchTransactionData,
} from "../services/statsService";
import "../styles/Stats.css";

const Stats: React.FC = () => {
  const [totalTransactions, setTotalTransactions] = useState<number>(0);
  const [cancelledTransactions, setCancelledTransactions] = useState<number>(0);
  const [createdTransactions, setCreatedTransactions] = useState<number>(0);
  const [completedTransactions, setCompletedTransactions] = useState<number>(0);
  const [transactionData, setTransactionData] = useState<any[]>([]);
  const { address } = useAccount();

  useEffect(() => {
    async function fetchData() {
      const cancelled = await fetchCancelledTransactions();
      const created = await fetchCreatedTransactions(address as string);
      const completed = await fetchCompletedTransactions();
      const transactions = await fetchTransactionData();

      setTotalTransactions(cancelled + created + completed);
      setCancelledTransactions(cancelled);
      setCreatedTransactions(created);
      setCompletedTransactions(completed);
      setTransactionData(transactions);
    }

    fetchData();
  }, []);

  const getActionClassName = (action: string) => {
    switch (action) {
      case "Escrow Cancelled":
        return "action-red";
      case "Escrow Created":
        return "action-blue";
      case "Escrow Completed":
        return "action-green";
      default:
        return "";
    }
  };

  return (
    <>
      <div className="transaction-cumulative">
        <div className="stat-box">
          <p>Total Transactions</p>
          <h2>{totalTransactions}</h2>
        </div>
        <div className="stat-box">
          <p>Total Cancelled Transactions</p>
          <h2>{cancelledTransactions}</h2>
        </div>
        <div className="stat-box">
          <p>Total Created Transactions</p>
          <h2>{createdTransactions}</h2>
        </div>
        <div className="stat-box">
          <p>Total Completed Transactions</p>
          <h2>{completedTransactions}</h2>
        </div>
      </div>

      <div className="table">
        <div className="table-header">
          <div className="column">S No.</div>
          <div className="column">Transaction Hash</div>
          <div className="column">Action</div>
        </div>
        {transactionData.map((transaction, index) => (
          <div className="table-row" key={transaction.transactionHash}>
            <div className="column">{index + 1}</div>
            <div className="column">
              <a
                href={`https://sepolia.basescan.org/tx/${transaction.transactionHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="transaction-link"
              >
                {transaction.transactionHash}
              </a>
            </div>
            <div
              className={`column action-box ${getActionClassName(
                transaction.action
              )}`}
            >
              {transaction.action}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Stats;
