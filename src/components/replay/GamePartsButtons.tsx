import { Typography } from '@mui/material';

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

const GamePartsButtons = ({ availableParts, selectedPart, onSelectPart }: GamePartsButtonsProps) => (
	<div className='flex overflow-auto whitespace-nowrap no-scrollbar items-center justify-start md:justify-center px-2 md:px-0 my-2 gap-x-2 w-full'>
		{availableParts.map(part => (
			<button
				key={part}
				type='button'
				className={`btn ${part === selectedPart ? 'bg-black' : ''}`}
				onClick={() => onSelectPart(part)}
			>
				<Typography sx={{ fontWeight: 500 }}>{part.replace(/([A-Z])/g, ' $1').trim()}</Typography>
			</button>
		))}
	</div>
);

export default GamePartsButtons;
