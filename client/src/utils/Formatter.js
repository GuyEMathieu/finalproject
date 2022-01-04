export const formatSSN = (value, previousValue) => {
    // return nothing if no value
    if (!value) return value; 
  
    // only allows 0-9 inputs
    const currentValue = value.replace(/[^\d]/g, '');
    const cvLength = currentValue.length; 
  
    if (!previousValue || value.length > previousValue.length) {
    
        // returns: "#", "##", "###"
        if (cvLength < 4) return currentValue; 
    
        // returns: "###", "### - #", "### - ##",
        if (cvLength < 6) return `${currentValue.slice(0, 3)}-${currentValue.slice(3)}`; 
    
        // returns: "###-xxx-", (xxx) xxx-x", "(xxx) xxx - xx", "(xxx) xxx -xxx", "(xxx) xxx - xxxx"
        return `${currentValue.slice(0, 3)}-${currentValue.slice(3, 5)}-${currentValue.slice(5, 9)}`; 
    }
};

export const formatPhone = (value, previousValue) => {
    // return nothing if no value
    if (!value) return value; 

    // only allows 0-9 inputs
    const currentValue = value.replace(/[^\d]/g, '');
    const cvLength = currentValue.length; 

    if (!previousValue || value.length > previousValue.length) {
        // returns: "x", "xx", "xxx"
        if (cvLength < 4) return currentValue; 
    
        // returns: "(xxx)", "(xxx) x", "(xxx) xx", "(xxx) xxx",
        if (cvLength < 7) return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3)}`; 
    
        // returns: "###-## xxx-", (xxx) xxx-x", "(xxx) xxx - xx", "(xxx) xxx -xxx", "(xxx) xxx - xxxx"
        return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3, 6)} - ${currentValue.slice(6, 10)}`; 
    }
};

export function FormatNumber(x) {
    if(x){
        return `$ ${x.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
    }
    return "$ 0.00"
}

export const getName = (arr, id) => {

    if (arr) {
        const obj = arr.find(ele => ele._id === id)
        return obj ? obj.name : id
    }
    return id
}

export const TruncateText = (string, length = 80) => {
    if (string) {
        return `${string.substring(0, length)}...`
    }
}

export function RoundToTwo(num) {
    return +(Math.round(num + "e+2")  + "e-2");
}

export const sortByName = (arr) =>{

    const compare = (a, b) => {
        if(a.name < b.name){
            return -1
        } 
        if (a.name > b.name){
            return 1
        }
        return 0
    }
    
    return arr.sort(compare);
}

export function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [month, day, year].join('-');
}