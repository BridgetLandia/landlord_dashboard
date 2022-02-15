🤝 Trade-offs


🔥 Firebase 

I used Firebase because it seemed like the quickest way to set up a database but because it is a noSQL database I needed to use more js to sort Fields in order to be able to build generic components. 
In production I would have used SQL database and data models or use an Apollo server and graphQL.
I would store each part of the address separately. 
And the returned query would always contain the same fields always. 
 


✨ CSS




🪄 Used Fetch API instead of axios library because I didn't need interceptors or other functionality. 



I tried to maximize user experience on Portfolio Item Form so I didn't concentrated on reusability. In production I would have choosen a library or build a complex combobox component and grab the whole Object from the API instead of just the address value. 


