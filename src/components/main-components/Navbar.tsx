'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRef, useState } from 'react';
import { FaBars, FaFacebook, FaInstagram } from 'react-icons/fa';
import logo from '../../../public/logo.png';

const links = [
	{
		id: 1,
		url: '/',
		text: 'home',
	},
	{
		id: 2,
		url: '/replay',
		text: 'replay',
	},
];
const social = [
	{
		id: 1,
		url: 'https://www.facebook.com/SGEintrachtMendigBell',
		icon: <FaFacebook className='w-5 h-5 hover:opacity-80 hover:text-[#15A34A]' />,
	},
	{
		id: 2,
		url: 'https://www.instagram.com/sveintrachtmendig/',
		icon: <FaInstagram className='w-5 h-5 hover:opacity-80 hover:text-[#15A34A]' />,
	},
];

const Navbar = () => {
	const pathname = usePathname();

	const [showLinks, setShowLinks] = useState(false);

	const linkContainerRef = useRef(null);
	const linksRef = useRef(null);

	const toggleLinks = () => {
		setShowLinks(!showLinks);
	};

	return (
		<nav>
			<div className='nav-center'>
				<div className='nav-header'>
					<Link className='flex items-center justify-center cursor-pointer gap-x-3' href='/'>
						<Image src={logo} alt='logo' className='logo' height={40} width={40} priority />
					</Link>
					<button
						type='button'
						className={showLinks ? 'nav-toggle text-primaryGreen rotate-90' : 'nav-toggle'}
						onClick={toggleLinks}
					>
						<FaBars />
					</button>
				</div>
				<div
					className='links-container'
					ref={linkContainerRef}
					// style={linkStyles}
				>
					<div className='flex justify-center gap-4 links' ref={linksRef}>
						{links.map(link => {
							const { id, url, text } = link;
							return (
								<Link
									key={id}
									href={url}
									style={{
										color: pathname === link.url ? '#15A34A' : '#111827',
										textTransform: 'capitalize',
										letterSpacing: '2px',
										fontWeight: 'bold',
										paddingTop: '0.5rem',
										paddingLeft: '0.2rem',
										paddingRight: '0.2rem',
										paddingBottom: pathname === link.url ? '0.5rem' : '0',
										borderBottom: pathname === link.url ? '3px solid #15A34A' : 'none',
									}}
								>
									{text}
								</Link>
							);
						})}
					</div>
				</div>
				{/* SOCIAL LINKS */}
				<ul className='social-icons'>
					{social.map(socialIcon => {
						const { id, url, icon } = socialIcon;
						return (
							<Link key={id} href={url} target='_blank' rel='noreferrer'>
								{icon}
							</Link>
						);
					})}
				</ul>
			</div>
		</nav>
	);
};
export default Navbar;
