This is my first major project in Angular, begun as a student at the Midland University Code Academy.  It utilizes Angular 9, ngrx/store, and design elements from Angular Material and Bootstrap.  It queries Major League Baseball statistics from the MLB Advanced Media API and displays them like a contemporary sports website, ranging from team and transaction information to player statistics.   

This project was first completed in the MEAN stack using Angular with node.js/express.js in the backend, though with a PostgreSQL database in place of MongoDB for relational queries.  The application in that state can be found at https://github.com/mikejunt/mlbAngularNode, where it is served on Heroku.

After splitting off the node.js edition of the application, I completed a conversion to an enterprise-style environment.   This is that version of the application.   To create an enterprise-style deployment, the following things were implemented:

* The server serving the application files was replaced with an ASP.NET application using .NET Core 3.1.  The node.js/express.js server was completely removed.

* The API handling database queries spun off into its' own application to mimic an enterprise structure.   This API can be found at https://github.com/mikejunt/baseball-api.   The API is hosted on Azure App Service.

* The authorization process was completely revamped to utilize a professional grade, modern OAuth 2.0 structure utilizing Auth0 Universal Login.   Because the application customizes output based on user settings, it currently uses only database login, but could offer social provider login with a simple button toggle.    In this revamp, the site's own login and signup sections were completely removed and replaced with Auth0.

* Lastly, the application implemented the Angular Service Worker as a Progressive Web Application.   This required configuring the .NET controller to serve the Angular Service Worker.   The Service Worker is currently functioning as an application cache, but is not caching authorization information currently, so it will not actually operate offline.   This could be added fairly easily.

The end result is an application that mimics an enterprise application in authentication and cache control while living in the .NET ecosystem.   If I were to make further enhancements, I would refactor the application to drop dependency on the moment.js library, as the Angular Material Moment Adapter significantly increases bundle sizes due to incorporating all localization libraries automatically.

The project is deployed at https://msj-baseball-app.azurewebsites.net.  

The information and statistics presented within this application are either sourced directly or derived from other information received via the Major League Baseball API distributed by MLB Advanced Media and are subject to their copyright terms found at http://gdx.mlb.com/components/copyright.txt.   

