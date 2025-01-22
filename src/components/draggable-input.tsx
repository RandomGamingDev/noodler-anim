export default function DraggableInput({ value, onChange } : { value: number, onChange: (event: React.ChangeEvent<HTMLInputElement>) => void }) {
	return (
		<input type="number" value={value} onChange={onChange} pattern="[0-9]" className="text-center appearance-none bg-transparent border border-gray-700 ml-1 mr-4 my-[0.1rem] max-w-10 max-h-5 rounded-md"></input>
	);
}