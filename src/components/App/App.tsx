import { useState } from 'react';
import css from './App.module.css';

import CafeInfo from '../CafeInfo/CafeInfo';
import VoteOptions from '../VoteOptions/VoteOptions';
import VoteStats from '../VoteStats/VoteStats';
import Notification from '../Notification/Notification';

import type { Votes, VoteType } from '../../types/votes';

function App() {
  const [votes, setVotes] = useState<Votes>({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const handleVote = (type: VoteType) => {
    setVotes(prevVotes => ({
      ...prevVotes,
      [type]: prevVotes[type] + 1,
    }));
  };

  const resetVotes = () => {
    setVotes({ good: 0, neutral: 0, bad: 0 });
  };

  const totalVotes = votes.good + votes.neutral + votes.bad;
  const positiveRate = totalVotes
    ? Math.round((votes.good / totalVotes) * 100)
    : 0;

  return (
    <div className={css.app}>
      <CafeInfo />
      <VoteOptions
        onVote={handleVote}
        onReset={resetVotes}
        canReset={totalVotes > 0}
      />
      {totalVotes > 0 ? (
        <VoteStats
          votes={votes}
          totalVotes={totalVotes}
          positiveRate={positiveRate}
        />
      ) : (
        <Notification />
      )}
    </div>
  );
}

export default App;

// notes:
// re. handleVote: setVotes(prevVotes => ({...prevVotes, [type]: prevVotes[type] + 1, })); creates a new object copying all existing vote count (...prevVotes), then overwriting only one key, whichever one type points to; [type] is a computed property name, i.e. if type is "good" this results into good: prevVotes.good + 1. At the end only the state will be updated with the function form (prevVotes => ...) rather than reading votes directly
// note: as the state of the component is saved in App, calcs related to the state will be performed in App, whereas the calculated values will be passed as props to component VoteStats
