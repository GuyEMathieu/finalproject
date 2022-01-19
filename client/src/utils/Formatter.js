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
export const getCode = (arr, id) => {

    if (arr) {
        const obj = arr.find(ele => ele._id === id)
        return obj ? obj.code : id
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

export function AddressString(address, states, countries){
    if(address && states && countries){
        let street = `${address.street}`;
        if(address.aptNum){
            street = `${street} aptNum ${address.aptNum}`
        }
        return `${street}, ${address.city}, ${getCode(states, address.state)}, ${getCode(countries, address.country)}, ${address.zipcode}`
    }

    return ''
}

export function maskString(str, visible = 0, placement='start'){
    if(placement === 'start'){
        return str.split("").map((e, i) => i < str.length - visible ? "*" : e).join("")
    }

    return str.split("").map((e,i)=>i?"*":e).join("");
}

export const generateVIN = () =>{
    var result = '';
    const chars = ["A", "B", "C", "D", 'E', "F", "G", "H", "J", "K", "L", "M", "P","Q", "R", "S", "T", "U", "V", "W", "X", "Z", 1, 3,4,5,6,7,8,9,0]
    for (var i = 17; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

export const prettyAlert = (obj) => {
    alert(JSON.stringify(obj, null, 4))
}