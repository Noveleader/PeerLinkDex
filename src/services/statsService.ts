// services/statsService.ts

import axios from "axios";

const SUBGRAPH_URL =
  "https://api.goldsky.com/api/public/project_clzpnhizegood01tedyzc1jcc/subgraphs/superhack-subgraph/1.0.0/gn";

export const fetchTotalTransactions = async () => {
  const response = await axios.post(SUBGRAPH_URL, {
    query: `
        {
            totalTransactions: transactions_aggregate {
                aggregate {
                    count
                }
            }
        }
        `,
  });
  return response.data.data.totalTransactions.aggregate.count;
};

export const fetchCancelledTransactions = async () => {
  const response = await axios.post(SUBGRAPH_URL, {
    query: `
        {
            cancelledTransactions: transactions(where: {status: {_eq: "CANCELLED"}}) {
                id
            }
        }
        `,
  });
  return response.data.data.cancelledTransactions.length;
};

export const fetchCreatedTransactions = async () => {
  const response = await axios.post(SUBGRAPH_URL, {
    query: `
        {
            createdTransactions: transactions(where: {status: {_eq: "CREATED"}}) {
                id
            }
        }
        `,
  });
  return response.data.data.createdTransactions.length;
};

export const fetchCompletedTransactions = async () => {
  const response = await axios.post(SUBGRAPH_URL, {
    query: `
        {
            completedTransactions: transactions(where: {status: {_eq: "COMPLETED"}}) {
                id
            }
        }
        `,
  });
  return response.data.data.completedTransactions.length;
};
