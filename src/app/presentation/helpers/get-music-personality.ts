import { MusicPersonality } from '../../domain/tracks/tracks.entity';

export function getMusicPersonality(dna: {
  energy: number;
  mainstream: number;
  freshness: number;
  intensity: number;
  explicitness: number;
  variety: number;
}): MusicPersonality {
  if (dna.variety > 0.7) {
    return {
      type: 'The Explorer',
      emoji: '🌍',
      description:
        'You enjoy discovering many different artists and musical styles.'
    };
  }

  if (dna.mainstream > 0.7) {
    return {
      type: 'The Trend Rider',
      emoji: '📈',
      description:
        'You love popular tracks and keep up with what everyone is listening to.'
    };
  }

  if (dna.energy > 0.75) {
    return {
      type: 'The Energetic Listener',
      emoji: '⚡',
      description: 'Your music taste is full of energy and powerful tracks.'
    };
  }

  if (dna.intensity < 0.4) {
    return {
      type: 'The Chill Listener',
      emoji: '🌙',
      description: 'You prefer calm and relaxing music.'
    };
  }

  return {
    type: 'The Balanced Listener',
    emoji: '🎧',
    description: 'Your music taste balances multiple styles and moods.'
  };
}
