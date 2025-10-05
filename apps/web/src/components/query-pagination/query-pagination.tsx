'use client';

import { usePathname, useSearchParams } from 'next/navigation';

interface QueryPaginationProps {
	totalPages: number;
	className?: string;
}

export function QueryPagination({
	totalPages,
	className,
}: QueryPaginationProps) {
	if (totalPages <= 1) return null;

	const pathName = usePathname();
	const searchParams = useSearchParams();

	if (!searchParams) return null;

	const currentPage = Number(searchParams.get('page')) || 1;
	const prevPage = currentPage > 1 ? currentPage - 1 : null;
	const nextPage = currentPage < totalPages ? currentPage + 1 : null;

	const createPageURL = (page: number | string) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set('page', page.toString());
		return `${pathName}?${params.toString()}`;
	};

	return (
		<div className={className}>
			{prevPage && (
				<a href={createPageURL(prevPage)} aria-label="Previous Page">
					Previous
				</a>
			)}
			<span>
				Page {currentPage} of {totalPages}
			</span>

			{Array(totalPages)
				.fill('')
				.map((_, index) => (
					<>
						<span key={`sep-${index}`}>, </span>
						<a
							key={index + 1}
							href={createPageURL(index + 1)}
							aria-current={currentPage === index + 1 ? 'page' : undefined}
							style={{
								fontWeight: currentPage === index + 1 ? 'bold' : 'normal',
								margin: '0 4px',
							}}
						>
							{index + 1}
						</a>
					</>
				))}
			{nextPage && (
				<a href={createPageURL(nextPage)} aria-label="Next Page">
					Next
				</a>
			)}
		</div>
	);
}
