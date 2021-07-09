import { FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText } from '@material-ui/core'
import { useMemo } from 'react'
import { useCallback } from 'react'
import { forwardRef } from 'react'


const MenuProps = {
	anchorOrigin: {
		vertical: "bottom",
		horizontal: "left"
	},
	transformOrigin: {
		vertical: "top",
		horizontal: "left"
	},
	getContentAnchorEl: null
}

const SelectCustom = ({options, label, onChange, value = []}) => {


	// ===============================
	// Formaters
	// ===============================
	const formatedOptions = useMemo(() => options.reduce((acc, item) => {
		if (item.value) {
			return [...acc, {...item, style: { paddingLeft: 0}}]
		}
		return [...acc, { label: item.label, type: 'section' }, ...item.itens]
	}, []), [options])

	const allValues = useMemo(() => {
		return formatedOptions.filter(option => option.type !== 'section').map(option => option.value)
	}, [formatedOptions])

	// ===============================
	// Handlers
	// ===============================
	// onChangeCleaned tem o objetivo de ignorar os onChanges gerados diretamente pelo MenuItem que sao seçoes
	const onChangeCleaned = useCallback((event) => {
		if (!event.target || event.target.value.includes(undefined)) {
			return console.log("nao executa")
		} else {
			onChange(event)
		}
	}, [onChange])

	const handleSection = useCallback((id, action) => {
		const sectionTarget = options.find(section => section['label'] === id)
		const itemsTarget = sectionTarget.itens
		const itemsTargetValues = itemsTarget.map(item => item['value'])

		if (action) {
			const newValue = [...value, ...itemsTargetValues]
			const filteredValue = newValue.filter((current, index) => newValue.indexOf(current) === index);
			return onChangeCleaned({target: { value: filteredValue }})
		}

		const newValue = value.filter(item => !itemsTargetValues.includes(item))
		console.log(newValue)
		onChangeCleaned({target: { value: newValue }})

	}, [onChangeCleaned, options, value])

	const handleAllOptions = useCallback((newValue) => {
		onChangeCleaned({ target: { value: newValue } })
	}, [onChangeCleaned])

	// ================================
	// Helpers
	// ================================
	const watchSectionStatus = useCallback((id, itens) => {
		const sectionTarget = options.find(section => section['label'] === id)
		const itemsTarget = sectionTarget.itens

		const itemsTargetValues = itemsTarget.map(item => item['value'])

		return itemsTargetValues.every(itemValue => value.includes(itemValue))
	}, [options, value])

	const watchAllStatus = useMemo(() => {
		return allValues.every(option => value.includes(option))
	}, [value, allValues])

	return (
			<FormControl variant="outlined" style={{width: '500px'}}>
        <InputLabel>{label}</InputLabel>
        <Select
					fullWidth
          multiple
					label={label}
          value={value}
          onChange={onChangeCleaned}
					// Podemos utilizar o objeto inteiro como value, logo nao precisamos iterar para achar o label atraves do value
          renderValue={(selected) => selected.filter(Boolean).map(value => formatedOptions.find(op => op.value === value).label).join(', ')}
					MenuProps={MenuProps}
				>
					<SectionMenu checked={watchAllStatus} textColor="secondary" onClick={() => handleAllOptions(watchAllStatus ? [] : allValues)} label="Selecionar tudo" />
					{formatedOptions.map(item => {
						if(item.type === 'section') {
							return <SectionMenu checked={watchSectionStatus(item.label, item)} onClick={() => handleSection(item.label, !watchSectionStatus(item.label, item))} key={item.label} label={item.label} />
						}

						return (
							<ItemMenu
								key={item.label}
								label={item.label}
								value={item.value}
								style={item.style}
								checked={value.findIndex(itemValue => itemValue === item.value) > -1}
							/>
						)

					})}
        </Select>
      </FormControl>
	)
}

const SectionMenu = forwardRef(({key, label, onClick, checked, textColor}, ref) => {

	return (
			<MenuItem onClick={onClick} style={{ paddingLeft: 0, display: 'flex' }} key={key}>
				<Checkbox checked={checked} />
				<ListItemText color="primary" primary={label} />
			</MenuItem>
	)
})

const ItemMenu = forwardRef(({value, label, checked, style = {}, ...rest}, ref) => {
	return (
		<MenuItem key={label} value={label} ref={ref} style={style} {...rest}>
			<Checkbox checked={checked} />
			<ListItemText primary={label} />
		</MenuItem>
	)
})

export default SelectCustom

// import React from 'react';
// import clsx from 'clsx';
// import { makeStyles, useTheme } from '@material-ui/core/styles';
// import Input from '@material-ui/core/Input';
// import InputLabel from '@material-ui/core/InputLabel';
// import MenuItem from '@material-ui/core/MenuItem';
// import FormControl from '@material-ui/core/FormControl';
// import ListItemText from '@material-ui/core/ListItemText';
// import Select from '@material-ui/core/Select';
// import Checkbox from '@material-ui/core/Checkbox';
// import Chip from '@material-ui/core/Chip';

// const useStyles = makeStyles((theme) => ({
//   formControl: {
//     margin: theme.spacing(1),
//     minWidth: 120,
//     maxWidth: 300,
//   },
//   chips: {
//     display: 'flex',
//     flexWrap: 'wrap',
//   },
//   chip: {
//     margin: 2,
//   },
//   noLabel: {
//     marginTop: theme.spacing(3),
//   },
// }));

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };

// const names = [
//   'Oliver Hansen',
//   'Van Henry',
//   'April Tucker',
//   'Ralph Hubbard',
//   'Omar Alexander',
//   'Carlos Abbott',
//   'Miriam Wagner',
//   'Bradley Wilkerson',
//   'Virginia Andrews',
//   'Kelly Snyder',
// ];

// function getStyles(name, personName, theme) {
//   return {
//     fontWeight:
//       personName.indexOf(name) === -1
//         ? theme.typography.fontWeightRegular
//         : theme.typography.fontWeightMedium,
//   };
// }

// export default function MultipleSelect() {
//   const classes = useStyles();
//   const theme = useTheme();
//   const [personName, setPersonName] = React.useState([]);

//   const handleChange = (event) => {
//     setPersonName(event.target.value);
//   };

//   const handleChangeMultiple = (event) => {
//     const { options } = event.target;
//     const value = [];
//     for (let i = 0, l = options.length; i < l; i += 1) {
//       if (options[i].selected) {
//         value.push(options[i].value);
//       }
//     }
//     setPersonName(value);
//   };

//   return (
//     <div>
//       <FormControl className={classes.formControl}>
//         <InputLabel id="demo-mutiple-name-label">Name</InputLabel>
//         <Select
//           labelId="demo-mutiple-name-label"
//           id="demo-mutiple-name"
//           multiple
//           value={personName}
//           onChange={handleChange}
//           input={<Input />}
//           MenuProps={MenuProps}
//         >
//           {names.map((name) => (
//             <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
//               {name}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>
//       <FormControl className={classes.formControl}>
//         <InputLabel id="demo-mutiple-checkbox-label">Tag</InputLabel>
//         <Select
//           labelId="demo-mutiple-checkbox-label"
//           id="demo-mutiple-checkbox"
//           multiple
//           value={personName}
//           onChange={handleChange}
//           input={<Input />}
//           renderValue={(selected) => selected.join(', ')}
//           MenuProps={MenuProps}
//         >
//           {names.map((name) => (
//             <MenuItem key={name} value={name}>
//               <Checkbox checked={personName.indexOf(name) > -1} />
//               <ListItemText primary={name} />
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>
//       <FormControl className={classes.formControl}>
//         <InputLabel id="demo-mutiple-chip-label">Chip</InputLabel>
//         <Select
//           labelId="demo-mutiple-chip-label"
//           id="demo-mutiple-chip"
//           multiple
//           value={personName}
//           onChange={handleChange}
//           input={<Input id="select-multiple-chip" />}
//           renderValue={(selected) => (
//             <div className={classes.chips}>
//               {selected.map((value) => (
//                 <Chip key={value} label={value} className={classes.chip} />
//               ))}
//             </div>
//           )}
//           MenuProps={MenuProps}
//         >
//           {names.map((name) => (
//             <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
//               {name}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>
//       <FormControl className={clsx(classes.formControl, classes.noLabel)}>
//         <Select
//           multiple
//           displayEmpty
//           value={personName}
//           onChange={handleChange}
//           input={<Input />}
//           renderValue={(selected) => {
//             if (selected.length === 0) {
//               return <em>Placeholder</em>;
//             }

//             return selected.join(', ');
//           }}
//           MenuProps={MenuProps}
//           inputProps={{ 'aria-label': 'Without label' }}
//         >
//           <MenuItem disabled value="">
//             <em>Placeholder</em>
//           </MenuItem>
//           {names.map((name) => (
//             <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
//               {name}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>
//       <FormControl className={classes.formControl}>
//         <InputLabel shrink htmlFor="select-multiple-native">
//           Native
//         </InputLabel>
//         <Select
//           multiple
//           native
//           value={personName}
//           onChange={handleChangeMultiple}
//           inputProps={{
//             id: 'select-multiple-native',
//           }}
//         >
//           {names.map((name) => (
//             <option key={name} value={name}>
//               {name}
//             </option>
//           ))}
//         </Select>
//       </FormControl>
//     </div>
//   );
// }
