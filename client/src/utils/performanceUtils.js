const Color = () => {
    const list = ["#38835b", "#dd0b1f", "#213ce9", "#64b5f6", "#feb76d", "#4db6ac", "#4c395b"]
    return list[Math.floor(Math.random() * list.length)]
}

//#region SALES TEAM
//#region INDIVIDUAL
export function Member_Prior_Repair(member){
    let color = Color();
    let data = {
        labels: ["Jan", "Fed", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"],
        datasets: [
            {
                label: "YTD Service",
                data: [0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0],
                backgroundColor: [],
                borderColor: [],
                borderWidth: 1
            },
        ]
    }
    
    if(member) {
       
        for (let i = 0; i < member.performance.length; i++){
            const perf = member.performance[i];
            data.datasets[0].backgroundColor.push(color)
            data.datasets[0].borderColor.push(color)
            const month = new Date(perf.date).getMonth();
            data.datasets[0].data[month] += perf.serviceValue;
        }
        data.datasets[0].label = `${member.name} Service Value (${new Date(member.performance[0].date).getFullYear()})`
    }
    return data;
}

export function MTD_Sales(performance){
    const today = new Date()
    const color = Color();

    let sales = 0;
    if(performance){
        for(let i = 0; i < performance.length; i++){
            sales += performance[i].purchasePrice
        }
    }
    
    const month = today.toLocaleString('default', { month: 'short' });
    
    let data = {
        labels: [month],
        datasets: [
            {
                label: `MTD Sale (${month})`,
                data: [sales],
                backgroundColor: color,
                borderColor: color,
                borderWidth: 1
            }
        ]
    }
    return data
}

export function MTD_Commission(performance){
    const today = new Date()
    const color = Color();

    let sales = 0;
    if(performance){
        for(let i = 0; i < performance.length; i++){
            sales += performance[i].purchasePrice * 0.03
        }
    }
    
    const month = today.toLocaleString('default', { month: 'short' });
    
    let data = {
        labels: [month],
        datasets: [
            {
                label: `MTD Commission (${month})`,
                data: [sales],
                backgroundColor: [color],
                borderColor: [color],
                borderWidth: 1
            }
        ]
    }
    return data
}

export function YTD_Sales(performance){
    let color = Color()
    let data = {
        labels: ["Jan", "Fed", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"],
        datasets: [
            {
                label: "YTD Sale",
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                backgroundColor: [],
                borderColor: [],
                borderWidth: 1
            },
        ]
    }
    if(performance) {
        
        for (let i = 0; i < performance.length; i++){
            const perf = performance[i];
            
            data.datasets[0].backgroundColor.push(color)
            data.datasets[0].borderColor.push(color)
            const month = new Date(perf.purchaseDate).getMonth();
            data.datasets[0].data[month] += perf.purchasePrice;
        }
        data.datasets[0].label = `YTD Sale (${new Date(performance[0].purchaseDate).getFullYear()})`
    }
    return data;
}

export function YTD_Commission(performance){
    let color = Color()
    let data = {
        labels: ["Jan", "Fed", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"],
        datasets: [
            {
                label: "YTD Commission",
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                backgroundColor: [],
                borderColor: [],
                borderWidth: 1
            },
        ]
    }
    if(performance) {
        for (let i = 0; i < performance.length; i++){
            const perf = performance[i];
            
            data.datasets[0].backgroundColor.push(color)
            data.datasets[0].borderColor.push(color)
            const month = new Date(perf.purchaseDate).getMonth();
            data.datasets[0].data[month] += perf.purchasePrice * 0.03;
        }
        data.datasets[0].label = `YTD Commission (${new Date(performance[0].purchaseDate).getFullYear()})`
    }
    return data;
}
//#endregion

//#region TEAM region
export function Team_MTD_Sales(sales){
    const today = new Date()
    const month = today.toLocaleString('default', { month: 'short' });

    let data = {
        labels: [month],
        datasets: []
    }
    let chosenColors = []

    if(sales){
        for(let i = 0; i < sales.length; i++){
            let color = Color()
            while(chosenColors.includes(color)){
                color = Color()
            }
            chosenColors.push(color)
            const person = sales[i];
            let set = {
                label: person.name,
                backgroundColor: color,
                borderColor: color,
                borderWidth: 1,
                data: [0]
            }

            const perf = person.performance;
            for(let x = 0; x < perf.length; x++){
                set.data[0]  += perf[x].purchasePrice
            }
            data.datasets.push(set)
        }
    }
    return data
}

export function Team_MTD_Commission(sales){
    const today = new Date()
    const month = today.toLocaleString('default', { month: 'short' });

    console.info("Sales", sales)

    let data = {
        labels: [month],
        datasets: []
    }
    let chosenColors = []

    if(sales){
        for(let i = 0; i < sales.length; i++){
            let color = Color()
            while(chosenColors.includes(color)){
                color = Color()
            }
            chosenColors.push(color)
            const person = sales[i];
            let set = {
                label: person.name,
                backgroundColor: color,
                borderColor: color,
                borderWidth: 1,
                data: [0]
            }

            const perf = person.performance;
            for(let x = 0; x < perf.length; x++){
                set.data[0]  += perf[x].purchasePrice * 0.03
            }
            data.datasets.push(set)
        }
    }
    return data
}

export function Team_YTD_Sales(sales){
    let data = {
        labels: ["Jan", "Fed", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"],
        datasets: []
    }
    if(sales) {
        let chosenColors = []

        let roughData = data;
        roughData.datasets = []
        for(let i = 0; i < sales.length; i++){
            let color = Color()
            while(chosenColors.includes(color)){
                color = Color()
            }
            chosenColors.push(color)
            const person = sales[i]
            const set = {
                label: `${person.name}`,
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                backgroundColor: color,
                borderColor: color,
            };

            const performance = person.performance

            for(let d = 0; d < performance.length; d++){
                const month = new Date(performance[d].purchaseDate).getMonth()
                set.data[month] += performance[d].purchasePrice;
            }
            roughData.datasets.push(set)
        }
    }
    return data;
}

export function Team_YTD_Commission(sales){
    let data = {
        labels: ["Jan", "Fed", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"],
        datasets: []
    }
    if(sales) {
        let chosenColors = []

        let roughData = data;
        roughData.datasets = []
        for(let i = 0; i < sales.length; i++){
            let color = Color()
            while(chosenColors.includes(color)){
                color = Color()
            }
            chosenColors.push(color)
            const person = sales[i]
            const set = {
                label: `${person.name}`,
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                backgroundColor: color,
                borderColor: color,
            };

            const performance = person.performance

            for(let d = 0; d < performance.length; d++){
                const month = new Date(performance[d].purchaseDate).getMonth()
                set.data[month] += performance[d].purchasePrice * 0.03;
            }
            roughData.datasets.push(set)
        }
    }
    return data;
}
//#endregion

//#endregion END OF SALES TEAM


//#region REPAIR REGION

//#region INDIVIDUAL REPAIR REGION
export function YTD_Repair(performance){
    let color = Color();
    let data = {
        labels: ["Jan", "Fed", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"],
        datasets: [
            {
                label: "YTD Service",
                data: [0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0],
                backgroundColor: [],
                borderColor: [],
                borderWidth: 1
            },
        ]
    }
    console.info("performance", performance)
    if(performance) {

        
        for (let i = 0; i < performance.length; i++){
            const perf = performance[i];
            data.datasets[0].backgroundColor.push(color)
            data.datasets[0].borderColor.push(color)
            const month = new Date(perf.date).getMonth();
            console.info("Month", data.datasets[0].data[month] += perf.serviceValue)
            data.datasets[0].data[month] += perf.serviceValue;
        }
        data.datasets[0].label = `YTD Service (${new Date(performance[0].date).getFullYear()})`
    }
    return data;
}

export function MTD_Repair(performance){
    const today = new Date()
    const color = Color();
    const month = today.toLocaleString('default', { month: 'short' });

    let data = {
        labels: [month],
        datasets: [
            {
                label: `MTD Repair (${month})`,
                data: [],
                backgroundColor: color,
                borderColor: color,
                borderWidth: 1
            }
        ]
    }
    if(performance){
        let serviceValue = 0;
        for(let i = 0; i < performance.length; i++){
            serviceValue += performance[i].serviceValue
        }
        data.datasets[0].data.push(serviceValue)
    }
    
    return data
}





export function Team_MTD_Repairs(repairs){
    const today = new Date()
    const month = today.toLocaleString('default', { month: 'short' });

    let data = {
        labels: [month],
        datasets: []
    }
    let chosenColors = []

    if(repairs){
        for(let i = 0; i < repairs.length; i++){
            let color = Color()
            while(chosenColors.includes(color)){
                color = Color()
            }
            chosenColors.push(color)
            const person = repairs[i];
            let set = {
                label: person.name,
                backgroundColor: color,
                borderColor: color,
                borderWidth: 1,
                data: [0]
            }

            const perf = person.performance;
            for(let x = 0; x < perf.length; x++){
                set.data[0]  += perf[x].serviceValue
            }
            data.datasets.push(set)
        }
    }
    return data
}

export function Team_YTD_Repairs(repairs){
    let data = {
        labels: ["Jan", "Fed", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"],
        datasets: [
            {
                label: `One`,
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                backgroundColor: 'yellow',
                borderColor: 'yellow',
            }
        ]
    }
    if(repairs) {
        let chosenColors = []

        let roughData = data;
        roughData.datasets = []
        for(let i = 0; i < repairs.length; i++){
            let color = Color()
            while(chosenColors.includes(color)){
                color = Color()
            }
            chosenColors.push(color)
            const person = repairs[i]
            const set = {
                label: `${person.name}`,
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                backgroundColor: color,
                borderColor: color,
            };
            const performance = person.performance

            for(let d = 0; d < performance.length; d++){
                const month = new Date(performance[d].date).getMonth()
                set.data[month] += performance[d].serviceValue;
            }
            roughData.datasets.push(set)
        }
    }
    return data;
}



