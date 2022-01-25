import React from 'react';
import { DefaultContext } from './context/default_context/DefaultState';

const Test = () => {
    const defaultContext = React.useContext(DefaultContext);
    const {defaults, getAll} = defaultContext;

    React.useEffect(() => {
        
        if(!defaults){
            getAll()
        }
    },[defaults, getAll])
   return <div>Hello</div>;
};

export default Test;
