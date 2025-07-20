'use client';

import type { VideoV2 } from '@/types/Video';
import { DocumentArrowDownIcon, TableCellsIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useMemo, useState } from 'react';
import { getFormattedDate } from '../../utils/formatDate';

type ExportDialogProps = {
	isOpen: boolean;
	onClose: () => void;
	games: VideoV2[];
};

type ExportFormat = 'pdf' | 'csv';

const ExportDialog = ({ isOpen, onClose, games }: ExportDialogProps) => {
	const [exportFormat, setExportFormat] = useState<ExportFormat>('csv');
	const [dateFrom, setDateFrom] = useState('');
	const [dateTo, setDateTo] = useState('');
	const [selectedCompetition, setSelectedCompetition] = useState('all');
	const [selectedTeam, setSelectedTeam] = useState('all');

	// Get unique competitions and teams for filters
	const competitions = useMemo(() => {
		const unique = [...new Set(games.map(game => game.competition))];
		return unique.sort();
	}, [games]);

	const teams = useMemo(() => {
		const allTeams = games.flatMap(game => [game.homeTeam, game.awayTeam]);
		const unique = [...new Set(allTeams)];
		return unique.sort();
	}, [games]);

	// Filter games based on selected criteria
	const filteredGames = useMemo(() => {
		let filtered = games;

		// Filter by date range
		if (dateFrom) {
			filtered = filtered.filter(game => new Date(game.date) >= new Date(dateFrom));
		}
		if (dateTo) {
			filtered = filtered.filter(game => new Date(game.date) <= new Date(dateTo));
		}

		// Filter by competition
		if (selectedCompetition !== 'all') {
			filtered = filtered.filter(game => game.competition === selectedCompetition);
		}

		// Filter by team
		if (selectedTeam !== 'all') {
			filtered = filtered.filter(game => game.homeTeam === selectedTeam || game.awayTeam === selectedTeam);
		}

		return filtered;
	}, [games, dateFrom, dateTo, selectedCompetition, selectedTeam]);

	// Export to CSV
	const exportToCSV = () => {
		const headers = ['Date', 'Competition', 'Home Team', 'Away Team', 'Home Score', 'Away Score', 'Video Available'];

		const csvContent = [
			headers.join(','),
			...filteredGames.map(game =>
				[
					getFormattedDate(game.date),
					game.competition,
					`"${game.homeTeam}"`,
					`"${game.awayTeam}"`,
					game.homeScore,
					game.awayScore,
					game.isVideoAvailable ? 'Yes' : 'No',
				].join(','),
			),
		].join('\n');

		const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
		const link = document.createElement('a');
		const url = URL.createObjectURL(blob);
		link.setAttribute('href', url);
		link.setAttribute('download', `games-export-${new Date().toISOString().split('T')[0]}.csv`);
		link.style.visibility = 'hidden';
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	// Export to PDF (simplified - in a real app you'd use a library like jsPDF)
	const exportToPDF = () => {
		// For now, we'll create a simple HTML table and print it
		const printWindow = window.open('', '_blank');
		if (!printWindow) return;

		const html = `
			<!DOCTYPE html>
			<html>
			<head>
				<title>Games Export</title>
				<style>
					body { font-family: Arial, sans-serif; margin: 20px; }
					table { width: 100%; border-collapse: collapse; margin-top: 20px; }
					th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
					th { background-color: #f2f2f2; font-weight: bold; }
					h1 { color: #333; }
					.filters { margin-bottom: 20px; color: #666; }
				</style>
			</head>
			<body>
				<h1>Games Export</h1>
				<div class="filters">
					<p><strong>Export Date:</strong> ${new Date().toLocaleDateString()}</p>
					<p><strong>Total Games:</strong> ${filteredGames.length}</p>
					${dateFrom || dateTo ? `<p><strong>Date Range:</strong> ${dateFrom || 'Start'} - ${dateTo || 'End'}</p>` : ''}
					${selectedCompetition !== 'all' ? `<p><strong>Competition:</strong> ${selectedCompetition}</p>` : ''}
					${selectedTeam !== 'all' ? `<p><strong>Team:</strong> ${selectedTeam}</p>` : ''}
				</div>
				<table>
					<thead>
						<tr>
							<th>Date</th>
							<th>Competition</th>
							<th>Home Team</th>
							<th>Away Team</th>
							<th>Home Score</th>
							<th>Away Score</th>
							<th>Video Available</th>
						</tr>
					</thead>
					<tbody>
						${filteredGames
							.map(
								game => `
							<tr>
								<td>${getFormattedDate(game.date)}</td>
								<td>${game.competition}</td>
								<td>${game.homeTeam}</td>
								<td>${game.awayTeam}</td>
								<td>${game.homeScore}</td>
								<td>${game.awayScore}</td>
								<td>${game.isVideoAvailable ? 'Yes' : 'No'}</td>
							</tr>
						`,
							)
							.join('')}
					</tbody>
				</table>
			</body>
			</html>
		`;

		printWindow.document.write(html);
		printWindow.document.close();
		printWindow.print();
	};

	const handleExport = () => {
		if (exportFormat === 'csv') {
			exportToCSV();
		} else {
			exportToPDF();
		}
		onClose();
	};

	if (!isOpen) return null;

	return (
		<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
			<div className='bg-surface-primary rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto'>
				{/* Header */}
				<div className='flex items-center justify-between p-6 border-b border-border-primary'>
					<h2 className='text-xl font-semibold text-text-primary'>Export Games Data</h2>
					<button
						onClick={onClose}
						className='text-text-tertiary hover:text-text-primary transition-colors'
						type='button'
					>
						<XMarkIcon className='w-6 h-6' />
					</button>
				</div>

				{/* Content */}
				<div className='p-6 space-y-6'>
					{/* Export Format */}
					<div>
						<h3 className='text-sm font-medium text-text-primary mb-3'>Export Format</h3>
						<div className='flex gap-3'>
							<label htmlFor='format-csv' className='flex items-center gap-2 cursor-pointer'>
								<input
									id='format-csv'
									type='radio'
									value='csv'
									checked={exportFormat === 'csv'}
									onChange={e => setExportFormat(e.target.value as ExportFormat)}
									className='text-interactive-primary focus:ring-interactive-primary'
								/>
								<TableCellsIcon className='w-4 h-4 text-text-tertiary' />
								<span className='text-sm text-text-primary'>CSV</span>
							</label>
							<label htmlFor='format-pdf' className='flex items-center gap-2 cursor-pointer'>
								<input
									id='format-pdf'
									type='radio'
									value='pdf'
									checked={exportFormat === 'pdf'}
									onChange={e => setExportFormat(e.target.value as ExportFormat)}
									className='text-interactive-primary focus:ring-interactive-primary'
								/>
								<DocumentArrowDownIcon className='w-4 h-4 text-text-tertiary' />
								<span className='text-sm text-text-primary'>PDF</span>
							</label>
						</div>
					</div>

					{/* Filters */}
					<div className='space-y-4'>
						<h3 className='text-sm font-medium text-text-primary'>Filter Games (Optional)</h3>

						{/* Date Range */}
						<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
							<div>
								<label htmlFor='date-from' className='block text-sm font-medium text-text-primary mb-1'>
									From Date
								</label>
								<input
									id='date-from'
									type='date'
									value={dateFrom}
									onChange={e => setDateFrom(e.target.value)}
									className='w-full px-3 py-2 border border-border-secondary rounded-md bg-surface-primary text-text-primary focus:ring-2 focus:ring-interactive-primary focus:border-transparent'
								/>
							</div>
							<div>
								<label htmlFor='date-to' className='block text-sm font-medium text-text-primary mb-1'>
									To Date
								</label>
								<input
									id='date-to'
									type='date'
									value={dateTo}
									onChange={e => setDateTo(e.target.value)}
									className='w-full px-3 py-2 border border-border-secondary rounded-md bg-surface-primary text-text-primary focus:ring-2 focus:ring-interactive-primary focus:border-transparent'
								/>
							</div>
						</div>

						{/* Competition Filter */}
						<div>
							<label htmlFor='competition-filter' className='block text-sm font-medium text-text-primary mb-1'>
								Competition
							</label>
							<select
								id='competition-filter'
								value={selectedCompetition}
								onChange={e => setSelectedCompetition(e.target.value)}
								className='w-full px-3 py-2 border border-border-secondary rounded-md bg-surface-primary text-text-primary focus:ring-2 focus:ring-interactive-primary focus:border-transparent'
							>
								<option value='all'>All Competitions</option>
								{competitions.map(competition => (
									<option key={competition} value={competition}>
										{competition}
									</option>
								))}
							</select>
						</div>

						{/* Team Filter */}
						<div>
							<label htmlFor='team-filter' className='block text-sm font-medium text-text-primary mb-1'>
								Team
							</label>
							<select
								id='team-filter'
								value={selectedTeam}
								onChange={e => setSelectedTeam(e.target.value)}
								className='w-full px-3 py-2 border border-border-secondary rounded-md bg-surface-primary text-text-primary focus:ring-2 focus:ring-interactive-primary focus:border-transparent'
							>
								<option value='all'>All Teams</option>
								{teams.map(team => (
									<option key={team} value={team}>
										{team}
									</option>
								))}
							</select>
						</div>
					</div>

					{/* Summary */}
					<div className='bg-bg-secondary rounded-lg p-4'>
						<div className='flex items-center justify-between text-sm'>
							<span className='text-text-secondary'>Games to export:</span>
							<span className='font-semibold text-text-primary'>
								{filteredGames.length} of {games.length}
							</span>
						</div>
						{(dateFrom || dateTo || selectedCompetition !== 'all' || selectedTeam !== 'all') && (
							<div className='mt-2 text-xs text-text-tertiary'>
								Filters applied:{' '}
								{[
									dateFrom && 'Date range',
									selectedCompetition !== 'all' && 'Competition',
									selectedTeam !== 'all' && 'Team',
								]
									.filter(Boolean)
									.join(', ')}
							</div>
						)}
					</div>
				</div>

				{/* Footer */}
				<div className='flex items-center justify-end gap-3 p-6 border-t border-border-primary'>
					<button
						onClick={onClose}
						className='px-4 py-2 text-sm font-medium text-text-primary bg-surface-primary border border-border-secondary rounded-md hover:bg-state-hover transition-colors'
						type='button'
					>
						Cancel
					</button>
					<button
						onClick={handleExport}
						disabled={filteredGames.length === 0}
						className='px-4 py-2 text-sm font-medium text-text-inverse bg-interactive-primary border border-transparent rounded-md hover:bg-interactive-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-interactive-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
						type='button'
					>
						Export {exportFormat.toUpperCase()}
					</button>
				</div>
			</div>
		</div>
	);
};

export default ExportDialog;
