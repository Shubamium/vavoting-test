"use client";

import { useEffect, useState } from "react";
import VotePopUp from "./components/VotePopUp";
import Countdown from "react-countdown";

export default function VoteUp({ polls }: any) {
  const [showVote, setShowVote] = useState(false);
  const [activePoll, setActivePoll] = useState({
    poll_id: "",
    option: 0,
  });
  const vote = (poll_id: string, option: number) => {
    setShowVote(true);
    setActivePoll({
      poll_id,
      option,
    });
  };
  // useEffect(()=>{

  // },[]);
  return (
    <div className={""}>
      <h2>Voting System</h2>
      {/* <p>Total Votes:0</p>
      <p>
        <strong>Vote Item A:</strong> 200
        <button onClick={vote}>Vote!</button>
      </p>
      <p>
        <strong>Vote Item B:</strong> 200
        <button onClick={vote}>Vote!</button>
      </p>
      <p>
        <strong>Vote Item C:</strong> 200
        <button onClick={vote}>Vote!</button>
      </p> */}
      {polls &&
        polls.map((poll: any) => {
          return (
            <div className="poll-panel" key={poll._id}>
              <h2>{poll.name}</h2>
              <div className="time">
                <p>Closing in:</p>
                <Countdown date={new Date(poll.deadline)}></Countdown>
              </div>
              <p>Total Votes: {poll.total}</p>
              {poll.choice &&
                poll.choice.map((choice: any, index: number) => {
                  let count = (poll.tally && poll.tally[index]) ?? 0;
                  let percentage = (count == 0 ? 0 : count / poll.total) * 100;
                  return (
                    <div className="option" key={poll._id + "-option-" + index}>
                      {choice.title}
                      <p>
                        {percentage.toPrecision(3)}% ({count})
                      </p>
                      <button
                        onClick={() => {
                          vote(poll._id, index);
                        }}
                      >
                        VOTE
                      </button>
                    </div>
                  );
                })}
            </div>
          );
        })}

      {!showVote ? (
        <></>
      ) : (
        <VotePopUp
          close={() => {
            setShowVote(false);
          }}
          poll={activePoll}
        />
      )}
    </div>
  );
}
