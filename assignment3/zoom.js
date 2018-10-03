/*    JavaScript 6th Edition
 *    Chapter 5
 *    Chapter case

 *    Photo zoom
 *    Variables and functions
 *    Author: 
 *    Date:   

 *    Filename: zoom.js
 */

"use strict"; // interpret document contents in JavaScript strict mode

/* global variables */
var photoOrderArray = window.opener.photoOrder;
var activeImage = window.opener.activeImage;
var favPhotos = window.opener.favPhotos;

/* populate img element and create event listener */
function pageSetup() {
   document.getElementsByTagName("img")[0].src = activeImage; // assign filename to img element
   createEventListener();
   setFavouritesButton();
}

/* close window */
function closeWin() {
   window.close();
}

function setFavouritesButton() {
    if (window.opener.favCount < 5 && !favPhotos.includes(activeImage)) {
        document.getElementById("favourites").innerHTML = "Add to Favourites";
        document.getElementById("favourites").removeEventListener("click", setUnfavourite, false);
        document.getElementById("favourites").addEventListener("click", setFavourite, false);
	}
	else {
        document.getElementById("favourites").innerHTML = "Remove from Favourites";
        document.getElementById("favourites").removeEventListener("click", setFavourite, false);
        document.getElementById("favourites").addEventListener("click", setUnfavourite, false);
	}			
}

function setFavourite() {
    var index = 0;
    while (favPhotos[index] != null && index < 5) {
            ++index;
    }      
    window.opener.favCount++;
    window.opener.favPhotos[index] = activeImage;
    window.opener.populateFavourites();
	window.close();

}

function setUnfavourite() {
    var index = favPhotos.indexOf(activeImage);
    window.opener.favPhotos[index] = null;
    //window.opener.document.getElementById("fav" + (index + 1)).src = "";
    window.opener.favCount--;
    window.opener.populateFavourites();
	window.close();
}

/* create event listener for close button */
function createEventListener() {
   var closeWindowDiv = document.getElementById("close");

   if (closeWindowDiv.addEventListener) {
     closeWindowDiv.addEventListener("click", closeWin, false); 
   } else if (closeWindowDiv.attachEvent)  {
     closeWindowDiv.attachEvent("onclick", closeWin);
   }
}

/* add img src value and create event listener when page finishes loading */
window.onload = pageSetup;