const { Console } = require('console')
const electron = require('electron')
const customTitlebar = require('custom-electron-titlebar');
const { Color } = require('custom-electron-titlebar');
const path = require('path');
const {BrowserWindow} = electron.remote

//ADDED barre des taches personnalisée

const { remote } = require('electron');
const { Menu, MenuItem } = remote;
const url = require('url');

// We take back the paramater of the ID, we parse it cleany first
const urlDataIndex = window.location.search;
const urlParamsIndex = new URLSearchParams(urlDataIndex);
const Account_Name = urlParamsIndex.get('Name');


new customTitlebar.Titlebar({
	backgroundColor: customTitlebar.Color.fromHex('#1D1F27'),
    //icon: "../ressource/image/logo.png",
});

const DeconnectBtn = document.getElementById('DECO')
DeconnectBtn.addEventListener('click', (event) => {
    window.location.href="connexion.html";
})
/*
const messageAccueil= {
    title: 'TIRICO Notification',
    body: 'Bienvenu sur votre compte : '+Account_Name+ '!',
    icon: "../ressource/image/logo.png"
}



const myNotification = new window.Notification(messageAccueil.title, messageAccueil)
*/


const notification = {
    title: 'TIRICO Notification',
    body: 'Analyse journalière disponible !',
    icon: "../ressource/image/logo.png"
}

const NotifBtn = document.getElementById('NOTIFICATION')

NotifBtn.addEventListener('click', (event) => {
    const myNotification2 = new window.Notification(notification.title, notification);
})



