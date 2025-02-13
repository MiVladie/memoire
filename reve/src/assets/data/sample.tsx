import React from 'react';

import { ReactComponent as SoundCloud } from 'assets/icons/soundcloud.svg';
// import { ReactComponent as YouTube } from 'assets/icons/youtube.svg';

import { ReactComponent as Person } from 'assets/icons/person.svg';
import { ReactComponent as Lock } from 'assets/icons/lock.svg';

import { EPlaylistType, IPlaylist } from 'interfaces/data';

export const ACCOUNT = [
	{
		id: 1,
		icon: <Person />,
		color: '#8174A0',
		name: 'Profile'
	},
	{
		id: 2,
		icon: <Lock />,
		color: '#659287',
		name: 'Password'
	},
	{
		id: 3,
		icon: <SoundCloud />,
		color: '#FF7500',
		name: 'SoundCloud'
	}
	// {
	// 	id: 4,
	// 	icon: <YouTube />,
	// 	color: '#FF0000',
	// 	name: 'YouTube'
	// }
];

export const PLATFORMS = [
	{
		id: 1,
		name: 'SoundCloud'
	},
	{
		id: 2,
		name: 'YouTube'
	}
];

// @ts-ignore
export const PLAYLISTS: IPlaylist[] = [
	{
		id: 1,
		name: 'Reposts',
		type: EPlaylistType.REPOST,
		total: 478,
		removed: 12,
		date: new Date()
	},
	{
		id: 2,
		name: 'Likes',
		type: EPlaylistType.LIKE,
		total: 1273,
		removed: 24,
		date: new Date()
	},
	{
		id: 3,
		name: 'Lo-Fi',
		type: EPlaylistType.CUSTOM,
		total: 74,
		removed: 3,
		date: new Date()
	},
	{
		id: 4,
		name: '4reDng.',
		type: EPlaylistType.CUSTOM,
		total: 128,
		removed: 15,
		date: new Date()
	}
];

export const SONGS = [
	{
		id: 56,
		name: 'Dangerous - Dee Dot Jones (Rossylo Remix) feat. Christian Pulido',
		image: 'https://i1.sndcdn.com/artworks-000191393814-roymfw-large.jpg',
		author: 'LOVE ROSSYLO',
		url: 'https://soundcloud.com/loverossylo/dangerous',
		duration: 186,
		is_present: true,
		platformId: 1,
		soundcloudSong: {
			soundcloudTrackId: 290759155,
			songId: 56
		}
	},
	{
		id: 55,
		name: 'Wizard & Matbow - What You Want',
		image: 'https://i1.sndcdn.com/artworks-000191893641-qut1hj-large.jpg',
		author: 'Tribal Trap',
		url: 'https://soundcloud.com/tribaltrapmusic/whatyouwant',
		duration: 180,
		is_present: true,
		platformId: 1,
		soundcloudSong: {
			soundcloudTrackId: 291337089,
			songId: 55
		}
	},
	{
		id: 54,
		name: 'Revolution (prod. Loud Lord)',
		image: 'https://i1.sndcdn.com/artworks-000140395287-k35mqx-large.jpg',
		author: 'EndyEnds',
		url: 'https://soundcloud.com/endyends/revolution-prod-loud-lord',
		duration: 212,
		is_present: true,
		platformId: 1,
		soundcloudSong: {
			soundcloudTrackId: 215470686,
			songId: 54
		}
	},
	{
		id: 53,
		name: 'OREGONTRAIL - I ADMIT, IT HAS NOT BEEN EASY',
		image: 'https://i1.sndcdn.com/artworks-000191692080-8wultr-large.jpg',
		author: 'OREGONTRAIL',
		url: 'https://soundcloud.com/notoregontrail/oregontrail-i-admit-it-has-not-been-easy',
		duration: 172,
		is_present: true,
		platformId: 1,
		soundcloudSong: {
			soundcloudTrackId: 291086099,
			songId: 53
		}
	},
	{
		id: 52,
		name: 'Wizard & Matbow - Tell Me Why',
		image: 'https://i1.sndcdn.com/artworks-000191192185-opkw9v-large.jpg',
		author: 'Tribal Trap',
		url: 'https://soundcloud.com/tribaltrapmusic/tellmewhy',
		duration: 196,
		is_present: true,
		platformId: 1,
		soundcloudSong: {
			soundcloudTrackId: 290406994,
			songId: 52
		}
	},
	{
		id: 51,
		name: 'one of a kind (rip xxx)',
		image: 'https://i1.sndcdn.com/artworks-000283458977-kuvdru-large.jpg',
		author: 'Pixagram✨',
		url: 'https://soundcloud.com/pixagram/one-of-a-kind',
		duration: 59,
		is_present: true,
		platformId: 1,
		soundcloudSong: {
			soundcloudTrackId: 290312872,
			songId: 51
		}
	},
	{
		id: 50,
		name: 'Danny Tenaglia - Music Is The Answer (Lu.cian & Hippocoon Remix)',
		image: 'https://i1.sndcdn.com/artworks-000189663533-49mzlm-large.jpg',
		author: 'Lu.cian',
		url: 'https://soundcloud.com/lucianklan/danny-tenaglia-music-is-the-answer-fractall-hippocoon-remix-free-download',
		duration: 301,
		is_present: false,
		platformId: 1,
		soundcloudSong: {
			soundcloudTrackId: 288991656,
			songId: 50
		}
	},
	{
		id: 49,
		name: 'LAVISH PALACE (VIDEO IN DESCRIPTION)',
		image: 'https://i1.sndcdn.com/artworks-000184553868-aawg29-large.jpg',
		author: 'COSMASTLY',
		url: 'https://soundcloud.com/cosmastly/lavish-palace',
		duration: 132,
		is_present: true,
		platformId: 1,
		soundcloudSong: {
			soundcloudTrackId: 284211219,
			songId: 49
		}
	},
	{
		id: 48,
		name: "I Don't Mind (feat. Sonn)",
		image: 'https://i1.sndcdn.com/artworks-000188238650-r9oze0-large.jpg',
		author: 'Wizard',
		url: 'https://soundcloud.com/wizardbeatsuk/i-dont-mind-akay',
		duration: 220,
		is_present: true,
		platformId: 1,
		soundcloudSong: {
			soundcloudTrackId: 287634071,
			songId: 48
		}
	},
	{
		id: 47,
		name: 'OVERDOSE',
		image: 'https://i1.sndcdn.com/artworks-000197296895-v39noh-large.jpg',
		author: 'SHIKARI',
		url: 'https://soundcloud.com/shikari/overdose',
		duration: 148,
		is_present: true,
		platformId: 1,
		soundcloudSong: {
			soundcloudTrackId: 286208024,
			songId: 47
		}
	},
	{
		id: 46,
		name: '$tunt',
		image: 'https://i1.sndcdn.com/artworks-000186309702-0cseyj-large.jpg',
		author: 'esta.',
		url: 'https://soundcloud.com/beatsbyesta/tunt',
		duration: 114,
		is_present: true,
		platformId: 1,
		soundcloudSong: {
			soundcloudTrackId: 285751495,
			songId: 46
		}
	},
	{
		id: 45,
		name: 'Blok',
		image: 'https://i1.sndcdn.com/artworks-000213297196-l5wai0-large.jpg',
		author: 'SKULS',
		url: 'https://soundcloud.com/officialskuls/blok-1',
		duration: 209,
		is_present: true,
		platformId: 1,
		soundcloudSong: {
			soundcloudTrackId: 285130136,
			songId: 45
		}
	},
	{
		id: 44,
		name: 'KREEP',
		image: 'https://i1.sndcdn.com/artworks-000185496130-2v7e8e-large.jpg',
		author: 'MIRVZH',
		url: 'https://soundcloud.com/mirvzh/kreep',
		duration: 178,
		is_present: true,
		platformId: 1,
		soundcloudSong: {
			soundcloudTrackId: 284925519,
			songId: 44
		}
	},
	{
		id: 43,
		name: 'cash out',
		image: 'https://i1.sndcdn.com/artworks-000185709810-6y7zdc-large.jpg',
		author: 'niteboi✨🌙',
		url: 'https://soundcloud.com/niteboi6/cashout',
		duration: 129,
		is_present: true,
		platformId: 1,
		soundcloudSong: {
			soundcloudTrackId: 279293346,
			songId: 43
		}
	},
	{
		id: 42,
		name: 'OK! OK! - Karma Rhythm, ✘O ✘V ✘T',
		image: 'https://i1.sndcdn.com/artworks-NVXCqzr5OggoMsq5-LsR3mQ-large.jpg',
		author: 'karma rhythm',
		url: 'https://soundcloud.com/karmarhythm/okok',
		duration: 149,
		is_present: true,
		platformId: 1,
		soundcloudSong: {
			soundcloudTrackId: 275162520,
			songId: 42
		}
	},
	{
		id: 41,
		name: 'WINTER IN JULY',
		image: 'https://i1.sndcdn.com/artworks-000170904637-pt47kd-large.jpg',
		author: 'ANUBIS-XIII',
		url: 'https://soundcloud.com/anubiiis/winter-in-july-1',
		duration: 197,
		is_present: true,
		platformId: 1,
		soundcloudSong: {
			soundcloudTrackId: 273059034,
			songId: 41
		}
	},
	{
		id: 40,
		name: 'CLOSE YOUR EYES',
		image: 'https://i1.sndcdn.com/artworks-000168873377-p6t4o0-large.jpg',
		author: 'Absolute Terror',
		url: 'https://soundcloud.com/absolute-terror/close-your-eyes',
		duration: 157,
		is_present: true,
		platformId: 1,
		soundcloudSong: {
			soundcloudTrackId: 270718748,
			songId: 40
		}
	},
	{
		id: 39,
		name: 'Book Four.',
		image: 'https://i1.sndcdn.com/artworks-000181116366-u233is-large.jpg',
		author: '֍ ཤབཋཀ༠ལ ཧསཥ ֍',
		url: 'https://soundcloud.com/essex/book4',
		duration: 147,
		is_present: true,
		platformId: 1,
		soundcloudSong: {
			soundcloudTrackId: 281752730,
			songId: 39
		}
	},
	{
		id: 38,
		name: 'IGNORRRR.',
		image: 'https://i1.sndcdn.com/artworks-000183121000-gs9q34-large.jpg',
		author: 'etienne dodin',
		url: 'https://soundcloud.com/etiennedodin/ignorrrr',
		duration: 162,
		is_present: true,
		platformId: 1,
		soundcloudSong: {
			soundcloudTrackId: 283395404,
			songId: 38
		}
	},
	{
		id: 37,
		name: "playin' w/ niteboi✨🌙 (drake - poundcake remix)",
		image: 'https://i1.sndcdn.com/artworks-000181785876-0p9lna-large.jpg',
		author: 'sake.',
		url: 'https://soundcloud.com/themagnanimousbeing/playin-w-niteboi',
		duration: 165,
		is_present: true,
		platformId: 1,
		soundcloudSong: {
			soundcloudTrackId: 282303818,
			songId: 37
		}
	},
	{
		id: 36,
		name: 'SAFARI',
		image: 'https://i1.sndcdn.com/artworks-000150919518-ap7e9p-large.jpg',
		author: 'ANUBIS-XIII',
		url: 'https://soundcloud.com/anubiiis/safari',
		duration: 171,
		is_present: true,
		platformId: 1,
		soundcloudSong: {
			soundcloudTrackId: 251881468,
			songId: 36
		}
	},
	{
		id: 35,
		name: 'forever in my mind',
		image: 'https://i1.sndcdn.com/artworks-000301751892-6x198d-large.jpg',
		author: 'sonn',
		url: 'https://soundcloud.com/sonn/mind',
		duration: 176,
		is_present: true,
		platformId: 1,
		soundcloudSong: {
			soundcloudTrackId: 281083793,
			songId: 35
		}
	},
	{
		id: 34,
		name: 'Beamon - Lavender Town (produced by myuu/alfon zaaberg)',
		image: 'https://i1.sndcdn.com/artworks-000158856213-wx5gjy-large.jpg',
		author: 'BEAMON',
		url: 'https://soundcloud.com/thebeamon/lavenderbeam',
		duration: 204,
		is_present: true,
		platformId: 1,
		soundcloudSong: {
			soundcloudTrackId: 249412633,
			songId: 34
		}
	},
	{
		id: 33,
		name: 'I Will Follow You',
		image: 'https://i1.sndcdn.com/artworks-000183974646-fl87c4-large.jpg',
		author: 'OBESØN: Hidden Files',
		url: 'https://soundcloud.com/obesonhiddenfiles/i-will-follow-you',
		duration: 247,
		is_present: true,
		platformId: 1,
		soundcloudSong: {
			soundcloudTrackId: 227458392,
			songId: 33
		}
	},
	{
		id: 32,
		name: 'GLITTER',
		image: 'https://i1.sndcdn.com/artworks-000177260527-fpiih0-large.jpg',
		author: 'GRXGVR',
		url: 'https://soundcloud.com/gregar/glitter',
		duration: 136,
		is_present: true,
		platformId: 1,
		soundcloudSong: {
			soundcloudTrackId: 278324878,
			songId: 32
		}
	},
	{
		id: 31,
		name: 'ALL BLACK AROUND',
		image: 'https://i1.sndcdn.com/artworks-000177863145-1red2x-large.jpg',
		author: 'lunar vision',
		url: 'https://soundcloud.com/lunartalk/all-black-around',
		duration: 196,
		is_present: true,
		platformId: 1,
		soundcloudSong: {
			soundcloudTrackId: 279364673,
			songId: 31
		}
	},
	{
		id: 30,
		name: 'w.i.t.h.e.r.',
		image: 'https://i1.sndcdn.com/artworks-000182122955-kqeell-large.jpg',
		author: '֍ ཤབཋཀ༠ལ ཧསཥ ֍',
		url: 'https://soundcloud.com/essex/wither',
		duration: 135,
		is_present: true,
		platformId: 1,
		soundcloudSong: {
			soundcloudTrackId: 278177805,
			songId: 30
		}
	},
	{
		id: 29,
		name: 'Sorsari - Children Of Gaia [NEST HQ PREMIERE]',
		image: 'https://i1.sndcdn.com/artworks-000168241876-w4ffuy-large.jpg',
		author: 'terrorhythm',
		url: 'https://soundcloud.com/terrorhythm/sorsari-children-of-gaia',
		duration: 231,
		is_present: true,
		platformId: 1,
		soundcloudSong: {
			soundcloudTrackId: 269993827,
			songId: 29
		}
	},
	{
		id: 28,
		name: 'suedeovercoat w/ bones & smitty the bg',
		image: 'https://i1.sndcdn.com/artworks-000177388412-n36w6p-large.jpg',
		author: 'drew the architect',
		url: 'https://soundcloud.com/drewthearchitect/suedeovercoat',
		duration: 173,
		is_present: true,
		platformId: 1,
		soundcloudSong: {
			soundcloudTrackId: 278908920,
			songId: 28
		}
	},
	{
		id: 27,
		name: "Hol' Up",
		image: 'https://i1.sndcdn.com/artworks-000176585932-odrdqf-large.jpg',
		author: 'COSMIC',
		url: 'https://soundcloud.com/cosmicbeats/hol-up',
		duration: 195,
		is_present: true,
		platformId: 1,
		soundcloudSong: {
			soundcloudTrackId: 278149271,
			songId: 27
		}
	},
	{
		id: 26,
		name: 'ULTRA DESPAIR',
		image: 'https://i1.sndcdn.com/artworks-cpBv7uICEUWR1MYt-ChTEzw-large.jpg',
		author: 'NATE EVEREST',
		url: 'https://soundcloud.com/thenexthokage/ultra-despair',
		duration: 168,
		is_present: true,
		platformId: 1,
		soundcloudSong: {
			soundcloudTrackId: 278158789,
			songId: 26
		}
	},
	{
		id: 25,
		name: "brothel & divine - Can't Sleep",
		image: 'https://i1.sndcdn.com/artworks-000150407252-xg4upd-large.jpg',
		author: 'trapdoor',
		url: 'https://soundcloud.com/trap-door-official/brothelxdivine-cant-sleep',
		duration: 144,
		is_present: true,
		platformId: 1,
		soundcloudSong: {
			soundcloudTrackId: 251219676,
			songId: 25
		}
	},
	{
		id: 24,
		name: 'vindication w/ BVLLVH',
		image: 'https://i1.sndcdn.com/artworks-000261325373-zxy4m3-large.jpg',
		author: 'bloodworth',
		url: 'https://soundcloud.com/bloodworth99/vindication-w-bvllah',
		duration: 129,
		is_present: true,
		platformId: 1,
		soundcloudSong: {
			soundcloudTrackId: 274746497,
			songId: 24
		}
	},
	{
		id: 23,
		name: 'Beamon - Frozen Garden (produced by Natsu Fuji)',
		image: 'https://i1.sndcdn.com/artworks-000133528744-mvshz5-large.jpg',
		author: 'BEAMON',
		url: 'https://soundcloud.com/thebeamon/beamfrozengarden',
		duration: 294,
		is_present: true,
		platformId: 1,
		soundcloudSong: {
			soundcloudTrackId: 218531426,
			songId: 23
		}
	},
	{
		id: 22,
		name: "Beamon - I'll Stay Inside If I Have To (produced by Frander)",
		image: 'https://i1.sndcdn.com/artworks-000230574435-xi7tdn-large.jpg',
		author: 'BEAMON',
		url: 'https://soundcloud.com/thebeamon/beamoninside',
		duration: 175,
		is_present: true,
		platformId: 1,
		soundcloudSong: {
			soundcloudTrackId: 275202218,
			songId: 22
		}
	},
	{
		id: 21,
		name: 'Atman - Beautiful',
		image: 'https://i1.sndcdn.com/artworks-000145744258-0gt8jf-large.jpg',
		author: 'More Than Records',
		url: 'https://soundcloud.com/morethanrecs/atman-beautiful',
		duration: 164,
		is_present: true,
		platformId: 1,
		soundcloudSong: {
			soundcloudTrackId: 245273240,
			songId: 21
		}
	},
	{
		id: 20,
		name: "FREE D/L: Jack Wins - What's Love **PREMIERED BY OLIVER HELDENS**",
		image: 'https://i1.sndcdn.com/artworks-000174288030-zcnz9q-large.jpg',
		author: 'Jack Wins',
		url: 'https://soundcloud.com/jackwinsmusic/free-dl-jack-wins-whats-love-premiered-by-oliver-heldens',
		duration: 244,
		is_present: true,
		platformId: 1,
		soundcloudSong: {
			soundcloudTrackId: 276305839,
			songId: 20
		}
	},
	{
		id: 19,
		name: 'apollo w/ win32',
		image: 'https://i1.sndcdn.com/artworks-000166429163-m3zsz6-large.jpg',
		author: '777WORLD',
		url: 'https://soundcloud.com/7world/apollo-w-win32',
		duration: 253,
		is_present: true,
		platformId: 1,
		soundcloudSong: {
			soundcloudTrackId: 268067066,
			songId: 19
		}
	},
	{
		id: 18,
		name: 'WANDERLUST',
		image: 'https://i1.sndcdn.com/artworks-ERZyIsdCktJqhLTp-Clunew-large.jpg',
		author: 'NATE EVEREST',
		url: 'https://soundcloud.com/thenexthokage/wanderlust',
		duration: 178,
		is_present: true,
		platformId: 1,
		soundcloudSong: {
			soundcloudTrackId: 243473160,
			songId: 18
		}
	},
	{
		id: 17,
		name: 'Tree',
		image: 'https://i1.sndcdn.com/artworks-000173076214-2m1jt3-large.jpg',
		author: 'Arkayd',
		url: 'https://soundcloud.com/arkayd/arktree',
		duration: 198,
		is_present: true,
		platformId: 1,
		soundcloudSong: {
			soundcloudTrackId: 275118250,
			songId: 17
		}
	},
	{
		id: 16,
		name: 'Hello1',
		image: 'https://i1.sndcdn.com/artworks-000171529876-zlsqo9-large.jpg',
		author: 'MR•CAR/\\\\ACK',
		url: 'https://soundcloud.com/mr_carmack/hello1',
		duration: 205,
		is_present: true,
		platformId: 1,
		soundcloudSong: {
			soundcloudTrackId: 273754276,
			songId: 16
		}
	},
	{
		id: 15,
		name: 'Kevin Flum - U Mad Bro?',
		image: 'https://i1.sndcdn.com/artworks-000091211392-j0evp2-large.jpg',
		author: 'Rap Nation',
		url: 'https://soundcloud.com/allrapnation/kevin-flum-u-mad-bro',
		duration: 228,
		is_present: true,
		platformId: 1,
		soundcloudSong: {
			soundcloudTrackId: 168019544,
			songId: 15
		}
	},
	{
		id: 14,
		name: 'LEGENDS NEVER DIE (w/ NITEBOI)',
		image: 'https://i1.sndcdn.com/artworks-000179677191-hhiax4-large.jpg',
		author: 'SHIKARI',
		url: 'https://soundcloud.com/shikari/legends-never-die-with-flakey',
		duration: 130,
		is_present: true,
		platformId: 1,
		soundcloudSong: {
			soundcloudTrackId: 273957945,
			songId: 14
		}
	},
	{
		id: 13,
		name: 'believe',
		image: 'https://i1.sndcdn.com/artworks-000172824189-url8rx-large.jpg',
		author: 'sh1han',
		url: 'https://soundcloud.com/sh1hanbeats/believe',
		duration: 240,
		is_present: true,
		platformId: 1,
		soundcloudSong: {
			soundcloudTrackId: 274910091,
			songId: 13
		}
	},
	{
		id: 12,
		name: 'Sanctified',
		image: 'https://i1.sndcdn.com/artworks-000072694048-hn3doi-large.jpg',
		author: 'Big Sean',
		url: 'https://soundcloud.com/bigsean-1/sanctified',
		duration: 188,
		is_present: true,
		platformId: 1,
		soundcloudSong: {
			soundcloudTrackId: 138102821,
			songId: 12
		}
	},
	{
		id: 11,
		name: '¥EN - Decadance',
		image: 'https://i1.sndcdn.com/artworks-000171702041-ntb3wh-large.jpg',
		author: 'Scizzahz (Lobster Music)',
		url: 'https://soundcloud.com/scizzahz/en-decadance',
		duration: 184,
		is_present: true,
		platformId: 1,
		soundcloudSong: {
			soundcloudTrackId: 273931474,
			songId: 11
		}
	},
	{
		id: 10,
		name: 'Wizard - July',
		image: 'https://i1.sndcdn.com/artworks-000171889574-8bxgvc-large.jpg',
		author: 'Trap Society',
		url: 'https://soundcloud.com/trapsocietyofficial/wizard-july-trap-society-exclusive',
		duration: 176,
		is_present: true,
		platformId: 1,
		soundcloudSong: {
			soundcloudTrackId: 273866395,
			songId: 10
		}
	},
	{
		id: 9,
		name: 'i want u',
		image: 'https://i1.sndcdn.com/artworks-000117898818-iwwi89-large.jpg',
		author: 'break.',
		url: 'https://soundcloud.com/break/i-want-u',
		duration: 128,
		is_present: true,
		platformId: 1,
		soundcloudSong: {
			soundcloudTrackId: 163497270,
			songId: 9
		}
	},
	{
		id: 8,
		name: 'Hucci - A Perfect Storm',
		image: 'https://i1.sndcdn.com/artworks-000132961498-98gv4d-large.jpg',
		author: 'Hucci',
		url: 'https://soundcloud.com/hucci/aperfectstorm',
		duration: 266,
		is_present: true,
		platformId: 1,
		soundcloudSong: {
			soundcloudTrackId: 228729827,
			songId: 8
		}
	},
	{
		id: 7,
		name: 'Too Fast',
		image: 'https://i1.sndcdn.com/artworks-jszgshKObuRCEJ6t-s9oXRw-large.jpg',
		author: 'Wizard',
		url: 'https://soundcloud.com/wizardbeatsuk/too-fast',
		duration: 160,
		is_present: true,
		platformId: 1,
		soundcloudSong: {
			soundcloudTrackId: 268280851,
			songId: 7
		}
	}
];

export const ACTIVE_PLAYLIST = 2;
