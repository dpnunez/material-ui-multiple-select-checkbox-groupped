import { useState } from 'react';
import SelectMultiple from './SelectMultiple'

import './App.css';

const options = [
	{
		label: 'Sem section',
		value: 123
	},
	{
		label: 'Capitulos',
		id: 918,
		itens: [
			{
				label: 'Capitulo 1',
				value: 12
			},
			{
				label: 'Capitulo 24345',
				value: 49
			},
			{
				label: 'Capitulo 223',
				value: 1293939
			},
			{
				label: 'Capitulo 1232',
				value: 423
			},{
				label: 'Capitulo 4352',
				value: 76587
			},{
				label: 'Capitulo 123412',
				value: 213
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
