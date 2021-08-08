var vegitTitle='GreenOnion';

function initDataform(event){
    vegitTitle=event.currentTarget.outerText;
    $("#vegitTitle").text(vegitTitle);
}

// var dataSource = [
//     {
//         country: "USA",
//         nuclear: 187.9
//     }, {
//         country: "China",
//         nuclear: 11.3
//     }, {
//         country: "Russia",
//         nuclear: 32.4
//     }, {
//         country: "Japan",
//         nuclear: 64.8
//     }, {
//         country: "India",
//         nuclear: 3.8
//     }, {
//         country: "Germany",
//         nuclear: 37.8
//     }
// ];

// function drawPrice() {
//     alert("!!!!!");
//     $("#price").dxChart({
//         palette: "Violet",
//         dataSource: dataSource,
//         commonSeriesSettings: {
//             argumentField: "country",
//             type: "line"
//         },
//         margin: {
//             bottom: 20
//         },
//         argumentAxis: {
//             valueMarginsEnabled: false,
//             discreteAxisDivisionMode: "crossLabels",
//             grid: {
//                 visible: true
//             }
//         },
//         series: [
//             { valueField: "nuclear", name: "Nuclear" }
//         ],
//         legend: {
//             verticalAlignment: "bottom",
//             horizontalAlignment: "center",
//             itemTextPosition: "bottom"
//         },
//         title: { 
//             text: "Energy Consumption in 2004",
//             subtitle: {
//                 text: "(Millions of Tons, Oil Equivalent)"
//             }
//         },
//         "export": {
//             enabled: true
//         },
//         tooltip: {
//             enabled: true
//         }
//     });
// }