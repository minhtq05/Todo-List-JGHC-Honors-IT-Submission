import TodoList from './components/TodoList'
import ContactCard from './components/ContactCard'
import Footer from './components/Footer'

function App() {
	return (
		<div>
			<div className="bg-white">
				<h2 className="text-center text-4xl font-extrabold py-5 text-green-950 m-5">Quang Minh Tran - USF Honors IT Submission</h2>
			</div>
			<TodoList />
			<ContactCard />
			<Footer />
		</div>
	)
}

export default App
