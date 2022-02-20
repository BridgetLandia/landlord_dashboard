import { useRouter } from 'next/router';

const languages = [ [ 'English', 'en' ], [ 'Danish', 'da' ] ];

export default function LanguageSwitcher() {
	const router = useRouter();

	const handleLocaleChange = (data: string) => {
		router.replace(router.pathname, router.pathname, { locale: data });
	};

	return (
		<select value={router.locale} onChange={(e) => handleLocaleChange(e.target.value)}>
			{languages.map((row) => (
				<option value={row[1]} key={row[0]}>
					{row[0]}
				</option>
			))}
		</select>
	);
}
