import Button from '@/components/ui/Button';
import { ArrowUpRight, Trash } from 'lucide-react';
import React from 'react';
import { cn } from '@/lib/utils';

const files: UploadsListFile[] = [
	{
		name: 'Lindsay Walton.png',
		date: '2023-05-29T08:08:07.289624+00:00',
		src: 'https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821_1280.jpg',
	},
	{
		name: 'Wlaton Lindsay.jpg',
		date: '2023-05-30T08:08:07.289624+00:00',
		src: 'https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821_1280.jpg',
	},
];

interface LinearListProps{
	edit: boolean
}

export default function LinearList({edit}:LinearListProps) {


	// parse a date from gmt format to iso format
	const parseDate = (date: string) => {
		return new Date(date).toISOString().split('T')[0];
	};




	return (
		<div className="flex flex-col w-full gap-2 ">
			<table className="min-w-full divide-y divide-gray-700">
				<thead className="p-2">
					<tr>
						<th scope="col" className="relative p-4 px-6">
							<span className="sr-only">Select</span>
						</th>
						<th
							scope="col"
							className="py-3.5 pl-4 pr-3 w-full text-left text-sm font-semibold text-white"
						>
							Name
						</th>
						<th
							scope="col"
							className="px-9 py-3.5 text-left text-sm font-semibold text-white"
						>
							Date
						</th>
						<th scope="col" className="relative py-3.5  px-4">
							<span className="sr-only">Controls</span>
						</th>
					</tr>
				</thead>
				<tbody className="divide-y p-2">
					{files.map((person, index) => (
						<tr className="bg-gray-900 rounded" key={index}>
							<td className="relative whitespace-nowrap p-4  text-right text-sm font-medium">
								<input
									type="checkbox"
									className={cn(
										'h-4 w-4 rounded bg-transparent border-primary text-primary',
										{ hidden: !edit }
									)}
								/>
							</td>
							<td className="whitespace-nowrap  pl-4 text-sm font-medium text-white">
								{person.name}
							</td>
							<td className="whitespace-nowrap px-9 py-4 text-sm text-gray-300">
								{parseDate(person.date)}
							</td>
							<td className="relative whitespace-nowrap py-4 px-4 text-right text-sm font-medium icons flex center items-center gap-3">
								<Button
									variant="transparent"
									size={'icon'}
									aria-label="Delete Image"
									title="Delete Image"
									className="rounded-full p-2  hover:bg-red-50 hover:text-red-600 text-red-300"
								>
									<Trash className="h-4 w-4 " />
								</Button>
								<Button
									variant="transparent"
									size={'icon'}
									aria-label="Open Image"
									title="Open Image"
									className="rounded-full p-2 hover:bg-black"
								>
									<ArrowUpRight className="h-4 w-4 " />
								</Button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
