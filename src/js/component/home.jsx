import React, { useEffect, useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {


	const [todo, setTodo] = useState("")
	const [items, setItems] = useState([]);
	const todosURL = "https://playground.4geeks.com/todo/"
	function getTodos() {
		fetch(todosURL + 'users/heandy', {
			method: "GET"
		}) 
		.then((response)=>{console.log(response)
			return response.json()
		})
		.then((data)=>{setItems(data.todos)})
		.catch((error)=>{error})
	}


	let newTodo = {
		"label": todo
	}

	const addTodo = () => { 
		fetch(todosURL + 'todos/heandy', {
			method: "POST",
			body: JSON.stringify(newTodo),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then((response) => {
			if (!response.ok) {
				throw new Error('Error al agregar una nueva tarea');
			}
			return response.json();
		})
		.then((data) => {
			setItems([...items, data]); // Utiliza los datos devueltos por el servidor
			setTodo(''); // Limpia el estado de todo
		})
			.catch(error => error)
	}


	const handleKeyPress = (event) => {
		if (event.key === 'Enter') {
			addTodo();
		}
	};

	
	const removeItem = (index) => {
		let itemToDelete = items[index]
		console.log(itemToDelete);
		fetch(`${todosURL}todos/${itemToDelete.id}`, {
			method: "DELETE",
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then((response) => {
			if (!response.ok) {
				throw new Error('Error al eliminar una nueva tarea');
			} else if (response.status == 204) {
				getTodos();
			} 
			
		})
		.catch(error => error)
		
	};
	useEffect(()=> {
		getTodos();
	}, [])

	return (
		<div className="container text-center" style={{ width: "500px" }}>
			<div className="text-center ">
				<div className="input-group flex-nowrap mt-5 ">
					<span className="input-group-text bg-primary text-light" id="addon-wrapping">Todo List</span>
					<input type="text" className="form-control" placeholder="Añadir tareas" aria-label="Username" value={todo} onKeyPress={handleKeyPress}
						aria-describedby="addon-wrapping" onChange={(e) => {

							setTodo(e.target.value);
						}} />

				</div>

				<div className={`row shadow-lg py-2 mx-1 ${items.length === 0 ? "opacity-0" : "opacity-100"}`} >
					<div className="col">
						{items.map((item, index) => (
							 <p className={`d-flex justify-content-between px-3 border-bottom mt-2  esc`} key={index}>{item.label}
							 <button type="button" className={`btn btn-primary px-2 py-1 mb-2 `} onClick={() => removeItem(index)}><i className="fa-solid fa-x"></i></button>
							 </p>
							
						))}
						
					</div>
					<span className={`d-flex justify-content-start fs-6 px-3 text-secondary py-0 ${items.length === 0 ? "opacity-0" : "opacity-100"}`}>{items.length} Tareas restantes</span>
				</div>
			</div>
		</div>
	);
};

export default Home;
