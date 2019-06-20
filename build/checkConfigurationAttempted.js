const fs = require('fs');

if (!fs.existsSync('conf/host')) {
    console.error("twcheese \033[31mERR! \033[0mYou need to create conf/host");
    console.error("twcheese \033[31mERR! \033[0m    Take a look at conf/host.example if you're not sure what it's supposed to look like.");
    console.error("twcheese \033[31mERR! \033[0m    Won't take long. I promise!");
    process.exit(1);
}