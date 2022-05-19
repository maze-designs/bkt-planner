import { perms, users, config, records, sessions } from "./db";
import colors from 'colors/safe'

// Set default permissions unless they already exist/were changed
if (!perms.has("$options")) {
    perms.set("$options", ["all", "owns"])
    console.log("[SET] perms: options")
}

if (!perms.has("admin")) {
    perms.set("admin", 
    {
        "read": "all",
        "write": "all"
    })
    console.log("[SET] perms: admin")
}

if (!perms.has("user")) {
    perms.set("user", 
    {
        "read": "all",
        "write": "owns"
    })
    console.log("[SET] perms: user")
}

if (!users.has("admin")) {
    users.set("admin",
    {
        "displayName": "admin",
        "password": "admin", // TODO: hash
        "sessions": [],
        "perms": "admin"
    })
}
    // TODO: Set default config unless it already exists/was changed
    
     // useless but creates the files
    records.set("")
    sessions.set("")
    config.set("")

    console.log(colors.green("[READY] dbs"))