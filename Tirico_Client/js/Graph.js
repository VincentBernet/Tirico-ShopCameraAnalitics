var Chart = require('chart.js');
var values = null;

// We take back the paramater of the ID, we parse it cleany first
const urlData = window.location.search;
const urlParams = new URLSearchParams(urlData);
const Account_ID = urlParams.get('Name');


function ConnectToDatabase() {
    var mysql = require('mysql');

    var con = mysql.createConnection({
        host: "mysql-pa8.alwaysdata.net",
        user: "pa8_acc",
        password: "5wtE3Cx8W",
        database: "pa8_bdd"
    });

    con.connect(function(err) {
        if (err) throw err;
    });
    
    var sql = "SELECT AccID, LocID FROM AccToLoc";
    con.query(sql, function (err, result) {
        
        if (err) throw err;
        else {
            console.log("Welcome mister : "+Account_ID);
            values = result;
            MakeGraphGreatAgain();
        }
    });
}


var ctx;
var data;
var options;
var config;
var graph;


function MakeGraphGreatAgain() {

    if (graph != null)
        graph.destroy();

    ctx = document.getElementById('Vente_Graph').getContext('2d')

        data = {
            labels: ['Janvier', 'Février', 'Mars', 'Avril','Mai'],
            datasets: [{
                backgroundColor: 'rgb(144, 12, 63)',
                borderColor: '#00000',
                data: [10, 20, 30, 40, 20],
                label: "Technologique"
            },
            {
                backgroundColor: 'rgb(110, 110, 211)',
                data: [values[0].AccID, values[0].LocID, values[1].AccID, values[1].LocID],
                label: "Alimentaire"
            }]
        }

        options = {
            title: {
                display: true,
                position: 'top',
                fontSize: '15',
                fontFamily: 'Tahoma',
                fontColor: '#FFFFFF',
                fontStyle:'bold',
                padding: '0',
                lineHeight: '1.5',
                text: 'Evolution Mensuel'
            },
            animation: {
                //duration: 1000,
                easing: 'easeInQuad'
            }
        }

        config = {
            type : 'line',
            data: data,
            options: options
        }
        graph = new Chart(ctx, config)
}


function MakeBar()
{
    graph.destroy();

    ctx = document.getElementById('graph2').getContext('2d')

    data = {
        labels: ['Janvier', 'Février', 'label 3', 'label 4'],
        datasets: [{
            backgroundColor: 'rgb(110, 110, 211)',
            hoverBackgroundColor: '#000000',
            hoverBorderWidth: '#fff',
            borderColor: 'rgb(255, 99, 132)',
            data: [30, 150, 15, 40, 20]

        },
        {
            data: [60, 40, 30, 50],
            backgroundColor: 'rgb(144, 12, 63)',
            hoverBackgroundColor: '#000000',
        }]
    }

    options = {
        title: {
            display: true,
            position: 'top',
            fontSize: '15',
            fontFamily: 'Tahoma',
            fontColor: '#FFFFFF',
            fontStyle:'bold',
            padding: '0',
            lineHeight: '1.5',
            text: 'Random'
        },
        animation: {
            //duration: 1000,
            easing: 'easeInQuad'
        }
    }
    graph = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: options
    });
}


function MakeAraignee() 
{
    graph.destroy();

    ctx = document.getElementById('graph4').getContext('2d')

    data = {
       labels: ['Red', 'Février', 'Marss'],
       datasets: [{
           backgroundColor: 'rgb(110, 205, 211)',
           data: [30, 30, 25]
       }]
   }

   options = {
    title: {
        display: true,
        position: 'top',
        fontSize: '15',
        fontFamily: 'Tahoma',
        fontColor: '#FFFFFF',
        fontStyle:'bold',
        padding: '0',
        lineHeight: '1.5',
        text: 'Random'
    },
        animation: {
            //duration: 1000,
            easing: 'easeInQuad'
        },
        scale: {
            ticks: {
                suggestedMin: 15,
                suggestedMax: 50
            }
        }
    }

   graph = new Chart(ctx, {
   type: 'radar',
   data: data,
   options: options
   });

}

function MakeCercle() {
    
    graph.destroy();

    ctx = document.getElementById('graph3').getContext('2d')


    data = {
        labels: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
        datasets: [{
            backgroundColor: '#00abe9',
            borderColor: 'rgb(255, 99, 132)',
            data: [30, 40, 60, 30, 70, 120, 0]

        }]
    }

    options = {
        title: {
            display: true,
            position: 'top',
            fontSize: '15',
            fontFamily: 'Tahoma',
            fontColor: '#FFFFFF',
            fontStyle:'bold',
            padding: '0',
            lineHeight: '1.5',
            text: 'Affluence Semaine : Magasin de '+'Sergy'+''
        },
        animation: {
            //duration: 1000,
            easing: 'easeInQuad'
        }
    }

    graph = new Chart(ctx, {
    type: 'doughnut',
    data: data,
    options: options
});
}

function updateGraph() {
    if (graph != null)
        graph.update();
}