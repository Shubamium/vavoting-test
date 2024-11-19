import React from "react";
import VoteUp from "./VoteUp";
import { fetchData } from "./function/sanity";
import { getVote } from "./function/dbAction";

export default async function Home() {
  let polls = await fetchData<any>(`
		*[_type == 'polls']{
		...}
	`);

  let allTally = await Promise.all(
    polls.map((poll: any) => {
      return getVote(poll._id, poll.choice?.length ?? -1);
    })
  );
  polls = polls.map((poll: any, index: number) => {
    return {
      ...poll,
      tally: allTally[index],
      total: allTally[index].reduce((a: number, b: number) => a + b, 0),
    };
  });
  console.log(allTally);
  return (
    <div>
      <VoteUp polls={polls} />
    </div>
  );
}
