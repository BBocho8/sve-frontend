interface CompetitionFilterProps {
	selectedCompetition: string;
	onCompetitionChange: (competition: string) => void;
}

const competitions = ['Bezirksliga', 'Kreisfreundschaftsspiele', 'Rheinlandpokal'];

const CompetitionFilter = ({ selectedCompetition, onCompetitionChange }: CompetitionFilterProps) => {
	return (
		<div className='flex flex-wrap gap-2'>
			<button
				onClick={() => onCompetitionChange('all')}
				className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
					selectedCompetition === 'all'
						? 'bg-green-600 text-white shadow-sm'
						: 'bg-gray-100 text-gray-700 hover:bg-gray-200'
				}`}
				type='button'
			>
				All Games
			</button>

			{competitions.map(competition => (
				<button
					key={competition}
					onClick={() => onCompetitionChange(competition)}
					className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
						selectedCompetition === competition
							? 'bg-green-600 text-white shadow-sm'
							: 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
