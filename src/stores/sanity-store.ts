import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type TProjectSetup = {
	projectId: string;
	dataset: string;
	token: string;
	isAuthenticated: boolean;
	test?: string;
};

interface ProjectSetup {
	creds: TProjectSetup | undefined;

	setProjectSetup: (projectSetup: TProjectSetup) => void;
}

const storage = typeof window !== 'undefined' ? localStorage.getItem('sanity-store') : undefined;
const initialCreds = storage ? JSON.parse(storage as string) : undefined;

export const useProjectSetup = create<ProjectSetup>()(
	persist(
		set => ({
			creds: initialCreds,
			setProjectSetup: (projectSetup: TProjectSetup) => set({ creds: projectSetup }),
		}),

		{
			name: 'sanity-store',
		},
	),
);
