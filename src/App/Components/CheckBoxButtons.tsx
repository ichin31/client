import { Checkbox, FormControlLabel, FormGroup } from '@mui/material'
import { useState } from 'react';

interface Props{
    items: string[];
    checked?: string[];
    onChange: (items:string[]) => void;
}

export default function CheckBoxButtons({items, checked, onChange}: Props) {
    const [checkedItems, setCheckedItems] = useState(checked || [] )

    function handleChecked(value:string){
        // 116 - 4:13
        //getting current checkbox values
        const currentIndex = checkedItems.findIndex(item => item === value);
        // setting variable for adding new checked items
        let newChecked: string[] = []
        // if findIndex returns -1 the items hasnt been checked yet, start building new checkedItems array
        if(currentIndex === -1 ) newChecked = [...checkedItems,value];
        // removing the checked item
        else newChecked = checkedItems.filter(item => item !== value);
        setCheckedItems(newChecked);
        onChange(newChecked);
    }
  return (
    <FormGroup>
        {items.map(item => (
        <FormControlLabel 
            control={<Checkbox
                checked={checkedItems.indexOf(item) !== -1}
                onClick={() => handleChecked(item)}
            />}
            label={item}
            key={item}
        />
        ))}
    </FormGroup>
  )
}
