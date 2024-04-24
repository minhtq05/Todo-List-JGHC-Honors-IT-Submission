import { useState, useEffect } from 'react'
import TodoList from './components/TodoList'
import ContactCard from './components/ContactCard'
import Footer from './components/Footer'

function App() {
	const [isMobile, setIsMobile] = useState(false);

	function handleResize() {
		if (window.innerWidth < 720) {
			setIsMobile(true);
		} else {
			setIsMobile(false);
		}
	}

	useEffect(() => {
		handleResize();
		window.addEventListener("resize", handleResize);
	}, []);

	return (
		<div>
			<div className="bg-white">
				<h2 className="text-center text-4xl font-extrabold py-5 text-green-950 m-5">Quang Minh Tran - USF Honors IT Submission</h2>
			</div>
			<TodoList isMobile={isMobile} />
			<ContactCard isMobile={isMobile} />
			<Footer />
		</div>
	)
}

export default App
