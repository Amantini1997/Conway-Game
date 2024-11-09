import { forwardRef, HTMLAttributes, memo, useEffect, useState } from 'react'
import { CellContainer } from './cell.styles';

type Props = HTMLAttributes<HTMLDivElement> & { isAlive?: boolean, index?: number };
export const Cell = memo(forwardRef(({ index = -1, isAlive: isAliveInput, ...props }: Props, ref: any) => {
	const [isAlive, setIsAlive] = useState(isAliveInput);

	useEffect(() => {
		if (!ref?.current && index !== -1) return;
		ref.current[index] = setIsAlive;
	}, [index, ref])

	useEffect(() => {
		setIsAlive(isAliveInput);
	}, [isAliveInput]);

	return (
		<CellContainer $isAlive={isAlive} {...props} />
	);
}), (prev, curr) => prev.isAlive === curr.isAlive);