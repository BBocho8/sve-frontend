interface CompetitionFilterProps {
	selectedCompetition: string;
	onCompetitionChange: (competition: string) => void;
}

const competitions = ['Bezirksliga', 'Kreisfreundschaftsspiele', 'Rheinlandpokal'];

const CompetitionFilter = ({ selectedCompetition, onCompetitionChange }: CompetitionFilterProps) => {
	return (
		<div className='flex flex-wrap gap-3'>
			<button
				onClick={() => onCompetitionChange('all')}
				className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 transform hover:scale-105 ${
					selectedCompetition === 'all'
						? 'bg-interactive-primary text-text-inverse shadow-lg ring-2 ring-interactive-primary/20 scale-105'
						: 'bg-surface-secondary text-text-primary hover:bg-state-hover hover:shadow-md border border-border-primary'
				}`}
				type='button'
			>
				All Games
			</button>

			{competitions.map(competition => (
				<button
					key={competition}
					onClick={() => onCompetitionChange(competition)}
					className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 transform hover:scale-105 ${
						selectedCompetition === competition
							? 'bg-interactive-primary text-text-inverse shadow-lg ring-2 ring-interactive-primary/20 scale-105'
							: 'bg-surface-secondary text-text-primary hover:bg-state-hover hover:shadow-md border border-border-primary'
					}`}
					type='button'
				>
					{competition}
				</button>
			))}
		</div>
	);
};

export default CompetitionFilter;
