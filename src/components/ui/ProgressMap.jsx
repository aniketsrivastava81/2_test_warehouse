import { siteConfig } from '../../config/site';
import { useExperience } from '../../context/ExperienceContext';

const slugToSceneKey = {
  'organic-oasis': 'organic',
  'urban-canvas': 'urban',
  'abstract-dreamscape': 'abstract',
};

export default function ProgressMap() {
  const { progress } = useExperience();
  const exploredCount = progress.exploredScenes.filter((scene) => ['organic', 'urban', 'abstract'].includes(scene)).length;

  return (
    <aside className="progress-map">
      <p className="eyebrow">Journey Progress</p>
      <div className="progress-stat">
        <span>Vault pieces unlocked</span>
        <strong>{progress.vaultUnlocked.length}/4</strong>
      </div>
      <div className="progress-stat">
        <span>Environments explored</span>
        <strong>{exploredCount}/3</strong>
      </div>
      <div className="progress-stat">
        <span>Puzzles solved</span>
        <strong>{progress.solvedPuzzles.length}/4</strong>
      </div>
      <ul className="journey-checklist">
        {siteConfig.journeyScenes.map((scene) => {
          const explored = progress.exploredScenes.includes(slugToSceneKey[scene.slug]);
          const solved = progress.solvedPuzzles.includes(scene.slug);
          return (
            <li key={scene.slug}>
              <span>{explored ? '✓' : '○'} {scene.label}</span>
              <strong>{solved ? 'Solved' : 'Open'}</strong>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
