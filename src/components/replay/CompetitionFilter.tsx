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
						? 'bg-green-600 text-white shadow-lg ring-2 ring-green-200 dark:ring-green-800 scale-105'
						: 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 hover:shadow-md border border-gray-200 dark:border-gray-600'
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
							? 'bg-green-600 text-white shadow-lg ring-2 ring-green-200 dark:ring-green-800 scale-105'
							: 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 hover:shadow-md border border-gray-200 dark:border-gray-600'
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
