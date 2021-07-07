import { useState } from 'react';
import SelectMultiple from './SelectMultiple'

import './App.css';

const options = [
	{
		label: 'Capitulos',
		id: 918,
		itens: [
			{
				label: 'Capitulo 1',
				value: 12
			},
			{
				label: 'Capitulo 2',
				value: 49
			}
		]
	},
	{
		label: 'Avaliacoews',
		id: 912,
		itens: [
			{
				label: 'Prova 1',
				value: 321
			}
		]
	}
]


function App() {
	const [value, setValue] = useState([])

	console.log(value)

  return (
    <div className="App">
      <header className="App-header">
				<SelectMultiple
					teste={setValue}
					onChange={(e) => setValue(e.target.value)}
					value={value}
					options={options}
					label="Lorem ipsum"
				/>
      </header>
    </div>
  );
}

export default App;
