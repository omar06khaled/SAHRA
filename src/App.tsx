import { Stage } from './components/Stage';
import { IntroScreen } from './components/IntroScreen';
import { TeamSheetScreen } from './components/TeamSheetScreen';
import { DraftScreen } from './components/DraftScreen';
import { BoardScreen } from './components/BoardScreen';
import { QuestionScreen } from './components/QuestionScreen';
import { FinalScreen } from './components/FinalScreen';
import { useSahraGame } from './game/useSahraGame';
import { secondsLeft, phoneSecondsLeft } from './game/clock';
import { byId, questionAt } from './game/pool';
import { catInk } from './game/theme';
import { teamName as teamNameOf, roster as rosterOf, rosterNames as rosterNamesOf } from './game/helpers';
import type { TeamIndex } from './game/types';

export default function App() {
  const { state, derived, turn, actions } = useSahraGame();
  const teamName = (ti: TeamIndex) => teamNameOf(state, ti);
  const roster = (ti: TeamIndex) => rosterOf(state, ti);
  const rosterNames = (ti: TeamIndex) => rosterNamesOf(state, ti);
  const canUndo = state.log.length > 0;
  // Which of the tier's questions this board drew for the open tile.
  const active = state.active ? questionAt(state.active.cat, state.active.row, state.variants) : null;

  return (
    <Stage>
      {state.phase === 'intro' && <IntroScreen t={state.introT} onSkip={actions.skipToTeams} />}

      {state.phase === 'teams' && (
        <TeamSheetScreen
          teams={state.teams}
          onSetName={actions.setName}
          onSetMember={actions.setMember}
          onBack={actions.goIntro}
          onNext={actions.goDraft}
        />
      )}

      {state.phase === 'draft' && (
        <DraftScreen
          taken={state.taken}
          drafted={state.drafted}
          turn={turn}
          teamName={teamName}
          onPick={actions.draftPick}
          onOpenBoard={actions.openBoard}
        />
      )}

      {state.phase === 'board' && (
        <BoardScreen
          drafted={state.drafted}
          derived={derived}
          turn={turn}
          hover={state.hover}
          canUndo={canUndo}
          teamName={teamName}
          roster={rosterNames}
          onHover={actions.setHover}
          onPick={actions.pick}
          onEndGame={actions.endGame}
          onUndo={actions.undo}
        />
      )}

      {(state.phase === 'question' || state.phase === 'reveal') && state.active && active && (
        <QuestionScreen
          phase={state.phase}
          categoryTitle={byId(state.active.cat).title}
          categoryInk={catInk(state.active.cat)}
          row={state.active.row}
          lead={active.lead}
          question={active.q}
          image={active.img}
          photoLarge={byId(state.active.cat).photo === 'large'}
          answer={active.a}
          turn={turn}
          derived={derived}
          secLeft={secondsLeft(state)}
          phoneLeft={phoneSecondsLeft(state)}
          phoneUntil={state.phoneUntil}
          canUndo={canUndo}
          teamName={teamName}
          onSpendLifeline={actions.useLifeline}
          onReveal={actions.reveal}
          onResolve={actions.resolve}
          onUndo={actions.undo}
          onEndPhone={actions.endPhone}
        />
      )}

      {state.phase === 'final' && (
        <FinalScreen
          drafted={state.drafted}
          derived={derived}
          teamName={teamName}
          roster={roster}
          onRematch={actions.rematch}
          onNewPacks={actions.newPacks}
        />
      )}
    </Stage>
  );
}
