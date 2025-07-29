export type Address = {
  a_id: string;
  balance: number;
  received: number;
  sent: number;
  __v: number;
};

export type AddressTransaction = {
  a_id: string;
  txid: string;
  amount: number;
  blockindex: number;
  __v: number;
};

export type Block = {
  difficulty: number;
  hash: string;
  height: number;
  merkleroot: string;
  nonce: number;
  previousblockhash: string;
  size: number;
  txCount: number;
  timestamp: number;
};

export type BlockSummary = {
  id: string;
  height: number;
  hash: string;
  timestamp: number;
  txCount: number;
  minedBy: string | null;
};

export type CoinStats = {
  coin: "Aegisum";
  count: number;
  last: number;
  supply: number;
  txes: number;
  connections: number;
  last_price: number;
  last_usd_price: number;
  blockchain_last_updated: number;
  reward_last_updated: number;
  masternodes_last_updated: number;
  network_last_updated: number;
  richlist_last_updated: number;
  markets_last_updated: number;
  orphan_index: number;
  orphan_current: number;
  newer_claim_address: boolean;
};

export type NetworkHistory = {
  blockindex: number;
  difficulty_pos: number;
  difficulty_pow: number;
  nethash: number;
  timestamp: number;
};

export type MempoolStats = {
  bytes: number;
  size: number;
  usage: number;
  timestamp: number;
};

export type MempoolTransaction = {
  txid: string;
  size: number;
  time: number;
  height: number;
};

export type Transaction = {
  txid: string;
  blockhash: string;
  blockindex: number;
  timestamp: number;
  vin: [{ addresses: string; amount: number }];
  vout: [{ addresses: string; amount: number }];
  total: number;
  tx_type: null;
  op_return: string | null;
  algo: string;
};
