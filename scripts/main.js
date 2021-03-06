/*
*
*  Push Notifications codelab
*  Copyright 2015 Google Inc. All rights reserved.
*
*  Licensed under the Apache License, Version 2.0 (the "License");
*  you may not use this file except in compliance with the License.
*  You may obtain a copy of the License at
*
*      https://www.apache.org/licenses/LICENSE-2.0
*
*  Unless required by applicable law or agreed to in writing, software
*  distributed under the License is distributed on an "AS IS" BASIS,
*  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
*  See the License for the specific language governing permissions and
*  limitations under the License
*
*/

'use strict';

if ('serviceWorker' in navigator) {
    console.log('Service Worker is supported');
    navigator.serviceWorker.register('sw.js').then(function(reg) {
        console.log(':^)', reg);
        /*reg.pushManager.subscribe({
            userVisibleOnly: true
        }).then(function(sub) {
            console.log('endpoint:', sub.endpoint);
			var endPoints = sub.endpoint.split('/');
			var regID = endPoints[endPoints.length - 1];
			document.getElementById("regid").innerText = regID;
        });*/
		//document.getElementById("regid").innerText = 'Subscription supported';
    }).catch(function(error) {
        console.log(':^(', error);
    });
}

var reg;
var sub;
var isSubscribed = false;
var subscribeButton = document.querySelector('#SubscribeButton');
if ('serviceWorker' in navigator) {
  console.log('Service Worker is supported');
  navigator.serviceWorker.register('sw.js').then(function() {
    return navigator.serviceWorker.ready;
  }).then(function(serviceWorkerRegistration) {
    reg = serviceWorkerRegistration;
    subscribeButton.disabled = false;
    console.log('Service Worker is ready :^)', reg);
	//var endPoints = reg;//.split('/');
	//var regID = endPoints[endPoints.length - 1];
	//document.getElementById("regid").innerText = endPoints;
  }).catch(function(error) {
    console.log('Service Worker Error :^(', error);
  });
}
subscribeButton.addEventListener('click', function() {
  if (isSubscribed) {
    unsubscribe();
  } else {
    subscribe();
  }
});
function subscribe() {
  reg.pushManager.subscribe({userVisibleOnly: true}).
  then(function(pushSubscription){
    sub = pushSubscription;
    console.log('Subscribed! Endpoint:', sub.endpoint);
    isSubscribed = true;
	var endPoints = sub.endpoint.split('/');
	var regID = endPoints[endPoints.length - 1];
	//document.getElementById("regid").innerText = regID;
	subscribeButton.textContent = 'Successfully Subscribed!';
	subscribeButton.style="background-position:0px -82px;";
  });
}
function unsubscribe() {
  sub.unsubscribe().then(function(event) {
    subscribeButton.textContent = 'Best deals right here. Subscribe! ';
    console.log('Successfully Subscribed!d!', event);
    isSubscribed = false;
	//document.getElementById("regid").innerText = "";
  }).catch(function(error) {
    console.log('Error unsubscribing', error);
    subscribeButton.textContent = 'Best deals right here. Subscribe! ';
	
  });
}
