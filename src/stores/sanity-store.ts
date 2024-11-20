import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type TProjectSetup = {
	projectId: string;
	dataset: string;
	token: string;
	isAuthenticated: boolean;
};

interface ProjectSetup {
	creds: TProjectSetup | undefined;

	setProjectSetup: (projectSetup: TProjectSetup) => void;
}

export const useProjectSetup = create<ProjectSetup>()(
	persist(
		set => ({
			creds: undefined,

			setProjectSetup: (projectSetup: TProjectSetup) => set({ creds: projectSetup }),
		}),

		{
			name: 'sanity-store',
		},
	),
);
