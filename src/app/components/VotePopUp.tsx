"use client";
import React, { MouseEvent, useState } from "react";
import "./votePopUp.scss";
import { sendConfirmation } from "../function/email";
import { verifyConfirmation } from "../function/verify";
import { useRouter } from "next/navigation";

type props = {
  close: () => void;
  poll: any;
};
export default function VotePopUp({ close, poll }: props) {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [eTime, setEtime] = useState(0);
  let router = useRouter();
  const sendCode = async () => {
    setEtime(60);
    setInterval(() => {
      setEtime((et) => et - 1);
    }, 1000);
    await sendConfirmation(email);
  };
  const submitVote = async () => {
    const res = await verifyConfirmation(
      email,
      code,
      poll.poll_id,
      poll.option
    );
    if (res) {
      alert("Vote submitted!");
      router.refresh();
      close();
    } else {
      alert("Invalid verification code");
    }
  };
  return (
    <div className="popup-vote" onClick={close}>
      <div
        className="panel"
        onClick={(e: MouseEvent) => {
          e.stopPropagation();
        }}
      >
        {/* <p>Login to vote with google!</p> */}
        <p></p>
        <h2>Enter your email:</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="jane.doe@gmail.com"
        />
        <div className="code-field">
          <input
            type="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Verification Code"
          />
          <button onClick={sendCode} disabled={eTime > 0}>
            {eTime > 0 ? `Retry(${eTime})` : "Send"}
          </button>
        </div>
        <div className="buttons">
          <button onClick={submitVote}>Vote!</button>
        </div>
      </div>
    </div>
  );
}
