import React from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { Categories, IToDo, toDoState } from '../atoms';

const Button = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 10px;
	border-radius: 50%;
	border: none;
	background-color: skyblue;
	margin-left: 10px;
`;

const List = styled.li`
	display: flex;
	justify-content: flex-end;
	margin: 15px;
	align-items: center;

	span {
		font-size: 20px;
	}
`;

function ToDo({ text, category, id }: IToDo) {
	const setToDos = useSetRecoilState(toDoState);
	const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		const {
			currentTarget: { name },
		} = event;
		setToDos((oldToDos) => {
			const findIndex = oldToDos.findIndex((todo) => todo.id === id);
			const newToDo = { id, text, category: name as IToDo['category'] };
			const newToDos = [...oldToDos];
			newToDos.splice(findIndex, 1, newToDo);
			return newToDos;
		});
	};
	const deleteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setToDos((oldToDos) => {
			const findIndex = oldToDos.findIndex((todo) => todo.id === id);
			return [...oldToDos.slice(0, findIndex), ...oldToDos.slice(findIndex + 1)];
		});
	};
	return (
		<List>
			<span>{text}</span>
			{category !== Categories.TO_DO && (
				<Button name={Categories.TO_DO} onClick={onClick}>
					Todo
				</Button>
			)}
			{category !== Categories.DOING && (
				<Button name={Categories.DOING} onClick={onClick}>
					Doing
				</Button>
			)}
			{category !== Categories.DONE && (
				<Button name={Categories.DONE} onClick={onClick}>
					Done
				</Button>
			)}
			<Button name={Categories.DELETE} onClick={deleteClick}>
				Delete
			</Button>
		</List>
	);
}

export default ToDo;
