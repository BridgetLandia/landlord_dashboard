🤝 Trade-offs

Typescipt, Nextjs

I used them to learn/relearn the React way but I needed some time to get going with Typescript, therefore it is not very homogenous. I need to set my own preferences 
with Typescript create some snippets
and maintain a personal reusable React components Library. 

🔥 Firebase 

I used Firebase because it seemed like the quickest way to set up a database. 
The downside is that it is a noSQL database 
so I needed to use more js to sort Fields in order to be able to build generic components. 
In production I would have used a SQL database and data models or use an Apollo server and graphQL. 
I would have stored each part of the address separately. 

 
✨ CSS
I used base Tailwind styles, some components could have been extracted stylewise more. 



🪄 Used the Fetch API instead of axios library because I didn't need interceptors or other functionality. 


DAWA API
In production I would have choosen a different UI library or build a complex combobox/ autocomplete component and grab the whole Object from the DAWA API 
instead of just the address value. Because of this the Form validation is a bit simple.


I didn't use Redux or any central state library as React hooks were enough for this usecase.


I have no idea whether the Danish translation is correct, hope there is smthing funny there :) and I did'nt translate all the strings, 
just some to showcase that it is working.




