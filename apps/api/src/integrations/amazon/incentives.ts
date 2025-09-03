export interface EgiftPayload {
  email: string;
  amountEur: number;
  note?: string;
}

export async function sendEgift(_: EgiftPayload) {
  return { code: 'EGIFT_FAKE' };
}
