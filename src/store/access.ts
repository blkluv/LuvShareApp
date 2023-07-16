import create from 'zustand';

interface AccessSettingsState {
  restricted: boolean;
  setRestricted: (restricted: boolean) => void;
  collectToView: boolean;
  setCollectToView: (collectToView: boolean) => void;
  followToView: boolean;
  setFollowToView: (followToView: boolean) => void;
  superfluidToView: boolean;
  setSuperfluidToView: (superfluidToView: boolean) => void;
  hasConditions: () => boolean;
  reset: () => void;
}

export const useAccessSettingsStore = create<AccessSettingsState>(
  (set, get) => ({
    restricted: false,
    setRestricted: (restricted) => set(() => ({ restricted })),
    collectToView: false,
    setCollectToView: (collectToView) => set(() => ({ collectToView })),
    followToView: false,
    setFollowToView: (followToView) => set(() => ({ followToView })),
    superfluidToView: false,
    setSuperfluidToView: (superfluidToView) =>
      set(() => ({ superfluidToView })),
    hasConditions: () => {
      const { followToView, collectToView, superfluidToView } = get();

      return followToView || collectToView || superfluidToView;
    },
    reset: () =>
      set(() => ({
        restricted: false,
        collectToView: false,
        followToView: false,
        superfluidToView: false
      }))
  })
);
