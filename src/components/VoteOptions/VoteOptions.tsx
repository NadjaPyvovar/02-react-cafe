import css from './VoteOptions.module.css';
import type { VoteType } from '../../types/votes';

interface VoteOptionsProps {
  onVote: (type: VoteType) => void;
  onReset: () => void;
  canReset: boolean;
}

function VoteOptions({ onVote, onReset, canReset }: VoteOptionsProps) {
  return (
    <div className={css.container}>
      <button className={css.button} onClick={() => onVote('good')}>
        Good
      </button>
      <button className={css.button} onClick={() => onVote('neutral')}>
        Neutral
      </button>
      <button className={css.button} onClick={() => onVote('bad')}>
        Bad
      </button>
      {canReset && (
        <button className={`${css.button} ${css.reset}`} onClick={onReset}>
          Reset
        </button>
      )}
    </div>
  );
}
export default VoteOptions;

// note: onClick={() => onVote('good')} wrapped in an arrow function so that it only calls onVote("good") when clicked (i.e. async), instead of calling it immediately on render (i.e. will not work: onClick={onVote("good")})
// note: {canReset && (...)} is conditional-render pattern, i.e. if canReset is false, nothing will be rendered, if true, the button renders (acc. to the task it should wired up in App for the stage 4 with hardcoded true, made dynamically then in the stage 8)
