type GamePart =
	| 'firstHalf1'
	| 'firstHalf2'
	| 'firstHalf3'
	| 'secondHalf1'
	| 'secondHalf2'
	| 'secondHalf3'
	| 'fullGame'
	| '';

type GamePartsButtonsProps = {
	availableParts: GamePart[];
	selectedPart: GamePart;
	onSelectPart: (part: GamePart) => void;
};

const getPartLabel = (part: GamePart): string => {
	const labels: Record<GamePart, string> = {
		firstHalf1: '1st Half - Part 1',
		firstHalf2: '1st Half - Part 2',
		firstHalf3: '1st Half - Part 3',
		secondHalf1: '2nd Half - Part 1',
		secondHalf2: '2nd Half - Part 2',
		secondHalf3: '2nd Half - Part 3',
		fullGame: 'Full Game',
		'': '',
	};
	return labels[part];
};

const GamePartsButtons = ({ availableParts, selectedPart, onSelectPart }: GamePartsButtonsProps) => (
	<div className='flex flex-wrap gap-2'>
		{availableParts.map(part => (
			<button
				key={part}
				type='button'
				className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
					part === selectedPart ? 'bg-green-600 text-white shadow-sm' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
				}`}
				onClick={() => onSelectPart(part)}
			>
				{getPartLabel(part)}
			</button>
		))}
	</div>
);

export default GamePartsButtons;
