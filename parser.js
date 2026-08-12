// This script runs automatically when a user uploads a character PNG image
import EXIF from 'exif-js'; 

function parseCharacterCard(imageFile) {
    const reader = new FileReader();
    
    reader.onload = function(event) {
        // Look inside the image file structure
        const textChunks = event.target.result;
        
        // Find the secret 'chara' keyword containing the bot profile
        if (textChunks.includes("chara")) {
            const startPos = textChunks.indexOf("chara") + 5;
            const endPos = textChunks.lastIndexOf("}");
            
            // Extract and clean the hidden character text
            const rawJsonString = textChunks.slice(startPos, endPos + 1);
            const characterObj = JSON.parse(rawJsonString);
            
            // Success! Send details to your database
            console.log("Found character name:", characterObj.name);
            console.log("Greeting line:", characterObj.greeting);
            return characterObj;
        }
    };
    reader.readAsText(imageFile);
}
