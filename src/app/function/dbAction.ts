import createConnection from "./db";

export async function saveCode(email: string, code: string) {
  const connection = await createConnection();
  try {
    const res = await connection.execute(
      `INSERT INTO verification (code,user_email,created,is_verified) VALUES (?,?,CURRENT_TIMESTAMP,?)`,
      [code, email, false]
    );
    console.log(res, "adding code");
  } finally {
    await connection.end();
  }
}

export async function verifyCode(email: string, code: string) {
  const query = `
	SELECT * FROM verification WHERE user_email = ? AND code = ? AND created >= NOW() - INTERVAL 5 MINUTE;
`;
  const connection = await createConnection();
  try {
    const param = [email, code];
    const res = await connection.query(query, param);
    const rows = res[0] as unknown;

    const data = rows as Array<any>;
    return data.length === 1;
  } finally {
    await connection.end();
  }
}

export async function saveVote(
  poll_id: string,
  user_email: string,
  vote_option: string
) {
  const connection = await createConnection();
  try {
    const res = await connection.execute(
      `
			INSERT INTO votes (poll_id,user_email,timestamp,vote_option) VALUES (?,?,CURRENT_TIMESTAMP,?)`,
      [poll_id, user_email, vote_option]
    );
    return res;
  } finally {
    await connection.end();
  }
}

export async function getVote(poll_id: string, until: number) {
  if (until === -1) return [];
  const connection = await createConnection();
  try {
    let tally = [];
    for (let i = 0; i < until; i++) {
      const res = (await connection.execute(
        `
				SELECT COUNT(*) as count FROM votes WHERE poll_id = ? AND vote_option = ?;
				`,
        [poll_id, i]
      )) as any;

      const count = res[0][0].count;
      console.log(res[0][0].count);
      tally.push(count);
    }
    return tally;
  } finally {
    await connection.end();
  }
}
