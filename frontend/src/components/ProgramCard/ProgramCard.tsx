import type { Program } from "../../types/types";

type ProgramCardProps = {
	program: Program;
};

export default function ProgramCard({ program }: ProgramCardProps) {
	return (
		<div className='card'>
			<h3>{program.name}</h3>

			<p className='meta'>
				<strong>Stopień:</strong> {program.degreeType}
			</p>

			<p className='meta'>
				<strong>Tryb:</strong> {program.studyModes.join(", ")}
			</p>

			<p className='meta'>{program.description}</p>
		</div>
	);
}
