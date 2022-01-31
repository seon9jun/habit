import { useForm } from 'react-hook-form';

interface useFormProp {
	Todo: string;
}
export function ToDoList() {
	const { register, handleSubmit, setValue } = useForm<useFormProp>();
	const onValid = (data: useFormProp) => {
		console.log(data);
		setValue('Todo', '');
	};

	return (
		<div>
			<form onSubmit={handleSubmit(onValid)}>
				<input
					{...register('Todo', {
						required: 'please write a Todo',
					})}
					placeholder="Email"
				/>
				<button>Add</button>
			</form>
		</div>
	);
}
