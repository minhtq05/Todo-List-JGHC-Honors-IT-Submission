import TodoList from './components/TodoList'
import ContactCard from './components/ContactCard'
import Footer from './components/Footer'

function App() {
	return (
		<div>
			<div className="bg-white">
				<h2 className="text-center text-3xl py-5 text-green-950">Quang Minh Tran - USF Honors It Submission</h2>
			</div>
			<TodoList />
			<ContactCard />
			<Footer />
		</div>
	)
}

export default App
