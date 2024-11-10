import { forwardRef, HTMLAttributes, memo, useEffect, useState } from 'react'
import { TileContainer } from './tile.styles';

type Props = HTMLAttributes<HTMLDivElement> & { isAlive?: boolean, index?: number };
export const Tile = memo(forwardRef(({ index = -1, isAlive: isAliveInput, ...props }: Props, ref: any) => {
	const [isAlive, setIsAlive] = useState(isAliveInput);

	useEffect(() => {
		if (!ref?.current && index !== -1) return;
		ref.current[index] = setIsAlive;
	}, [index, ref])

	useEffect(() => {
		setIsAlive(isAliveInput);
	}, [isAliveInput]);

	return (
		<TileContainer $isAlive={isAlive} {...props} />
	);
}), (prev, curr) => prev.isAlive === curr.isAlive);