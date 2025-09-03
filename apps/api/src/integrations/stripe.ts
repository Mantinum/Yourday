export async function createPaymentIntent(amountEur: number) {
  // Stripe stub
  return { id: 'pi_fake', amount: amountEur };
}

export async function verifyWebhook(_: string, __: string) {
  return true;
}
