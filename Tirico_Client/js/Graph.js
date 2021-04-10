var Chart = require('chart.js');
var values = null;

var con;


var Now;
var DateBefore;


var Req_Now;
var Req_Before;


function addDays(date, days) {
    return new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() + days,
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
        date.getMilliseconds()
    );
}

var Graphe_Label = [];
var datas = [];
var titre = [];

function Button_Time() {
    const DailyBtn = document.getElementById('Daily')
    DailyBtn.addEventListener('click', (event) => {
        Now = new Date(2020,10,15);
        var dd = String(Now.getDate()).padStart(2, '0');
        var mm = String (Now.getMonth() + 1).padStart(2, '0');
        var yyyy = String (Now.getFullYear());

        Req_Now = yyyy + '-' + mm + '-' + dd + ' ' + Now.getHours() + ':' + Now.getMinutes() + ':' + Now.getSeconds();

        DateBefore = Now;
        DateBefore = addDays(DateBefore, -1);
        
        var A_dd = String(DateBefore.getDate()).padStart(2, '0');
        var A_mm = String (DateBefore.getMonth() + 1).padStart(2, '0');
        var A_yyyy = String (DateBefore.getFullYear());

        Req_Before = A_yyyy + '-' + A_mm + '-' + A_dd + ' ' + DateBefore.getHours() + ':' + DateBefore.getMinutes() + ':' + DateBefore.getSeconds();

        console.log(Req_Now);
        console.log(Req_Before);

        Get_Datas().then(function(dat) {
            dat.forEach(function(item, index, array) 
            {
                console.log(item.NombreDePassage);
                console.log(item.DateTime.getHours());
                datas.push(item.NombreDePassage);
                Graphe_Label.push(item.DateTime.getHours());
                
            })
            titre[0] = "Affluence par jour";
            MakeLineGraph();
        }).catch((err) => setImmediate(() => { throw err; }));

        RetrieveDatas();
    })

    const WeeklyBtn = document.getElementById('Weekly')
    WeeklyBtn.addEventListener('click', (event) => {
        Now = new Date(2020,10,15);
        var dd = String(Now.getDate()).padStart(2, '0');
        var mm = String (Now.getMonth() + 1).padStart(2, '0');
        var yyyy = String (Now.getFullYear());

        Req_Now = yyyy + '-' + mm + '-' + dd + ' ' + Now.getHours() + ':' + Now.getMinutes() + ':' + Now.getSeconds();

        DateBefore = Now;
        DateBefore = addDays(DateBefore, -7);

        var A_dd = String(DateBefore.getDate()).padStart(2, '0');
        var A_mm = String (DateBefore.getMonth() + 1).padStart(2, '0');
        var A_yyyy = String (DateBefore.getFullYear());

        Req_Before = A_yyyy + '-' + A_mm + '-' + A_dd + ' ' + DateBefore.getHours() + ':' + DateBefore.getMinutes() + ':' + DateBefore.getSeconds();

        console.log(Req_Now);
        console.log(Req_Before);

        Get_Datas().then(function(dat) {
            dat.forEach(function(item, index, array) 
            {
                var jour = item.DateTime.getDate();
                console.log(item.NombreDePassage);
                console.log(item.DateTime.getDate());
                datas.push(item.NombreDePassage);
                Graphe_Label.push(item.DateTime.getDate());
            })
            titre[0] = "Affluence par jour";
            MakeLineGraph();
        }).catch((err) => setImmediate(() => { throw err; }));

        RetrieveDatas();
    })






    const MonthlyBtn = document.getElementById('Monthly')
    MonthlyBtn.addEventListener('click', (event) => {
        Now = new Date(2020,10,15);
        var dd = String(Now.getDate()).padStart(2, '0');
        var mm = String (Now.getMonth() + 1).padStart(2, '0');
        var yyyy = String (Now.getFullYear());

        Req_Now = yyyy + '-' + mm + '-' + dd + ' ' + Now.getHours() + ':' + Now.getMinutes() + ':' + Now.getSeconds();

        DateBefore = Now;
        DateBefore = addDays(DateBefore, -30);

        var A_dd = String(DateBefore.getDate()).padStart(2, '0');
        var A_mm = String(DateBefore.getMonth() + 1).padStart(2, '0');
        var A_yyyy = String(DateBefore.getFullYear());

        Req_Before = A_yyyy + '-' + A_mm + '-' + A_dd + ' ' + DateBefore.getHours() + ':' + DateBefore.getMinutes() + ':' + DateBefore.getSeconds();

        console.log(Req_Now);
        console.log(Req_Before);

        values.forEach(function(item, index, array) 
        {
            console.log(item.NombreDePassage, index);
            datas.push(item.NombreDePassage);
        })


        RetrieveDatas();
    })
}


function ConnectToDatabase() {
    var mysql = require('mysql');

    con = mysql.createConnection({
        host: "mysql-pa8.alwaysdata.net",
        user: "pa8_acc",
        password: "5wtE3Cx8W",
        database: "pa8_bddv2"
    });

    con.connect(function(err) {
        if (err) throw err;
        else console.log("Connected to the DB : From Graph.js");

    });
    
    var sql = "SELECT IdAcc, IdLoc FROM AccToLoc";
    con.query(sql, function (err, result) {
        
        if (err) throw err;
        else {
            values = result;
            RetrieveDatas();
        }
    });
}

var ctx;
var data;
var options;
var config;
var graph;

// Appeler cette fonction à chaque fois qu'on appuie un bouton : TODAY, WEEKLY, MONTHLY
function RetrieveDatas()
{
	MakeBar();
	MakeAraignee();
	MakeCercle();
}


function Get_Datas() 
{
    datas = [];
    Graphe_Label = [];
    return new Promise(function(resolve, reject) {
        var req = "SELECT NombreDePassage, DateTime FROM Stats JOIN StatsToLoc on Stats.ID = StatsToLoc.IDStats WHERE IDLoc = 1 AND DateTime BETWEEN '" + Req_Before + "' AND '" + Req_Now + "'";
        console.log("Request : " + req);
        //var sql = "SELECT NombreDePassage FROM Stats JOIN StatsToLoc on Stats.ID = StatsToLoc.IDStats WHERE IDLoc = 1 AND DateTime BETWEEN '2020-06-29 00:00:00' AND '2020-06-29 10:00:00'";
        con.query(req, function (err, result) {
            if (err) return reject(err);
            else {
                values = result;
                console.log("Renvoie " + datas.length);
                resolve(values);
            }
        });
    })
    
}


function filter_list(l) {
    return l.filter(Int => typeof Int === "number");
}
console.log(filter_list([1,2,'a','b']))

var graph1;
var test = new Array(5,10,16,18,10,5);


function MakeLineGraph() {
    if (graph1 != null)
    {
        graph1.destroy();
    }

    console.log(datas.length);
    ctx = document.getElementById('Vente').getContext('2d')

    data = {
        labels: Graphe_Label,
        datasets: [{
            backgroundColor: 'rgba(45, 154, 224, 0.35)',
            borderColor: '#2d9ae0',
            data: datas,
            label: "Personne"
        }]
    };
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
            text: titre[0]
        },
        animation: {
            duration: 1000,
            easing: 'easeInQuad'
        }
    };

    graph1 = new Chart(ctx, {
        type: 'line',
        data: data,
        options : options
    });
}

function RetrieveAffluence()
{
    var sql = "SELECT DateTime, NombreDePassage FROM Stats";
    con.query(sql, function (err, result) {
        
        if (err) throw err;
        else {
            //alert(result[10].AccID);
            values = result;
            MakeBar();
        }
    });
}
var graph2; 
function MakeBar()
{
    if (graph2 != null)
    {
        graph2.destroy();
    }
    ctx = document.getElementById('graph2').getContext('2d')
    //
    data = {
        //labels: [values[0].DateTime, values[1].DateTime, values[2].DateTime, values[3].DateTime, values[4].DateTime, values[5].DateTime, values[6].DateTime, values[7].DateTime, values[8].DateTime, values[9].DateTime, values[10].DateTime],
        labels: ['8h', '9h', '10h', '11h', '12h', '13h', '14h', '15h', '16h', '17h', '18h'],
        datasets: [{
            backgroundColor: '#2d9ae0',
            hoverBackgroundColor: '#fff',
            hoverBorderWidth: '#fff',
            borderColor: 'rgb(255, 99, 132)',
            label: "Affluence/heure",
            //data: [values[0].NombreDePassage, values[1].NombreDePassage, values[2].NombreDePassage, values[3].NombreDePassage, values[4].NombreDePassage, values[5].NombreDePassage, values[6].NombreDePassage, values[7].NombreDePassage, values[8].NombreDePassage, values[9].NombreDePassage, values[10].NombreDePassage]
            data: [5, 4, 8, 15, 5, 23, 34, 56, 44, 40, 35]
        }]
    };
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
            text: 'Affluence'
        },
        animation: {
            duration: 1000,
            easing: 'easeInQuad'
        }
    };
    graph2 = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: options
    });
}

var graph3;
function MakeCercle() {
    if (graph3 != null)
    {
        graph3.destroy();
    }
    ctx = document.getElementById('graph3').getContext('2d')

    data = {
        labels: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
        datasets: [{
            backgroundColor: '#2d9ae0',
            borderColor: '#0000',
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
            text: 'Affluence par Semaine : Magasin de '+''+''
        },
        animation: {
            duration: 1000,
            easing: 'easeInQuad'
        }
    }

    graph3 = new Chart(ctx, {
    type: 'doughnut',
    data: data,
    options: options
});
}

var graph4;
function MakeAraignee() 
{
    if (graph4 != null)
    {
        graph4.destroy();
    }
    ctx = document.getElementById('graph4').getContext('2d')

    data = {
        label: 'salut',
    labels: ['Red', 'Février', 'Marss'],
    datasets: [{
        backgroundColor: '#2d9ae0',
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
            text: 'Ventes par mois'
        },
            animation: {
                duration: 1000,
                easing: 'easeInQuad'
            },
            scale: {
                ticks: {
                    suggestedMin: 15,
                    suggestedMax: 35
                }
            }
        }

    graph4 = new Chart(ctx, {
        type: 'radar',
        data: data,
        options: options
    });

}


function updateGraph() {
    if (graph != null)
        graph.update();
}