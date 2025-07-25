
var clevertap = {
    event: [], 
    profile: [], 
    account: [], 
    onUserLogin: [], 
    notifications: [], 
    privacy: []
};


clevertap.account.push({ "id": "TEST-696-ZRW-7K7Z" }, "eu1");
clevertap.privacy.push({ optOut: false });
clevertap.privacy.push({ useIP: false });


(function () {
    var wzrk = document.createElement('script');
    wzrk.type = 'text/javascript';
    wzrk.async = true;
    wzrk.src = ('https:' == document.location.protocol 
        ? 'https://d2r1yp2w7bby2u.cloudfront.net' 
        : 'http://static.clevertap.com') + '/js/clevertap.min.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wzrk, s);
    
   
    wzrk.onload = function() {
        console.log("CleverTap SDK loaded successfully");
        setupCleverTapNotifications();
    };
    
    wzrk.onerror = function() {
        console.log("CleverTap SDK failed to load, using fallback methods");
        setTimeout(setupCleverTapNotifications, 1000);
    };
})();


const firebaseConfig = {
  apiKey: "AIzaSyCKiQzfVC6MPLqJUE8TaTiil-ypYV6YMVQ",
  authDomain: "clevertap2-f9b91.firebaseapp.com",
  projectId: "clevertap2-f9b91",
  storageBucket: "clevertap2-f9b91.firebasestorage.app",
  messagingSenderId: "1084985017224",
  appId: "1:1084985017224:web:a71ceb9a453b315b45f03d"
};


function setupCleverTapNotifications() {
    console.log("Setting up CleverTap notifications...");
    
    try {
        
        clevertap.notifications.push({
            "titleText": "Would you like to receive Push Notifications?",
            "bodyText": "We promise to only send you relevant content and give you updates on your transactions",
            "okButtonText": "Sign me up!",
            "rejectButtonText": "No thanks",
            "okButtonColor": "#F28046",
            "askAgainTimeInSeconds": 5,
            "serviceWorkerPath": "/sw.js"
        });
        
        console.log("CleverTap notifications configured successfully");
    } catch (error) {
        console.error("Error setting up CleverTap notifications:", error);
    }
}


function showCleverTapDialog() {
    console.log("Showing CleverTap dialog...");
    
    
    if (!('Notification' in window)) {
        alert('This browser does not support notifications');
        return;
    }
    

    if (Notification.permission === 'granted') {
        alert('Notifications are already enabled!');
        return;
    }
    
    if (Notification.permission === 'denied') {
        alert('Notifications are blocked. Please enable them in your browser settings.');
        return;
    }
    
    
}


function createCustomCleverTapDialog() {
    console.log("Creating custom CleverTap dialog...");
    

    const existingDialog = document.getElementById('ct-push-dialog');
    if (existingDialog) {
        existingDialog.remove();
    }
    
    const existingBackdrop = document.getElementById('ct-backdrop');
    if (existingBackdrop) {
        existingBackdrop.remove();
    }

   
    document.getElementById('ct-accept').onclick = function() {
        console.log("User accepted push notifications");
        
        
        if ('Notification' in window) {
            Notification.requestPermission().then(function(permission) {
                console.log('Permission result:', permission);
                if (permission === 'granted') {
                   
                    try {
                        clevertap.event.push("Push Permission Granted", {
                            "Source": "Custom Dialog",
                            "Time": new Date().toISOString(),
                            "Permission": permission
                        });
                    } catch (error) {
                        console.error("Error tracking CleverTap event:", error);
                    }
                    
                    alert('Great! Push notifications enabled. You may see a browser notification permission dialog.');
                   
                    setTimeout(() => {
                        new Notification('Welcome!', {
                            body: 'Push notifications are now enabled',
                            icon: 'https://via.placeholder.com/64x64?text=🔔'
                        });
                    }, 1000);
                } else {
                    alert('Permission was not granted. You can enable notifications in your browser settings.');
                }
                updatePermissionStatus();
            }).catch(function(error) {
                console.error('Error requesting permission:', error);
                alert('Error requesting notification permission');
            });
        }
        
        backdrop.remove();
        dialog.remove();
    };

    document.getElementById('ct-reject').onclick = function() {
        console.log("User rejected push notifications");
        
     
        try {
            clevertap.event.push("Push Permission Denied", {
                "Source": "Custom Dialog",
                "Time": new Date().toISOString()
            });
        } catch (error) {
            console.error("Error tracking CleverTap event:", error);
        }
        
        alert('No problem! You can enable notifications later if you change your mind.');
        backdrop.remove();
        dialog.remove();
    };

 
    backdrop.onclick = function(e) {
        if (e.target === backdrop) {
            console.log("Dialog closed by backdrop click");
            backdrop.remove();
            dialog.remove();
        }
    };

 
    if (!document.getElementById('ct-animations')) {
        const style = document.createElement('style');
        style.id = 'ct-animations';
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes slideIn {
                from { 
                    opacity: 0;
                    transform: translate(-50%, -50%) scale(0.8);
                }
                to { 
                    opacity: 1;
                    transform: translate(-50%, -50%) scale(1);
                }
            }
        `;
        document.head.appendChild(style);
    }
}


function triggerCleverTapLogin() {
    try {
        clevertap.onUserLogin.push({
            "Site": {
                "Name": "Demo User 3 ",
                "Identity": "4234234423323",
                "Email": "demouser3@gmail.com",
                "Phone": "+387593134743",
                "Gender": "M",
                "DOB": new Date("1990-01-01"),
                "MSG-email": false,
                "MSG-push": true,
                "MSG-sms": true,
                "MSG-whatsapp": true
            }
        });
        console.log("CleverTap login event sent");
        alert("CleverTap login triggered successfully!");
    } catch (error) {
        console.error("Error triggering CleverTap login:", error);
        alert("Error triggering CleverTap login: " + error.message);
    }
}

function triggerPushEvent() {
    try {
        clevertap.event.push("Show POP UP", {
            "Page": "Home",
            "Time": new Date().toISOString(),
            "Source": "Manual Trigger",
            "URL": window.location.href
        });
        console.log("Push event sent to CleverTap");
 
    } catch (error) {
        console.error("Error sending push event:", error);
        alert("Error sending push event: " + error.message);
    }
}

function triggerPushEvent2() {
    try {
        clevertap.event.push("Push Event", {
            "Page": "Home",
            "Time": new Date().toISOString(),
            "Source": "Manual Trigger",
            "URL": window.location.href
        });
        console.log("Push event sent to CleverTap");
 
    } catch (error) {
        console.error("Error sending push event:", error);
        alert("Error sending push event: " + error.message);
    }
}



function triggerExitIntent() {
    try {
        clevertap.event.push("Exit Intent", {
            "Page": "Home",
            "Time": new Date().toISOString(),
            "Source": "Manual Trigger",
            "URL": window.location.href
        });
        console.log("Exit Intent event sent to CleverTap");
       
    } catch (error) {
        console.error("Error sending Exit intent event:", error);
        alert("Error sending Exit intent event: " + error.message);
    }
}


function triggerNativeDisplay() {
    try {
        
        const popup = document.getElementById("native-display-popup");
        if (popup) {
            popup.style.display = "block";
        }

       
        clevertap.event.push("nativeDisplay", {
            "Page": "Cart Page",
            "Time": new Date().toISOString(),
            "Trigger": "Manual",
            "User": document.getElementById("user-name")?.textContent || "Unknown",
            "Product": document.getElementById("product-name")?.textContent || "Unknown",
            "URL": window.location.href
        });

        console.log("Native display event sent to CleverTap");

    } catch (error) {
        console.error("Error triggering native display:", error);
        alert("Error: " + error.message);
    }
}



function updatePermissionStatus() {
    const statusElement = document.getElementById('permission-status');
    if (statusElement && 'Notification' in window) {
        statusElement.textContent = Notification.permission;
        statusElement.style.color = Notification.permission === 'granted' ? 'green' : 
                                   Notification.permission === 'denied' ? 'red' : 'orange';
    }
}

function closePopUp() {
    try {
        var wrapper = window.parent.document.getElementById('wizParDiv0');
        if (wrapper) {
            setTimeout(() => {
                wrapper.remove();
            }, 0);
        } else {
            console.log("Parent wrapper not found");
        }
    } catch (error) {
        console.error("Error closing popup:", error);
    }
}


document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM Content Loaded");
    
    const protocolInfo = document.getElementById('protocol-info');
    if (protocolInfo) {
        protocolInfo.textContent = location.protocol + '//' + location.hostname;
    }
    
    updatePermissionStatus();
    
    console.log("Page loaded. Ready to show CleverTap dialogs.");
    console.log("Secure context:", window.isSecureContext);
    console.log("Notification support:", 'Notification' in window);
    console.log("Current permission:", 'Notification' in window ? Notification.permission : 'N/A');
    
  
    setTimeout(function() {
        if ('Notification' in window && Notification.permission === 'default') {
            console.log("Auto-showing CleverTap dialog after 3 seconds for testing");
            showCleverTapDialog();
        }
    }, 3000);
});
