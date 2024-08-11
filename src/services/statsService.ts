// services/statsService.ts

import axios from "axios";

const SUBGRAPH_URL =
  "https://api.goldsky.com/api/public/project_clzpnhizegood01tedyzc1jcc/subgraphs/superhack-subgraph/1.0.0/gn";

export const fetchCancelledTransactions = async () => {
  const response = await axios.post(SUBGRAPH_URL, {
    query: `
        {
            escrowEventCancelleds {
              escrowId
            }
        }
        `,
  });
  return response.data.data.escrowEventCancelleds.length;
};

export const fetchCreatedTransactions = async (address: string) => {
  const response = await axios.post(SUBGRAPH_URL, {
    query: `
              {
                escrowEventCreateds(where: {escrowDetails_initiator: "${address.toLowerCase()}"}) {
                  escrowDetails_escrowId
                }
              }
            `,
  });
  return response.data.data.escrowEventCreateds.length;
};

export const fetchCompletedTransactions = async () => {
  const response = await axios.post(SUBGRAPH_URL, {
    query: `
        {
            escrowEventCompleteds {
              escrowId
            }
        }
        `,
  });
  return response.data.data.escrowEventCompleteds.length;
};

export const fetchTransactionData = async () => {
  return [];
};
