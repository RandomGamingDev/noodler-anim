import { useEffect, useRef } from "react";

export default function DraggableInput({ value, onChange } : { value: number, onChange: (event: React.ChangeEvent<HTMLInputElement>) => void }) {
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		let startY = 0;
		let startValue = 0;
		let isDragging = false;

		inputRef.current!.addEventListener('mousedown', (event) => {
			startY = event.clientY;
			startValue = parseFloat(inputRef.current!.value) || 0;
			isDragging = true;

			// Prevent text selection while dragging
			event.preventDefault();
		});

		document.addEventListener('mousemove', (event) => {
			if (isDragging) {
				const diffY = startY - event.clientY;
				const step = 1; // Adjust step size as needed
				inputRef.current!.value = String(startValue + Math.floor(diffY / step));
			}
		});

		document.addEventListener('mouseup', () => {
			if (isDragging) {
				isDragging = false;
			}
		});

		// Optional: prevent default scroll behavior if input is focused
		inputRef.current!.addEventListener('wheel', (event) => event.preventDefault());
	}, [inputRef])

	return (
		<input type="number" ref={inputRef} value={value} onChange={onChange} pattern="[0-9]" className="text-center appearance-none bg-transparent border border-gray-700 ml-1 mr-4 my-[0.1rem] max-w-10 max-h-5 rounded-md"></input>
	);
}