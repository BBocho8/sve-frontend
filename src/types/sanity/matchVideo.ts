import { DocumentVideoIcon as icon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';
export default defineType({
	name: 'matchVideo',
	title: 'Match Video',
	type: 'document',
	icon,
	fields: [
		defineField({
			name: 'gameInfo',
			title: 'Match Info - Title',
			type: 'string',
			validation: Rule => Rule.required(),
		}),
		defineField({
			name: 'isVideoAvailable',
			title: 'Is Video Available?',
			type: 'boolean',
			description: 'Have you uploaded a video for this match?',
		}),
		defineField({
			name: 'competition',
			title: 'Competition',
			type: 'string',
			validation: Rule => Rule.required(),
			options: {
				list: [
					{
						title: 'Kreisfreundschaftsspiele',
						value: 'Kreisfreundschaftsspiele',
					},
					{ title: 'Rheinlandpokal', value: 'Rheinlandpokal' },
					{ title: 'Bezirksliga', value: 'Bezirksliga' },
				],
				layout: 'radio',
			},
		}),
		defineField({
			name: 'homeTeam',
			title: 'Home Team',
			type: 'string',
			validation: Rule => Rule.required(),
		}),
		defineField({
			name: 'awayTeam',
			title: 'Away Team',
			type: 'string',
			validation: Rule => Rule.required(),
		}),
		defineField({
			name: 'homeScore',
			title: 'Home Score',
			type: 'number',
			validation: Rule => Rule.required(),
		}),
		defineField({
			name: 'awayScore',
			title: 'Away Score',
			type: 'number',
			validation: Rule => Rule.required(),
		}),
		defineField({
			name: 'date',
			title: 'Date',
			type: 'datetime',
		}),
		defineField({
			name: 'firstHalf1',
			title: 'First Half 1',
			type: 'string',
		}),
		defineField({
			name: 'firstHalf2',
			title: 'First Half 2',
			type: 'string',
		}),
		defineField({
			name: 'firstHalf3',
			title: 'First Half 3',
			type: 'string',
		}),
		defineField({
			name: 'secondHalf1',
			title: 'Second Half 1',
			type: 'string',
		}),
		defineField({
			name: 'secondHalf2',
			title: 'Second Half 2',
			type: 'string',
		}),
		defineField({
			name: 'secondHalf3',
			title: 'Second Half 3',
			type: 'string',
		}),
		defineField({
			name: 'fullGame',
			title: 'Full Game',
			type: 'string',
		}),
	],
	initialValue: {
		homeTeam: 'SVE Mendig',
		awayTeam: 'SVE Mendig',
		homeScore: 0,
		awayScore: 0,
	},
	preview: {
		select: { title: 'gameInfo' },
	},
});
