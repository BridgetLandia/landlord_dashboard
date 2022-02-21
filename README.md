🤝 Trade-offs

I tried to extract and generalize some components but there would be room for more, 
I tried to create the whole user journey instead.

🔥 Firebase 

I used Firebase because it seemed like the quickest way to set up a database. 
The downside is that it is a noSQL database 
so I needed to use more js to sort Fields in order to be able to build generic components. 
In production I would have used a SQL database and data models or use an Apollo server and graphQL. 
I would have stored each part of the address separately. 

 
✨ CSS
I used base Tailwind styles, some components could have been extracted stylewise more. 


🪄 Used the Fetch API instead of axios library because I didn't need interceptors or other functionality. 



I didn't use Redux or any state library as React hooks were enough for this usecase.


I have no idea whether the Danish translation is correct, hope there is smthing funny there :) and I did'nt translate all the strings, 
just some to showcase that it is working.




