"use server";

import { saveVote, verifyCode } from "./dbAction";

export async function verifyConfirmation(
  email: string,
  code: string,
  poll_id: string,
  option: string
) {
  const verified = await verifyCode(email, code);
  if (verified) {
    await saveVote(poll_id, email, option);
    return true;
  } else {
    return false;
  }
}
